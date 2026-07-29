AOS.init({ duration: 700, once: true });
lucide.createIcons();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 60) {
    navbar.classList.add('bg-navy/85', 'backdrop-blur-xl', 'border-b', 'border-navy-border/50');
    navbar.classList.remove('bg-transparent');
  } else {
    navbar.classList.remove('bg-navy/85', 'backdrop-blur-xl', 'border-b', 'border-navy-border/50');
    navbar.classList.add('bg-transparent');
  }
});

document.querySelectorAll('#mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobile-menu').classList.add('hidden'));
});

new Swiper('.depoimentos-swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: { el: '.swiper-pagination', clickable: true },
  autoplay: { delay: 4000, disableOnInteraction: false },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});
