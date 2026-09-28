/**
 * Comprehensive Resume Data Specification
 * Exact match with Mohammed Shahzan Armar's official resume
 */
import { personalLinks } from './links';

export const resumeData = {
  header: {
    name: 'Mohammed Shahzan Armar',
    phone: '+91-9380736486',
    email: 'shahzanarmar01@gmail.com',
    location: 'Bhatkal, Karnataka, India',
    links: [
      { label: 'LinkedIn', url: personalLinks.linkedin },
      { label: 'GitHub', url: personalLinks.github },
      { label: 'Portfolio', url: 'https://m-shahzan.github.io' }
    ]
  },
  education: [
    {
      institution: 'Anjuman Institute of Technology and Management (VTU)',
      location: 'Bhatkal, Karnataka',
      degree: 'B.E. in Computer Science and Engineering (Data Science)',
      period: 'Expected 2027'
    }
  ],
  projects: [
    {
      title: 'RetinaXAI: Explainable AI for Diabetic Retinopathy and DME Detection',
      tech: 'Python, Deep Learning, Explainable AI',
      repoUrl: 'https://github.com/M-shahzan/Retinaxai',
      bullets: [
        'Built a deep learning pipeline that grades diabetic retinopathy and detects diabetic macular edema from retinal fundus images, with explainability to support clinical interpretation.',
        'Achieved a DR quadratic weighted kappa of 0.6452 and a DME ROC-AUC of 0.9244 in the Review 1 evaluation.',
        'Diagnosed low Grade-4 (PDR) sensitivity of about 38% and planned a fix using oversampling and focal loss.'
      ]
    },
    {
      title: 'SightLite: On-Device Visual Perception for Browser Agents',
      tech: 'Vision Transformer, LLM, Smart India Hackathon 2026',
      repoUrl: 'https://github.com/M-shahzan/SightLite',
      bullets: [
        'Designed a hybrid client-server architecture pairing a local Vision Transformer for on-device perception with a remote LLM for reasoning, for an ISRO-backed problem statement (SIH26171).',
        'Worked in a 6-member team (Dcoders); produced the pitch deck, technical report, and Q&A preparation mapped to the judging criteria.'
      ]
    },
    {
      title: 'AI Email Assistant',
      tech: 'Flask, Hugging Face Transformers, SQLite, Bootstrap 5',
      repoUrl: 'https://github.com/M-shahzan',
      bullets: [
        'Built a web app that classifies emails using zero-shot NLI with facebook/bart-large-mnli, evaluated on the Enron corpus with a proper train/test split.',
        'Stored results in SQLite and delivered a responsive Bootstrap 5 interface backed by a Flask API.'
      ]
    },
    {
      title: 'Titanic Survival Prediction',
      tech: 'Python, Pandas, scikit-learn',
      repoUrl: 'https://github.com/M-shahzan/titanic-survival-ml',
      bullets: [
        'Completed feature engineering and model tuning for the Kaggle Titanic competition, scoring 0.77751 (top ~23%).',
        'Published the full workflow on GitHub (titanic-survival-ml).'
      ]
    }
  ],
  skills: {
    languages: 'Python, JavaScript, HTML/CSS, SQL',
    mlData: 'Pandas, NumPy, scikit-learn, XGBoost, Hugging Face Transformers, Explainable AI',
    webTools: 'Flask, Bootstrap, SQLite, Git, GitHub, Kaggle',
    coursework: 'Machine Learning, Exploratory Data Analysis, Data Visualization'
  },
  leadership: [
    {
      role: 'Organizer',
      title: 'ArenaX, STEM’25',
      org: 'Anjuman Institute of Technology and Management',
      year: '2025',
      bullets: [
        'Contributed to organizing and coordinating ArenaX as part of STEM’25.',
        'Assisted with event activities and participant coordination during the event.'
      ]
    },
    {
      role: 'Participant, Problem Statement SIH26171',
      title: 'Smart India Hackathon 2026',
      org: 'Team Dcoders',
      year: '2026',
      bullets: []
    }
  ]
};

export default resumeData;
