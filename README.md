# Build Atlas — Landing Page

Landing page institucional da Build Atlas (Grupo Exithus).

## Estrutura

```
build-atlas/
├── index.html          ← markup principal
├── css/
│   └── styles.css      ← estilos customizados (modos, animações, glow)
├── js/
│   ├── main.js         ← animações de entrada (reveal, nav-load)
│   └── contact.js      ← obfuscação dos dados de contato
└── README.md
```

## Como rodar

Abra `index.html` no navegador. Funciona standalone — só precisa de
internet (CDNs do Tailwind, React e Iconify).

Para rodar com servidor local (recomendado para evitar bloqueios CORS
em alguns navegadores):

```bash
# Python 3
python3 -m http.server 8000

# ou Node
npx serve .
```

E acesse `http://localhost:8000`.

## Editar conteúdo de contato

Os dados de telefone e endereço estão **codificados em base64** no
arquivo `js/contact.js` para reduzir spam de bots.

Para alterar, abra `js/contact.js` e siga as instruções no comentário
do início do arquivo. Em resumo:

```bash
echo -n "(92) 99123-0239" | base64
# → KDkyKSA5OTEyMy0wMjM5
```

Cole o resultado no campo correspondente do objeto `DATA`.

## Editar textos da página

Tudo está em `index.html` em português, na ordem em que aparece na
tela. Procure pela seção (ex: "FAQ", "MÉTODO", "CONSORCIOS") via
comentários HTML.

## Editar paleta / estilos

`css/styles.css` controla todas as customizações além do Tailwind:
- variáveis `:root` (cores principais)
- modos (`mood-noir`, `mood-daylight`, `mood-blueprint`)
- animações (`reveal`, `marquee`, `shimmer`, `flashlight`)

As cores `ink-*` e `gold-*` do Tailwind estão definidas inline no
`<head>` do `index.html`, dentro da config do `tailwind`.

## Dependências (CDN)

- Tailwind CSS (Play CDN)
- React 18.3.1 + ReactDOM (não usado por enquanto, herdado do design)
- Iconify (ícones SVG)
- Google Fonts: Playfair Display, Inter, JetBrains Mono, Space Grotesk
