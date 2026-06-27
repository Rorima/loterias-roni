import { useGame } from "../context/GameContext";
import "./HomePage.css";

export default function HomePage() {
  const { addClick, totalClicks } = useGame();

  return (
    <div className="home">
      <p className="home-hint">Toque para ganhar pontos</p>

      <button className="click-area" onClick={addClick}>
        🎰
        <span className="click-label">+1 ponto</span>
      </button>

      <p className="home-clicks">{totalClicks} cliques</p>
    </div>
  );
}