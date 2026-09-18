export const retinaXAIData = {
  id: 'retinaxai',
  tag: 'CASE STUDY 01 • MEDICAL COMPUTER VISION',
  title: 'RetinaXAI',
  repoUrl: 'https://github.com/M-shahzan/Retinaxai',
  stages: [
    {
      step: 1,
      eyebrow: 'STAGE 01 // THE CLINICAL DILEMMA',
      title: "Black boxes don't get adopted in healthcare.",
      desc: "Diabetic Retinopathy and DME screening require high precision. But ophthalmologists cannot rely on unexplained probability scores that don't verify which retinal features triggered the diagnosis.",
      telemetry: 'STAGE 01 // RAW_IDRiD_BUFFER'
    },
    {
      step: 2,
      eyebrow: 'STAGE 02 // MULTI-TASK ARCHITECTURE',
      title: 'EfficientNet-B3 with Dual Task Heads',
      desc: 'Trained on the clinical IDRiD benchmark, sharing an EfficientNet backbone branching into a 5-class retinopathy severity classifier and a binary diabetic macular edema (DME) detector.',
      telemetry: 'STAGE 02 // MULTITASK_DUAL_HEADS'
    },
    {
      step: 3,
      eyebrow: 'STAGE 03 // EXPLAINABLE AI (XAI)',
      title: 'Grad-CAM Convolutional Attribution',
      desc: 'Backpropagating loss gradients into convolutional feature maps overlays spatial heatmaps highlighting microaneurysms, hemorrhages, and hard exudates for doctor inspection.',
      telemetry: 'STAGE 03 // GRADCAM_GRADIENTS_ACTIVE'
    },
    {
      step: 4,
      eyebrow: 'STAGE 04 // EMPIRICAL RESULT',
      title: '0.92 ROC-AUC on DME Detection',
      desc: 'Achieved 0.92 ROC-AUC on IDRiD DME validation and deployed via an interactive Streamlit triage dashboard categorizing referral urgency.',
      telemetry: 'STAGE 04 // VAL_AUC_0.92_CONFIRMED'
    }
  ]
};

export const sightLiteData = {
  id: 'sightlite',
  tag: 'CASE STUDY 02 • EDGE AI & AGENTS',
  title: 'SightLite',
  repoUrl: 'https://github.com/M-shahzan/SightLite',
  stages: [
    {
      step: 1,
      eyebrow: 'SIH 2026 // BACKED BY ISRO',
      title: 'Cloud-only browser agents leak credentials.',
      desc: 'Transmitting continuous high-res desktop frames to remote LLMs causes severe API latency and leaks passwords, credentials, and PII to third-party endpoints.'
    },
    {
      step: 2,
      eyebrow: 'ON-DEVICE PERCEPTION',
      title: 'Local Distilled Vision Transformer (ViT)',
      desc: 'SightLite runs a lightweight Vision Transformer on-device to extract interactive affordances (buttons, inputs, links) directly from screen buffers with sub-100ms response times.'
    },
    {
      step: 3,
      eyebrow: 'PRIVACY SHIELD',
      title: 'Client-Side PII Masking',
      desc: 'Sensitive form values and authentication fields are blurred locally before structured semantic intent is routed to remote reasoning models.'
    },
    {
      step: 4,
      eyebrow: 'HYBRID EXECUTION',
      title: 'Team Dcoders Lead • Problem SIH26171',
      desc: 'Selected in internal SIH 2026 evaluations; leading a 6-member team through architecture design, optimizing edge inference with cloud task planning.'
    }
  ]
};
