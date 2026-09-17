/**
 * MOHAMMED SHAHZAN ARMAR — CONTINUOUS SCENE ENGINE & INTERACTIVE EXPERIENCE
 * Natural Fluid Scrolling + Intelligent Scene Snapping + Visual Scene Depth + Ambient Computational Field
 */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. SCENE DEFINITIONS & ATMOSPHERIC HUES
     ========================================================================== */
  var scenes = [
    '#home',         // 0: HOME
    '#about',        // 1: ABOUT
    '#retinaxai',    // 2: WORK / RetinaXAI (Case Study 01)
    '#sightlite',    // 3: WORK / SightLite (Case Study 02)
    '#archive',      // 4: ARCHIVE
    '#experiments',  // 5: EXPERIMENTS
    '#exit'          // 6: CONTACT
  ];

  var currentSceneIndex = 0;
  var retinaStage = 1; // 1 to 4
  var sightStage = 1;  // 1 to 4

  var sceneThemes = [
    { bg: '#10131A', light: 'radial-gradient(circle at 35% 25%, rgba(139, 92, 246, 0.08) 0%, rgba(79, 124, 255, 0.04) 45%, transparent 70%)' },
    { bg: '#151923', light: 'radial-gradient(circle at 65% 40%, rgba(79, 124, 255, 0.07) 0%, rgba(139, 92, 246, 0.03) 45%, transparent 70%)' },
    { bg: '#10131A', light: 'radial-gradient(circle at 40% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 65%)' },
    { bg: '#151923', light: 'radial-gradient(circle at 60% 40%, rgba(79, 124, 255, 0.07) 0%, transparent 65%)' },
    { bg: '#10131A', light: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)' },
    { bg: '#151923', light: 'radial-gradient(circle at 55% 45%, rgba(79, 124, 255, 0.07) 0%, transparent 65%)' },
    { bg: '#10131A', light: 'radial-gradient(circle at 50% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)' }
  ];

  /* ==========================================================================
     2. CONTINUOUS SCROLL-DRIVEN ARROW -> PILL HEADER MORPH
     ========================================================================== */
  var pillContainer = document.getElementById('scroll-pill-morph');
  var pillArrow = document.getElementById('pill-arrow-mode');
  var pillArrowSvg = document.getElementById('pill-arrow-svg');
  var pillCircleSvg = document.getElementById('pill-circle-svg');
  var pillHeader = document.getElementById('pill-header-mode');
  var pillArcLeft = document.getElementById('pill-circle-arc-l');
  var pillArcRight = document.getElementById('pill-circle-arc-r');

  function getPillHeaderWidth() {
    if (window.innerWidth < 640) {
      return Math.min(window.innerWidth - 18, 440);
    }
    return Math.min(window.innerWidth * 0.58, 560);
  }

  function updateHeaderMorphFromProgress(homeProgress) {
    if (!pillContainer || !pillArrow || !pillHeader) return;
    if (prefersReducedMotion) return;

    var vh = window.innerHeight || 800;
    var homeEl = document.querySelector('#home');
    var distance = homeEl ? homeEl.offsetHeight : vh;
    if (distance <= 0) distance = vh;

    var initialBottomSpot = vh - 76;
    var targetTop = 20;

    var initialWidth = 48;
    var targetWidth = getPillHeaderWidth();

    var p = Math.max(0, homeProgress);

    // Lifecycle Milestones:
    // 1. Dynamic Circle Formation: Dual arcs trace up around the arrow from the bottom
    // Same color and opacity as the pill when fully extended (0.16 white, 1px width)
    // Completes right before it starts turning into the header (0.04 -> 0.68)
    var pCircleStart = 0.04;
    var pCircleEnd = 0.68;
    var circleProgress = Math.min(1, Math.max(0, (p - pCircleStart) / (pCircleEnd - pCircleStart)));
    var dashOffset = (69.12 * (1 - circleProgress)).toFixed(2);

    if (pillArcLeft) pillArcLeft.style.strokeDashoffset = dashOffset;
    if (pillArcRight) pillArcRight.style.strokeDashoffset = dashOffset;

    // 2. Texts in homepage completely disappear by pTextGone (0.45)
    var pTextGone = 0.45;
    var topTextGone = initialBottomSpot - pTextGone * distance;

    // 3. Arrow ascends to top position (20px) faster than page by pReachTop (0.65)
    var pReachTop = 0.65;

    // 4. Header morph completes before the About page is 100% on screen by pComplete (0.90)
    var pComplete = 0.90;

    if (p < pTextGone) {
      // Stage 1: Fixed to spot on the Home page itself, moving 1:1 with page
      var currentTop = initialBottomSpot - p * distance;
      pillContainer.style.top = currentTop + 'px';
      pillContainer.style.width = initialWidth + 'px';

      if (pillArrowSvg) pillArrowSvg.style.opacity = '1';
      pillArrow.style.opacity = '1';
      pillArrow.style.pointerEvents = 'none';

      if (pillCircleSvg) pillCircleSvg.style.display = 'block';

      pillHeader.style.opacity = '0';
      pillHeader.style.pointerEvents = 'none';

      // Circle is drawn solely by the SVG arcs; container border is transparent
      pillContainer.style.background = 'transparent';
      pillContainer.style.borderColor = 'transparent';
      pillContainer.style.boxShadow = 'none';
      pillContainer.style.backdropFilter = 'none';
      pillContainer.style.webkitBackdropFilter = 'none';
    } else if (p < pReachTop) {
      // Stage 2: After texts completely disappear, arrow moves to top FASTER than actual page
      var fastTravelProgress = (p - pTextGone) / (pReachTop - pTextGone);
      var currentTop = topTextGone + (targetTop - topTextGone) * fastTravelProgress;

      pillContainer.style.top = currentTop + 'px';
      pillContainer.style.width = initialWidth + 'px';

      if (pillArrowSvg) pillArrowSvg.style.opacity = '1';
      pillArrow.style.opacity = '1';
      pillArrow.style.pointerEvents = 'none';

      if (pillCircleSvg) pillCircleSvg.style.display = 'block';

      pillHeader.style.opacity = '0';
      pillHeader.style.pointerEvents = 'none';

      // Container remains transparent during ascent to top
      pillContainer.style.background = 'transparent';
      pillContainer.style.borderColor = 'transparent';
      pillContainer.style.boxShadow = 'none';
      pillContainer.style.backdropFilter = 'none';
      pillContainer.style.webkitBackdropFilter = 'none';
    } else {
      // Stage 3: Reached top (20px) — THE CIRCLE SMOOTHLY TRANSFORMS INTO THE PILL HEADER
      pillContainer.style.top = targetTop + 'px';

      var rawMorph = Math.min(1, Math.max(0, (p - pReachTop) / (pComplete - pReachTop)));
      // Fluid ease-out curve for physical width expansion
      var smoothMorph = 1 - Math.pow(1 - rawMorph, 2.4);
      var currentWidth = initialWidth + (targetWidth - initialWidth) * smoothMorph;
      pillContainer.style.width = currentWidth.toFixed(1) + 'px';

      // Continuous glass styling materialization (no abrupt visual snap)
      var glassFactor = Math.min(1, rawMorph * 2.2);
      pillContainer.style.borderColor = 'rgba(44, 52, 69, ' + (1.0 * glassFactor).toFixed(3) + ')';
      pillContainer.style.background = 'rgba(16, 19, 26, ' + (0.82 * glassFactor).toFixed(3) + ')';
      pillContainer.style.boxShadow = '0 8px 28px rgba(0, 0, 0, ' + (0.45 * glassFactor).toFixed(3) + '), inset 0 1px 0 rgba(255, 255, 255, ' + (0.08 * glassFactor).toFixed(3) + ')';
      var blurVal = (18 * glassFactor).toFixed(1);
      pillContainer.style.backdropFilter = 'blur(' + blurVal + 'px)';
      pillContainer.style.webkitBackdropFilter = 'blur(' + blurVal + 'px)';

      if (pillCircleSvg) pillCircleSvg.style.display = 'none';

      // Smooth arrow departure
      var arrowAlpha = Math.max(0, 1 - rawMorph * 2.2);
      if (pillArrowSvg) pillArrowSvg.style.opacity = arrowAlpha.toFixed(3);
      pillArrow.style.opacity = '1';
      pillArrow.style.pointerEvents = 'none';

      // Header navigation links fade in smoothly as pill expands
      var headerAlpha = Math.min(1, Math.max(0, (rawMorph - 0.22) / 0.68));
      var smoothHeaderAlpha = 1 - Math.pow(1 - headerAlpha, 2);
      pillHeader.style.opacity = smoothHeaderAlpha.toFixed(3);
      pillHeader.style.pointerEvents = rawMorph >= 0.85 ? 'auto' : 'none';
    }
  }

  function applyContinuousHeaderMorph(scrollY) {
    var homeEl = document.querySelector('#home');
    var aboutEl = document.querySelector('#about');
    var homeTop = 0;
    var aboutTop = window.innerHeight || 800;

    if (homeEl && aboutEl) {
      var homeRect = homeEl.getBoundingClientRect();
      var aboutRect = aboutEl.getBoundingClientRect();
      homeTop = Math.round(homeRect.top + scrollY);
      aboutTop = Math.round(aboutRect.top + scrollY);
    }

    var distance = aboutTop - homeTop;
    if (distance <= 0) distance = window.innerHeight || 800;

    var homeProgress = (scrollY - homeTop) / distance;
    updateHeaderMorphFromProgress(homeProgress);
  }

  /* ==========================================================================
     3. WORK HIERARCHY ACTIVE-STATE MAPPING & ATMOSPHERE
     ========================================================================== */
  function updateActiveNavLinks(targetIndex) {
    document.querySelectorAll('.pill-nav-item, .pill-logo').forEach(function (link) {
      link.classList.remove('active');
    });

    // Both RetinaXAI (2) and SightLite (3) map to WORK (nav target 2)
    var activeTarget = targetIndex;
    if (targetIndex === 2 || targetIndex === 3) {
      activeTarget = 2; // WORK
    }

    var activeEl = document.querySelector('[data-nav-target="' + activeTarget + '"]');
    if (activeEl) {
      activeEl.classList.add('active');
    }
  }

  function updateAtmosphere(targetIndex) {
    var theme = sceneThemes[targetIndex];
    if (!theme) return;
    document.body.style.backgroundColor = theme.bg;
    var ambientLight = document.getElementById('ambient-light');
    if (ambientLight) {
      ambientLight.style.background = theme.light;
    }
  }

  /* ==========================================================================
     4. NATURAL FLUID SCROLLING + DIRECTIONAL MAJOR SCENE SNAPPING
     ========================================================================== */
  var lenis = null;
  var snapTimeout = null;
  var isSnapping = false;
  var lastScrollY = 0;
  var scrollDirection = 1; // +1 down, -1 up

  function getSceneSnapPoints() {
    var currentY = lenis ? lenis.scroll : window.scrollY;
    var vh = window.innerHeight || 800;
    var points = [];
    scenes.forEach(function (sel, idx) {
      var el = document.querySelector(sel);
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var top = Math.round(rect.top + currentY);
      var height = el.offsetHeight;
      var scrollTrack = Math.max(0, height - vh);
      var exitTop = top + scrollTrack;
      var hasInternal = scrollTrack > 80;
      points.push({
        index: idx,
        sel: sel,
        el: el,
        top: top,
        exitTop: exitTop,
        height: height,
        hasInternal: hasInternal
      });
    });
    points.sort(function (a, b) { return a.top - b.top; });
    return points;
  }

  function settleToNearestScene() {
    if (isSnapping || prefersReducedMotion) return;

    // Allow natural Lenis momentum to bleed off before executing snap
    if (lenis && Math.abs(lenis.velocity) > 0.08) {
      if (snapTimeout) clearTimeout(snapTimeout);
      snapTimeout = setTimeout(settleToNearestScene, 50);
      return;
    }

    var currentY = lenis ? lenis.scroll : window.scrollY;
    var vh = window.innerHeight || 800;
    var snapPoints = getSceneSnapPoints();
    if (!snapPoints.length) return;

    // 1. Check if user is actively exploring an internal cinematic timeline
    // (Between scene.top + safetyMargin and scene.exitTop - safetyMargin for scenes with internal scrollTrack).
    // Allow natural, uninterrupted scrubbing inside About and Work stages!
    var safetyMargin = 30;
    for (var j = 0; j < snapPoints.length; j++) {
      var sp = snapPoints[j];
      if (sp.hasInternal) {
        if (currentY >= (sp.top + safetyMargin) && currentY <= (sp.exitTop - safetyMargin)) {
          return;
        }
      }
    }

    // 2. Primary Rule: SNAP TO THE SCENE THAT CURRENTLY OCCUPIES THE LARGEST VISIBLE PORTION OF THE VIEWPORT
    var vTop = currentY;
    var vBottom = currentY + vh;
    var bestScene = null;
    var maxVis = -1;
    var secondBest = null;
    var secondVis = -1;

    for (var i = 0; i < snapPoints.length; i++) {
      var pt = snapPoints[i];
      var sTop = pt.top;
      var sBottom = pt.top + pt.height;
      var interTop = Math.max(vTop, sTop);
      var interBottom = Math.min(vBottom, sBottom);
      var visPx = Math.max(0, interBottom - interTop);
      var visRatio = visPx / vh;

      if (visRatio > maxVis) {
        secondBest = bestScene;
        secondVis = maxVis;
        bestScene = pt;
        maxVis = visRatio;
      } else if (visRatio > secondVis) {
        secondBest = pt;
        secondVis = visRatio;
      }
    }

    if (!bestScene || maxVis <= 0.05) return;

    // Directional tie-breaker ONLY when two scenes have approximately equal visibility (within 8%)
    var chosenScene = bestScene;
    if (secondBest && Math.abs(maxVis - secondVis) < 0.08) {
      if (scrollDirection > 0) {
        chosenScene = bestScene.top > secondBest.top ? bestScene : secondBest;
      } else if (scrollDirection < 0) {
        chosenScene = bestScene.top < secondBest.top ? bestScene : secondBest;
      }
    }

    // 3. Determine the exact target Y for the chosen scene
    var targetY = chosenScene.top;
    if (chosenScene.hasInternal) {
      // If closer to exitTop, snap to exitTop; otherwise snap to entrance top
      var distToTop = Math.abs(currentY - chosenScene.top);
      var distToExit = Math.abs(currentY - chosenScene.exitTop);
      targetY = distToExit < distToTop ? chosenScene.exitTop : chosenScene.top;
    }

    // Already settled within tight tolerance (6px)
    if (Math.abs(currentY - targetY) < 6) return;

    // 4. Smooth cinematic glide to target
    isSnapping = true;
    if (lenis) {
      lenis.scrollTo(targetY, {
        duration: 0.78,
        easing: function (t) { return 1 - Math.pow(1 - t, 3.2); },
        lock: false,
        onComplete: function () {
          setTimeout(function () {
            isSnapping = false;
          }, 50);
        }
      });
    } else if (typeof gsap !== 'undefined' && gsap.plugins.scrollTo) {
      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: true },
        duration: 0.78,
        ease: 'power2.out',
        onComplete: function () {
          setTimeout(function () {
            isSnapping = false;
          }, 50);
        }
      });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      setTimeout(function () { isSnapping = false; }, 780);
    }
  }

  function navigateToScene(targetIndex) {
    targetIndex = Math.max(0, Math.min(scenes.length - 1, targetIndex));
    var targetEl = document.querySelector(scenes[targetIndex]);
    if (!targetEl) return;

    if (snapTimeout) clearTimeout(snapTimeout);
    isSnapping = true;

    var currentY = lenis ? lenis.scroll : window.scrollY;
    var rect = targetEl.getBoundingClientRect();
    var targetY = Math.round(rect.top + currentY);

    if (lenis) {
      lenis.scrollTo(targetY, {
        duration: 0.95,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        lock: false,
        onComplete: function () {
          setTimeout(function () {
            isSnapping = false;
          }, 60);
        }
      });
    } else if (typeof gsap !== 'undefined' && gsap.plugins.scrollTo) {
      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: false },
        duration: 0.95,
        ease: 'power3.out',
        onComplete: function () {
          setTimeout(function () {
            isSnapping = false;
          }, 60);
        }
      });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      setTimeout(function () { isSnapping = false; }, 850);
    }
  }

  function initSmoothScroll() {
    // 1. Direct user input listeners to reliably detect scroll intent and allow intentional manual override
    window.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > 2) {
        scrollDirection = e.deltaY > 0 ? 1 : -1;
        if (isSnapping && Math.abs(e.deltaY) > 25) {
          isSnapping = false;
        }
      }
    }, { passive: true });

    var touchStartY = null;
    window.addEventListener('touchstart', function (e) {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0 && touchStartY !== null) {
        var deltaY = touchStartY - e.touches[0].clientY;
        if (Math.abs(deltaY) > 4) {
          scrollDirection = deltaY > 0 ? 1 : -1;
          if (isSnapping && Math.abs(deltaY) > 30) {
            isSnapping = false;
          }
        }
      }
    }, { passive: true });

    window.addEventListener('keydown', function (e) {
      if (['ArrowDown', 'PageDown', ' '].indexOf(e.key) !== -1) {
        scrollDirection = 1;
      } else if (['ArrowUp', 'PageUp'].indexOf(e.key) !== -1) {
        scrollDirection = -1;
      }
    });

    if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.1,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: true,
        touchMultiplier: 1.4
      });

      lenis.on('scroll', function (e) {
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
        onScrollProgress(e.scroll);

        // Schedule snap only when not already performing a programmatic snap
        if (!isSnapping && !prefersReducedMotion) {
          if (snapTimeout) clearTimeout(snapTimeout);
          snapTimeout = setTimeout(function () {
            settleToNearestScene();
          }, 140);
        }
      });

      if (typeof gsap !== 'undefined') {
        gsap.ticker.add(function (time) {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    } else {
      window.addEventListener('scroll', function () {
        onScrollProgress(window.scrollY);

        if (!isSnapping && !prefersReducedMotion) {
          if (snapTimeout) clearTimeout(snapTimeout);
          snapTimeout = setTimeout(function () {
            settleToNearestScene();
          }, 140);
        }
      }, { passive: true });
    }

    window.addEventListener('resize', function () {
      applyContinuousHeaderMorph(lenis ? lenis.scroll : window.scrollY);
    });
  }

  function onScrollProgress(scrollY) {
    if (scrollY > lastScrollY + 2) {
      scrollDirection = 1;
    } else if (scrollY < lastScrollY - 2) {
      scrollDirection = -1;
    }
    lastScrollY = scrollY;

    // 1. Calculate active scene based on viewport center
    var viewportMid = scrollY + window.innerHeight * 0.45;
    var activeIdx = 0;
    scenes.forEach(function (sel, idx) {
      var el = document.querySelector(sel);
      if (el) {
        var rect = el.getBoundingClientRect();
        var top = rect.top + scrollY;
        if (viewportMid >= top) {
          activeIdx = idx;
        }
      }
    });

    if (activeIdx !== currentSceneIndex) {
      currentSceneIndex = activeIdx;
      updateActiveNavLinks(activeIdx);
      updateAtmosphere(activeIdx);
    }

    // 2. Synchronized 1:1 Arrow -> Header Morph
    applyContinuousHeaderMorph(scrollY);
  }

  /* ==========================================================================
     5. VISIBLE SCENE TRANSITIONS & ELEMENT PARALLAX (ScrollTrigger Driven)
     ========================================================================== */
  function initSceneMotionDepth() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // A. Ordinary scenes: physical movement through space (scale, y, opacity, blur)
    scenes.forEach(function (sel) {
      if (sel === '#home' || sel === '#about') return; // Dedicated transitions for #home and #about
      var sceneEl = document.querySelector(sel);
      if (!sceneEl) return;
      var isCaseStudy = sceneEl.classList.contains('scene-casestudy');
      if (isCaseStudy) return; // Case studies have dedicated internal sticky presentation

      ScrollTrigger.create({
        trigger: sceneEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: function (self) {
          var p = self.progress; // 0 (enters bottom) -> 0.5 (centered) -> 1.0 (leaves top)
          var content = sceneEl.querySelector('.archive-container, .exp-container, .exit-inner');
          if (!content) return;

          var scale = 1;
          var opacity = 1;
          var y = 0;
          var blur = 0;

          if (p < 0.5) {
            // Entering from bottom: 0 -> 0.5
            var inP = p / 0.5;
            scale = 1.04 - 0.04 * inP;
            opacity = 0.35 + 0.65 * inP;
            y = 40 * (1 - inP);
            blur = 2 * (1 - inP);
          } else {
            // Leaving toward top: 0.5 -> 1.0
            var outP = (p - 0.5) / 0.5;
            scale = 1 - 0.04 * outP;
            opacity = 1 - 0.65 * outP;
            y = -30 * outP;
            blur = 2 * outP;
          }

          content.style.transform = 'translate3d(0, ' + y.toFixed(1) + 'px, 0) scale(' + scale.toFixed(3) + ')';
          content.style.opacity = opacity.toFixed(2);
          content.style.filter = blur > 0.15 ? 'blur(' + blur.toFixed(1) + 'px)' : 'none';
        }
      });
    });

    // Dedicated Home Exit Disassembly Animation (ScrollTrigger scrub-driven, completes in 0% -> 50%)
    ScrollTrigger.create({
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: function (self) {
        var p = self.progress; // 0 (at top) to 1.0 (leaving)
        var nameEl = document.getElementById('hero-name-container');
        var descEl = document.getElementById('hero-descriptor-wrap');
        var coordEl = document.getElementById('hero-coord-anchor');
        var canvasEl = document.getElementById('home-ambient-canvas');

        // Home identity exit completes by p = 0.45, when texts completely disappear
        var exitProgress = Math.min(1, p / 0.45);

        if (nameEl) {
          // Name gradually moves upward, fades out, subtle scale, no blur
          var nameY = -60 * exitProgress;
          var nameAlpha = Math.max(0, 1 - exitProgress * 1.05);
          var nameScale = 1 - 0.03 * exitProgress;

          nameEl.style.transform = 'translate3d(0, ' + nameY.toFixed(1) + 'px, 0) scale(' + nameScale.toFixed(3) + ')';
          nameEl.style.opacity = nameAlpha.toFixed(2);
          nameEl.style.filter = 'none';
        }

        if (descEl) {
          // Descriptor moves slightly downward, fades out after name begins disappearing
          var descFadeProgress = Math.max(0, (exitProgress - 0.15) / 0.85);
          var descY = 22 * exitProgress;
          var descAlpha = Math.max(0, 1 - descFadeProgress * 1.15);
          descEl.style.transform = 'translate3d(0, ' + descY.toFixed(1) + 'px, 0)';
          descEl.style.opacity = descAlpha.toFixed(2);
        }

        if (coordEl) {
          // Coordinate/reference text slides subtly sideways and fades
          var coordX = -28 * exitProgress;
          var coordAlpha = Math.max(0, 1 - exitProgress * 1.1);
          coordEl.style.transform = 'translate3d(' + coordX.toFixed(1) + 'px, 0, 0)';
          coordEl.style.opacity = coordAlpha.toFixed(2);
        }

        if (canvasEl) {
          // Background ambient lighting remains subtle, does not suddenly disappear
          canvasEl.style.opacity = (0.7 * Math.max(0, 1 - 0.5 * exitProgress)).toFixed(2);
        }

        // Header morph directly driven by actual Home scene scroll progress
        updateHeaderMorphFromProgress(p);
      }
    });

    // Dedicated About Scroll Transition (Continuous Scene: Narrative Intro -> Editorial Technology Field -> RetinaXAI)
    var aboutEl = document.querySelector('#about');
    if (aboutEl) {
      function getSubProgress(progress, start, end) {
        if (progress <= start) return 0;
        if (progress >= end) return 1;
        return (progress - start) / (end - start);
      }

      function applyElementMotion(el, progress, maxY, minScale) {
        if (!el) return;
        var opacity = progress;
        var y = maxY * (1 - progress);
        var scale = minScale + (1 - minScale) * progress;
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = 'translate3d(0, ' + y.toFixed(1) + 'px, 0) scale(' + scale.toFixed(3) + ')';
        el.style.filter = 'none';
      }

      // Pre-cache item elements and dots for the Full-Viewport Poster Canvas
      var compItemsOrder = [
        'lbl-languages', 'python', 'sql',
        'lbl-ml', 'pytorch', 'scikit', 'tensorflow', 'efficientnet', 'gradcam', 'xgboost', 'opencv',
        'lbl-data', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'tableau', 'powerbi',
        'lbl-tools', 'git', 'vscode', 'flask', 'streamlit', 'jupyter', 'linux', 'kaggle'
      ];

      var compItemEls = {};
      var compDotEls = {};
      compItemsOrder.forEach(function (id) {
        var el = aboutEl.querySelector('[data-comp-id="' + id + '"]');
        if (el) compItemEls[id] = el;
        var dot = aboutEl.querySelector('[data-dot-for="' + id + '"]');
        if (dot) compDotEls[id] = dot;
      });

      ScrollTrigger.create({
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: function (self) {
          var p = self.progress; // 0 (enters bottom) -> 0.345 (at top top - locked) -> 0.655 (unpins - physical scroll starts) -> 1.0 (exits top)
          var aboutContent = aboutEl.querySelector('.about-content-container');
          var introGrid = document.getElementById('about-intro-grid');
          var tagEl = aboutEl.querySelector('.about-tag-marker');
          var headlineEl = document.getElementById('about-headline');
          var word1El = aboutEl.querySelector('.about-word-first');
          var word2El = aboutEl.querySelector('.about-word-second');
          var leadParaEl = aboutEl.querySelector('.about-lead-para');
          var subParaEl = aboutEl.querySelector('.about-sub-para');
          var orbitalEl = aboutEl.querySelector('.about-orbital-visual');
          var compBlock = document.getElementById('about-competencies-block');
          var compHeader = document.getElementById('comp-header');

          if (headlineEl) {
            headlineEl.style.transform = 'none';
            headlineEl.style.opacity = '1';
          }

          if (prefersReducedMotion) {
            applyElementMotion(tagEl, 1, 0, 1);
            applyElementMotion(word1El, 1, 0, 1);
            applyElementMotion(word2El, 1, 0, 1);
            applyElementMotion(leadParaEl, 1, 0, 1);
            applyElementMotion(subParaEl, 1, 0, 1);
            if (introGrid) { introGrid.style.opacity = '1'; introGrid.style.transform = 'none'; }
            if (orbitalEl) orbitalEl.style.opacity = '0.88';
            if (compBlock) { compBlock.style.opacity = '1'; compBlock.style.transform = 'none'; compBlock.style.pointerEvents = 'auto'; }
            if (compHeader) { compHeader.style.opacity = '1'; compHeader.style.transform = 'none'; }
            compItemsOrder.forEach(function (id) {
              if (compItemEls[id]) {
                compItemEls[id].style.opacity = '1';
                compItemEls[id].style.transform = 'none';
                compItemEls[id].style.pointerEvents = 'auto';
              }
              if (compDotEls[id]) {
                compDotEls[id].style.opacity = '0.85';
              }
            });
            return;
          }

          if (aboutContent) {
            aboutContent.style.transform = 'none';
            aboutContent.style.opacity = '1';
            aboutContent.style.filter = 'none';
          }

          // ------------------------------------------------------------------
          // PHASE 0: 0.00 – 0.345 (About Enters Viewport)
          // ------------------------------------------------------------------
          if (p <= 0.345) {
            var inP = p / 0.345; // 0 -> 1

            if (introGrid) {
              introGrid.style.opacity = '1';
              introGrid.style.transform = 'none';
            }

            // Staggered Entrance of Headline and Copy
            var sp1 = getSubProgress(inP, 0.15, 0.35);
            applyElementMotion(tagEl, sp1, 25, 1);

            var sp2 = getSubProgress(inP, 0.25, 0.45);
            applyElementMotion(word1El, sp2, 40, 0.94);

            var sp3 = getSubProgress(inP, 0.38, 0.60);
            applyElementMotion(word2El, sp3, 45, 0.94);

            var sp4 = getSubProgress(inP, 0.45, 0.65);
            if (orbitalEl) {
              orbitalEl.style.opacity = (0.88 * sp4).toFixed(3);
              orbitalEl.style.filter = 'none';
            }

            var sp5 = getSubProgress(inP, 0.55, 0.78);
            applyElementMotion(leadParaEl, sp5, 22, 0.985);

            var sp6 = getSubProgress(inP, 0.68, 0.90);
            applyElementMotion(subParaEl, sp6, 18, 0.99);

            if (compBlock) {
              compBlock.style.opacity = '0';
              compBlock.style.pointerEvents = 'none';
            }
            if (compHeader) {
              compHeader.style.opacity = '0';
            }

            // Hide all field items
            compItemsOrder.forEach(function (id) {
              if (compItemEls[id]) {
                compItemEls[id].style.opacity = '0';
                compItemEls[id].style.transform = 'translate3d(0, 24px, 0) scale(0.94)';
                compItemEls[id].style.pointerEvents = 'none';
              }
              if (compDotEls[id]) {
                compDotEls[id].style.opacity = '0';
              }
            });

          } else {
            // Intro text elements stay fully resolved
            applyElementMotion(tagEl, 1, 0, 1);
            applyElementMotion(word1El, 1, 0, 1);
            applyElementMotion(word2El, 1, 0, 1);
            applyElementMotion(leadParaEl, 1, 0, 1);
            applyElementMotion(subParaEl, 1, 0, 1);

            // ----------------------------------------------------------------
            // ABOUT INTRO STATIONARY: 0.345 – 0.385
            // ----------------------------------------------------------------
            if (p < 0.385) {
              if (introGrid) {
                introGrid.style.opacity = '1';
                introGrid.style.transform = 'none';
              }
              if (orbitalEl) {
                orbitalEl.style.opacity = '0.88';
              }
              if (compBlock) {
                compBlock.style.opacity = '0';
                compBlock.style.pointerEvents = 'none';
              }
              if (compHeader) {
                compHeader.style.opacity = '0';
              }

              compItemsOrder.forEach(function (id) {
                if (compItemEls[id]) {
                  compItemEls[id].style.opacity = '0';
                  compItemEls[id].style.transform = 'translate3d(0, 24px, 0) scale(0.94)';
                  compItemEls[id].style.pointerEvents = 'none';
                }
                if (compDotEls[id]) {
                  compDotEls[id].style.opacity = '0';
                }
              });

            // ----------------------------------------------------------------
            // CORE COMPETENCIES BUILD, HOLD & DISMANTLE: 0.385 – 1.00
            // ----------------------------------------------------------------
            } else {
              // 1. Intro grid dissolves smoothly across 0.385 -> 0.435
              if (p < 0.435) {
                var introOutP = (p - 0.385) / 0.05;
                var introAlpha = Math.max(0, 1 - introOutP * 1.05);
                var introY = -26 * introOutP;
                var introScale = 1 - 0.035 * introOutP;
                if (introGrid) {
                  introGrid.style.opacity = introAlpha.toFixed(3);
                  introGrid.style.transform = 'translate3d(0, ' + introY.toFixed(1) + 'px, 0) scale(' + introScale.toFixed(3) + ')';
                }
                if (orbitalEl) {
                  orbitalEl.style.opacity = (0.88 * introAlpha).toFixed(3);
                }
              } else {
                if (introGrid) {
                  introGrid.style.opacity = '0';
                  introGrid.style.transform = 'translate3d(0, -26px, 0) scale(0.965)';
                }
                if (orbitalEl) {
                  orbitalEl.style.opacity = '0';
                }
              }

              // 2. Poster Container & Persistent Header
              if (compBlock) {
                compBlock.style.opacity = '1';
                compBlock.style.transform = 'none';
                compBlock.style.pointerEvents = (p >= 0.42 && p < 0.97) ? 'auto' : 'none';
              }

              if (compHeader) {
                if (p < 0.46) {
                  var hdrInP = (p - 0.42) / 0.04;
                  compHeader.style.opacity = Math.max(0, Math.min(1, hdrInP)).toFixed(3);
                  compHeader.style.transform = 'translate3d(0, ' + (16 * (1 - hdrInP)).toFixed(1) + 'px, 0)';
                } else if (p > 0.95) {
                  // Fades gently alongside the final Tools departure into RetinaXAI
                  var hdrOutP = (p - 0.95) / 0.05;
                  compHeader.style.opacity = Math.max(0, 1 - hdrOutP * 1.1).toFixed(3);
                  compHeader.style.transform = 'translate3d(0, ' + (-20 * hdrOutP).toFixed(1) + 'px, 0)';
                } else {
                  compHeader.style.opacity = '1';
                  compHeader.style.transform = 'none';
                }
              }

              // 3. BUILD, HOLD & FORWARD DISMANTLE ENGINE
              // Build window: all 26 items accumulate across 0.420 -> 0.560
              var totalItems = compItemsOrder.length; // 26 items
              var buildStartBase = 0.420;
              var buildSpan = 0.140; // 0.420 -> 0.560
              // Tighter per-item entry duration: decisive, immediate transition into solid state
              var itemBuildDur = 0.007;

              // Dismantle ranges per category: tight, decisive exit transitions
              // Category 01: Languages (indices 0..2)
              // Category 02: ML & DL (indices 3..10)
              // Category 03: Data Analysis & Visualization (indices 11..17) -> starts at 0.655 (unpin point)
              // Category 04: Tools & Deployment (indices 18..25)
              var catConfig = [
                { startIdx: 0, endIdx: 2, start: 0.600, end: 0.630, dur: 0.008 },
                { startIdx: 3, endIdx: 10, start: 0.625, end: 0.655, dur: 0.008 },
                { startIdx: 11, endIdx: 17, start: 0.655, end: 0.785, dur: 0.012 },
                { startIdx: 18, endIdx: 25, start: 0.785, end: 0.955, dur: 0.012 }
              ];

              for (var i = 0; i < totalItems; i++) {
                var id = compItemsOrder[i];
                var el = compItemEls[id];
                var dot = compDotEls[id];
                if (!el) continue;

                // Entry window: item builds in quickly and stays accumulated
                var inStart = buildStartBase + (i / (totalItems - 1)) * (buildSpan - itemBuildDur);
                var inEnd = inStart + itemBuildDur;

                // Category-based dismantle window
                var cfg = catConfig[0];
                for (var c = 0; c < catConfig.length; c++) {
                  if (i >= catConfig[c].startIdx && i <= catConfig[c].endIdx) {
                    cfg = catConfig[c];
                    break;
                  }
                }
                var countInCat = cfg.endIdx - cfg.startIdx;
                var relIdx = i - cfg.startIdx;
                var outStart = cfg.start + (countInCat > 0 ? (relIdx / countInCat) * (cfg.end - cfg.start - cfg.dur) : 0);
                var outEnd = outStart + cfg.dur;

                var alpha = 0;
                var y = 16;
                var scale = 0.96;

                if (p < inStart) {
                  alpha = 0;
                  y = 16;
                  scale = 0.96;
                } else if (p < inEnd) {
                  // BUILD IN: quick, decisive transition into position
                  var tIn = (p - inStart) / (inEnd - inStart);
                  var smoothIn = 1 - Math.pow(1 - tIn, 2.6);
                  alpha = smoothIn;
                  y = 16 * (1 - smoothIn);
                  scale = 0.96 + 0.04 * smoothIn;
                } else if (p < outStart) {
                  // ACCUMULATION & FULL-FIELD HOLD: item remains 100% visible and solid
                  alpha = 1;
                  y = 0;
                  scale = 1;
                } else if (p < outEnd) {
                  // DISMANTLE: decisive exit, removed quickly
                  var tOut = (p - outStart) / (outEnd - outStart);
                  var smoothOut = Math.pow(tOut, 2.2);
                  alpha = Math.max(0, 1 - smoothOut);
                  y = -16 * smoothOut;
                  scale = 1 - 0.04 * smoothOut;
                } else {
                  // Dismantled
                  alpha = 0;
                  y = -16;
                  scale = 0.96;
                }

                el.style.opacity = alpha.toFixed(3);
                el.style.transform = alpha > 0 ? 'translate3d(0, ' + y.toFixed(1) + 'px, 0) scale(' + scale.toFixed(3) + ')' : 'translate3d(0, 16px, 0) scale(0.96)';
                el.style.pointerEvents = alpha > 0.8 ? 'auto' : 'none';

                if (dot) {
                  dot.style.opacity = (alpha * 0.85).toFixed(3);
                }
              }
            }
          }
        }
      });
    }

    // Subtle Element Parallax
    gsap.to('.about-orbital-visual', {
      y: -40,
      ease: 'none',
      scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    gsap.to('#ambient-light', {
      y: 160,
      ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
    });

    // C. Case Study Continuous Internal Storytelling
    ScrollTrigger.create({
      trigger: '#retinaxai',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: function (self) {
        var p = self.progress;
        var s = Math.min(4, Math.floor(p * 4) + 1);
        if (s !== retinaStage) {
          retinaStage = s;
          updateRetinaStageVisuals();
        }
      }
    });

    ScrollTrigger.create({
      trigger: '#sightlite',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: function (self) {
        var p = self.progress;
        var s = Math.min(4, Math.floor(p * 4) + 1);
        if (s !== sightStage) {
          sightStage = s;
          updateSightStageVisuals();
        }
      }
    });
  }

  /* ==========================================================================
     6. CASE STUDY PRESENTATION STAGE VISUALIZERS
     ========================================================================== */
  function updateRetinaStageVisuals() {
    document.querySelectorAll('#retinaxai .study-stage-step').forEach(function (stepEl) {
      var stepNum = parseInt(stepEl.getAttribute('data-step'), 10);
      if (stepNum === retinaStage) {
        stepEl.classList.add('is-active');
      } else {
        stepEl.classList.remove('is-active');
      }
    });

    document.querySelectorAll('#rx-stepper .step-dot').forEach(function (dot) {
      var stepNum = parseInt(dot.getAttribute('data-step'), 10);
      if (stepNum === retinaStage) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });

    var telemetry = document.getElementById('retina-telemetry');
    if (telemetry) {
      switch (retinaStage) {
        case 1:
          telemetry.textContent = 'STAGE 01 // RAW_IDRiD_BUFFER';
          break;
        case 2:
          telemetry.textContent = 'STAGE 02 // CLAHE_NORMALIZED';
          break;
        case 3:
          telemetry.textContent = 'STAGE 03 // EFFICIENTNET_B3_FEATURE_MAP';
          break;
        case 4:
          telemetry.textContent = 'STAGE 04 // GRAD_CAM_HEATMAP // 0.92 ROC-AUC';
          break;
      }
    }
  }

  function updateSightStageVisuals() {
    document.querySelectorAll('#sightlite .study-stage-step').forEach(function (stepEl) {
      var stepNum = parseInt(stepEl.getAttribute('data-step'), 10);
      if (stepNum === sightStage) {
        stepEl.classList.add('is-active');
      } else {
        stepEl.classList.remove('is-active');
      }
    });

    document.querySelectorAll('#sl-stepper .step-dot').forEach(function (dot) {
      var stepNum = parseInt(dot.getAttribute('data-step'), 10);
      if (stepNum === sightStage) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });
  }

  /* ==========================================================================
     7. HOME AMBIENT COMPUTATIONAL FIELD & CURSOR PARALLAX
     ========================================================================== */
  var homeCanvas = document.getElementById('home-ambient-canvas');
  var homeCtx = homeCanvas ? homeCanvas.getContext('2d') : null;
  var homeRafId = null;
  var mouseNormX = 0;
  var mouseNormY = 0;

  // Track cursor position for subtle depth
  window.addEventListener('mousemove', function (e) {
    mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseNormY = (e.clientY / window.innerHeight) * 2 - 1;

    if (currentSceneIndex === 0 && !prefersReducedMotion) {
      // 1. Coordinate anchor: subtle 4px parallax
      var coordAnchor = document.getElementById('hero-coord-anchor');
      if (coordAnchor) {
        coordAnchor.style.transform = 'translate(' + (mouseNormX * 4).toFixed(1) + 'px, ' + (mouseNormY * 4).toFixed(1) + 'px)';
      }

      // 2. Line 1 (MOHAMMED): subtle 2.5px displacement
      var word1 = document.getElementById('hero-word-1');
      if (word1) {
        word1.style.transform = 'translate(' + (mouseNormX * 2.5).toFixed(1) + 'px, ' + (mouseNormY * 2.5).toFixed(1) + 'px)';
      }

      // 3. Line 2 (SHAHZAN ARMAR): subtle differential -2.0px displacement
      var word2 = document.getElementById('hero-word-2');
      if (word2) {
        word2.style.transform = 'translate(' + (mouseNormX * -2.0).toFixed(1) + 'px, ' + (mouseNormY * -2.0).toFixed(1) + 'px)';
      }

      // 4. Descriptor: very gentle 1.5px displacement
      var descWrap = document.getElementById('hero-descriptor-wrap');
      if (descWrap) {
        descWrap.style.transform = 'translate(' + (mouseNormX * 1.5).toFixed(1) + 'px, ' + (mouseNormY * 1.5).toFixed(1) + 'px)';
      }
    }
  }, { passive: true });

  // Sparse Data Points & Connection Lines
  var nodes = [];
  function initHomeNodes(w, h) {
    nodes = [];
    var count = 32;
    for (var i = 0; i < count; i++) {
      // Concentrate points towards perimeter/outer edges
      var angle = Math.random() * Math.PI * 2;
      var dist = Math.min(w, h) * (0.28 + Math.random() * 0.42);
      var nx = w / 2 + Math.cos(angle) * dist;
      var ny = h / 2 + Math.sin(angle) * dist;

      nodes.push({
        x: Math.max(20, Math.min(w - 20, nx)),
        y: Math.max(20, Math.min(h - 20, ny)),
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.5 + 1.1,
        alpha: Math.random() * 0.22 + 0.12
      });
    }
  }

  function resizeHomeCanvas() {
    if (!homeCanvas || !homeCtx) return;
    var rect = homeCanvas.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    homeCtx.setTransform(1, 0, 0, 1, 0, 0);
    homeCanvas.width = rect.width * dpr;
    homeCanvas.height = rect.height * dpr;
    homeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initHomeNodes(rect.width, rect.height);
  }

  function renderHomeAmbientVisual() {
    if (!homeCtx || !homeCanvas || currentSceneIndex !== 0) {
      if (homeRafId) { cancelAnimationFrame(homeRafId); homeRafId = null; }
      return;
    }

    var w = homeCanvas.getBoundingClientRect().width;
    var h = homeCanvas.getBoundingClientRect().height;
    homeCtx.clearRect(0, 0, w, h);

    // Subtle connection lines
    homeCtx.lineWidth = 0.6;
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 135) {
          var lineAlpha = (1 - dist / 135) * 0.08;
          homeCtx.strokeStyle = 'rgba(139, 92, 246, ' + lineAlpha + ')';
          homeCtx.beginPath();
          homeCtx.moveTo(nodes[i].x, nodes[i].y);
          homeCtx.lineTo(nodes[j].x, nodes[j].y);
          homeCtx.stroke();
        }
      }
    }

    // Render nodes with cursor parallax
    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];
      n.x += n.vx + mouseNormX * 0.12;
      n.y += n.vy + mouseNormY * 0.12;

      if (n.x < 0) n.x = w;
      if (n.x > w) n.x = 0;
      if (n.y < 0) n.y = h;
      if (n.y > h) n.y = 0;

      homeCtx.beginPath();
      homeCtx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      homeCtx.fillStyle = 'rgba(255, 255, 255, ' + n.alpha + ')';
      homeCtx.fill();
    }

    homeRafId = requestAnimationFrame(renderHomeAmbientVisual);
  }

  function startHomeAmbientLoop() {
    if (!homeRafId && currentSceneIndex === 0) {
      homeRafId = requestAnimationFrame(renderHomeAmbientVisual);
    }
  }

  // Home initial load entry choreography (calm, smooth entrance)
  function playHomeEntryAnimation() {
    if (prefersReducedMotion || typeof gsap === 'undefined') return;

    var tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // 1. Background ambient light: opacity 0 -> 1, subtle scale 0.96 -> 1
    tl.fromTo('#ambient-light',
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
      0
    );

    // 2. Name: single composition (opacity 0 -> 1, translateY 28px -> 0, scale 0.97 -> 1) - no blur as main effect
    tl.fromTo('#hero-name-container',
      { opacity: 0, y: 28, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 1.25, ease: 'power2.out' },
      0.25
    );

    // Coordinate / reference information: separated, gentle fade
    tl.fromTo('#hero-coord-anchor',
      { opacity: 0, y: 12 },
      { opacity: 0.85, y: 0, duration: 0.9, ease: 'power2.out' },
      0.55
    );

    // 3. Descriptor: enters slightly after the name
    tl.fromTo('#hero-descriptor-wrap',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
      0.72
    );

    // 4. Scroll arrow: appears after the main identity settles
    tl.fromTo('#scroll-pill-morph',
      { opacity: 0, y: 12, xPercent: -50 },
      {
        opacity: 1,
        y: 0,
        xPercent: -50,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'transform'
      },
      1.25
    );
  }

  /* ==========================================================================
     8. PROCEDURAL CANVASES: RetinaXAI & SightLite
     ========================================================================== */
  var retinaCanvas = document.getElementById('retinaxai-canvas');
  var retinaCtx = retinaCanvas ? retinaCanvas.getContext('2d') : null;
  var isRetinaVisible = false;
  var retinaRafId = null;
  var retinaAngle = 0;

  function resizeRetinaCanvas() {
    if (!retinaCanvas || !retinaCtx) return;
    var rect = retinaCanvas.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    retinaCtx.setTransform(1, 0, 0, 1, 0, 0);
    retinaCanvas.width = rect.width * dpr;
    retinaCanvas.height = rect.height * dpr;
    retinaCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function renderRetinaVisual() {
    if (!retinaCtx || !retinaCanvas || !isRetinaVisible) return;
    var w = retinaCanvas.getBoundingClientRect().width;
    var h = retinaCanvas.getBoundingClientRect().height;
    var cx = w / 2;
    var cy = h / 2;
    var radius = Math.min(w, h) * 0.38;

    retinaCtx.clearRect(0, 0, w, h);

    retinaCtx.save();
    retinaCtx.beginPath();
    retinaCtx.arc(cx, cy, radius, 0, Math.PI * 2);
    retinaCtx.fillStyle = '#151923';
    retinaCtx.fill();
    retinaCtx.strokeStyle = retinaStage >= 2 ? 'rgba(139, 92, 246, 0.45)' : 'rgba(255, 255, 255, 0.12)';
    retinaCtx.lineWidth = 1.5;
    retinaCtx.stroke();
    retinaCtx.clip();

    var vesselColor = retinaStage >= 2 ? '#a855f7' : 'rgba(255, 255, 255, 0.22)';
    retinaCtx.strokeStyle = vesselColor;
    retinaCtx.lineWidth = retinaStage >= 2 ? 2.5 : 1.2;

    var discX = cx + radius * 0.35;
    var discY = cy - radius * 0.05;

    for (var i = 0; i < 6; i++) {
      var angle = (i * Math.PI) / 3 + retinaAngle * 0.02;
      retinaCtx.beginPath();
      retinaCtx.moveTo(discX, discY);
      var cpX = discX - Math.cos(angle) * (radius * 0.6);
      var cpY = discY + Math.sin(angle) * (radius * 0.7);
      var endX = discX - Math.cos(angle + 0.4) * (radius * 1.1);
      var endY = discY + Math.sin(angle + 0.4) * (radius * 1.1);
      retinaCtx.quadraticCurveTo(cpX, cpY, endX, endY);
      retinaCtx.stroke();
    }

    retinaCtx.beginPath();
    retinaCtx.arc(discX, discY, radius * 0.16, 0, Math.PI * 2);
    retinaCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    retinaCtx.fill();

    if (retinaStage >= 3) {
      retinaCtx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      retinaCtx.lineWidth = 1;
      var gridStep = 24;
      for (var x = cx - radius; x <= cx + radius; x += gridStep) {
        retinaCtx.beginPath();
        retinaCtx.moveTo(x, cy - radius);
        retinaCtx.lineTo(x, cy + radius);
        retinaCtx.stroke();
      }
      for (var y = cy - radius; y <= cy + radius; y += gridStep) {
        retinaCtx.beginPath();
        retinaCtx.moveTo(cx - radius, y);
        retinaCtx.lineTo(cx + radius, y);
        retinaCtx.stroke();
      }
    }

    if (retinaStage >= 4) {
      var heatGrad1 = retinaCtx.createRadialGradient(cx - radius * 0.1, cy + radius * 0.1, 4, cx - radius * 0.1, cy + radius * 0.1, radius * 0.42);
      heatGrad1.addColorStop(0, 'rgba(244, 63, 94, 0.75)');
      heatGrad1.addColorStop(0.5, 'rgba(139, 92, 246, 0.45)');
      heatGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      retinaCtx.fillStyle = heatGrad1;
      retinaCtx.beginPath();
      retinaCtx.arc(cx - radius * 0.1, cy + radius * 0.1, radius * 0.42, 0, Math.PI * 2);
      retinaCtx.fill();

      var heatGrad2 = retinaCtx.createRadialGradient(cx + radius * 0.1, cy - radius * 0.25, 2, cx + radius * 0.1, cy - radius * 0.25, radius * 0.25);
      heatGrad2.addColorStop(0, 'rgba(244, 63, 94, 0.65)');
      heatGrad2.addColorStop(0.6, 'rgba(56, 189, 248, 0.35)');
      heatGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      retinaCtx.fillStyle = heatGrad2;
      retinaCtx.beginPath();
      retinaCtx.arc(cx + radius * 0.1, cy - radius * 0.25, radius * 0.25, 0, Math.PI * 2);
      retinaCtx.fill();
    }

    retinaCtx.restore();
    retinaAngle += 0.01;
    retinaRafId = requestAnimationFrame(renderRetinaVisual);
  }

  var sightCanvas = document.getElementById('sightlite-canvas');
  var sightCtx = sightCanvas ? sightCanvas.getContext('2d') : null;
  var isSightVisible = false;
  var sightRafId = null;
  var sightPulse = 0;

  function resizeSightCanvas() {
    if (!sightCanvas || !sightCtx) return;
    var rect = sightCanvas.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    sightCtx.setTransform(1, 0, 0, 1, 0, 0);
    sightCanvas.width = rect.width * dpr;
    sightCanvas.height = rect.height * dpr;
    sightCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function renderSightVisual() {
    if (!sightCtx || !sightCanvas || !isSightVisible) return;
    var w = sightCanvas.getBoundingClientRect().width;
    var h = sightCanvas.getBoundingClientRect().height;

    sightCtx.clearRect(0, 0, w, h);

    sightCtx.fillStyle = '#10131A';
    sightCtx.fillRect(0, 0, w, h);

    sightCtx.fillStyle = '#1B202C';
    sightCtx.fillRect(28, 22, w - 56, 38);

    sightCtx.fillStyle = '#252B3A';
    sightCtx.fillRect(28, 76, w - 56, 84);

    var cardW = (w - 80) / 2;
    sightCtx.fillStyle = '#1B202C';
    sightCtx.fillRect(28, 178, cardW, 100);
    sightCtx.fillRect(40 + cardW, 178, cardW, 100);

    sightCtx.fillStyle = '#222838';
    sightCtx.fillRect(28, 298, w - 56, 44);

    if (sightStage >= 2) {
      sightCtx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      sightCtx.lineWidth = 1.5;
      sightCtx.setLineDash([4, 4]);

      sightCtx.strokeRect(w - 130, 28, 86, 26);
      sightCtx.fillStyle = '#38bdf8';
      sightCtx.font = '9px "JetBrains Mono", monospace';
      sightCtx.fillText('AFFORDANCE:BTN', w - 130, 25);

      sightCtx.strokeRect(28, 178, cardW, 100);
      sightCtx.fillText('ELEMENT:INTERACTIVE_CARD', 28, 172);

      sightCtx.setLineDash([]);
    }

    if (sightStage >= 3) {
      sightCtx.fillStyle = 'rgba(244, 63, 94, 0.22)';
      sightCtx.fillRect(28, 298, w - 56, 44);
      sightCtx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
      sightCtx.strokeRect(28, 298, w - 56, 44);

      sightCtx.fillStyle = '#f43f5e';
      sightCtx.font = '10px "JetBrains Mono", monospace';
      sightCtx.fillText('[CLIENT_SIDE_PII_REDACTION // SENSITIVE_INPUT_MASKED]', 40, 325);
    }

    if (sightStage >= 4) {
      sightPulse += 0.05;
      sightCtx.beginPath();
      sightCtx.moveTo(w - 85, 41);
      sightCtx.quadraticCurveTo(w / 2, h / 2, 40 + cardW / 2, 228);
      sightCtx.strokeStyle = '#8b5cf6';
      sightCtx.lineWidth = 2.5;
      sightCtx.stroke();

      var markerAlpha = 0.5 + Math.sin(sightPulse) * 0.4;
      sightCtx.beginPath();
      sightCtx.arc(40 + cardW / 2, 228, 7, 0, Math.PI * 2);
      sightCtx.fillStyle = 'rgba(139, 92, 246, ' + markerAlpha + ')';
      sightCtx.fill();
      sightCtx.strokeStyle = '#fff';
      sightCtx.stroke();
    }

    sightRafId = requestAnimationFrame(renderSightVisual);
  }

  // IntersectionObserver for Case Studies
  if (retinaCanvas && window.IntersectionObserver) {
    var retinaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        isRetinaVisible = entry.isIntersecting;
        if (isRetinaVisible) {
          if (!retinaRafId) retinaRafId = requestAnimationFrame(renderRetinaVisual);
        } else {
          if (retinaRafId) { cancelAnimationFrame(retinaRafId); retinaRafId = null; }
        }
      });
    }, { threshold: 0.05 });
    retinaObserver.observe(retinaCanvas);
  }

  if (sightCanvas && window.IntersectionObserver) {
    var sightObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        isSightVisible = entry.isIntersecting;
        if (isSightVisible) {
          if (!sightRafId) sightRafId = requestAnimationFrame(renderSightVisual);
        } else {
          if (sightRafId) { cancelAnimationFrame(sightRafId); sightRafId = null; }
        }
      });
    }, { threshold: 0.05 });
    sightObserver.observe(sightCanvas);
  }

  window.addEventListener('resize', function () {
    resizeHomeCanvas();
    resizeRetinaCanvas();
    resizeSightCanvas();
  });

  resizeHomeCanvas();
  resizeRetinaCanvas();
  resizeSightCanvas();

  /* ==========================================================================
     9. DESKTOP MAGNETIC CURSOR & ARCHIVE GHOST PREVIEW
     ========================================================================== */
  var cursorDot = document.getElementById('cursor-dot');
  var cursorFollower = document.getElementById('cursor-follower');
  var cursorText = cursorFollower ? cursorFollower.querySelector('.cursor-text') : null;

  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var followerX = mouseX;
  var followerY = mouseY;

  if (cursorDot && cursorFollower && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px)';
    }, { passive: true });

    function renderCursor() {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      cursorFollower.style.transform = 'translate(' + followerX + 'px, ' + followerY + 'px)';
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    document.querySelectorAll('[data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        var label = el.getAttribute('data-cursor') || 'VIEW';
        if (cursorText) cursorText.textContent = label;
        cursorFollower.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', function () {
        cursorFollower.classList.remove('is-hovering');
      });
    });
  }

  // Ghost Preview for Archive Rows
  var ghostPreview = document.getElementById('archive-ghost-preview');
  var ghostTitle = document.getElementById('ghost-title');
  var ghostMetric = document.getElementById('ghost-metric');

  if (ghostPreview && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.archive-single-row').forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        var title = row.getAttribute('data-title') || '';
        var metric = row.getAttribute('data-metric') || '';
        if (ghostTitle) ghostTitle.textContent = title;
        if (ghostMetric) ghostMetric.textContent = metric;
        ghostPreview.classList.add('is-visible');
      });

      row.addEventListener('mousemove', function (e) {
        ghostPreview.style.left = (e.clientX + 24) + 'px';
        ghostPreview.style.top = (e.clientY - 30) + 'px';
      });

      row.addEventListener('mouseleave', function () {
        ghostPreview.classList.remove('is-visible');
      });
    });
  }

  /* ==========================================================================
     10. NAVIGATION LINKS & STEPPER CLICKS
     ========================================================================== */
  document.querySelectorAll('[data-nav-target]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var targetIdx = parseInt(el.getAttribute('data-nav-target'), 10);
      if (!isNaN(targetIdx)) {
        navigateToScene(targetIdx);
      }
    });
  });

  if (pillContainer) {
    pillContainer.addEventListener('click', function (e) {
      if (currentSceneIndex === 0) {
        e.preventDefault();
        navigateToScene(1);
      }
    });
  }

  document.querySelectorAll('#rx-stepper .step-dot').forEach(function (dot) {
    dot.addEventListener('click', function () {
      var s = parseInt(dot.getAttribute('data-step'), 10);
      if (s >= 1 && s <= 4) {
        retinaStage = s;
        updateRetinaStageVisuals();
      }
    });
  });

  document.querySelectorAll('#sl-stepper .step-dot').forEach(function (dot) {
    dot.addEventListener('click', function () {
      var s = parseInt(dot.getAttribute('data-step'), 10);
      if (s >= 1 && s <= 4) {
        sightStage = s;
        updateSightStageVisuals();
      }
    });
  });

  /* ==========================================================================
     11. INITIALIZATION
     ========================================================================== */
  function initEngine() {
    initSmoothScroll();
    initSceneMotionDepth();
    updateRetinaStageVisuals();
    updateSightStageVisuals();
    startHomeAmbientLoop();
    playHomeEntryAnimation();
    applyContinuousHeaderMorph(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEngine);
  } else {
    initEngine();
  }
})();