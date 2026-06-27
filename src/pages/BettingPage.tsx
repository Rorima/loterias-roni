import { useState } from "react";
import { useGame } from "../context/GameContext";
import { BETTING_MULTIPLIERS } from "../constants/game";

export default function BettingPage() {
  const { availablePoints, placeBet } = useGame();

  const [amount, setAmount] = useState("");
  const [selectedMultiplier, setSelectedMultiplier] = useState(2);
  const [lastResult, setLastResult] = useState<null | { won: boolean; amount: number; multiplier: number }>(null);

  function handleBet() {
    const value = parseInt(amount);
    if (isNaN(value) || value <= 0) return;

    const won = placeBet(value, selectedMultiplier);
    setLastResult({ won, amount: value, multiplier: selectedMultiplier });
    setAmount("");
  }

  return (
    <div>
      <h2>🎰 Apostas</h2>

      <p>Saldo disponível: {availablePoints}</p>

      <div>
        {BETTING_MULTIPLIERS.map((b) => (
        <button
          key={b.multiplier}
          onClick={() => setSelectedMultiplier(b.multiplier)}
          className={selectedMultiplier === b.multiplier ? "" : "secondary"}
          style={{ marginRight: 8, marginBottom: 8 }}
        >
          {b.multiplier}x ({(b.chance * 100).toFixed(0)}%)
        </button>
      ))}
      </div>

      <br />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Quantidade"
      />

      <button onClick={handleBet} style={{ marginLeft: 10 }}>
        Apostar
      </button>

      {lastResult && (
        <p>
          {lastResult.won
            ? `✅ Ganhou! +${lastResult.amount * lastResult.multiplier} pontos`
            : `❌ Perdeu! -${lastResult.amount} pontos`}
        </p>
      )}
    </div>
  );
}