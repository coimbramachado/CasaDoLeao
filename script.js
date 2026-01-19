// Garante que a página comece no topo
window.onload = function () {
  window.scrollTo(0, 0);
};

// Menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('main section');

// Abrir/fechar menu no mobile
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Fechar menu ao clicar em links (exceto dropdown no mobile)
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const parentLi = link.closest('.dropdown');

    // Se for "Ministérios" no mobile → NÃO fecha
    if (parentLi && window.innerWidth <= 768) {
      return;
    }

    // Outros links → fecha menu
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Destaca link ativo ao rolar a página
window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollPos >= top && scrollPos < top + height) {
      const id = section.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Dropdowns (Ministérios)
const dropdowns = document.querySelectorAll('nav ul li.dropdown > a');

dropdowns.forEach(drop => {
  drop.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // impede navegação
      const parent = this.parentElement;
      parent.classList.toggle('active'); // abre submenu
    }
  });
});
