(function () {


  // Elementos
  const backToTop = document.getElementById('voltar-ao-topo');
  const nav = document.getElementById('site-navigation');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.site-nav a');

  // Mostrar/ocultar botão voltar ao topo
  function checkScroll() {
    const showAfter = 300; // px
    if (window.scrollY > showAfter) {
      backToTop.classList.add('visible');
      backToTop.setAttribute('aria-hidden', 'false');
    } else {
      backToTop.classList.remove('visible');
      backToTop.setAttribute('aria-hidden', 'true');
    }
  }

  checkScroll();
  window.addEventListener('scroll', checkScroll, { passive: true });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  backToTop.addEventListener('click', function (e) {
    e.preventDefault();
    if (reduceMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const main = document.getElementById('main-content');
    if (main) {
      main.focus({ preventScroll: true });
    }
  });


  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (reduceMotion) {
        target.focus({ preventScroll: true });
        target.scrollIntoView();
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
          target.focus({ preventScroll: true });
        }, 450);
      }

      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });


  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }


  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    }
  });

  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

})();
