/**
 * AURA LUXURY REAL ESTATE - Interactive Website Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. STICKY NAVIGATION & BACK TO TOP TOGGLE
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    // Sticky Navbar Toggle
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Button Toggle
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top click action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     2. ACCESSIBLE MOBILE DRAWER NAVIGATION TOGGLE
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    // Open/Close Mobile Menu
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains('active');
      
      navMenu.classList.toggle('active', isOpen);
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
    };

    // Hamburger Button Click
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close Menu on Nav Link Tap (preserves LINES smooth scrolling)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close Menu on Click/Tap Outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !hamburgerBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close Menu on Escape Key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu(false);
        hamburgerBtn.focus();
      }
    });
  }
  /* ==========================================================================
     3. HERO BACKGROUND SLIDESHOW
     ========================================================================== */
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000);
  }

  /* ==========================================================================
     4. PROPERTY CATEGORY FILTER LOGIC
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      propertyCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. CONTACT FORM VALIDATION & FEEDBACK
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm && formAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      // Basic Validation Check
      if (!fullName || !email || !message) {
        formAlert.className = 'form-alert error';
        formAlert.textContent = 'Please fill out all required fields before submitting.';
        formAlert.classList.remove('hidden');
        return;
      }

      // Success State Simulation
      formAlert.className = 'form-alert success';
      formAlert.textContent = `Thank you, ${fullName}! Your inquiry has been received. Our team will contact you shortly.`;
      formAlert.classList.remove('hidden');

      // Reset Form
      contactForm.reset();

      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        formAlert.classList.add('hidden');
      }, 5000);
    });
  }

  /* ==========================================================================
     6. EDITORIAL TESTIMONIAL AUTO-SLIDER
     ========================================================================== */
  const track = document.getElementById('testimonialTrack');
  const radioInputs = document.querySelectorAll('input[name="testimonial-radio"]');
  const sliderContainer = document.querySelector('.luxury-slider-container');

  if (track && radioInputs.length > 0) {
    let currentIndex = 0;
    const totalSlides = radioInputs.length;
    const slideDuration = 5000;
    let autoPlayTimer = null;

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      radioInputs[index].checked = true;
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
      }, slideDuration);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    radioInputs.forEach((radio, index) => {
      radio.addEventListener('change', () => {
        goToSlide(index);
        startAutoPlay();
      });
    });

    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoPlay);
      sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
  }

  /* ==========================================================================
     7. SCROLLSPY (ACTIVE NAVIGATION HIGHLIGHTING)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], footer[id]');

  if (sections.length > 0 && navLinks.length > 0) {
    const navObserverOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));
  }

  /* ==========================================================================
     8. LUXURY SCROLL ANIMATION SYSTEM
     ========================================================================== */
  
  // Dynamic class assignment to ensure seamless animation without manually altering HTML tags
  const applyAnimationClasses = () => {
    // Section Headers
    document.querySelectorAll('.section-header, .trust-title').forEach(el => {
      el.classList.add('reveal-on-scroll');
    });

    // About/Agent Section Directional Reveals
    const aboutImg = document.querySelector('.about-image-col');
    const aboutContent = document.querySelector('.about-content-col');
    if (aboutImg) aboutImg.classList.add('reveal-left');
    if (aboutContent) aboutContent.classList.add('reveal-right');

    // Contact Section Directional Reveals
    const contactInfo = document.querySelector('.contact-info-col');
    const contactFormCol = document.querySelector('.contact-form-col');
    if (contactInfo) contactInfo.classList.add('reveal-left');
    if (contactFormCol) contactFormCol.classList.add('reveal-right');

    // Footer Reveal
    const footer = document.querySelector('.site-footer');
    if (footer) footer.classList.add('reveal-on-scroll');

    // Staggered Cards & Items
    const staggerTargets = [
      '.property-card',
      '.service-card',
      '.luxury-slide',
      '.trust-logo-card'
    ];

    staggerTargets.forEach(selector => {
      document.querySelectorAll(selector).forEach(item => {
        item.classList.add('reveal-on-scroll', 'stagger-item');
      });
    });
  };

  applyAnimationClasses();

  // Reveal Observer Engine
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Unobserve to maximize performance
      }
    });
  }, revealObserverOptions);

  const elementsToReveal = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
  elementsToReveal.forEach(element => revealObserver.observe(element));

});

  /* ==========================================================================
     9. LINS SMOOTH SCROLLING INTEGRATION
     ========================================================================== */
     document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize a new Lenis instance (Removed deprecated options)
    const lenis = new Lenis({
        duration: 1.2,       
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        orientation: 'vertical',        // Updated from direction
        gestureOrientation: 'vertical', // Updated from gestureDirection
        touchMultiplier: 2,
    });

    // 2. Create the animation frame loop
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    // 3. Start the loop
    requestAnimationFrame(raf);

    // 4. CRITICAL FIX: Recalculate page height on load and layout changes.
    // This stops the native scrollbar from fighting Lenis across different pages.
    const resizeObserver = new ResizeObserver(() => {
        lenis.resize();
    });
    resizeObserver.observe(document.body);

    window.addEventListener('load', () => {
        lenis.resize();
    });
});

/* ==========================================================================
  10 CENTERED PEEK-THROUGH GALLERY CAROUSEL
   ========================================================================== */
// Add a parameter to check if the call is coming from initial page load
function updateGallery(index, animate = true, isInitialLoad = false) {
    currentIndex = index;

    const activeSlide = allSlides[currentIndex];
    const slideWidth = activeSlide.offsetWidth;
    const viewportWidth = viewport.offsetWidth;

    // Calculate offset to place active slide dead-center
    const centerPosition = (viewportWidth / 2) - (slideWidth / 2);
    const translateX = centerPosition - (currentIndex * (slideWidth + gap));

    // Toggle CSS transition for smooth movement vs instant silent jump
    if (animate) {
        track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
        track.style.transition = 'none';
    }

    track.style.transform = `translateX(${translateX}px)`;

    // Determine mapped index for UI controls (0 to totalRealSlides - 1)
    let realIndex = currentIndex - 1;
    if (currentIndex === 0) realIndex = totalRealSlides - 1;
    if (currentIndex === allSlides.length - 1) realIndex = 0;

    // Update visual active states
    allSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
    });

    // Update Counter
    if (counter) {
        counter.textContent = `${realIndex + 1} / ${totalRealSlides}`;
    }

    // Update Thumbnails
    thumbnails.forEach((thumb, i) => {
        if (i === realIndex) {
            thumb.classList.add('active');
            // FIX: Only scroll thumbnail strip into view if it's NOT the initial page load!
            if (!isInitialLoad) {
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        } else {
            thumb.classList.remove('active');
        }
    });
}
