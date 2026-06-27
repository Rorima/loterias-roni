import { createContext, useContext, useEffect, useState } from "react";
import { FIXED_INCOME_RATE_PER_SECOND, BETTING_MULTIPLIERS, STOCK_TEMPLATES, STOCK_UPDATE_INTERVAL_MS } from "../constants/game";

type GameData = {
  totalBet: number;
  totalWon: number;
  totalLost: number;
  biggestBet: number;
  biggestWin: number;
  biggestLoss: number;
  totalPoints: number;
  availablePoints: number;
  totalClicks: number;
  fixedIncome: number;
  fixedIncomeProfit: number;
  stocks: Stock[];
  holdings: StockHolding[];
  stockProfit: number;
  maxPatrimony: number;
  timePlayed: number;
};

export type Stock = {
  id: string;
  name: string;
  color: string;
  trend: number;
  volatility: number;
  index: number;
  history: number[];
};

export type StockHolding = {
  stockId: string;
  quantity: number;
  avgBuyPrice: number;
};

type GameContextType = GameData & {
  addClick: () => void;
  investInFixedIncome: (amount: number) => void;
  withdrawFixedIncome: () => void;
  placeBet: (amount: number, multiplier: number) => boolean;
  buyStock: (stockId: string, quantity: number) => void;
  sellStock: (stockId: string) => void;
};

const STORAGE_KEY = "loterias-roni";

const defaultData: GameData = {
  totalBet: 0,
  totalWon: 0,
  totalLost: 0,
  biggestBet: 0,
  biggestWin: 0,
  biggestLoss: 0,
  totalPoints: 0,
  availablePoints: 0,
  totalClicks: 0,
  fixedIncome: 0,
  fixedIncomeProfit: 0,
  stocks: [],
  holdings: [],
  stockProfit: 0,
  maxPatrimony: 0,
  timePlayed: 0,
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameData, setGameData] = useState<GameData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return { ...defaultData, stocks: initStocks() };

    try {
      const parsed = JSON.parse(saved);
      if (!parsed.stocks || parsed.stocks.length === 0) {
        return { ...parsed, stocks: initStocks() };
      }
      return parsed;
    } catch {
      return { ...defaultData, stocks: initStocks() };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
  }, [gameData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameData((data) => {
        if (data.fixedIncome <= 0) return data;

        const profit = Math.floor(data.fixedIncome * FIXED_INCOME_RATE_PER_SECOND);

        if (profit <= 0) return data;

        return {
          ...data,
          totalPoints: data.totalPoints + profit,
          availablePoints: data.availablePoints + profit,
          fixedIncomeProfit: data.fixedIncomeProfit + profit,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameData((data) => {
        const usedNames = data.stocks.map((s) => s.name);
        const updatedStocks = data.stocks.map((stock) => {
          const change = stock.trend + (Math.random() - 0.5) * stock.volatility * 2;
          const newIndex = Math.max(0, Math.min(100, stock.index + change * 10));
          return {
            ...stock,
            index: Math.round(newIndex * 100) / 100,
            history: [...stock.history.slice(-19), stock.index],
          };
        });

        const deadIds = updatedStocks.filter((s) => s.index <= 0).map((s) => s.id);

        const survivingStocks = updatedStocks.filter((s) => s.index > 0);
        const survivingNames = survivingStocks.map((s) => s.name);

        const newStocks = [...survivingStocks];
        while (newStocks.length < 5) {
          newStocks.push(createStock([...survivingNames, ...newStocks.map((s) => s.name)]));
        }

        // Zerar holdings de ativos mortos
        const lostHoldings = data.holdings.filter((h) => deadIds.includes(h.stockId));
        const totalLost = lostHoldings.reduce((acc, h) => acc + h.quantity * h.avgBuyPrice, 0);

        const newHoldings = data.holdings.filter((h) => !deadIds.includes(h.stockId));

        return {
          ...data,
          stocks: newStocks,
          holdings: newHoldings,
          stockProfit: data.stockProfit - totalLost,
        };
      });
    }, STOCK_UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameData((data) => {
        return {
          ...data,
          timePlayed: data.timePlayed + 1,
          maxPatrimony: Math.max(data.maxPatrimony, data.totalPoints),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function createStock(usedNames: string[]): Stock {
    const available = STOCK_TEMPLATES.filter((t) => !usedNames.includes(t.name));
    const pool = available.length > 0 ? available : STOCK_TEMPLATES;
    const template = pool[Math.floor(Math.random() * pool.length)];

    return {
      id: crypto.randomUUID(),
      name: template.name,
      color: template.color,
      trend: template.trend,
      volatility: template.volatility,
      index: Math.floor(Math.random() * 40) + 40,
      history: [],
    };
  }

  function initStocks(): Stock[] {
    const stocks: Stock[] = [];
    for (let i = 0; i < 5; i++) {
      stocks.push(createStock(stocks.map((s) => s.name)));
    }
    return stocks;
  }

  function addClick() {
    setGameData((data) => ({
      ...data,
      totalPoints: data.totalPoints + 1,
      availablePoints: data.availablePoints + 1,
      totalClicks: data.totalClicks + 1,
    }));
  }

  function investInFixedIncome(amount: number) {
    if (!Number.isFinite(amount)) return;

    if (amount <= 0) return;

    setGameData((data) => {
      if (amount > data.availablePoints) return data;

      return {
        ...data,
        availablePoints: data.availablePoints - amount,
        fixedIncome: data.fixedIncome + amount,
      };
    });
  }

  function withdrawFixedIncome() {
    setGameData((data) => ({
      ...data,
      availablePoints: data.availablePoints + data.fixedIncome,
      fixedIncome: 0,
    }));
  }

  function placeBet(amount: number, multiplier: number): boolean {
    const config = BETTING_MULTIPLIERS.find((b) => b.multiplier === multiplier);
    if (!config) return false;

    const won = Math.random() < config.chance;
    const profit = amount * multiplier;

    setGameData((data) => {
      if (amount > data.availablePoints) return data;

      if (won) {
        return {
          ...data,
          totalPoints: data.totalPoints + profit - amount,
          availablePoints: data.availablePoints + profit - amount,
          totalBet: data.totalBet + amount,
          totalWon: data.totalWon + profit,
          biggestBet: Math.max(data.biggestBet, amount),
          biggestWin: Math.max(data.biggestWin, profit),
        };
      } else {
        return {
          ...data,
          totalPoints: data.totalPoints - amount,
          availablePoints: data.availablePoints - amount,
          totalBet: data.totalBet + amount,
          totalLost: data.totalLost + amount,
          biggestBet: Math.max(data.biggestBet, amount),
          biggestLoss: Math.max(data.biggestLoss, amount),
        };
      }
    });

    return won;
  }

  function buyStock(stockId: string, quantity: number) {
    setGameData((data) => {
      const stock = data.stocks.find((s) => s.id === stockId);
      if (!stock) return data;

      const cost = Math.ceil(stock.index * quantity);
      if (cost > data.availablePoints) return data;

      const existing = data.holdings.find((h) => h.stockId === stockId);
      let newHoldings: StockHolding[];

      if (existing) {
        const totalQty = existing.quantity + quantity;
        const avgPrice = (existing.avgBuyPrice * existing.quantity + cost) / totalQty;
        newHoldings = data.holdings.map((h) =>
          h.stockId === stockId ? { ...h, quantity: totalQty, avgBuyPrice: avgPrice } : h
        );
      } else {
        newHoldings = [...data.holdings, { stockId, quantity, avgBuyPrice: stock.index }];
      }

      return {
        ...data,
        availablePoints: data.availablePoints - cost,
        totalPoints: data.totalPoints - cost,
        holdings: newHoldings,
      };
    });
  }

  function sellStock(stockId: string) {
    setGameData((data) => {
      const stock = data.stocks.find((s) => s.id === stockId);
      const holding = data.holdings.find((h) => h.stockId === stockId);
      if (!stock || !holding) return data;

      const revenue = Math.floor(stock.index * holding.quantity);
      const profit = revenue - Math.floor(holding.avgBuyPrice * holding.quantity);

      return {
        ...data,
        availablePoints: data.availablePoints + revenue,
        totalPoints: data.totalPoints + revenue,
        holdings: data.holdings.filter((h) => h.stockId !== stockId),
        stockProfit: data.stockProfit + profit,
      };
    });
  }

  return (
    <GameContext.Provider
      value={{
        ...gameData,
        addClick,
        investInFixedIncome,
        withdrawFixedIncome,
        placeBet,
        buyStock,
        sellStock,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame deve ser usado dentro de GameProvider");
  }

  return context;
}