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
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains('active');
      navMenu.classList.toggle('active', isOpen);
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
    };

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !hamburgerBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });

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

      if (!fullName || !email || !message) {
        formAlert.className = 'form-alert error';
        formAlert.textContent = 'Please fill out all required fields before submitting.';
        formAlert.classList.remove('hidden');
        return;
      }

      formAlert.className = 'form-alert success';
      formAlert.textContent = `Thank you, ${fullName}! Your inquiry has been received. Our team will contact you shortly.`;
      formAlert.classList.remove('hidden');

      contactForm.reset();

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
  const applyAnimationClasses = () => {
    document.querySelectorAll('.section-header, .trust-title').forEach(el => {
      el.classList.add('reveal-on-scroll');
    });

    const aboutImg = document.querySelector('.about-image-col');
    const aboutContent = document.querySelector('.about-content-col');
    if (aboutImg) aboutImg.classList.add('reveal-left');
    if (aboutContent) aboutContent.classList.add('reveal-right');

    const contactInfo = document.querySelector('.contact-info-col');
    const contactFormCol = document.querySelector('.contact-form-col');
    if (contactInfo) contactInfo.classList.add('reveal-left');
    if (contactFormCol) contactFormCol.classList.add('reveal-right');

    const footer = document.querySelector('.site-footer');
    if (footer) footer.classList.add('reveal-on-scroll');

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

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  const elementsToReveal = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
  elementsToReveal.forEach(element => revealObserver.observe(element));

});

/* ==========================================================================
   9. LENIS SMOOTH SCROLLING INTEGRATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,       
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            orientation: 'vertical',        
            gestureOrientation: 'vertical', 
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        const resizeObserver = new ResizeObserver(() => {
            lenis.resize();
        });
        resizeObserver.observe(document.body);

        window.addEventListener('load', () => {
            lenis.resize();
        });
    }
});

/* ==========================================================================
   10. CENTERED PEEK-THROUGH GALLERY CAROUSEL
   ========================================================================== */
window.addEventListener('load', () => {
    const track = document.getElementById('galleryTrack');
    const originalSlides = Array.from(document.querySelectorAll('.gallery-slide'));
    const viewport = document.getElementById('galleryViewport');
    const prevBtn = document.getElementById('galleryPrevBtn');
    const nextBtn = document.getElementById('galleryNextBtn');
    const counter = document.getElementById('galleryCounter');
    const thumbnails = document.querySelectorAll('.thumb-card');

    if (!track || originalSlides.length === 0 || !viewport) return;

    // Create Clones for Infinite Loop
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

    firstClone.classList.add('clone');
    lastClone.classList.add('clone');

    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalSlides[0]);

    const allSlides = Array.from(track.children);
    const totalRealSlides = originalSlides.length;
    const gap = 24; 

    let currentIndex = 1;
    let isTransitioning = false;

    function updateGallery(index, animate = true, isInitialLoad = false) {
        currentIndex = index;

        const activeSlide = allSlides[currentIndex];
        const slideWidth = activeSlide.offsetWidth;
        const viewportWidth = viewport.offsetWidth;

        const centerPosition = (viewportWidth / 2) - (slideWidth / 2);
        const translateX = centerPosition - (currentIndex * (slideWidth + gap));

        if (animate) {
            track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
        } else {
            track.style.transition = 'none';
        }

        track.style.transform = `translateX(${translateX}px)`;

        let realIndex = currentIndex - 1;
        if (currentIndex === 0) realIndex = totalRealSlides - 1;
        if (currentIndex === allSlides.length - 1) realIndex = 0;

        allSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });

        if (counter) {
            counter.textContent = `${realIndex + 1} / ${totalRealSlides}`;
        }

        thumbnails.forEach((thumb, i) => {
            if (i === realIndex) {
                thumb.classList.add('active');
                if (!isInitialLoad) {
                    const container = thumb.parentElement;
                    if (container) {
                        const scrollTarget = thumb.offsetLeft - (container.offsetWidth / 2) + (thumb.offsetWidth / 2);
                        container.scrollTo({
                            left: scrollTarget,
                            behavior: 'smooth'
                        });
                    }
                }
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex === 0) {
            updateGallery(totalRealSlides, false, false);
        } else if (currentIndex === allSlides.length - 1) {
            updateGallery(1, false, false);
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            updateGallery(currentIndex - 1, true, false);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            updateGallery(currentIndex + 1, true, false);
        });
    }

    thumbnails.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            if (isTransitioning) return;
            const realIndex = parseInt(thumb.getAttribute('data-index'), 10);
            isTransitioning = true;
            updateGallery(realIndex + 1, true, false);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;
        if (e.key === 'ArrowLeft') {
            isTransitioning = true;
            updateGallery(currentIndex - 1, true, false);
        }
        if (e.key === 'ArrowRight') {
            isTransitioning = true;
            updateGallery(currentIndex + 1, true, false);
        }
    });

    window.addEventListener('resize', () => updateGallery(currentIndex, false, false));

    // Initialize gallery post image layout load
    updateGallery(1, false, true);
});
