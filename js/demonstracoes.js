const series = [
  { mes: 'Jan', receita: 32400, despesa: 18200 },
  { mes: 'Fev', receita: 28100, despesa: 21900 },
  { mes: 'Mar', receita: 41200, despesa: 24300 },
  { mes: 'Abr', receita: 37800, despesa: 28600 },
  { mes: 'Mai', receita: 45600, despesa: 26100 },
  { mes: 'Jun', receita: 52300, despesa: 31400 },
];

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(1);

  const ctx = document.getElementById('chartDemonstracoes');
  const grad1 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
  grad1.addColorStop(0, 'hsla(148, 100%, 13%, 0.25)');
  grad1.addColorStop(1, 'hsla(148, 100%, 13%, 0)');
  const grad2 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
  grad2.addColorStop(0, 'hsla(25, 90%, 54%, 0.22)');
  grad2.addColorStop(1, 'hsla(25, 90%, 54%, 0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: series.map(s => s.mes),
      datasets: [
        { label: 'Receita', data: series.map(s => s.receita), borderColor: 'hsl(148 100% 13%)', backgroundColor: grad1, fill: true, tension: 0.35, borderWidth: 2.25, pointRadius: 3 },
        { label: 'Despesa', data: series.map(s => s.despesa), borderColor: 'hsl(25 90% 54%)',  backgroundColor: grad2, fill: true, tension: 0.35, borderWidth: 2.25, pointRadius: 3 },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => c.dataset.label + ': R$ ' + c.parsed.y.toLocaleString('pt-BR') } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: 'hsl(0 0% 42%)' } },
        y: { grid: { color: 'hsl(42 14% 89%)' }, ticks: { color: 'hsl(0 0% 42%)', callback: (v) => (v / 1000) + 'k' } },
      },
    },
  });

  // Period buttons
  document.querySelectorAll('.period-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.period-btn').forEach(x => {
        x.classList.remove('bg-primary', 'text-primary-foreground');
        x.classList.add('text-muted-foreground');
      });
      b.classList.add('bg-primary', 'text-primary-foreground');
      b.classList.remove('text-muted-foreground');
    });
  });

  document.getElementById('btnExportar').addEventListener('click', () => {
    window.print();
  });
});
