(function () {
  'use strict';

  // Mobile menu toggle
  var isMobileMenuOpen = false;
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileMenuIcon = document.getElementById('mobile-menu-icon');

  function openMobileMenu() {
    if (!mobileMenu) return;
    isMobileMenuOpen = true;
    mobileMenu.classList.remove('hidden-menu');
    mobileMenu.classList.add('open-menu');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
    if (mobileMenuIcon) {
      mobileMenuIcon.textContent = 'close';
    }
  }

  function closeMobileMenu() {
    if (!mobileMenu || !isMobileMenuOpen) return;
    isMobileMenuOpen = false;
    mobileMenu.classList.remove('open-menu');
    mobileMenu.classList.add('hidden-menu');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
    if (mobileMenuIcon) {
      mobileMenuIcon.textContent = 'menu';
    }
  }

  function toggleMobileMenu() {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function initMobileMenu() {
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMobileMenu();
      });
    }

    // Dismiss on click outside
    document.addEventListener('click', function (e) {
      if (isMobileMenuOpen && mobileMenu && !mobileMenu.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Dismiss on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
        if (mobileMenuBtn) mobileMenuBtn.focus();
      }
    });
  }

  // Smooth scroll for internal links
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerOffset = 68;
          var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          closeMobileMenu();
        }
      });
    });
  }

  // Active navigation link highlighting on scroll
  function updateActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('header nav a[href^="#"], #mobile-menu nav a[href^="#"]');
    var currentId = '';
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (sec) {
      var top = sec.offsetTop;
      var height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (window.scrollY < 80) {
      currentId = 'home';
    }

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Expandable "+N more" tags controller
  function initExpandableTags() {
    var expandBtns = document.querySelectorAll('.tag-expand-btn');
    expandBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.project-card');
        if (!card) return;
        var hiddenTags = card.querySelectorAll('.tag-hidden');
        var isExpanded = btn.getAttribute('data-expanded') === 'true';

        if (isExpanded) {
          hiddenTags.forEach(function (t) { t.classList.add('hidden'); });
          btn.setAttribute('data-expanded', 'false');
          btn.textContent = btn.getAttribute('data-label-more') || '+ more';
        } else {
          hiddenTags.forEach(function (t) { t.classList.remove('hidden'); });
          btn.setAttribute('data-expanded', 'true');
          btn.textContent = 'show less';
        }
      });
    });
  }

  // Scroll reveal animations using IntersectionObserver
  function initScrollAnimations() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sections = document.querySelectorAll('.fade-in-section');

    if (prefersReducedMotion) {
      sections.forEach(function (sec) { sec.classList.add('is-visible'); });
      return;
    }

    var heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.classList.add('is-visible');
    }

    function checkVisibility() {
      var triggerBottom = window.innerHeight * 0.88;
      sections.forEach(function (sec) {
        if (sec.id === 'home') return;
        var boxTop = sec.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          sec.classList.add('is-visible');
        }
      });
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      });

      sections.forEach(function (sec) {
        if (sec.id === 'home') return;
        observer.observe(sec);
      });
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    setTimeout(checkVisibility, 150);
  }

  function init() {
    initSmoothScroll();
    initMobileMenu();
    initExpandableTags();
    initScrollAnimations();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();