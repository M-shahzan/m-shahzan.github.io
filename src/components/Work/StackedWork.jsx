import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { retinaXAIData, sightLiteData } from '../../data/projects';
import { RetinaXAIVisualization } from './RetinaXAIVisualization';
import { SightLiteVisualization } from './SightLiteVisualization';
import { ProjectCard } from './ProjectCard';
import { ArchiveCard } from './ArchiveCard';

export function StackedWork({
  retinaStage = 1,
  sightStage = 1,
  onRetinaStageChange,
  onSightStageChange
}) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const [winHeight, setWinHeight] = useState(() =>
    typeof window !== 'undefined' ? Math.max(window.innerHeight, 750) : 900
  );

  useEffect(() => {
    const handleResize = () => {
      setWinHeight(Math.max(window.innerHeight, 750));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Safe offset ensuring the incoming card starts completely below the screen edge
  const bottomOffset = `${winHeight + 80}px`;

  // Scroll Progress across the Work track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Card 01 (RetinaXAI) Transforms:
  // Plateau 0.0 -> 0.15: Fully active in primary view
  // Transition 0.15 -> 0.48: Shrinks inward from both sides (scale 1 -> 0.88) & shifts up
  const card1Y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.48],
    ['0px', '0px', '-32px']
  );
  const card1Scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.48],
    [1, 1, 0.88]
  );
  const card1Opacity = useTransform(
    scrollYProgress,
    [0, 0.46, 0.52],
    [1, 1, 0]
  );
  const card1PointerEvents = useTransform(scrollYProgress, (p) =>
    p < 0.35 ? 'auto' : 'none'
  );

  // Card 02 (SightLite) Transforms:
  // 0.15 -> 0.48: Rises up continuously from the very bottom of the screen with 100% SOLID opacity
  // Plateau 0.48 -> 0.62: Fully active in primary view
  // Transition 0.62 -> 0.95: Shrinks inward from both sides (scale 1 -> 0.88) & shifts up
  const card2Y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.48, 0.62, 0.95],
    [bottomOffset, bottomOffset, '0px', '0px', '-32px']
  );
  const card2Scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.48, 0.62, 0.95],
    [1, 1, 1, 1, 0.88]
  );
  const card2Opacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.15, 0.93, 0.98],
    [0, 0, 1, 1, 0]
  );
  const card2PointerEvents = useTransform(scrollYProgress, (p) =>
    p >= 0.35 && p < 0.80 ? 'auto' : 'none'
  );

  // Card 03 (Archive) Transforms:
  // 0.62 -> 0.95: Rises up continuously from the very bottom of the screen with 100% SOLID opacity
  // Plateau 0.95 -> 1.00: Fully active in primary view
  const card3Y = useTransform(
    scrollYProgress,
    [0, 0.62, 0.95, 1.0],
    [bottomOffset, bottomOffset, '0px', '0px']
  );
  const card3Scale = useTransform(
    scrollYProgress,
    [0, 0.62, 0.95, 1.0],
    [1, 1, 1, 1]
  );
  const card3Opacity = useTransform(
    scrollYProgress,
    [0, 0.60, 0.62, 1.0],
    [0, 0, 1, 1]
  );
  const card3PointerEvents = useTransform(scrollYProgress, (p) =>
    p >= 0.80 ? 'auto' : 'none'
  );

  // Reduced motion fallback: sequential layout without absolute stacking
  if (prefersReduced) {
    return (
      <div className="reduced-work-stack">
        <div id="retinaxai" className="work-reduced-item">
          <ProjectCard
            project={retinaXAIData}
            index={1}
            activeStage={retinaStage}
            onStageChange={onRetinaStageChange}
            visualization={<RetinaXAIVisualization stage={retinaStage} />}
            techStack={['PyTorch', 'EfficientNet-B3', 'Grad-CAM', 'Clinical IDRiD', 'Streamlit']}
            metricHighlight="0.92 ROC-AUC ON DME SCREENING"
          />
        </div>
        <div id="sightlite" className="work-reduced-item">
          <ProjectCard
            project={sightLiteData}
            index={2}
            activeStage={sightStage}
            onStageChange={onSightStageChange}
            visualization={<SightLiteVisualization stage={sightStage} />}
            techStack={['Vision Transformer (ViT)', 'Edge AI', 'PII Privacy Shield', 'ISRO SIH 2026']}
            metricHighlight="SUB-100MS ON-DEVICE PERCEPTION"
          />
        </div>
        <div id="archive" className="work-reduced-item">
          <ArchiveCard />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="stacked-work-track">
      <div className="stacked-work-sticky-viewport">
        <div className="stacked-cards-deck">
          {/* Card 01: RetinaXAI */}
          <motion.div
            id="retinaxai"
            className="stacked-card-layer layer-01"
            style={{
              y: card1Y,
              scale: card1Scale,
              opacity: card1Opacity,
              pointerEvents: card1PointerEvents,
              transformOrigin: 'center center',
              zIndex: 10
            }}
          >
            <ProjectCard
              project={retinaXAIData}
              index={1}
              activeStage={retinaStage}
              onStageChange={onRetinaStageChange}
              visualization={<RetinaXAIVisualization stage={retinaStage} />}
              techStack={['PyTorch', 'EfficientNet-B3', 'Grad-CAM', 'Clinical IDRiD', 'Streamlit']}
              metricHighlight="0.92 ROC-AUC ON DME SCREENING"
            />
          </motion.div>

          {/* Card 02: SightLite */}
          <motion.div
            id="sightlite"
            className="stacked-card-layer layer-02"
            style={{
              y: card2Y,
              scale: card2Scale,
              opacity: card2Opacity,
              pointerEvents: card2PointerEvents,
              transformOrigin: 'center center',
              zIndex: 20
            }}
          >
            <ProjectCard
              project={sightLiteData}
              index={2}
              activeStage={sightStage}
              onStageChange={onSightStageChange}
              visualization={<SightLiteVisualization stage={sightStage} />}
              techStack={['Vision Transformer (ViT)', 'Edge AI', 'PII Privacy Shield', 'ISRO SIH 2026']}
              metricHighlight="SUB-100MS ON-DEVICE PERCEPTION"
            />
          </motion.div>

          {/* Card 03: Archive */}
          <motion.div
            id="archive"
            className="stacked-card-layer layer-03"
            style={{
              y: card3Y,
              scale: card3Scale,
              opacity: card3Opacity,
              pointerEvents: card3PointerEvents,
              transformOrigin: 'center center',
              zIndex: 30
            }}
          >
            <ArchiveCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default StackedWork;

