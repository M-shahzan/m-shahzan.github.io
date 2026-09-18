import React, { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const textRef = useRef(null);
  const ghostRef = useRef(null);
  const ghostTitleRef = useRef(null);
  const ghostMetricRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    const text = textRef.current;
    const ghost = ghostRef.current;
    const ghostTitle = ghostTitleRef.current;
    const ghostMetric = ghostMetricRef.current;

    if (!dot || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      if (ghost && ghost.classList.contains('is-visible')) {
        ghost.style.left = `${e.clientX + 24}px`;
        ghost.style.top = `${e.clientY - 30}px`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const renderCursor = () => {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      rafId = requestAnimationFrame(renderCursor);
    };

    rafId = requestAnimationFrame(renderCursor);

    // Event delegation for data-cursor hover labels
    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const label = target.getAttribute('data-cursor') || 'VIEW';
        if (text) text.textContent = label;
        follower.classList.add('is-hovering');
      }

      const row = e.target.closest('.archive-single-row, .archive-card-row');
      if (row && ghost) {
        const title = row.getAttribute('data-title') || '';
        const metric = row.getAttribute('data-metric') || '';
        if (ghostTitle) ghostTitle.textContent = title;
        if (ghostMetric) ghostMetric.textContent = metric;
        ghost.classList.add('is-visible');
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        follower.classList.remove('is-hovering');
      }

      const row = e.target.closest('.archive-single-row, .archive-card-row');
      if (row && ghost) {
        ghost.classList.remove('is-visible');
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div id="cursor-follower" ref={followerRef} className="cursor-follower" aria-hidden="true">
        <span ref={textRef} className="cursor-text">VIEW</span>
      </div>

      <div id="archive-ghost-preview" ref={ghostRef} className="ghost-cursor-preview" aria-hidden="true">
        <div className="ghost-preview-title" ref={ghostTitleRef} id="ghost-title"></div>
        <div className="ghost-preview-metric" ref={ghostMetricRef} id="ghost-metric"></div>
      </div>
    </>
  );
}
