import { useGame } from "../context/GameContext";

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export default function StatisticsPage() {
  const {
    totalClicks,
    totalBet,
    totalWon,
    totalLost,
    biggestBet,
    biggestWin,
    biggestLoss,
    maxPatrimony,
    stockProfit,
    fixedIncomeProfit,
    timePlayed,
  } = useGame();

  const stats = [
    { label: "⏱️ Tempo jogado",       value: formatTime(timePlayed) },
    { label: "🖱️ Total de cliques",   value: totalClicks },
    { label: "🏆 Patrimônio máximo",  value: `${maxPatrimony} pts` },
    { label: "🎰 Total apostado",     value: `${totalBet} pts` },
    { label: "✅ Total ganho",        value: `${totalWon} pts` },
    { label: "❌ Total perdido",      value: `${totalLost} pts` },
    { label: "💸 Maior aposta",       value: `${biggestBet} pts` },
    { label: "🥇 Maior vitória",      value: `${biggestWin} pts` },
    { label: "💀 Maior derrota",      value: `${biggestLoss} pts` },
    { label: "📈 Lucro da bolsa",     value: `${stockProfit} pts` },
    { label: "🏦 Lucro da renda fixa", value: `${fixedIncomeProfit} pts` },
  ];

  return (
    <div>
      <h2>📊 Estatísticas</h2>

      {stats.map((stat) => (
        <div
          key={stat.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
        </div>
      ))}
    </div>
  );
}