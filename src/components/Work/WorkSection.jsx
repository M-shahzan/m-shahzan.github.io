import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { StackedWork } from './StackedWork';

export function WorkSection({
  retinaStage = 1,
  sightStage = 1,
  onRetinaStageChange,
  onSightStageChange
}) {
  return (
    <section id="work" className="scene-work-section" data-scene-index="2" aria-label="Selected Systems & Work">
      <div className="work-content-container">
        <header className="work-section-header">
          <div className="work-header-tag">
            <span className="work-tag-idx">02 //</span>
            <span>SELECTED SYSTEMS</span>
          </div>
          <h2 className="work-main-title">
            ENGINEERED <span className="work-title-accent">WORKS</span>
          </h2>
          <p className="work-header-desc">
            Production-grade deep learning architectures, clinical-grade medical AI pipelines, and high-performance edge perception systems.
          </p>
        </header>

        <StackedWork
          retinaStage={retinaStage}
          sightStage={sightStage}
          onRetinaStageChange={onRetinaStageChange}
          onSightStageChange={onSightStageChange}
        />
      </div>
    </section>
  );
}

export default WorkSection;

