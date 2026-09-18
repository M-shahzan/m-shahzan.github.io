import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { easings, durations } from '../styles/motionTokens';

export function Contact() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="exit" className="scene scene-exit" data-scene-index="5" aria-label="Contact">
      <div className="exit-inner">
        <div>
          <motion.h2
            className="exit-giant-title"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: durations.entrance, ease: easings.editorial }}
          >
            WHAT SHOULD<br />WE BUILD?
          </motion.h2>

          <div className="exit-links-track">
            <motion.a
              href="mailto:shahzanarmar01@gmail.com"
              className="exit-single-link"
              data-cursor="TALK"
              whileHover={prefersReduced ? {} : { x: 6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: durations.fast, ease: easings.editorial }}
            >
              <span>EMAIL // shahzanarmar01@gmail.com</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.a>

            <motion.a
              href="https://github.com/M-shahzan"
              target="_blank"
              rel="noopener noreferrer"
              className="exit-single-link"
              data-cursor="OPEN"
              whileHover={prefersReduced ? {} : { x: 6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: durations.fast, ease: easings.editorial }}
            >
              <span>GITHUB ↗</span>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/mohammed-shahzan-armar-2ab1a82a4?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="exit-single-link"
              data-cursor="OPEN"
              whileHover={prefersReduced ? {} : { x: 6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: durations.fast, ease: easings.editorial }}
            >
              <span>LINKEDIN ↗</span>
            </motion.a>
          </div>
        </div>

        <div className="exit-footer-row">
          <div>MOHAMMED SHAHZAN ARMAR &bull; FINAL-YEAR DATA SCIENCE (VTU)</div>
          <div>&copy; 2026 &bull; MACHINE LEARNING &amp; SYSTEMS</div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

