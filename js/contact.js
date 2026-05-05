// contact.js — obfuscação anti-bot dos dados de contato.
//
// Por que existe:
//   Bots de spam raspam o HTML cru atrás de telefones e endereços.
//   Aqui os dados ficam codificados em base64 no source e só são
//   decodificados em runtime pelo navegador. Bots simples (curl + regex)
//   não conseguem ler. Bots avançados (com Chromium headless) ainda
//   conseguem — não existe defesa absoluta.
//
// Como editar seus dados:
//   1. Pegue a string nova (ex: "(92) 99137-6960")
//   2. Codifique em base64. Em qualquer terminal:
//        echo -n "seu texto" | base64
//      Ou em https://www.base64encode.org
//   3. Cole no objeto DATA abaixo no campo correspondente.
//
// Como o HTML usa:
//   <span data-c="phone">carregando…</span>     → telefone visível
//   <span data-c="addr">carregando…</span>      → endereço completo
//   <span data-c="addr-short">carregando…</span> → cidade resumida
//   <a href="#" data-c="wa">…</a>               → link WhatsApp (href é montado)
//
// Múltiplos elementos com o mesmo data-c são todos preenchidos.

(function () {
  // ─── EDITE AQUI se mudar telefone/endereço ──────────────────────
  // Valores em texto puro:
  //   phone     : "(92) 99137-6960"
  //   phone_intl: "5592991376960"  (formato wa.me, só dígitos com 55)
  //   address   : "Av. Urucará, 828 · Ed. Maran · Cachoeirinha · Manaus, AM"
  //   address_short: "Manaus · AM"
  var DATA = {
    phone:        'KDkyKSA5OTEzNy02OTYw',
    phone_intl:   'NTU5Mjk5MTM3Njk2MA==',
    address:      'QXYuIFVydWNhcsOhLCA4MjggwrcgRWQuIE1hcmFuIMK3IENhY2hvZWlyaW5oYSDCtyBNYW5hdXMsIEFN',
    address_short:'TWFuYXVzIMK3IEFN'
  };
  // ────────────────────────────────────────────────────────────────

  // Decodifica base64 + UTF-8 (preserva acentos e símbolos como ·)
  function decode(s) {
    try { return decodeURIComponent(escape(atob(s))); }
    catch (e) { return atob(s); }
  }

  // Preenche os elementos do DOM
  function fill() {
    var phone        = decode(DATA.phone);
    var phoneIntl    = decode(DATA.phone_intl);
    var address      = decode(DATA.address);
    var addressShort = decode(DATA.address_short);

    document.querySelectorAll('[data-c="phone"]').forEach(function (el) {
      el.textContent = phone;
    });
    document.querySelectorAll('[data-c="addr"]').forEach(function (el) {
      el.textContent = address;
    });
    document.querySelectorAll('[data-c="addr-short"]').forEach(function (el) {
      el.textContent = addressShort;
    });
    document.querySelectorAll('[data-c="wa"]').forEach(function (el) {
      el.setAttribute('href', 'https://wa.me/' + phoneIntl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  // Roda após o DOM carregar (ou imediatamente se já carregou)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fill);
  } else {
    fill();
  }
})();
