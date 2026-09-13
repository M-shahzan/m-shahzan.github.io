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

          // Ensure active nav link updates promptly during and after smooth scroll
          setTimeout(updateActiveNav, 100);
          setTimeout(updateActiveNav, 450);
        }
      });
    });
  }

  // Active navigation link highlighting on scroll
  function updateActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('header nav a[href^="#"], #mobile-menu nav a[href^="#"]');
    var currentId = '';
    var scrollPos = window.scrollY + 140;

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

    // If near or at the bottom of the page, ensure the last section ('contact') is activated
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    var clientHeight = window.innerHeight || document.documentElement.clientHeight;
    if ((clientHeight + Math.ceil(window.scrollY)) >= (scrollHeight - 90)) {
      currentId = 'contact';
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

  // Reading scroll progress indicator & header shadow
  function updateScrollProgress() {
    var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = height > 0 ? (winScroll / height) : 0;
    var bar = document.getElementById('scroll-progress');
    if (bar) {
      bar.style.transform = 'scaleX(' + Math.min(Math.max(scrolled, 0), 1) + ')';
    }

    var header = document.getElementById('site-header') || document.querySelector('header');
    if (header) {
      if (winScroll > 20) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
  }

  // Cursor-following spotlight glow on project and competency cards
  function initCardSpotlight() {
    var cards = document.querySelectorAll('.project-card, .timeline-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      }, { passive: true });
    });
  }

  // Smooth numerical count-up and code roll-in for metrics (repeats on scroll)
  function animateCounter(el) {
    if (el.getAttribute('data-counter-ran') === 'true') return;
    el.setAttribute('data-counter-ran', 'true');

    var rawTarget = (el.getAttribute('data-target') || el.textContent || '').trim();
    var isNumeric = !isNaN(parseFloat(rawTarget)) && isFinite(rawTarget);

    if (isNumeric) {
      var target = parseFloat(rawTarget);
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 750;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var ease = 1 - Math.pow(1 - progress, 3);
        var current = (target * ease).toFixed(decimals);
        el.textContent = prefix + current + suffix;
        if (progress < 1) {
          el._counterRafId = window.requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toFixed(decimals) + suffix;
        }
      }
      el._counterRafId = window.requestAnimationFrame(step);
    } else {
      // Alphanumeric code roll-in (e.g., SIH26171)
      var textTarget = rawTarget;
      el.textContent = '';
      var idx = 0;
      var timer = setInterval(function () {
        if (idx < textTarget.length) {
          el.textContent += textTarget.charAt(idx);
          idx++;
        } else {
          clearInterval(timer);
        }
      }, 45);
      el._codeTimerId = timer;
    }
  }

  function resetCounter(el) {
    if (el._counterRafId) {
      window.cancelAnimationFrame(el._counterRafId);
      el._counterRafId = null;
    }
    if (el._codeTimerId) {
      clearInterval(el._codeTimerId);
      el._codeTimerId = null;
    }
    el.setAttribute('data-counter-ran', 'false');

    var rawTarget = (el.getAttribute('data-target') || el.textContent || '').trim();
    var isNumeric = !isNaN(parseFloat(rawTarget)) && isFinite(rawTarget);
    if (isNumeric) {
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = prefix + (0).toFixed(decimals) + suffix;
    } else {
      el.textContent = '';
    }
  }

  function triggerCountersIn(container) {
    if (!container) return;
    var counters = container.querySelectorAll('.stat-counter');
    counters.forEach(animateCounter);
  }

  function resetCountersIn(container) {
    if (!container) return;
    var counters = container.querySelectorAll('.stat-counter');
    counters.forEach(resetCounter);
  }

  // Repeating scroll reveals for cards and stat counters (resets when scrolling out, replays on re-entry)
  function initScrollRevealItems() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var items = document.querySelectorAll('.reveal-item, .hero-metric-card, .stat-counter');

    if (prefersReducedMotion) {
      items.forEach(function (el) {
        el.classList.add('is-revealed');
        triggerCountersIn(el);
        if (el.classList.contains('stat-counter')) animateCounter(el);
      });
      return;
    }

    function revealElement(el) {
      el.classList.add('is-revealed');
      triggerCountersIn(el);
      if (el.classList.contains('stat-counter')) {
        animateCounter(el);
      }
    }

    function hideElement(el) {
      el.classList.remove('is-revealed');
      resetCountersIn(el);
      if (el.classList.contains('stat-counter')) {
        resetCounter(el);
      }
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
            if (delay > 0) {
              setTimeout(function () {
                if (entry.target.getBoundingClientRect().top < window.innerHeight) {
                  revealElement(entry.target);
                }
              }, Math.min(delay, 80));
            } else {
              revealElement(entry.target);
            }
          } else {
            // Scrolled out of view: reset state so it's ready to replay next time
            hideElement(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '40px 0px 0px 0px'
      });

      items.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      items.forEach(revealElement);
    }
  }

  // Section reveal animations using IntersectionObserver
  function initScrollAnimations() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sections = document.querySelectorAll('.fade-in-section');

    if (prefersReducedMotion) {
      sections.forEach(function (sec) {
        sec.classList.add('is-visible');
        triggerCountersIn(sec);
      });
      return;
    }

    var heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.classList.add('is-visible');
      setTimeout(function () {
        triggerCountersIn(heroSection);
      }, 400);
    }

    function checkVisibility() {
      var triggerBottom = window.innerHeight * 0.95;
      sections.forEach(function (sec) {
        if (sec.id === 'home') return;
        var boxTop = sec.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          sec.classList.add('is-visible');
          triggerCountersIn(sec);
        }
      });
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            triggerCountersIn(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '60px 0px 0px 0px'
      });

      sections.forEach(function (sec) {
        if (sec.id === 'home') return;
        observer.observe(sec);
      });
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    setTimeout(checkVisibility, 60);
  }

  // Hero typewriter animation for "Hi, my name is" only
  function initHeroTyping() {
    var greetingEl = document.getElementById('hero-greeting-text');
    if (!greetingEl) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      greetingEl.textContent = 'Hi, my name is';
      return;
    }

    var fullGreeting = 'Hi, my name is';
    greetingEl.textContent = '';

    var greetingIdx = 0;
    var greetingInterval = setInterval(function () {
      if (greetingIdx < fullGreeting.length) {
        greetingEl.textContent += fullGreeting.charAt(greetingIdx);
        greetingIdx++;
      } else {
        clearInterval(greetingInterval);
        // Caret cursor continues blinking indefinitely via CSS @keyframes caretBlink (~530ms rate)
      }
    }, 32);
  }

  function init() {
    initHeroTyping();
    initSmoothScroll();
    initMobileMenu();
    initExpandableTags();
    initCardSpotlight();
    initScrollAnimations();
    initScrollRevealItems();
    window.addEventListener('scroll', function () {
      updateActiveNav();
      updateScrollProgress();
    }, { passive: true });
    updateActiveNav();
    updateScrollProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();