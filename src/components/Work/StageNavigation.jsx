import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function StageNavigation({
  stages = [],
  activeStage = 1,
  onStageChange,
  projectId = 'project'
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="stage-navigation-track"
      role="tablist"
      aria-label={`${projectId} walkthrough stages`}
    >
      {stages.map((st) => {
        const isActive = activeStage === st.step;
        return (
          <motion.button
            key={st.step}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${projectId}-stage-panel-${st.step}`}
            id={`${projectId}-stage-tab-${st.step}`}
            className={`stage-nav-pill ${isActive ? 'is-active' : ''}`}
            onClick={() => onStageChange && onStageChange(st.step)}
            data-cursor="SELECT"
            whileHover={prefersReduced ? {} : { y: -1 }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            transition={{ duration: 0.16 }}
          >
            {isActive && (
              <motion.span
                layoutId={`${projectId}-active-pill`}
                className="stage-nav-pill-active-bg"
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 450, damping: 32 }
                }
              />
            )}
            <span className="stage-nav-num">
              {String(st.step).padStart(2, '0')}
            </span>
            <span className="stage-nav-label-dot" />
          </motion.button>
        );
      })}
    </div>
  );
}

export default StageNavigation;

