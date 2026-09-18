import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export function StageContent({
  stage,
  projectId = 'project'
}) {
  const prefersReduced = useReducedMotion();

  if (!stage) return null;

  return (
    <div
      className="stage-content-area"
      id={`${projectId}-stage-panel-${stage.step}`}
      role="tabpanel"
      aria-labelledby={`${projectId}-stage-tab-${stage.step}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.step}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReduced ? 0 : -6 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="stage-content-inner"
        >
          <span className="stage-eyebrow">{stage.eyebrow}</span>
          <h4 className="stage-title">{stage.title}</h4>
          <p className="stage-desc">{stage.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default StageContent;

