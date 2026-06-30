import { useState } from "react";
import { useGame } from "../context/GameContext";
import { BETTING_MULTIPLIERS } from "../constants/game";
import { formatPoints } from "../utils/format";

export default function BettingPage() {
  const { availablePoints, placeBet } = useGame();

  const [amount, setAmount] = useState("");
  const [selectedMultiplier, setSelectedMultiplier] = useState(2);
  const [lastResult, setLastResult] = useState<null | { won: boolean; amount: number; multiplier: number }>(null);

  function handleBet() {
    const value = parseInt(amount);
    if (isNaN(value) || value <= 0) return;

    if (value > availablePoints) return;
    const won = placeBet(value, selectedMultiplier);
    setLastResult({ won, amount: value, multiplier: selectedMultiplier });
    setAmount("");
  }

  return (
    <div>
      <h2>🎰 Apostas</h2>

      <p>Saldo disponível: {formatPoints(availablePoints)}</p>

      <div>
        {BETTING_MULTIPLIERS.map((b) => (
        <button
          key={b.multiplier}
          onClick={() => setSelectedMultiplier(b.multiplier)}
          className={selectedMultiplier === b.multiplier ? "" : "secondary"}
          style={{ marginRight: 8, marginBottom: 8 }}
        >
          {b.multiplier}x
        </button>
      ))}
      </div>

      <br />

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Quantidade"
          style={{ width: 100 }}
        />
        <button onClick={handleBet}>
          Apostar
        </button>
      </div>

      {lastResult && (
        <p>
          {lastResult.won
            ? `✅ Ganhou! +${formatPoints(lastResult.amount * lastResult.multiplier)} pontos`
            : `❌ Perdeu! -${formatPoints(lastResult.amount)} pontos`}
        </p>
      )}
    </div>
  );
}