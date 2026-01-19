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
const dropdowns = document.querySelectorAll('nav ul li.dropdown');

dropdowns.forEach(drop => {
  const link = drop.querySelector('a');

link.addEventListener('click', function (e) {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    dropdowns.forEach(d => {
      if (d !== drop) d.classList.remove('active');
      d.querySelector('.submenu').classList.remove('open');
    });
    drop.classList.toggle('active');
    drop.querySelector('.submenu').classList.toggle('open');
  }
});
});



  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", function(event) {
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

        // faz a mensagem sumir após 5 segundos
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 2000);

      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    });
  });

