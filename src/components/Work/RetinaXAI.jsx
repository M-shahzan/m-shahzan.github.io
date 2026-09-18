import React, { useState } from 'react';
import { retinaXAIData } from '../../data/projects';
import { RetinaXAIVisualization } from './RetinaXAIVisualization';

export function RetinaXAI({ stage = 1, onStageChange }) {
  const [internalStage, setInternalStage] = useState(1);
  const activeStage = onStageChange ? stage : internalStage;

  const handleStageClick = (s) => {
    if (onStageChange) {
      onStageChange(s);
    } else {
      setInternalStage(s);
    }
  };

  const currentStageObj = retinaXAIData.stages.find(st => st.step === activeStage) || retinaXAIData.stages[0];

  return (
    <section
      id="retinaxai"
      className="scene scene-retinaxai scene-casestudy scene-sticky-stage"
      data-scene-index="2"
      aria-label="Case Study RetinaXAI"
    >
      <div className="retinaxai-pin-wrap">
        {/* Left Narrative Column */}
        <div className="study-narrative-panel">
          <span className="study-tag-header">{retinaXAIData.tag}</span>
          <h2 className="study-headline">{retinaXAIData.title}</h2>

          {/* Step Narrative Container */}
          <div className="study-stages-box">
            {retinaXAIData.stages.map((st) => (
              <div
                key={st.step}
                className={`study-stage-step ${activeStage === st.step ? 'is-active' : ''}`}
                id={`rx-step-${st.step}`}
                data-step={st.step}
              >
                <span className="study-step-eyebrow">{st.eyebrow}</span>
                <h3 className="study-step-title">{st.title}</h3>
                <p className="study-step-desc">{st.desc}</p>
              </div>
            ))}
          </div>

          {/* Repository CTA & Step Indicators */}
          <div className="study-bottom-row">
            <div className="stage-stepper" id="rx-stepper">
              {[1, 2, 3, 4].map((s) => (
                <span
                  key={s}
                  className={`step-dot ${activeStage === s ? 'is-active' : ''}`}
                  data-step={s}
                  onClick={() => handleStageClick(s)}
                />
              ))}
            </div>
            <a
              href={retinaXAIData.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="study-repo-btn"
              data-cursor="OPEN"
            >
              <span>VIEW REPOSITORY</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Procedural Retinal Canvas */}
        <div className="study-canvas-viewport">
          <RetinaXAIVisualization stage={activeStage} />
          <div className="study-canvas-badge" id="retina-telemetry">
            {currentStageObj.telemetry}
          </div>
        </div>
      </div>
    </section>
  );
}
