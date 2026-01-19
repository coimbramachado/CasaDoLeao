// Garante que a página comece no topo
window.onload = function () {
  window.scrollTo(0, 0);
};

// ============================
// Seletores
// ============================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('main section');
const dropdowns = document.querySelectorAll('nav ul li.dropdown');

// ============================
// Funções utilitárias
// ============================
function closeAllDropdowns() {
  dropdowns.forEach(drop => drop.classList.remove('active'));
}

function closeMenu() {
  if (menuToggle) menuToggle.classList.remove('active');
  if (nav) nav.classList.remove('active');
  closeAllDropdowns();
}

// ============================
// Abrir / fechar menu (botão X)
// ============================
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('active');

    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');

    // Se estiver fechando o menu, fecha os submenus
    if (isOpen) {
      closeAllDropdowns();
    }
  });
}

// ============================
// Fechar menu ao clicar em links
// ============================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const parentDropdown = link.closest('.dropdown');

    // Se for o link "Ministérios" no mobile → só abre/fecha dropdown
    if (parentDropdown && window.innerWidth <= 768) {
      return;
    }

    // Outros links → fecha tudo
    closeMenu();
  });
});

// ============================
// Dropdowns (Ministérios)
// ============================
dropdowns.forEach(drop => {
  const link = drop.querySelector('a');

  link.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation();

      dropdowns.forEach(d => {
        if (d !== drop) d.classList.remove('active');
      });

      drop.classList.toggle('active');
    }
  });
});

// ============================
// Fecha dropdown ao clicar fora (mobile)
// ============================
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    const isClickInsideDropdown = e.target.closest('.dropdown');

    if (!isClickInsideDropdown) {
      closeAllDropdowns();
    }
  }
});

// ============================
// Destacar link ativo ao rolar
// ============================
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

// ============================
// Formulário de contato
// ============================
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          successMessage.style.display = "block";
          form.reset();

          setTimeout(() => {
            successMessage.style.display = "none";
          }, 2000);
        } else {
          alert("Erro ao enviar. Tente novamente.");
        }
      });
  });
}
