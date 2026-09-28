import React, { useState } from 'react';
import { BackgroundLayers } from './components/BackgroundLayers';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Competencies } from './components/Competencies';
import { WorkSection } from './components/Work/WorkSection';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { useTheme } from './hooks/useTheme';
import { useSceneEngine } from './hooks/useSceneEngine';
import './styles/style.css';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [retinaStage, setRetinaStage] = useState(1);
  const [sightStage, setSightStage] = useState(1);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const { navigateToScene } = useSceneEngine({
    onRetinaStageChange: setRetinaStage,
    onSightStageChange: setSightStage
  });

  return (
    <>
      <BackgroundLayers />
      <Navigation onNavigate={navigateToScene} />

      <main id="scenes-wrapper">
        <Hero
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigate={navigateToScene}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <About />
        <Competencies />
        <WorkSection
          retinaStage={retinaStage}
          sightStage={sightStage}
          onRetinaStageChange={setRetinaStage}
          onSightStageChange={setSightStage}
        />
        <Experience />
        <Contact />
      </main>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}

export default App;
