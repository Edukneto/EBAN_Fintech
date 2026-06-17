// Renders sidebar + mobile top bar shared across pages.
const NAV = [
  { href: 'index.html',                 label: 'Painel Principal', icon: 'layout-dashboard', match: ['index.html', ''] },
  { href: 'pages/acoes.html',           label: 'Ações',            icon: 'grid-3x3',          match: ['acoes.html'] },
  { href: 'pages/cadastros.html',       label: 'Lançamentos',      icon: 'users',             match: ['cadastros.html'] },
  { href: 'pages/demonstracoes.html',   label: 'Demonstrações',    icon: 'bar-chart-3',       match: ['demonstracoes.html'] },
];

function currentFile() {
  const path = window.location.pathname.split('/').pop();
  return path || 'index.html';
}

function resolveHref(href, depth) {
  // depth = 0 if at root, 1 if inside /pages/
  if (depth === 0) return href;
  if (href.startsWith('pages/')) return href.replace('pages/', '');
  return '../' + href;
}

function renderLayout(depth = 0) {
  const file = currentFile();
  const sidebar = document.getElementById('sidebar');
  const topbar = document.getElementById('topbar');

  const sidebarLinks = NAV.map(n => {
    const active = n.match.includes(file);
    return `
      <a href="${resolveHref(n.href, depth)}" class="nav-link relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-settle text-muted-foreground hover:bg-surface-alt hover:text-foreground ${active ? 'active' : ''}">
        <span class="nav-bar absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-accent"></span>
        <i data-lucide="${n.icon}" class="w-4 h-4"></i>
        <span>${n.label}</span>
      </a>`;
  }).join('');

  const topLinks = NAV.map(n => {
    const active = n.match.includes(file);
    return `
      <a href="${resolveHref(n.href, depth)}" class="top-link flex items-center gap-2 px-3 py-3 text-sm whitespace-nowrap transition-settle border-b-2 ${active ? 'active' : 'border-transparent text-muted-foreground'}">
        <i data-lucide="${n.icon}" class="w-4 h-4"></i>
        ${n.label}
      </a>`;
  }).join('');

  if (sidebar) sidebar.innerHTML = `
    <div class="px-6 py-7 flex items-center gap-2.5">
      <div class="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
        <i data-lucide="wallet" class="w-5 h-5 text-primary-foreground"></i>
      </div>
      <div>
        <p class="font-display font-bold text-lg leading-none">EBAN</p>
        <p class="text-xs text-muted-foreground mt-0.5">Finance suite</p>
      </div>
    </div>
    <nav class="flex-1 px-3 py-2 space-y-1">${sidebarLinks}</nav>
    <div class="px-6 py-5 border-t border-border">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-full bg-surface-alt flex items-center justify-center text-sm font-semibold">EA</div>
        <div class="min-w-0">
          <p class="text-sm font-medium truncate">Eduardo Azevedo</p>
          <p class="text-xs text-muted-foreground truncate">Conta empresarial</p>
        </div>
      </div>
    </div>`;

  if (topbar) topbar.innerHTML = `<nav class="flex overflow-x-auto px-2 scrollbar-thin">${topLinks}</nav>`;

  if (window.lucide) window.lucide.createIcons();
}

function showToast(message) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 300);
  }, 2200);
}
