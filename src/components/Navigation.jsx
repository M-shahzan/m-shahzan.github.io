import React from 'react';
import { motion } from 'motion/react';

export function Navigation({ onNavigate }) {
  const handleClick = (e, targetIdx) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(targetIdx);
    }
  };

  return (
    <div
      id="scroll-pill-morph"
      className="scroll-pill-container"
      role="region"
      aria-label="Interactive Navigation and Scroll Indicator"
      onClick={(e) => {
        // If arrow mode is clicked, navigate to Scene 1 (About)
        const headerMode = document.getElementById('pill-header-mode');
        if (headerMode && window.getComputedStyle(headerMode).opacity === '0') {
          handleClick(e, 1);
        }
      }}
    >
      {/* State A: Animated Bottom Scroll Indicator Arrow with Dynamic Origin Dot & Circle */}
      <div className="pill-arrow-mode" id="pill-arrow-mode" aria-hidden="false">
        <svg className="pill-circle-svg" id="pill-circle-svg" viewBox="0 0 48 48" aria-hidden="true">
          <path id="pill-circle-arc-l" className="pill-circle-arc" d="M 24,46 A 22,22 0 0,0 24,2" />
          <path id="pill-circle-arc-r" className="pill-circle-arc" d="M 24,46 A 22,22 0 0,1 24,2" />
        </svg>
        <svg
          id="pill-arrow-svg"
          className="pill-arrow-svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>

      {/* State B: Transformed Floating Pill Header */}
      <nav className="pill-header-mode" id="pill-header-mode" aria-label="Main Navigation">
        <motion.a
          href="#home"
          className="pill-logo"
          data-cursor="HOME"
          data-nav-target="0"
          onClick={(e) => handleClick(e, 0)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          MS
        </motion.a>
        <div className="pill-links-group">
          <motion.a
            href="#about"
            className="pill-nav-item"
            data-cursor="VIEW"
            data-nav-target="1"
            onClick={(e) => handleClick(e, 1)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            ABOUT
          </motion.a>
          <motion.a
            href="#work"
            className="pill-nav-item"
            data-cursor="EXPLORE"
            data-nav-target="2"
            id="nav-work"
            onClick={(e) => handleClick(e, 2)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            WORK
          </motion.a>
          <motion.a
            href="#experiments"
            className="pill-nav-item"
            data-cursor="VIEW"
            data-nav-target="3"
            onClick={(e) => handleClick(e, 3)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            EXPERIMENTS
          </motion.a>
          <motion.a
            href="#exit"
            className="pill-nav-item"
            data-cursor="TALK"
            data-nav-target="4"
            onClick={(e) => handleClick(e, 4)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            CONTACT
          </motion.a>
        </div>
        <motion.a
          href="https://github.com/M-shahzan"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-nav-cta"
          data-cursor="OPEN"
          whileHover={{ scale: 1.03, y: -0.5 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>GITHUB</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.a>
      </nav>
    </div>
  );
}
