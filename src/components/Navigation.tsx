import "./Navigation.css";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/">🏠<span>Início</span></NavLink>

      <NavLink to="/betting">🎰<span>Apostas</span></NavLink>

      <NavLink to="/stocks">📈<span>Bolsa</span></NavLink>

      <NavLink to="/fixed-income">🏦<span>Renda Fixa</span></NavLink>

      <NavLink to="/statistics">📊<span>Estatísticas</span></NavLink>
    </nav>
  );
}