// Taxa de rendimento da renda fixa por segundo (ex: 0.01 = 1% ao segundo)
export const FIXED_INCOME_RATE_PER_SECOND = 0.001;

export const BETTING_MULTIPLIERS = [
  { multiplier: 1.2, chance: 0.70 },
  { multiplier: 1.5, chance: 0.55 },
  { multiplier: 2.0, chance: 0.40 },
];

export const STOCK_UPDATE_INTERVAL_MS = 10000;
export const STOCK_HISTORY_LENGTH = 100;
export const STOCK_INITIAL_HISTORY_LENGTH = 50;

// trend: quanto o índice tende a subir ou descer a cada atualização. Positivo = tendência de alta, negativo = tendência de baixa. Escala aproximada: 0.10 = sobe ~1 ponto por tick, -0.05 = cai ~0.5 ponto por tick.
// volatility: o quanto o movimento aleatório pode desviar da tendência. Quanto maior, mais imprevisível o ativo. 0.05 = quase estável, 0.35 = pode variar muito para cima ou para baixo independente da tendência.
export const STOCK_TEMPLATES = [
  { name: "AuroCorp",  color: "#f59e0b", trend:  0.02, volatility: 0.15 },
  { name: "NexaTech",  color: "#6366f1", trend:  0.01, volatility: 0.25 },
  { name: "BioVerde",  color: "#10b981", trend:  0.01, volatility: 0.18 },
  { name: "FerroMax",  color: "#ef4444", trend: -0.03, volatility: 0.20 },
  { name: "OceanLog",  color: "#0ea5e9", trend:  0.00, volatility: 0.12 },
  { name: "LunaBank",  color: "#ec4899", trend: -0.01, volatility: 0.30 },
  { name: "TerraGen",  color: "#84cc16", trend: -0.02, volatility: 0.22 },
  { name: "CriptoCo",  color: "#f97316", trend:  0.00, volatility: 0.45 },
];