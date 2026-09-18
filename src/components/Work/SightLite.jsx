import React, { useState } from 'react';
import { sightLiteData } from '../../data/projects';
import { SightLiteVisualization } from './SightLiteVisualization';

export function SightLite({ stage = 1, onStageChange }) {
  const [internalStage, setInternalStage] = useState(1);
  const activeStage = onStageChange ? stage : internalStage;

  const handleStageClick = (s) => {
    if (onStageChange) {
      onStageChange(s);
    } else {
      setInternalStage(s);
    }
  };

  return (
    <section
      id="sightlite"
      className="scene scene-sightlite scene-casestudy scene-sticky-stage"
      data-scene-index="3"
      aria-label="Case Study SightLite"
    >
      <div className="sightlite-pin-wrap">
        {/* Left Narrative Column */}
        <div className="study-narrative-panel">
          <span className="study-tag-header" style={{ color: 'var(--signal-cyan)' }}>
            {sightLiteData.tag}
          </span>
          <h2 className="study-headline">{sightLiteData.title}</h2>

          {/* Step Narrative Container */}
          <div className="study-stages-box">
            {sightLiteData.stages.map((st) => (
              <div
                key={st.step}
                className={`study-stage-step ${activeStage === st.step ? 'is-active' : ''}`}
                id={`sl-step-${st.step}`}
                data-step={st.step}
              >
                <span className="study-step-eyebrow" style={{ color: 'var(--signal-cyan)' }}>
                  {st.eyebrow}
                </span>
                <h3 className="study-step-title">{st.title}</h3>
                <p className="study-step-desc">{st.desc}</p>
              </div>
            ))}
          </div>

          {/* Repository CTA & Step Indicators */}
          <div className="study-bottom-row">
            <div className="stage-stepper" id="sl-stepper">
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
              href={sightLiteData.repoUrl}
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

        {/* Right Simulated Browser Canvas */}
        <div className="browser-canvas-stage">
          <div className="browser-top-header">
            <div className="browser-lights-row">
              <span className="b-light"></span>
              <span className="b-light"></span>
              <span className="b-light"></span>
            </div>
            <div className="browser-url-bar">sightlite.runtime://agent/session_active</div>
          </div>
          <SightLiteVisualization stage={activeStage} />
        </div>
      </div>
    </section>
  );
}
