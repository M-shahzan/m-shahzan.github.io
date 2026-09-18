import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { experimentsData } from '../data/experiments';
import { easings, durations } from '../styles/motionTokens';

export function Experiments() {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: prefersReduced ? 0 : 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.medium, ease: easings.editorial }
    }
  };

  return (
    <section id="experiments" className="scene scene-experiments" data-scene-index="4" aria-label="Research Experiments">
      <div className="exp-container">
        <motion.div
          className="exp-section-header"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: durations.entrance, ease: easings.editorial }}
        >
          <h2 className="exp-main-title">RESEARCH &amp; EXPERIMENTS</h2>
          <span className="exp-sub-label">EMPIRICAL BENCHMARKS EXTRACTED FROM REAL CODEBASES</span>
        </motion.div>

        <motion.div
          className="experiments-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {experimentsData.map((exp) => (
            <motion.div
              key={exp.id}
              className="exp-log-card"
              variants={cardVariants}
              whileHover={prefersReduced ? {} : { y: -4 }}
              transition={{ duration: durations.fast, ease: easings.editorial }}
              data-cursor="LOG"
            >
              <div className="exp-log-header">
                <span>{`${exp.id} // ${exp.category}`}</span>
                <span>{exp.source}</span>
              </div>
              <h3 className="exp-log-title">{exp.title}</h3>
              <p className="exp-log-desc">{exp.desc}</p>
              <div className="exp-telemetry-strip">
                <span>{exp.metric}</span>
                <span style={{ color: exp.statusColor }}>{exp.status}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Experiments;

