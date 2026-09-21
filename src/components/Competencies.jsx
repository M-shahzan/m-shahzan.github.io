import React from 'react';

export function Competencies() {
  return (
    <section id="competencies" className="scene scene-competencies" aria-label="Core Competencies">
      <div className="comp-content-container">
        <div className="comp-header" id="comp-header">
          <span className="comp-tag-marker">02. CORE COMPETENCIES</span>
        </div>

        <div className="comp-poster-canvas" id="comp-poster-canvas">
          {/* Zone 1: Languages (Upper-Left) */}
          <div className="comp-cluster comp-cluster-languages" data-cluster="languages">
            <div className="comp-cluster-label" data-comp-id="lbl-languages">
              <span className="comp-cluster-idx">01 //</span> LANGUAGES
            </div>
            <div className="comp-cluster-content">
              <div className="comp-subrow-primary">
                <span className="comp-item comp-primary lang-python" data-comp-id="python">Python</span>
                <span className="comp-item comp-supporting lang-sql" data-comp-id="sql">SQL</span>
              </div>
            </div>
          </div>

          {/* Zone 2: Machine Learning & Deep Learning (Upper-Right) */}
          <div className="comp-cluster comp-cluster-ml" data-cluster="ml-dl">
            <div className="comp-cluster-label" data-comp-id="lbl-ml">
              <span className="comp-cluster-idx">02 //</span> MACHINE LEARNING &amp; DEEP LEARNING
            </div>
            <div className="comp-cluster-content">
              <div className="comp-subrow-primary">
                <span className="comp-item comp-primary ml-pytorch" data-comp-id="pytorch">PyTorch</span>
                <span className="comp-item comp-primary ml-scikit" data-comp-id="scikit">Scikit-learn</span>
              </div>
              <div className="comp-subrow-supporting">
                <span className="comp-item comp-supporting" data-comp-id="tensorflow">TensorFlow</span>
                <span className="comp-dot" data-dot-for="efficientnet">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="efficientnet">EfficientNet</span>
                <span className="comp-dot" data-dot-for="gradcam">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="gradcam">Grad-CAM</span>
                <span className="comp-dot" data-dot-for="xgboost">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="xgboost">XGBoost</span>
                <span className="comp-dot" data-dot-for="opencv">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="opencv">OpenCV</span>
              </div>
            </div>
          </div>

          {/* Zone 3: Data Analysis & Visualization (Lower-Left) */}
          <div className="comp-cluster comp-cluster-data" data-cluster="data">
            <div className="comp-cluster-label" data-comp-id="lbl-data">
              <span className="comp-cluster-idx">03 //</span> DATA ANALYSIS &amp; VISUALIZATION
            </div>
            <div className="comp-cluster-content">
              <div className="comp-subrow-primary">
                <span className="comp-item comp-primary data-pandas" data-comp-id="pandas">Pandas</span>
                <span className="comp-item comp-primary data-numpy" data-comp-id="numpy">NumPy</span>
              </div>
              <div className="comp-subrow-supporting">
                <span className="comp-item comp-supporting" data-comp-id="matplotlib">Matplotlib</span>
                <span className="comp-dot" data-dot-for="seaborn">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="seaborn">Seaborn</span>
                <span className="comp-dot" data-dot-for="tableau">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="tableau">Tableau</span>
                <span className="comp-dot" data-dot-for="powerbi">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="powerbi">Power BI</span>
              </div>
            </div>
          </div>

          {/* Zone 4: Tools & Deployment (Lower-Right) */}
          <div className="comp-cluster comp-cluster-tools" data-cluster="tools">
            <div className="comp-cluster-label" data-comp-id="lbl-tools">
              <span className="comp-cluster-idx">04 //</span> TOOLS &amp; DEPLOYMENT
            </div>
            <div className="comp-cluster-content">
              <div className="comp-subrow-primary">
                <span className="comp-item comp-primary tools-git" data-comp-id="git">Git &amp; GitHub</span>
              </div>
              <div className="comp-subrow-supporting">
                <span className="comp-item comp-supporting" data-comp-id="vscode">VS Code</span>
                <span className="comp-dot" data-dot-for="flask">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="flask">Flask</span>
                <span className="comp-dot" data-dot-for="streamlit">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="streamlit">Streamlit</span>
                <span className="comp-dot" data-dot-for="jupyter">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="jupyter">Jupyter Notebook</span>
                <span className="comp-dot" data-dot-for="linux">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="linux">Linux</span>
                <span className="comp-dot" data-dot-for="kaggle">&bull;</span>
                <span className="comp-item comp-supporting" data-comp-id="kaggle">Kaggle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Competencies;
