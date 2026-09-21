import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { dataStreamMilestones } from '../data/experience';

export function Experience() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const pathRef = useRef(null);
  const travellingDotRef = useRef(null);
  const nodeRefs = useRef([]);
  const prefersReduced = useReducedMotion();

  const [svgPath, setSvgPath] = useState('');
  const [pathLength, setPathLength] = useState(1000);
  const [activeIdx, setActiveIdx] = useState(0);

  // Measure exact node center coordinates relative to wrapperRef and construct connecting S-curve
  const calculatePath = useCallback(() => {
    if (!wrapperRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    if (wrapperRect.width <= 0) return;

    const coords = nodeRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.left - wrapperRect.left + r.width / 2),
        y: Math.round(r.top - wrapperRect.top + r.height / 2)
      };
    }).filter(Boolean);

    if (coords.length < 3) return;

    const [p1, p2, p3] = coords;
    const isMobile = window.innerWidth < 768;
    const dx = isMobile ? 18 : 34;

    // Segment 1: p1 -> p2 gentle curve to the right
    const cp1x = p1.x + dx;
    const cp1y = p1.y + (p2.y - p1.y) * 0.35;
    const cp2x = p2.x + dx;
    const cp2y = p1.y + (p2.y - p1.y) * 0.65;

    // Segment 2: p2 -> p3 gentle curve back to the left
    const cp3x = p2.x - dx * 0.7;
    const cp3y = p2.y + (p3.y - p2.y) * 0.35;
    const cp4x = p3.x - dx * 0.7;
    const cp4y = p2.y + (p3.y - p2.y) * 0.65;

    // Tail below p3
    const tailY = p3.y + (isMobile ? 24 : 40);
    const tailX = p3.x;

    const d = `M ${p1.x},${p1.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} C ${cp3x},${cp3y} ${cp4x},${cp4y} ${p3.x},${p3.y} L ${tailX},${tailY}`;
    setSvgPath(d);
  }, []);

  useEffect(() => {
    calculatePath();
    const handleResize = () => calculatePath();
    window.addEventListener('resize', handleResize);

    // Also observe mutations / font load changes
    const ro = new ResizeObserver(() => calculatePath());
    if (wrapperRef.current) ro.observe(wrapperRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
    };
  }, [calculatePath]);

  // Update path length whenever path string updates
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) {
          setPathLength(len);
          // Position travelling dot at starting point p1 initially
          if (travellingDotRef.current) {
            const startPt = pathRef.current.getPointAtLength(0);
            travellingDotRef.current.setAttribute('transform', `translate(${startPt.x}, ${startPt.y})`);
          }
        }
      } catch {
        // Fallback default
      }
    }
  }, [svgPath]);

  // Section-Level Deliberate Scroll Reveal:
  // Starts animation only after section has entered significantly into view (~45% from top)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 55%', 'end 75%']
  });

  // Dynamic path drawing tied to scroll progress
  const pathDashOffset = useTransform(
    scrollYProgress,
    [0.05, 0.92],
    [pathLength, 0]
  );

  // Track active milestone index and smoothly translate travelling dot along the stream path
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (p) => {
      if (p < 0.34) {
        setActiveIdx(0);
      } else if (p < 0.68) {
        setActiveIdx(1);
      } else {
        setActiveIdx(2);
      }

      // Smoothly move travelling dot along the exact SVG path as user scrolls
      if (pathRef.current && travellingDotRef.current) {
        try {
          const totalLen = pathRef.current.getTotalLength();
          if (totalLen > 0) {
            const isVisible = p >= 0.02 && p <= 0.98;
            travellingDotRef.current.style.opacity = isVisible ? '1' : '0';

            const progress = Math.max(0, Math.min(1, (p - 0.05) / 0.87));
            const pt = pathRef.current.getPointAtLength(progress * totalLen);
            travellingDotRef.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
          }
        } catch {
          // ignore
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="scene scene-experience"
      data-scene-index="4"
      aria-label="Experience & Education Data Stream"
    >
      <div className="stream-experience-container">
        {/* Editorial Section Header */}
        <motion.div
          className="stream-section-header"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="stream-header-tag">
            <span className="stream-tag-icon">✦</span>
            <span className="stream-tag-label">04 // DATA STREAM</span>
          </div>
          <h2 className="stream-main-title">EXPERIENCE</h2>
          <p className="stream-sub-caption">
            ACADEMIC FOUNDATION, EDGE AI ARCHITECTURE &amp; APPLIED RESEARCH
          </p>
        </motion.div>

        {/* Data Stream Flow Container with dynamically connected SVG overlay */}
        <div className="stream-flow-wrapper" ref={wrapperRef}>
          {/* Dynamic SVG Stream overlay directly linking measured node centers */}
          {svgPath && (
            <div className="stream-svg-overlay" aria-hidden="true">
              <svg className="stream-svg-canvas">
                <defs>
                  <linearGradient id="streamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Subtle dashed guide line */}
                <path
                  className="stream-path-bg"
                  d={svgPath}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Scroll-revealed solid violet active stream */}
                <motion.path
                  ref={pathRef}
                  className="stream-path-active"
                  d={svgPath}
                  stroke="url(#streamGrad)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: prefersReduced ? 0 : pathDashOffset
                  }}
                />

                {/* Active travelling pulse particle following user scroll along the curve */}
                <g
                  ref={travellingDotRef}
                  className="stream-travelling-node"
                  style={{ opacity: 0 }}
                >
                  <circle r="14" className="stream-particle-aura" />
                  <circle r="6.5" className="stream-particle-ring" />
                  <circle r="3.5" className="stream-particle-core" />
                  <circle r="1.5" fill="#ffffff" />
                </g>
              </svg>
            </div>
          )}

          {/* Milestones Flow — Unified (01 ●), Editorial, No Cards */}
          <div className="stream-milestones-column">
            {dataStreamMilestones.map((item, idx) => {
              const isCurrent = activeIdx === idx;
              const isPassed = activeIdx > idx;

              return (
                <motion.article
                  key={item.num}
                  className={`stream-milestone-entry ${isCurrent ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Lead Row: Unified Number (01) + Node Dot (●) + Category Eyebrow Rule */}
                  <div className="stream-milestone-lead">
                    <div
                      className="stream-node-unit"
                      ref={(el) => (nodeRefs.current[idx] = el)}
                      aria-hidden="true"
                    >
                      <span className="stream-node-num">{item.num}</span>
                      <div className="stream-node-dot-wrap">
                        <div className={`stream-node-halo ${isCurrent ? 'halo-active' : ''}`} />
                        <div className={`stream-node-dot ${isCurrent ? 'dot-active' : ''}`} />
                      </div>
                    </div>

                    <div className="stream-category-wrap">
                      <span className="stream-category-label">{item.category}</span>
                      <span className="stream-category-rule" aria-hidden="true" />
                      {item.badge && (
                        <span className={`stream-badge-pill ${item.badgeType === 'status' ? 'badge-status' : 'badge-tag'}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content (Clean Editorial with Comfortable Max-Width) */}
                  <div className="stream-entry-body">
                    <h3 className="stream-entry-title">{item.title}</h3>

                    <div className="stream-meta-strip">
                      <span className="stream-meta-org">{item.org}</span>
                      <span className="stream-meta-sep" aria-hidden="true">•</span>
                      <span className="stream-meta-period">{item.period}</span>
                    </div>

                    <p className="stream-entry-desc">{item.desc}</p>

                    {item.skills && item.skills.length > 0 && (
                      <div className="stream-skills-flow">
                        {item.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="stream-skill-token">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
