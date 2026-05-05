// main.js — animações de entrada (reveal), nav e máscaras de input.
// Dispara no DOMContentLoaded; sem dependências externas.

document.addEventListener('DOMContentLoaded', () => {
  // Anima a barra de navegação ao carregar
  setTimeout(() => {
    document.querySelector('.nav-load')?.classList.add('loaded');
  }, 100);

  // Revela o título do hero com pequeno atraso
  setTimeout(() => {
    document.getElementById('hero-title')?.classList.add('reveal-active');
  }, 500);

  // Observer que adiciona a classe `active` quando o elemento entra
  // no viewport — usado pelas animações `.reveal` no CSS.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.add('reveal-active');
        }
      });
    },
    { threshold: 0.1 }
  );

  // Aplica em todos os elementos marcados e nos títulos h1/h2
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  document.querySelectorAll('h1, h2').forEach((el) => observer.observe(el));

  // ── Máscara do campo WhatsApp: (XX) XXXXX-XXXX ──────────────────
  // Limita a 11 dígitos e formata automaticamente enquanto o usuário digita.
  const whatsInput = document.getElementById('lf-whats');
  if (whatsInput) {
    whatsInput.addEventListener('input', (e) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
      let masked = '';
      if (digits.length === 0) {
        masked = '';
      } else if (digits.length <= 2) {
        masked = '(' + digits;
      } else if (digits.length <= 7) {
        masked = '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
      } else {
        masked = '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
      }
      e.target.value = masked;
    });

    // Bloqueia qualquer tecla não numérica (exceto navegação e edição)
    whatsInput.addEventListener('keydown', (e) => {
      const allowed = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
                       'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
      if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });
  }
});
