import { useState } from "react";
import { useGame } from "../context/GameContext";

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

      <p>Saldo disponível: {availablePoints}</p>

      <p>Investido: {fixedIncome}</p>

      <p>Lucro acumulado: {fixedIncomeProfit}</p>

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
    </div>
  );
}