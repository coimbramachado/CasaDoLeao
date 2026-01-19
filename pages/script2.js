const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const dropdown = document.querySelector('.dropdown');

// Se o dropdown existir, pega o link
const ministerioLink = dropdown ? dropdown.querySelector('a') : null;

// ============================
// Função para fechar submenu
// ============================
function closeDropdown() {
  if (dropdown) dropdown.classList.remove('active');
}

// ============================
// Abrir/fechar menu hamburger
// ============================
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('active');

    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');

    // Se estiver fechando o menu, fecha o submenu
    if (isOpen) {
      closeDropdown();
    }
  });
}

// ============================
// Clique em "Ministérios" no mobile
// ============================
if (ministerioLink) {
  ministerioLink.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // NÃO navega
      e.stopPropagation(); // evita conflito com outros eventos

      dropdown.classList.toggle('active'); // Abre/fecha submenu
    }
  });
}

// ============================
// Fecha dropdown ao clicar fora (mobile)
// ============================
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    const isClickInsideDropdown = e.target.closest('.dropdown');

    if (!isClickInsideDropdown) {
      closeDropdown();
    }
  }
});
