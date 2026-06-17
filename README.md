# EBAN — Versão estática

Versão em HTML + CSS + Tailwind (via CDN) + JavaScript puro, sem build.

## Estrutura

```
static-site/
├── index.html              # Painel Principal (Dashboard)
├── css/
│   └── styles.css          # Design tokens e utilitários
├── js/
│   ├── layout.js           # Sidebar + top bar mobile
│   ├── finance-data.js     # Dados financeiros + invariante de saldo
│   ├── dashboard.js        # Lógica e gráfico do painel
│   ├── cadastros.js        # Tabs e listagem de lançamentos
│   └── demonstracoes.js    # Gráfico das demonstrações
├── pages/
│   ├── acoes.html
│   ├── cadastros.html
│   └── demonstracoes.html
└── images/
    └── favicon.svg
```

## Como abrir

Basta dar duplo clique em `index.html` — abre direto no navegador.

Para celulares, sirva a pasta com qualquer servidor estático:

```bash
# Python 3
cd static-site && python3 -m http.server 8080

# ou Node
npx serve static-site
```

Depois acesse `http://SEU_IP_LOCAL:8080` pelo celular na mesma rede Wi-Fi.

## Bibliotecas (via CDN)

- Tailwind CSS (Play CDN)
- Lucide Icons
- Chart.js
- Google Fonts: Inter + Manrope
