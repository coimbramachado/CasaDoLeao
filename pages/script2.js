
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const dropdown = document.querySelector('.dropdown');
  const ministerioLink = dropdown.querySelector('a');

  // Abrir/fechar menu hamburger
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Clique em "Ministérios" no mobile
  ministerioLink.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // NÃO navega
      dropdown.classList.toggle('active'); // Abre submenu
    }
  });

