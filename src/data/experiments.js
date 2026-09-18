export const experimentsData = [
  {
    id: 'EXP-001',
    category: 'CLASSIFICATION ABLATION',
    source: 'KAGGLE TITANIC',
    title: 'Cross-Validation Model Benchmark',
    desc: 'Evaluated Random Forest vs Decision Trees vs Logistic Regression on engineered social title and family features under 5-fold stratified cross-validation.',
    metric: 'RANDOM FOREST: 77.6% CV F1',
    status: 'BEST MODEL',
    statusColor: 'var(--signal-violet-bright)'
  },
  {
    id: 'EXP-002',
    category: 'ATTRIBUTION FIDELITY',
    source: 'RETINAXAI (IDRiD)',
    title: 'Grad-CAM Convolutional Gradient Tracing',
    desc: 'Backpropagating target class scores through EfficientNet-B3 final convolutional layers to verify lesion overlap with ophthalmologist annotations.',
    metric: 'DME DETECTOR: 0.92 ROC-AUC',
    status: 'VALIDATED',
    statusColor: 'var(--signal-emerald)'
  },
  {
    id: 'EXP-003',
    category: 'EDGE INFERENCE LATENCY',
    source: 'SIGHTLITE (SIH 2026)',
    title: 'Client-Side ViT vs Remote Roundtrip',
    desc: 'Benchmarked local quantized Vision Transformer bounding box extraction against full-frame cloud API calls, eliminating credential transmission.',
    metric: 'PRIVACY LEAKAGE: 0%',
    status: 'ON-DEVICE SHIELD',
    statusColor: 'var(--signal-cyan)'
  },
  {
    id: 'EXP-004',
    category: 'COMPOSITE RISK SCORING',
    source: 'PROCUREMENT HUB',
    title: 'Multi-Factor Supplier Weighted Clustering',
    desc: 'Combined Random Forest risk classification with KNN nearest-neighbor supplier clustering for automated purchase order distribution.',
    metric: 'DISPATCH OVERHEAD: -60%',
    status: 'SIMULATED POs',
    statusColor: 'var(--text-muted)'
  }
];
