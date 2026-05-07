// form.js — handler do formulário "Agendar consultoria".
//
// O que faz:
//   Quando o cliente clica em "Agendar", esse script lê os campos do
//   formulário, monta uma mensagem formatada e abre o WhatsApp do
//   consultor (configurado em contact.js) numa NOVA ABA com o texto
//   já pronto. O cliente só revisa e envia.
//
// Por que separamos:
//   Mantém index.html limpo (sem JavaScript inline). Toda regra de
//   negócio do form fica neste arquivo — fácil de localizar e editar.
//
// Dependência:
//   Lê o número do WhatsApp do mesmo lugar que o link [data-c="wa"]
//   do site usa (definido em contact.js). Assim, se você trocar o
//   número, edita só em um lugar — contact.js — e tudo se atualiza.

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

      // ─── 2. Monta a mensagem formatada para o WhatsApp ────────
      // Asteriscos em volta = negrito no WhatsApp.
      var linhas = [
        'Olá! Vim pelo site da Build Atlas.',
        '',
        '*Nome:* ' + nome,
        '*E-mail:* ' + email,
        '*WhatsApp:* ' + whatsapp,
        '*Objetivo:* ' + objetivo
      ];
      if (mensagem) {
        linhas.push('*Mensagem:* ' + mensagem);
      }
      var texto = linhas.join('\n');

      // ─── 3. Pega o número do WhatsApp do consultor ────────────
      // Reaproveita o link [data-c="wa"] que contact.js já preencheu
      // no carregamento da página. Assim, número fica em um só lugar.
      var waLink = document.querySelector('[data-c="wa"]');
      var href = waLink ? waLink.getAttribute('href') : '';
      var match = href.match(/wa\.me\/(\d+)/);

      if (!match) {
        // Caso contact.js não tenha rodado ainda (improvável, mas defensivo)
        atualizarStatus('Aguarde um instante e tente de novo.', true);
        return;
      }
      var numeroConsultor = match[1];

      // ─── 4. Constrói a URL final e abre em nova aba ───────────
      var url = 'https://wa.me/' + numeroConsultor +
                '?text=' + encodeURIComponent(texto);

      atualizarStatus('Abrindo WhatsApp…', false);
      window.open(url, '_blank', 'noopener');
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