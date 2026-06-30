import "./Header.css";
import { useGame } from "../context/GameContext";
import { formatPoints } from "../utils/format";

export default function Header() {
  const { totalPoints, availablePoints } = useGame();

  return (
    <header className="header">
      <h1>🎰 Loterias Roni</h1>

      <div className="stats">
        <div>
          <span className="label">Patrimônio</span>
          <strong>{formatPoints(totalPoints)} pontos</strong>
        </div>

        <div>
          <span className="label">Saldo disponível</span>
          <strong>{formatPoints(availablePoints)} pontos</strong>
        </div>
      </div>
    </header>
  );
}