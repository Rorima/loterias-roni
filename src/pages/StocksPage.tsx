import { useState } from "react";
import { useGame } from "../context/GameContext";
import { formatPoints } from "../utils/format";

export default function StocksPage() {
  const { stocks, holdings, availablePoints, buyStock, sellStock } = useGame();
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  function getHolding(stockId: string) {
    return holdings.find((h) => h.stockId === stockId);
  }

  function handleQuantityChange(stockId: string, value: string) {
    setQuantities((prev) => ({ ...prev, [stockId]: value }));
  }

  function handleBuy(stockId: string) {
    const qty = parseInt(quantities[stockId] || "0");
    if (isNaN(qty) || qty <= 0) return;
    buyStock(stockId, qty);
    setQuantities((prev) => ({ ...prev, [stockId]: "" }));
  }

  return (
    <div>
      <h2>📈 Bolsa</h2>
      <p>Saldo disponível: {formatPoints(availablePoints)}</p>

      {stocks.map((stock) => {
        const holding = getHolding(stock.id);
        const qty = parseInt(quantities[stock.id] || "0");
        const cost = isNaN(qty) ? 0 : Math.ceil(stock.index * qty);
        const revenue = holding ? Math.floor(stock.index * holding.quantity) : 0;
        const profit = holding ? revenue - Math.floor(holding.avgBuyPrice * holding.quantity) : 0;

        return (
          <div
            key={stock.id}
            style={{
              border: `2px solid ${stock.color}`,
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              background: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ color: stock.color, fontSize: "1.1rem" }}>{stock.name}</strong>
              <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                {stock.index.toFixed(1)}
              </span>
            </div>

            {/* Gráfico */}
            <div style={{ margin: "10px 0" }}>
              <svg width="100%" height="60" viewBox={`0 0 ${stock.history.length * 10} 60`} preserveAspectRatio="none">
                {stock.history.length > 1 && (
                  <polyline
                    points={stock.history
                      .map((v, i) => `${i * 10},${60 - (v / 100) * 60}`)
                      .join(" ")}
                    fill="none"
                    stroke={stock.color}
                    strokeWidth="2"
                  />
                )}
              </svg>
            </div>

            {/* Holdings */}
            {holding && (
              <div style={{ fontSize: "0.85rem", marginBottom: 8, color: "#555" }}>
                Você tem <strong>{holding.quantity}</strong> cotas •{" "}
                Preço médio: <strong>{holding.avgBuyPrice.toFixed(1)}</strong> •{" "}
                Lucro: <strong style={{ color: profit >= 0 ? "green" : "red" }}>
                  {profit >= 0 ? "+" : ""}{profit}
                </strong>
              </div>
            )}

            {/* Ações */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="number"
                  min="1"
                  placeholder="Cotas"
                  value={quantities[stock.id] || ""}
                  onChange={(e) => handleQuantityChange(stock.id, e.target.value)}
                  style={{ width: 80 }}
                />
                <button onClick={() => handleBuy(stock.id)} disabled={cost > availablePoints || qty <= 0}>
                  Comprar {cost > 0 ? `(${cost}pts)` : ""}
                </button>
              </div>
              {holding && (
                <button onClick={() => sellStock(stock.id)} className="danger">
                  Vender tudo {revenue > 0 ? `(${revenue}pts)` : ""}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}