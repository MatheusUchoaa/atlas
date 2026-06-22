// form.js — handler do formulário "Agendar consultoria".
//
// O que faz:
//   Quando o cliente clica em "Agendar", esse script lê os campos do
//   formulário e redireciona para a página /obrigado/ levando os dados
//   na query string. A página de obrigado monta a mensagem, abre o
//   WhatsApp automaticamente e dispara os eventos de conversão.
//   (Mesmo fluxo da landing page em /lp.)
//
// Por que separamos:
//   Mantém index.html limpo (sem JavaScript inline). Toda regra de
//   negócio do form fica neste arquivo — fácil de localizar e editar.
//   O número do WhatsApp fica só na página /obrigado/ (e em contact.js).

(function () {
  // Espera o DOM ficar pronto
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var form = document.getElementById('lead-form');
    if (!form) return; // sem form na página, nada a fazer

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // ─── 1. Lê o que o cliente preencheu ──────────────────────
      var nome     = (document.getElementById('lf-nome')?.value || '').trim();
      var email    = (document.getElementById('lf-email')?.value || '').trim();
      var whatsapp = (document.getElementById('lf-whats')?.value || '').trim();
      var objetivo = (document.getElementById('lf-objetivo')?.value || '').trim();
      var mensagem = (document.getElementById('lf-msg')?.value || '').trim();

      // ─── 2. Redireciona para a página de obrigado ─────────────
      // Envia os dados via query string. A /obrigado/ monta a mensagem,
      // abre o WhatsApp automaticamente e dispara o rastreio de conversão.
      // (Campo `zap` = WhatsApp, mesmo nome que a landing /lp usa.)
      var params = new URLSearchParams({
        nome: nome,
        email: email,
        zap: whatsapp,
        objetivo: objetivo,
        mensagem: mensagem
      });

      atualizarStatus('Redirecionando…', false);
      window.location.href = 'obrigado/?' + params.toString();
    });
  });

  // Atualiza a linha de status abaixo do botão
  function atualizarStatus(texto, isErro) {
    var status = document.getElementById('lf-status');
    if (!status) return;
    status.textContent = texto;
    status.classList.toggle('text-red-400', !!isErro);
  }
})();