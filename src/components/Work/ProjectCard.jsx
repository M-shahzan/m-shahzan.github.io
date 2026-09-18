import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { StageNavigation } from './StageNavigation';
import { StageContent } from './StageContent';

export function ProjectCard({
  project,
  index = 1,
  activeStage = 1,
  onStageChange,
  visualization,
  techStack = [],
  metricHighlight = ''
}) {
  const prefersReduced = useReducedMotion();
  const currentStageObj =
    project.stages?.find((st) => st.step === activeStage) || project.stages?.[0];

  return (
    <motion.article
      id={project.id}
      className="project-card"
      initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={prefersReduced ? {} : { y: -5 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Top Header Row */}
      <div className="project-card-header">
        <div className="project-header-identity">
          <div className="project-tag-wrap">
            <span className="project-num-badge">{String(index).padStart(2, '0')} //</span>
            <span className="project-tag-label">{project.tag}</span>
          </div>
          <motion.h3
            className="project-card-title"
            whileHover={prefersReduced ? {} : { x: 3 }}
            transition={{ duration: 0.2 }}
          >
            {project.title}
          </motion.h3>
        </div>

        {project.repoUrl && (
          <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-repo-link"
            data-cursor="OPEN"
            aria-label={`View GitHub repository for ${project.title}`}
            whileHover={prefersReduced ? {} : { y: -2, x: 2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span>VIEW REPOSITORY</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.a>
        )}
      </div>

      {/* Main Grid: Visualization (Left) + 4-Stage Walkthrough (Right) */}
      <div className="project-card-body-grid">
        {/* Visualization Canvas Container */}
        <div className="project-visual-pane">
          <motion.div
            className="project-canvas-frame"
            whileHover={prefersReduced ? {} : { scale: 1.012 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {visualization}

            {/* Visual Stage Progress Indicator (●──●──○──○) tied to activeStage */}
            {project.stages && project.stages.length > 1 && (
              <div
                className="visual-stage-progress-indicator"
                aria-hidden="true"
                title={`Stage ${activeStage} of ${project.stages.length}`}
              >
                <div className="visual-stage-track">
                  {project.stages.map((st, idx) => {
                    const isPassedOrCurrent = st.step <= activeStage;
                    const isCurrent = st.step === activeStage;
                    return (
                      <React.Fragment key={st.step}>
                        {idx > 0 && (
                          <span
                            className={`visual-stage-line ${st.step <= activeStage ? 'is-active' : ''}`}
                          />
                        )}
                        <span
                          className={`visual-stage-node ${isCurrent ? 'is-current' : ''} ${isPassedOrCurrent ? 'is-filled' : ''}`}
                        />
                      </React.Fragment>
                    );
                  })}
                </div>
                <span className="visual-stage-label">
                  0{activeStage} / 0{project.stages.length}
                </span>
              </div>
            )}

            {currentStageObj?.telemetry && (
              <div className="project-telemetry-badge" aria-live="polite">
                <span className="telemetry-pulse-dot" />
                <span className="telemetry-text">{currentStageObj.telemetry}</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Four-Stage Narrative Column */}
        <div className="project-stages-pane">
          <div className="project-stages-header">
            <span className="stages-eyebrow-label">SYSTEM WALKTHROUGH</span>
            <StageNavigation
              stages={project.stages || []}
              activeStage={activeStage}
              onStageChange={onStageChange}
              projectId={project.id}
            />
          </div>

          <StageContent
            stage={currentStageObj}
            projectId={project.id}
          />
        </div>
      </div>

      {/* Footer Metadata Strip */}
      <div className="project-card-footer">
        <div className="project-tech-tags">
          {techStack.map((tech, i) => (
            <span key={i} className="project-tech-pill">
              {tech}
            </span>
          ))}
        </div>

        {metricHighlight && (
          <div className="project-metric-highlight">
            <span className="metric-icon">✦</span>
            <span className="metric-val">{metricHighlight}</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default ProjectCard;

