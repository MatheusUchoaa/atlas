// main.js — animações de entrada (reveal) e nav.
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
});
