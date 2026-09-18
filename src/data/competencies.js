export const competenciesData = [
  {
    clusterId: 'languages',
    index: '01 //',
    label: 'LANGUAGES',
    primary: [
      { id: 'python', name: 'Python', className: 'lang-python' },
      { id: 'sql', name: 'SQL', className: 'lang-sql' }
    ],
    supporting: []
  },
  {
    clusterId: 'ml-dl',
    index: '02 //',
    label: 'MACHINE LEARNING & DEEP LEARNING',
    primary: [
      { id: 'pytorch', name: 'PyTorch', className: 'ml-pytorch' },
      { id: 'scikit', name: 'Scikit-learn', className: 'ml-scikit' }
    ],
    supporting: [
      { id: 'tensorflow', name: 'TensorFlow' },
      { id: 'efficientnet', name: 'EfficientNet' },
      { id: 'gradcam', name: 'Grad-CAM' },
      { id: 'xgboost', name: 'XGBoost' },
      { id: 'opencv', name: 'OpenCV' }
    ]
  },
  {
    clusterId: 'data',
    index: '03 //',
    label: 'DATA ANALYSIS & VISUALIZATION',
    primary: [
      { id: 'pandas', name: 'Pandas', className: 'data-pandas' },
      { id: 'numpy', name: 'NumPy', className: 'data-numpy' }
    ],
    supporting: [
      { id: 'matplotlib', name: 'Matplotlib' },
      { id: 'seaborn', name: 'Seaborn' },
      { id: 'tableau', name: 'Tableau' },
      { id: 'powerbi', name: 'Power BI' }
    ]
  },
  {
    clusterId: 'tools',
    index: '04 //',
    label: 'TOOLS & DEPLOYMENT',
    primary: [
      { id: 'git', name: 'Git & GitHub', className: 'tools-git' }
    ],
    supporting: [
      { id: 'vscode', name: 'VS Code' },
      { id: 'flask', name: 'Flask' },
      { id: 'streamlit', name: 'Streamlit' },
      { id: 'jupyter', name: 'Jupyter Notebook' },
      { id: 'linux', name: 'Linux' },
      { id: 'kaggle', name: 'Kaggle' }
    ]
  }
];
