import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { archiveProjects } from '../../data/archive';

export function ArchiveCard() {
  const prefersReduced = useReducedMotion();

  const listContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.07,
        delayChildren: prefersReduced ? 0 : 0.12
      }
    }
  };

  const rowItemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.article
      id="archive"
      className="project-card archive-card"
      whileHover={prefersReduced ? {} : { y: -3 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Project Archive Collection"
    >
      {/* Top Header Row */}
      <div className="project-card-header archive-header">
        <div className="project-header-identity">
          <div className="project-tag-wrap">
            <span className="project-num-badge">03 //</span>
            <span className="project-tag-label">VERIFIED REPOSITORIES • SECONDARY SYSTEMS</span>
          </div>
          <h3 className="project-card-title">Project Archive</h3>
        </div>
        <span className="archive-badge-counter">4 PROJECTS</span>
      </div>

      {/* Interactive Rows Stream with Staggered Entrance */}
      <motion.div
        className="archive-card-list"
        variants={listContainerVariants}
        initial="visible"
        animate="visible"
      >
        {archiveProjects.map((proj) => (
          <motion.a
            key={proj.num}
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="archive-card-row"
            data-title={proj.modalTitle}
            data-metric={proj.modalMetric}
            data-cursor="VIEW"
            variants={rowItemVariants}
            whileHover={prefersReduced ? {} : { x: 6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            aria-label={`Open repository for ${proj.name}`}
          >
            <div className="archive-row-lead">
              <span className="archive-row-idx">{proj.num}</span>
              <span className="archive-row-title">{proj.name}</span>
            </div>

            <div className="archive-row-trail">
              <span className="archive-row-tech">{proj.tech}</span>
              <span className="archive-row-metric-pill">{proj.modalMetric.split('//')[0]}</span>
              <div className="archive-row-arrow-wrap">
                <svg
                  className="archive-row-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer Info Strip */}
      <div className="project-card-footer archive-footer">
        <span className="archive-footer-note">
          Statistical pipelines, automation bots &amp; database architectures
        </span>
        <motion.a
          href="https://github.com/M-shahzan?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="archive-all-repos-link"
          data-cursor="OPEN"
          whileHover={prefersReduced ? {} : { y: -1, x: 2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <span>ALL REPOSITORIES ON GITHUB</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.a>
      </div>
    </motion.article>
  );
}

export default ArchiveCard;

