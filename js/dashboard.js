// Dashboard logic — count up + bar chart + cards
function countUp(el, to, duration = 1200) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = to * eased;
    el.textContent = formatBRL(v);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(0);

  // Hero
  const saldoEl = document.getElementById('saldo');
  countUp(saldoEl, SALDO_ATUAL);
  document.getElementById('variacaoMes').textContent = '+R$ ' + formatBRL(variacaoMesAtual) + ' este mês';

  // Cards
  document.getElementById('entradasValor').textContent = 'R$ ' + formatBRL(entradasMesAtual);
  document.getElementById('saidasValor').textContent = 'R$ ' + formatBRL(saidasMesAtual);
  document.getElementById('entradasPct').textContent = formatPct(variacaoEntradasPct);
  document.getElementById('saidasPct').textContent = formatPct(variacaoSaidasPct);

  // Chart
  const ctx = document.getElementById('chartEntradasSaidas');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.map(d => d.mes),
      datasets: [
        { label: 'Entradas', data: chartData.map(d => d.entradas), backgroundColor: 'hsl(148 100% 13%)', borderRadius: 6, maxBarThickness: 28 },
        { label: 'Saídas',   data: chartData.map(d => d.saidas),   backgroundColor: 'hsl(25 90% 54%)',  borderRadius: 6, maxBarThickness: 28 },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => 'R$ ' + c.parsed.y.toLocaleString('pt-BR') } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: 'hsl(0 0% 42%)' } },
        y: { grid: { color: 'hsl(42 14% 89%)' }, ticks: { color: 'hsl(0 0% 42%)', callback: (v) => (v / 1000) + 'k' } },
      },
    },
  });
});
