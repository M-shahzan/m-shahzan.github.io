import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const scenes = [
  '#home',
  '#about',
  '#work',
  '#experience',
  '#exit'
];

export function useSceneEngine({ onRetinaStageChange, onSightStageChange } = {}) {
  const lenisRef = useRef(null);
  const currentSceneIndexRef = useRef(0);
  const isSnappingRef = useRef(false);
  const snapTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef(1);

  const onRetinaStageChangeRef = useRef(onRetinaStageChange);
  const onSightStageChangeRef = useRef(onSightStageChange);

  useEffect(() => {
    onRetinaStageChangeRef.current = onRetinaStageChange;
    onSightStageChangeRef.current = onSightStageChange;
  }, [onRetinaStageChange, onSightStageChange]);


  const getPillHeaderWidth = useCallback(() => {
    if (window.innerWidth < 640) {
      return Math.min(window.innerWidth - 18, 440);
    }
    return Math.min(window.innerWidth * 0.58, 560);
  }, []);

  const updateHeaderMorphFromProgress = useCallback((homeProgress) => {
    const pillContainer = document.getElementById('scroll-pill-morph');
    const pillArrow = document.getElementById('pill-arrow-mode');
    const pillArrowSvg = document.getElementById('pill-arrow-svg');
    const pillCircleSvg = document.getElementById('pill-circle-svg');
    const pillHeader = document.getElementById('pill-header-mode');
    const pillArcLeft = document.getElementById('pill-circle-arc-l');
    const pillArcRight = document.getElementById('pill-circle-arc-r');

    if (!pillContainer || !pillArrow || !pillHeader) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const vh = window.innerHeight || 800;
    const initialBottomSpot = vh - 76;
    const targetTop = 20;
    const initialWidth = 48;
    const targetWidth = getPillHeaderWidth();
    const p = Math.max(0, homeProgress);

    // 1. Circle Tracing Phase: Traces from p = 0.00 and completes slightly before pill morph (at p = 0.48)
    const pCircleEnd = 0.48;
    const circleProgress = Math.min(1, Math.max(0, p / pCircleEnd));
    const dashOffset = (69.12 * (1 - circleProgress)).toFixed(2);

    if (pillArcLeft) pillArcLeft.style.strokeDashoffset = dashOffset;
    if (pillArcRight) pillArcRight.style.strokeDashoffset = dashOffset;

    // 2. Flight & Morph Timings:
    // Starts moving immediately as page scrolls (p > 0), accelerates upward smoothly
    // Stays below Home text while text is visible; Home text disappears by p = 0.30
    // Reaches top: 20px at p = 0.56
    // Morphs horizontally from 48px circle into pill header from p = 0.56 to p = 0.82
    const pReachTop = 0.56;
    const pCompleteMorph = 0.82;

    if (p < pReachTop) {
      // Continuous acceleration flight: starts moving immediately at p=0, speeds up smoothly
      const t = p / pReachTop;
      const flightProgress = 0.30 * t + 0.70 * Math.pow(t, 2.2);
      const totalDist = initialBottomSpot - targetTop;
      const currentTop = initialBottomSpot - totalDist * flightProgress;

      pillContainer.style.top = `${currentTop.toFixed(1)}px`;
      pillContainer.style.width = `${initialWidth}px`;

      if (pillArrowSvg) pillArrowSvg.style.opacity = '1';
      pillArrow.style.opacity = '1';
      pillArrow.style.pointerEvents = 'none';
      if (pillCircleSvg) {
        pillCircleSvg.style.display = 'block';
        pillCircleSvg.style.opacity = '1';
      }

      pillHeader.style.opacity = '0';
      pillHeader.style.pointerEvents = 'none';

      pillContainer.style.background = 'transparent';
      pillContainer.style.borderColor = 'transparent';
      pillContainer.style.boxShadow = 'none';
      pillContainer.style.backdropFilter = 'none';
      pillContainer.style.webkitBackdropFilter = 'none';
    } else {
      // 3. Physical Morph Phase: Circle at top: 20px expands horizontally into the pill header
      pillContainer.style.top = `${targetTop}px`;

      const morphProgress = Math.min(1, Math.max(0, (p - pReachTop) / (pCompleteMorph - pReachTop)));
      const smoothMorph = 1 - Math.pow(1 - morphProgress, 2.6);
      const currentWidth = initialWidth + (targetWidth - initialWidth) * smoothMorph;
      pillContainer.style.width = `${currentWidth.toFixed(1)}px`;

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const glassFactor = Math.min(1, morphProgress * 1.8);
      const borderColor = isLight
        ? `rgba(221, 214, 254, ${(1.0 * glassFactor).toFixed(3)})`
        : `rgba(58, 44, 54, ${(1.0 * glassFactor).toFixed(3)})`;
      const bgColor = isLight
        ? `rgba(248, 247, 252, ${(0.92 * glassFactor).toFixed(3)})`
        : `rgba(20, 17, 24, ${(0.86 * glassFactor).toFixed(3)})`;
      const shadowColor = isLight
        ? `rgba(124, 58, 237, ${(0.09 * glassFactor).toFixed(3)})`
        : `rgba(0, 0, 0, ${(0.45 * glassFactor).toFixed(3)})`;

      pillContainer.style.borderColor = borderColor;
      pillContainer.style.background = bgColor;
      pillContainer.style.boxShadow = `0 8px 28px ${shadowColor}, inset 0 1px 0 rgba(255, 255, 255, ${(0.08 * glassFactor).toFixed(3)})`;
      const blurVal = (18 * glassFactor).toFixed(1);
      pillContainer.style.backdropFilter = `blur(${blurVal}px)`;
      pillContainer.style.webkitBackdropFilter = `blur(${blurVal}px)`;

      // Smoothly hide inner arrow & circle SVG as pill expands
      const arrowAlpha = Math.max(0, 1 - morphProgress * 2.2);
      if (pillArrowSvg) pillArrowSvg.style.opacity = arrowAlpha.toFixed(3);
      pillArrow.style.opacity = arrowAlpha.toFixed(3);
      pillArrow.style.pointerEvents = 'none';

      if (pillCircleSvg) {
        pillCircleSvg.style.display = morphProgress >= 0.95 ? 'none' : 'block';
        pillCircleSvg.style.opacity = Math.max(0, 1 - morphProgress * 2.2).toFixed(3);
      }

      // Smoothly reveal header nav links as pill expands
      const headerAlpha = Math.min(1, Math.max(0, (morphProgress - 0.20) / 0.80));
      const smoothHeaderAlpha = 1 - Math.pow(1 - headerAlpha, 2);
      pillHeader.style.opacity = smoothHeaderAlpha.toFixed(3);
      pillHeader.style.pointerEvents = morphProgress >= 0.80 ? 'auto' : 'none';
    }
  }, [getPillHeaderWidth]);

  const updateActiveNavLinks = useCallback((targetIndex) => {
    document.querySelectorAll('.pill-nav-item, .pill-logo').forEach((link) => {
      link.classList.remove('active');
    });

    const activeEl = document.querySelector(`[data-nav-target="${targetIndex}"]`);
    if (activeEl) {
      activeEl.classList.add('active');
    }
  }, []);

  const navigateToScene = useCallback((targetIndex) => {
    const idx = Math.max(0, Math.min(scenes.length - 1, targetIndex));
    let targetY = 0;
    const currentY = lenisRef.current ? lenisRef.current.scroll : window.scrollY;

    if (idx === 0) {
      targetY = 0;
    } else {
      const targetEl = document.querySelector(scenes[idx]);
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      targetY = Math.round(rect.top + currentY);
    }

    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    isSnappingRef.current = true;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, {
        duration: 0.95,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lock: false,
        onComplete: () => {
          setTimeout(() => {
            isSnappingRef.current = false;
          }, 60);
        }
      });
    } else {
      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: false },
        duration: 0.95,
        ease: 'power3.out',
        onComplete: () => {
          setTimeout(() => {
            isSnappingRef.current = false;
          }, 60);
        }
      });
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Lenis Smooth Scroll Setup
    let lenisInstance = null;
    let tickerCallback = null;

    const onScroll = (scrollY) => {
      if (scrollY > lastScrollYRef.current + 2) {
        scrollDirectionRef.current = 1;
      } else if (scrollY < lastScrollYRef.current - 2) {
        scrollDirectionRef.current = -1;
      }
      lastScrollYRef.current = scrollY;

      const viewportMid = scrollY + window.innerHeight * 0.45;
      let activeIdx = 0;

      const homeEl = document.querySelector('#home');
      const aboutEl = document.querySelector('#about');
      const workTrack = document.querySelector('.stacked-work-track') || document.querySelector('#work');
      const expEl = document.querySelector('#experience');
      const exitEl = document.querySelector('#exit');

      if (exitEl && viewportMid >= exitEl.getBoundingClientRect().top + scrollY) {
        activeIdx = 4;
      } else if (expEl && viewportMid >= expEl.getBoundingClientRect().top + scrollY) {
        activeIdx = 3;
      } else if (workTrack && viewportMid >= workTrack.getBoundingClientRect().top + scrollY) {
        activeIdx = 2;
      } else if ((aboutEl || compEl) && viewportMid >= (aboutEl ? aboutEl.getBoundingClientRect().top + scrollY : 0)) {
        activeIdx = 1;
      } else {
        activeIdx = 0;
      }

      if (activeIdx !== currentSceneIndexRef.current) {
        currentSceneIndexRef.current = activeIdx;
        updateActiveNavLinks(activeIdx);
      }

      // Calculate Home progress for Header Morph
      if (homeEl && aboutEl) {
        const homeRect = homeEl.getBoundingClientRect();
        const aboutRect = aboutEl.getBoundingClientRect();
        const homeTop = Math.round(homeRect.top + scrollY);
        const aboutTop = Math.round(aboutRect.top + scrollY);
        const distance = Math.max(1, aboutTop - homeTop);
        const progress = (scrollY - homeTop) / distance;
        updateHeaderMorphFromProgress(progress);
      }
    };

    if (!prefersReducedMotion) {
      try {
        lenisInstance = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.4
        });
        lenisRef.current = lenisInstance;

        tickerCallback = (time) => {
          if (lenisInstance) {
            lenisInstance.raf(time * 1000);
          }
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        lenisInstance.on('scroll', (e) => {
          ScrollTrigger.update();
          onScroll(e.scroll);
        });
      } catch (e) {
        console.error('Lenis initialization error:', e);
      }
    }

    const handleWindowScroll = () => {
      if (!lenisInstance) {
        onScroll(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // 2. ScrollTrigger Scenes Setup
    const ctx = gsap.context(() => {
      // Home exit
      ScrollTrigger.create({
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const nameEl = document.getElementById('hero-name-container');
          const descEl = document.getElementById('hero-descriptor-wrap');
          const actionsEl = document.getElementById('hero-actions-wrap');
          const coordEl = document.getElementById('hero-coord-anchor');
          const canvasEl = document.getElementById('home-ambient-canvas');

          const exitProgress = Math.min(1, p / 0.30);

          if (nameEl) {
            const nameY = -60 * exitProgress;
            const nameAlpha = Math.max(0, 1 - exitProgress);
            const nameScale = 1 - 0.03 * exitProgress;
            nameEl.style.transform = `translate3d(0, ${nameY.toFixed(1)}px, 0) scale(${nameScale.toFixed(3)})`;
            nameEl.style.opacity = nameAlpha.toFixed(2);
          }

          if (descEl) {
            const descY = 22 * exitProgress;
            const descAlpha = Math.max(0, 1 - exitProgress);
            descEl.style.transform = `translate3d(0, ${descY.toFixed(1)}px, 0)`;
            descEl.style.opacity = descAlpha.toFixed(2);
          }

          if (actionsEl) {
            const actionsY = 16 * exitProgress;
            const actionsAlpha = Math.max(0, 1 - exitProgress);
            actionsEl.style.transform = `translate3d(0, ${actionsY.toFixed(1)}px, 0)`;
            actionsEl.style.opacity = actionsAlpha.toFixed(2);
            actionsEl.style.pointerEvents = exitProgress > 0.1 ? 'none' : 'auto';
          }

          if (coordEl) {
            const coordX = -28 * exitProgress;
            const coordAlpha = Math.max(0, 1 - exitProgress);
            coordEl.style.transform = `translate3d(${coordX.toFixed(1)}px, 0, 0)`;
            coordEl.style.opacity = coordAlpha.toFixed(2);
          }

          if (canvasEl) {
            canvasEl.style.opacity = (0.7 * Math.max(0, 1 - 0.6 * exitProgress)).toFixed(2);
          }

          updateHeaderMorphFromProgress(p);
        }
      });

      // About scene entrance & motion
      const aboutEl = document.querySelector('#about');
      if (aboutEl) {
        const getSubProgress = (progress, start, end) => {
          if (progress <= start) return 0;
          if (progress >= end) return 1;
          return (progress - start) / (end - start);
        };

        const applyElementMotion = (el, progress, maxY, minScale) => {
          if (!el) return;
          const opacity = progress;
          const y = maxY * (1 - progress);
          const scale = minScale + (1 - minScale) * progress;
          el.style.opacity = opacity.toFixed(3);
          el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        };

        ScrollTrigger.create({
          trigger: '#about',
          start: 'top 85%',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const tagEl = aboutEl.querySelector('.about-tag-marker');
            const word1El = aboutEl.querySelector('.about-word-first');
            const word2El = aboutEl.querySelector('.about-word-second');
            const orbitalEl = aboutEl.querySelector('.about-orbital-visual');
            const leadParaEl = aboutEl.querySelector('.about-lead-para');
            const subParaEl = aboutEl.querySelector('.about-sub-para');
            const introGrid = document.getElementById('about-intro-grid');

            if (p < 0.45) {
              const inP = p / 0.45;
              if (introGrid) {
                introGrid.style.opacity = '1';
                introGrid.style.transform = 'none';
              }

              applyElementMotion(tagEl, getSubProgress(inP, 0.05, 0.30), 25, 1);
              applyElementMotion(word1El, getSubProgress(inP, 0.15, 0.45), 40, 0.94);
              applyElementMotion(word2El, getSubProgress(inP, 0.28, 0.60), 45, 0.94);
              if (orbitalEl) orbitalEl.style.opacity = (0.88 * getSubProgress(inP, 0.35, 0.65)).toFixed(3);
              applyElementMotion(leadParaEl, getSubProgress(inP, 0.45, 0.78), 22, 0.985);
              applyElementMotion(subParaEl, getSubProgress(inP, 0.58, 0.90), 18, 0.99);
            } else if (p < 0.80) {
              if (introGrid) {
                introGrid.style.opacity = '1';
                introGrid.style.transform = 'none';
              }
              if (orbitalEl) orbitalEl.style.opacity = '0.88';
              [tagEl, word1El, word2El, leadParaEl, subParaEl].forEach((el) => {
                if (el) {
                  el.style.opacity = '1';
                  el.style.transform = 'none';
                }
              });
            } else {
              const outP = (p - 0.80) / 0.20;
              const alpha = Math.max(0, 1 - outP * 1.1);
              const y = -24 * outP;
              if (introGrid) {
                introGrid.style.opacity = alpha.toFixed(3);
                introGrid.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
              }
              if (orbitalEl) orbitalEl.style.opacity = (0.88 * alpha).toFixed(3);
            }
          }
        });
      }

      // Core Competencies scene build animation with delayed lower zones and earlier scroll-out
      const compEl = document.querySelector('#competencies');
      if (compEl) {
        const zonesConfig = [
          {
            // Zone 1: Languages (Upper-Left)
            items: ['lbl-languages', 'python', 'sql'],
            start: 0.08,
            end: 0.22,
            outStart: 0.62,
            outEnd: 0.74
          },
          {
            // Zone 2: Machine Learning & Deep Learning (Upper-Right)
            items: ['lbl-ml', 'pytorch', 'scikit', 'tensorflow', 'efficientnet', 'gradcam', 'xgboost', 'opencv'],
            start: 0.14,
            end: 0.30,
            outStart: 0.64,
            outEnd: 0.76
          },
          {
            // Zone 3: Data Analysis & Visualization (Lower-Left) - Delayed entrance
            items: ['lbl-data', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'tableau', 'powerbi'],
            start: 0.28,
            end: 0.44,
            outStart: 0.68,
            outEnd: 0.80
          },
          {
            // Zone 4: Tools & Deployment (Lower-Right) - Delayed entrance
            items: ['lbl-tools', 'git', 'vscode', 'flask', 'streamlit', 'jupyter', 'linux', 'kaggle'],
            start: 0.34,
            end: 0.50,
            outStart: 0.70,
            outEnd: 0.82
          }
        ];

        ScrollTrigger.create({
          trigger: '#competencies',
          start: 'top 75%',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const compHeader = document.getElementById('comp-header');

            if (compHeader) {
              let hdrAlpha = 1;
              let hdrY = 0;
              if (p < 0.14) {
                const inP = Math.max(0, (p - 0.04) / 0.10);
                hdrAlpha = inP;
                hdrY = 14 * (1 - inP);
              } else if (p > 0.60) {
                const outP = Math.min(1, (p - 0.60) / 0.14);
                hdrAlpha = Math.max(0, 1 - outP);
                hdrY = -14 * outP;
              }
              compHeader.style.opacity = hdrAlpha.toFixed(3);
              compHeader.style.transform = `translate3d(0, ${hdrY.toFixed(1)}px, 0)`;
            }

            zonesConfig.forEach((zone) => {
              const count = zone.items.length;
              const inSpan = zone.end - zone.start;
              const inItemDur = Math.min(0.06, inSpan / Math.max(1, count));

              const outSpan = zone.outEnd - zone.outStart;
              const outItemDur = Math.min(0.06, outSpan / Math.max(1, count));

              zone.items.forEach((id, idx) => {
                const el = compEl.querySelector(`[data-comp-id="${id}"]`);
                if (!el) return;

                const inStart = zone.start + (count > 1 ? (idx / (count - 1)) * (inSpan - inItemDur) : 0);
                const inEnd = inStart + inItemDur;

                const outStart = zone.outStart + (count > 1 ? (idx / (count - 1)) * (outSpan - outItemDur) : 0);
                const outEnd = outStart + outItemDur;

                let alpha = 0;
                let y = 20;
                let scale = 0.95;

                if (p < inStart) {
                  alpha = 0;
                  y = 20;
                  scale = 0.95;
                } else if (p < inEnd) {
                  const tIn = (p - inStart) / (inEnd - inStart);
                  const smoothIn = 1 - Math.pow(1 - tIn, 2.2);
                  alpha = smoothIn;
                  y = 20 * (1 - smoothIn);
                  scale = 0.95 + 0.05 * smoothIn;
                } else if (p < outStart) {
                  alpha = 1;
                  y = 0;
                  scale = 1;
                } else if (p < outEnd) {
                  const tOut = (p - outStart) / (outEnd - outStart);
                  const smoothOut = Math.pow(tOut, 2);
                  alpha = Math.max(0, 1 - smoothOut);
                  y = -18 * smoothOut;
                  scale = 1 - 0.03 * smoothOut;
                } else {
                  alpha = 0;
                  y = -18;
                  scale = 0.97;
                }

                el.style.opacity = alpha.toFixed(3);
                el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;

                // Synchronize corresponding dot opacity
                const dot = compEl.querySelector(`[data-dot-for="${id}"]`);
                if (dot) {
                  dot.style.opacity = alpha.toFixed(3);
                }
              });
            });
          }
        });
      }

      // Scene depth transitions
      ['#experience', '#exit'].forEach((sel) => {
        const sceneEl = document.querySelector(sel);
        if (!sceneEl) return;
        const content = sceneEl.querySelector('.experience-container, .exit-inner');
        if (!content) return;

        ScrollTrigger.create({
          trigger: sceneEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let scale = 1;
            let opacity = 1;
            let y = 0;
            let blur = 0;

            if (p < 0.5) {
              const inP = p / 0.5;
              scale = 1.04 - 0.04 * inP;
              opacity = 0.35 + 0.65 * inP;
              y = 40 * (1 - inP);
              blur = 2 * (1 - inP);
            } else {
              const outP = (p - 0.5) / 0.5;
              scale = 1 - 0.04 * outP;
              opacity = 1 - 0.65 * outP;
              y = -30 * outP;
              blur = 2 * outP;
            }

            content.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
            content.style.opacity = opacity.toFixed(2);
            content.style.filter = blur > 0.15 ? `blur(${blur.toFixed(1)}px)` : 'none';
          }
        });
      });

      // Initial load entry animation (inside ctx for automatic cleanup)
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo('#ambient-light', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.4 }, 0);
        tl.fromTo('#hero-name-container', { opacity: 0, y: 28, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1.25 }, 0.25);
        tl.fromTo('#hero-coord-anchor', { opacity: 0, y: 12 }, { opacity: 0.85, y: 0, duration: 0.9 }, 0.55);
        tl.fromTo('#hero-descriptor-wrap', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.85 }, 0.72);
        tl.fromTo('#scroll-pill-morph', { opacity: 0, y: 12, xPercent: -50 }, { opacity: 1, y: 0, xPercent: -50, duration: 0.85, clearProps: 'transform' }, 1.25);
      }
    });

    updateHeaderMorphFromProgress(0);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (lenisInstance) {
        if (tickerCallback) gsap.ticker.remove(tickerCallback);
        try {
          lenisInstance.destroy();
        } catch {}
      }
      ctx.revert();
    };
  }, [updateHeaderMorphFromProgress, updateActiveNavLinks]);

  return {
    navigateToScene
  };
}
