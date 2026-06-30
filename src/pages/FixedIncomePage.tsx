import { useState } from "react";
import { useGame } from "../context/GameContext";
import { formatPoints } from "../utils/format";

export default function FixedIncomePage() {
  const {
    fixedIncome,
    availablePoints,
    fixedIncomeProfit,
    investInFixedIncome,
    withdrawFixedIncome,
  } = useGame();

  const [amount, setAmount] = useState("");

  return (
    <div>
      <h2>🏦 Renda Fixa</h2>

      <p>Saldo disponível: {formatPoints(availablePoints)}</p>

      <p>Investido: {formatPoints(fixedIncome)}</p>

      <p>Lucro acumulado: {formatPoints(fixedIncomeProfit)}</p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Quantidade"
      />

      <br />
      <br />

      <button
        onClick={() => {
          const value = parseInt(amount);

          if (isNaN(value) || value <= 0) {
            return;
          }

          investInFixedIncome(value);
          setAmount("");
        }}
      >
        Investir
      </button>

      <button
        onClick={withdrawFixedIncome}
        className="secondary"
        style={{ marginLeft: 10 }}
      >
        Resgatar tudo
      </button>

      <p>OBS.: A taxa de rendimentos é de 0,001 por segundo.</p>
    </div>
  );
}