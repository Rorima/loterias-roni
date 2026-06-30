export function formatPoints(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return rounded.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}