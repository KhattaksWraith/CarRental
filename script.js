// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navLogo = document.getElementById('nav-logo-img');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    // Switch to light-theme logo (dark text) on white navbar
    navLogo.src = 'Media/Car rent logo light theme.webp';
  } else {
    navbar.classList.remove('scrolled');
    // Dark theme logo (white text) on transparent nav over hero
    navLogo.src = 'Media/Car rent logo Dark theme.webp';
  }
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');

  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ===== VEHICLES CAROUSEL =====
const vehiclesTrack = document.getElementById('vehiclesTrack');
const vehiclePrev = document.getElementById('vehiclePrev');
const vehicleNext = document.getElementById('vehicleNext');
const carouselDotsContainer = document.getElementById('carouselDots');

if (vehiclesTrack && vehiclePrev && vehicleNext && carouselDotsContainer) {
  const cards = vehiclesTrack.querySelectorAll('.vehicle-card');
  let currentIndex = 0;

  function getCardsPerView() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
  }

  function getTotalPages() {
    const cardsPerView = getCardsPerView();
    return Math.ceil(cards.length / cardsPerView);
  }

  function updateCarousel() {
    const cardsPerView = getCardsPerView();
    const totalPages = getTotalPages();

    // Clamp currentIndex
    if (currentIndex >= totalPages) currentIndex = totalPages - 1;
    if (currentIndex < 0) currentIndex = 0;

    // Calculate the width of one card + gap
    const carousel = document.getElementById('vehiclesCarousel');
    const carouselWidth = carousel.offsetWidth;
    const gap = 28;
    const cardWidth = (carouselWidth - (gap * (cardsPerView - 1))) / cardsPerView;
    const offset = currentIndex * (cardWidth + gap) * cardsPerView;

    vehiclesTrack.style.transform = `translateX(-${offset}px)`;

    // Update arrow states
    vehiclePrev.disabled = currentIndex === 0;
    vehicleNext.disabled = currentIndex >= totalPages - 1;

    // Update dots
    updateDots();
  }

  function createDots() {
    carouselDotsContainer.innerHTML = '';
    const totalPages = getTotalPages();
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to page ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      carouselDotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = carouselDotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  vehiclePrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  vehicleNext.addEventListener('click', () => {
    const totalPages = getTotalPages();
    if (currentIndex < totalPages - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Initialize
  createDots();
  updateCarousel();

  // Recalculate on resize (combined with reviews below)
}

// ===== REVIEWS CAROUSEL =====
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewPrev = document.getElementById('reviewPrev');
const reviewNext = document.getElementById('reviewNext');
const reviewDotsContainer = document.getElementById('reviewDots');

if (reviewsTrack && reviewPrev && reviewNext && reviewDotsContainer) {
  const reviewCards = reviewsTrack.querySelectorAll('.review-card');
  let reviewIndex = 0;

  function getReviewsPerView() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
  }

  function getReviewPages() {
    return Math.ceil(reviewCards.length / getReviewsPerView());
  }

  function updateReviewCarousel() {
    const perView = getReviewsPerView();
    const totalPages = getReviewPages();

    if (reviewIndex >= totalPages) reviewIndex = totalPages - 1;
    if (reviewIndex < 0) reviewIndex = 0;

    const carousel = document.getElementById('reviewsCarousel');
    const carouselWidth = carousel.offsetWidth;
    const gap = 28;
    const cardWidth = (carouselWidth - (gap * (perView - 1))) / perView;
    const offset = reviewIndex * (cardWidth + gap) * perView;

    reviewsTrack.style.transform = `translateX(-${offset}px)`;

    reviewPrev.disabled = reviewIndex === 0;
    reviewNext.disabled = reviewIndex >= totalPages - 1;

    updateReviewDots();
  }

  function createReviewDots() {
    reviewDotsContainer.innerHTML = '';
    const totalPages = getReviewPages();
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to review page ${i + 1}`);
      dot.addEventListener('click', () => {
        reviewIndex = i;
        updateReviewCarousel();
      });
      reviewDotsContainer.appendChild(dot);
    }
  }

  function updateReviewDots() {
    const dots = reviewDotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === reviewIndex);
    });
  }

  reviewPrev.addEventListener('click', () => {
    if (reviewIndex > 0) {
      reviewIndex--;
      updateReviewCarousel();
    }
  });

  reviewNext.addEventListener('click', () => {
    if (reviewIndex < getReviewPages() - 1) {
      reviewIndex++;
      updateReviewCarousel();
    }
  });

  createReviewDots();
  updateReviewCarousel();
}

// Combined resize handler for both carousels
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Vehicles carousel
    if (typeof createDots === 'function') {
      try { createDots(); updateCarousel(); } catch (e) { }
    }
    // Reviews carousel
    if (typeof createReviewDots === 'function') {
      try { createReviewDots(); updateReviewCarousel(); } catch (e) { }
    }
  }, 200);
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== FORM SUBMIT FEEDBACK =====
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent!';
    btn.style.background = '#27ae60';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 3000);
  });
}
