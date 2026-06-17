// Centralized financial data — mirrors src/lib/financeData.ts
const SALDO_ATUAL = 50000;

const rawData = [
  { mes: 'Jan', entradas: 18500, saidas: 12300 },
  { mes: 'Fev', entradas: 16200, saidas: 13800 },
  { mes: 'Mar', entradas: 21400, saidas: 15600 },
  { mes: 'Abr', entradas: 19800, saidas: 14200 },
  { mes: 'Mai', entradas: 23100, saidas: 16500 },
  { mes: 'Jun', entradas: 25400, saidas: 17000 },
];

function reconcileToBalance(data, target) {
  const r = data.map(d => ({ ...d }));
  const totE = r.reduce((a, d) => a + d.entradas, 0);
  const totSExcept = r.slice(0, -1).reduce((a, d) => a + d.saidas, 0);
  const last = totE - totSExcept - target;
  if (last >= 0) r[r.length - 1].saidas = last;
  return r;
}

const chartData = reconcileToBalance(rawData, SALDO_ATUAL);
const ultimo = chartData[chartData.length - 1];
const penultimo = chartData[chartData.length - 2];
const entradasMesAtual = ultimo.entradas;
const saidasMesAtual = ultimo.saidas;
const variacaoMesAtual = entradasMesAtual - saidasMesAtual;
const variacaoEntradasPct = ((ultimo.entradas - penultimo.entradas) / penultimo.entradas) * 100;
const variacaoSaidasPct = ((ultimo.saidas - penultimo.saidas) / penultimo.saidas) * 100;

function formatBRL(v) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function formatPct(v) {
  return (v >= 0 ? '+' : '') + v.toFixed(0) + '%';
}
