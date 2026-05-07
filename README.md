# Build Atlas — Landing Page

Site institucional da Build Atlas (Grupo Exithus). Página estática, sem
backend, hospedável em qualquer serviço de arquivos estáticos.

## Stack

HTML + Tailwind (Play CDN) + JS vanilla. Sem build step.

## Estrutura

```
build-atlas/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── contact.js
│   └── form.js
└── README.md
```

## Rodando localmente

Abra `index.html` direto no navegador, ou suba um servidor estático:

```bash
python3 -m http.server 8000
# ou
npx serve .
```

## Manutenção

Os arquivos em `js/` têm comentários no topo explicando o que cada um
faz e como editar. Em geral:

- **Textos da página** → `index.html` (em PT-BR, na ordem em que aparecem).
- **Cores, animações, modos visuais** → `css/styles.css` e o bloco
  `tailwind.config` no `<head>` do `index.html`.
- **Dados de contato** (telefone, endereço, WhatsApp) → `js/contact.js`.
  Os valores ficam codificados para reduzir raspagem por bots; siga as
  instruções no cabeçalho do arquivo para trocar.
- **Formulário "Agendar consultoria"** → `js/form.js`. Não envia para
  servidor: monta uma mensagem e abre o WhatsApp do consultor em nova
  aba. O número é o mesmo configurado em `contact.js` (fonte única).

## Dependências (via CDN)

Tailwind CSS · Iconify · Google Fonts (Playfair Display, Inter,
JetBrains Mono, Space Grotesk).

## Licença

Proprietário — Grupo Exithus. Uso interno.