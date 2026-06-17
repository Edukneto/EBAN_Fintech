const cadData = {
  clientes: [
    { nome: 'Atelier Norte LTDA', vencimento: '28 abr 2026', valor: 'R$ 4.820,00' },
    { nome: 'Studio Rocha Arquitetura', vencimento: '30 abr 2026', valor: 'R$ 12.300,00' },
    { nome: 'Padaria Boa Vista', vencimento: '02 mai 2026', valor: 'R$ 1.450,00' },
    { nome: 'Marina Souza', vencimento: '05 mai 2026', valor: 'R$ 890,00' },
    { nome: 'Construtora Aurora', vencimento: '10 mai 2026', valor: 'R$ 28.900,00' },
    { nome: 'Café & Cia ME', vencimento: '12 mai 2026', valor: 'R$ 2.140,00' },
  ],
  fornecedores: [
    { nome: 'Distribuidora Sul', vencimento: '29 abr 2026', valor: 'R$ 6.200,00' },
    { nome: 'Energia Brasil S.A.', vencimento: '03 mai 2026', valor: 'R$ 3.450,00' },
    { nome: 'Cloud Services Inc.', vencimento: '07 mai 2026', valor: 'R$ 1.280,00' },
    { nome: 'Papelaria Central', vencimento: '11 mai 2026', valor: 'R$ 540,00' },
    { nome: 'Logística Express', vencimento: '15 mai 2026', valor: 'R$ 4.890,00' },
  ],
  impostos: [
    { nome: 'DAS — Simples Nacional', vencimento: '20 mai 2026', valor: 'R$ 3.210,00' },
    { nome: 'ISS — Município', vencimento: '10 mai 2026', valor: 'R$ 980,00' },
    { nome: 'DARF — IRPJ', vencimento: '30 mai 2026', valor: 'R$ 5.420,00' },
    { nome: 'GPS — INSS', vencimento: '20 mai 2026', valor: 'R$ 2.180,00' },
  ],
};

const tabLabels = { clientes: 'Clientes', fornecedores: 'Fornecedores', impostos: 'Impostos' };

let activeTab = 'clientes';
let search = '';

function renderList() {
  const list = document.getElementById('lista');
  const items = cadData[activeTab].filter(i => i.nome.toLowerCase().includes(search.toLowerCase()));
  list.innerHTML = items.map((item, i) => `
    <li class="grid grid-cols-12 px-6 py-4 items-center hover:bg-surface-alt transition-settle animate-fade-up" style="animation-delay: ${i * 35}ms">
      <div class="col-span-7 font-medium text-sm">${item.nome}</div>
      <div class="col-span-3 text-sm text-muted-foreground tabular-nums">${item.vencimento}</div>
      <div class="col-span-2 text-right text-sm font-semibold tabular-nums">${item.valor}</div>
    </li>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(1);
  renderList();

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.dataset.tab;
      renderList();
    });
  });

  document.getElementById('busca').addEventListener('input', (e) => {
    search = e.target.value;
    renderList();
  });

  document.getElementById('btnAdicionar').addEventListener('click', () => {
    showToast('Novo lançamento em ' + tabLabels[activeTab]);
  });
});
