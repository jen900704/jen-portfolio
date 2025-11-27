import { useState, useEffect } from "react";
import "./App.css";
import { PortfolioFlipbook } from "./PortfolioFlipbook";

const poemGroups: string[][] = [
  [
    "In a quiet bandwidth, a voice hesitates.",
    "Data becomes a choreography of interrupted breaths.",
  ],
  [
    "Silence is a feature we never fully annotated.",
    "Every glitch in the signal feels a little like memory.",
  ],
  [
    "Somewhere between noise and meaning, I am listening.",
    "I wait for the moment a voice begins to forgive itself.",
  ],
];

function App() {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);

  const handleNextPoem = () => {
    setCurrentPoemIndex((prev) => (prev + 1) % poemGroups.length);
  };

  useEffect(() => {
    const root = document.documentElement;

    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty("--pointer-x", `${x}%`);
      root.style.setProperty("--pointer-y", `${y}%`);
    };

    let lastY = window.scrollY;
    let lastT = performance.now();

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const ratio = window.scrollY / maxScroll;

      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = now - lastT || 1;
      lastY = window.scrollY;
      lastT = now;

      const velocity = Math.min(1, (Math.abs(dy) / dt) * 40);

      root.style.setProperty("--scroll-ratio", ratio.toString());
      root.style.setProperty("--scroll-velocity", velocity.toString());
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    root.style.setProperty("--pointer-x", "50%");
    root.style.setProperty("--pointer-y", "30%");
    handleScroll();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const durationMs = 8000;
    const timer = window.setTimeout(() => {
      setCurrentPoemIndex((prev) => (prev + 1) % poemGroups.length);
    }, durationMs);
    return () => window.clearTimeout(timer);
  }, [currentPoemIndex]);

    return (
    <div className="page" id="top">
      {/* 背景：只放光暈，不包內容 */}
      <div className="art-field art-field--active">
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
        <span className="orb orb--4" />
      </div>


      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-top-links">
            <a
  href="https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/Resume_HCY.pdf"
  target="_blank"
  rel="noopener noreferrer"
>
              CV
            </a>
            <a href="mailto:hyeh10@jh.edu">Email</a>
            <a
              href="https://www.linkedin.com/in/hsiang-chen-yeh-760bb02ba"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <h1 className="name">Hsiang-Chen Yeh</h1>

          <p className="tagline">
            Computational Mental Health · Speech &amp; Language · Trauma
          </p>

          <p className="sub">
            I build systems that listen—to voices, to language, to silence.
          </p>

          <div className="poem-block" onClick={handleNextPoem}>
            {poemGroups[currentPoemIndex].map((line, i) => (
              <p key={`${currentPoemIndex}-${i}`} className="poem-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT：左側 sticky nav + 右側內容 */}
      <div className="main-layout">
        <nav className="side-nav">
  <div className="side-nav-inner">
    <div className="side-nav-label">Sections</div>

    <a href="#top" className="side-nav-link">Top</a>
    <a href="#about" className="side-nav-link">About</a>

    {/* 這三行是你必須修正的 */}
    <a href="#research" className="side-nav-link">Publications</a>
    <a href="#projects" className="side-nav-link">Projects</a>
    <a href="#art-portfolio" className="side-nav-link">Art Portfolio</a>
    <a href="#exhibitions" className="side-nav-link">Exhibitions</a>
    <a href="#clinical" className="side-nav-link">Clinical Training</a>
    <a href="#education" className="side-nav-link">Education</a>
  </div>
</nav>


        <div className="main-sections">
          {/* ABOUT */}
          <section className="section section-about" id="about">
            <div className="about-inner">
              <div className="about-text">
                <h2 className="title">About</h2>
                <p className="text">
                  I am a dual-degree graduate student in Clinical Mental Health
                  Counseling and Computer Science at Johns Hopkins University
                  and the University of Colorado Boulder. My work lies at the
                  intersection of speech, language, trauma, and psychological
                  experience. I study how people express pain, agency, and
                  emotion through their voices and words, whether in clinical
                  conversations, large-scale text corpora, or real-world digital
                  interactions.
                </p>
                <p className="text">
                  My research spans trauma-informed language analysis,
                  speech-based depression detection, psycholinguistic
                  attribution modeling, and interactive tools for medical
                  imaging. I collaborate with groups such as the{" "}
                  <a
                    href="https://sites.google.com/view/jhusmile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Smile (Speech and Machine Learning) Lab
                  </a>{" "}
                  at the{" "}
                  <a
                    href="https://www.clsp.jhu.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Johns Hopkins Center for Language and Speech Processing
                    (CLSP)
                  </a>{" "}
                  (PI: Dr. Berrak Sisman), the{" "}
                  <a
                    href="https://labs.utdallas.edu/realm/people/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    REALM Lab
                  </a>{" "}
                  at UT Dallas (PI: Dr. Ryan L. Boyd), and the BodyMaps team in
                  the{" "}
                  <a
                    href="https://ccvl.jhu.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Computational Cognition, Vision, and Learning (CCVL)
                    research group
                  </a>{" "}
                  at Johns Hopkins University (led by Dr. Zongwei Zhou; CCVL
                  PI: Dr. Alan Yuille). I also work with{" "}
                  <a
                    href="https://education.jhu.edu/directory/norma-l-day-vines-phd/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dr. Norma Day-Vines
                  </a>
                  ’ Counseling Research Team and{" "}
                  <a
                    href="https://nursing.jhu.edu/faculty-research/faculty/directory/tamar-rodney/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dr. Tamar Rodney
                  </a>
                  ’s Trauma Intervention Team, as well as collaborators on
                  digital mental health initiatives with{" "}
                  <a
                    href="https://wellcheq.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wellcheq
                  </a>{" "}
                  and VR-based intervention development with{" "}
                  <a
                    href="https://medicine.yale.edu/yigh/sustainable-health-initiative/venture-development-program/spring-2025-cohort/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Heal Aura
                  </a>
                  . These projects integrate clinical sensitivity with
                  computational rigor to better understand human experience and
                  resilience.
                </p>

                <p className="text">
                  I am especially interested in models that listen for more than
                  symptoms. I focus on subtle linguistic and acoustic patterns
                  that accompany mental health recovery, adaptation, and
                  emotional complexity.
                </p>
              </div>

              <div className="about-photo-wrapper">
                <div className="about-photo-ring">
                  <img
                    src={`${import.meta.env.BASE_URL}portrait.png`}
                    alt="Portrait of Hsiang-Chen Yeh"
                    className="about-photo"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* PUBLICATIONS / RESEARCH */}
<section className="section section-research" id="research">
  <h2 className="title">Publications &amp; Research</h2>
  <div className="grid">
    {/* 1. Speech Depression Detection */}
    <article className="card">
      <div className="card-glow" />

      <div className="pub-date">Oct 2025 – Present</div>

      <h3>Speech-Based Depression Detection</h3>

      <div className="pub-lab-block">
        <span className="pub-lab-name">
          Smile Lab, Johns Hopkins University
        </span>
        <span className="pub-advisor">Advised by Dr. Berrak Sisman</span>
      </div>

      <p>
        Deep-learning analysis of depressive and emotional expression across
        clinical and spontaneous speech corpora. Work integrates prosodic,
        spectral, and semantic features with an emphasis on interpretability and
        clinically meaningful acoustic–linguistic modeling. A first-author
        manuscript is being prepared for INTERSPEECH 2026.
      </p>

      <div className="pub-footer">
        <div className="pub-venue-group">
          <button
            type="button"
            className="badge badge-venue has-status"
            data-status="Manuscript in preparation"
          >
            INTERSPEECH
          </button>
        </div>
        <div className="pub-skill-group">
  <span className="badge-firstauthor">FIRST AUTHOR</span>
  
  <span className="badge badge-skill">Speech &amp; language</span>
  <span className="badge badge-skill">Depression detection</span>
  <span className="badge badge-skill">Deep learning</span>
</div>

      </div>
    </article>

    {/* 2. Attribution & Psycholinguistics */}
    <article className="card">
      <div className="card-glow" />

      <div className="pub-date">Oct 2025 – Present</div>

      <h3>Attribution &amp; Psycholinguistics</h3>

      <div className="pub-lab-block">
        <span className="pub-lab-name">
          REALM Lab, The University of Texas at Dallas
        </span>
        <span className="pub-advisor">Advised by Dr. Ryan L. Boyd</span>
      </div>

      <p>
        Large-scale modeling of attributional language using AttributioNet
        across datasets such as BPD MTurk, TED Talks, and the Blog Authorship
        Corpus. Work includes data quality filtering, aggregation, reliability
        checks, and correlation analyses linking explanatory styles to validated
        psychological scales.
      </p>

      <div className="pub-footer">
        <div className="pub-venue-group">
          <button
            type="button"
            className="badge badge-venue has-status"
            data-status="Paper planned"
          >
            Journal article
          </button>
        </div>
        <div className="pub-skill-group">
          <span className="badge badge-skill">Psycholinguistics</span>
          <span className="badge badge-skill">Attribution modeling</span>
          <span className="badge badge-skill">Large-scale text</span>
        </div>
      </div>
    </article>

    {/* 3. Medical Imaging Interaction & Web-Based CT Viewer */}
    <article className="card">
      <div className="card-glow" />

      <div className="pub-date">Aug 2025 – Present</div>

      <h3>Medical Imaging Interaction &amp; Web-Based CT Viewer</h3>

      <div className="pub-lab-block">
        <span className="pub-lab-name">
          CCVL / BodyMaps, Johns Hopkins University
        </span>
        <span className="pub-advisor">Advised by Dr. Zongwei Zhou</span>
      </div>

      <p>
        Developer for a web-based CT search-and-viewer system for large
        thoracic segmentation datasets (PanTS, 300GB+). The interface supports
        structured case search, slice navigation, organ mask overlays, opacity
        controls, and PNG/GIF/video export, and serves as a front-end prototype
        for the BodyMaps platform.
      </p>

      <div className="pub-footer">
        <div className="pub-venue-group">
          <button
            type="button"
            className="badge badge-venue has-status"
            data-status="Manuscript in preparation"
          >
            MICCAI
          </button>
        </div>
        <div className="pub-skill-group">
          <span className="badge badge-skill">Medical imaging</span>
          <span className="badge badge-skill">Web-based CT viewer</span>
          <span className="badge badge-skill">TypeScript / React</span>
        </div>
      </div>
    </article>

    {/* 4. HCI / IMWUT */}
    <article className="card">
      <div className="card-glow" />

      <div className="pub-date">May 2025 – Oct 2025</div>

      <h3>Music, Emotion, and Memory – Melody2Memory Project</h3>

      <div className="pub-lab-block">
        <span className="pub-lab-name">
          Institute for AI Industry Research (AIR), Tsinghua University
        </span>
        <span className="pub-advisor">Advised by Dr. Jiangtao Gong</span>
      </div>

      <p>
        Collaborative HCI study on how AI-generated multimodal cues (music and
        imagery) shape autobiographical memory recall, emotional processing, and
        cognitive reappraisal. Contributions include experimental design,
        psychological scale construction, survey implementation, quantitative
        modeling, and interpretation of findings.
      </p>

      <div className="pub-footer">
        <div className="pub-venue-group">
          <button
            type="button"
            className="badge badge-venue has-status"
            data-status="Under review"
          >
            IMWUT
          </button>
        </div>
        <div className="pub-skill-group">
          <span className="badge badge-skill">HCI</span>
          <span className="badge badge-skill">Emotion &amp; memory</span>
          <span className="badge badge-skill">Multimodal interaction</span>
        </div>
      </div>
    </article>

    {/* 5. Trauma Review 1 */}
    <article className="card">
      <div className="card-glow" />

      <div className="pub-date">Mar 2025 – Oct 2025</div>

      <h3>
        Trauma-Informed Linguistic Analysis of Scam-Based Human Trafficking
      </h3>

      <div className="pub-lab-block">
        <span className="pub-lab-name">
          Trauma Intervention Research Team, Johns Hopkins School of Nursing
        </span>
        <span className="pub-advisor">Advised by Dr. Tamar Rodney</span>
      </div>

      <p>
        A trauma-informed review examining linguistic, technological,
        psychological, and structural dimensions of scam-based human
        trafficking. The manuscript synthesizes interdisciplinary work on
        coercion, exploitation, help-seeking, and trauma recovery.
      </p>

      <div className="pub-footer">
        <div className="pub-venue-group">
          <button
            type="button"
            className="badge badge-venue has-status"
            data-status="Under review"
          >
            Trauma, Violence &amp; Abuse
          </button>
        </div>
        <div className="pub-skill-group">
          <span className="badge-firstauthor">FIRST AUTHOR</span>
          <span className="badge badge-skill">Trauma &amp; linguistics</span>
          <span className="badge badge-skill">Human trafficking</span>
          <span className="badge badge-skill">Interdisciplinary review</span>
        </div>
      </div>
    </article>

    {/* 6. Trauma Review 2 / Empirical Study */}
    <article className="card">
      <div className="card-glow" />

      <div className="pub-date">Nov 2024 – Dec 2025</div>

      <h3>Linguistic Patterns in Trauma Intervention and Recovery</h3>

      <div className="pub-lab-block">
        <span className="pub-lab-name">
          Trauma Intervention Research Team, Johns Hopkins School of Nursing
        </span>
        <span className="pub-advisor">Advised by Dr. Tamar Rodney</span>
      </div>

      <p>
        Empirical work in progress developing a framework for analyzing language
        used in trauma intervention contexts, with attention to emotion
        expression, cognitive processing, and interpersonal dynamics. Planned as
        a subsequent empirical paper building on the existing review.
      </p>

      <div className="pub-footer">
        <div className="pub-venue-group">
          <button
            type="button"
            className="badge badge-venue has-status"
            data-status="Manuscript in preparation"
          >
            Journal article
          </button>
        </div>
        <div className="pub-skill-group">
          <span className="badge-firstauthor">FIRST AUTHOR</span>
          <span className="badge badge-skill">Clinical linguistics</span>
          <span className="badge badge-skill">Trauma intervention</span>
          <span className="badge badge-skill">Quantitative modeling</span>
        </div>
      </div>
    </article>

    {/* 7. Counseling Processes & Broaching */}
    <article className="card">
      <div className="card-glow" />

      <div className="pub-date">Oct 2024 – Present</div>

      <h3>Counseling Processes &amp; Broaching Attitudes</h3>

      <div className="pub-lab-block">
        <span className="pub-lab-name">
          Johns Hopkins University School of Education
        </span>
        <span className="pub-advisor">Advised by Dr. Norma Day-Vines</span>
      </div>

      <p>
        Quantitative study on the relationship between counselors&apos; social
        dominance attitudes and their broaching orientations in multicultural
        counseling. Current work focuses on measure design, data collection, and
        analytic planning for modeling counselor beliefs and behaviors.
      </p>

      <div className="pub-footer">
        <div className="pub-venue-group">
          <button
            type="button"
            className="badge badge-venue has-status"
            data-status="Manuscript in preparation"
          >
            Journal of Counseling & Development
          </button>
        </div>
        <div className="pub-skill-group">
          <span className="badge badge-skill">Multicultural counseling</span>
          <span className="badge badge-skill">Broaching</span>
          <span className="badge badge-skill">Quantitative methods</span>
        </div>
      </div>
    </article>
    
        {/* 6. Prosocial Lying – Linguistic Features */}
<article className="card">
  <div className="card-glow" />

  <div className="pub-date">Sep 2022 – Apr 2023</div>

  <h3 className="card-title">Prosocial Lying: Linguistic Features via LIWC</h3>

  <div className="pub-lab-block">
    <div className="pub-lab-name">
      Forensic Psychology Lab, Fu Jen Catholic University
    </div>
    <span className="pub-advisor">Advised by Dr. Chien Huang</span>
  </div>

  <p className="card-text">
    Research examining linguistic markers of prosocial lying using LIWC-based
    computational lexical analysis. Findings indicate systematic differences in
    pronoun use, cognitive-process terms, and hesitation markers between
    prosocial lies and truthful responses.
  </p>

  {/* 我的作品連結：PDF */}
  <div className="card-links">
    <a
      href="https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/04以電腦化字詞分析探討利社會說謊語言風格.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="link-pill"
    >
      Poster (PDF)
    </a>
  </div>

  {/* 場域／官方連結 & tag */}
  <div className="pub-footer">
    <div className="pub-venue-group">
      <a
        href="https://taclip.org.tw/2023%EF%BD%9C%E6%9C%83%E5%93%A1%E5%A4%A7%E6%9C%83%E6%9A%A8%E5%AD%B8%E8%A1%93%E7%A0%94%E8%A8%8E%E6%9C%83/"
        target="_blank"
        rel="noopener noreferrer"
        className="badge badge-venue"
      >
        Presented at the Annual Conference of the Taiwanese Association of
Clinical Psychology
      </a>
    </div>

    <div className="pub-skill-group">
      <span className="badge badge-skill">LIWC</span>
      <span className="badge badge-skill">Deception</span>
      <span className="badge badge-skill">Psycholinguistics</span>
    </div>
  </div>
</article>

{/* 7. NSTC Research Grant – Moral Disengagement & Hate Speech */}
<article className="card">
  <div className="card-glow" />

  <div className="pub-date">Oct 2022 – Mar 2024</div>

  <h3 className="card-title">
    Effects of Moral Disengagement, Deindividuation, and Self-Control on
    Hate-Speech Language
  </h3>

  <div className="pub-lab-block">
    <span className="pub-lab-name">
      Forensic Psychology Lab, Fu Jen Catholic University
    </span>
    <span className="pub-advisor">Advised by Dr. Chien Huang</span>
  </div>

  <p className="card-text">
    Competitively funded research (NSTC undergraduate grant, ~30% acceptance
    rate) examining how moral disengagement, reduced self-control, and
    deindividuation shape linguistic aggression on social media.
  </p>

  {/* 我的作品連結：結案報告 */}
  <div className="card-links">
    <a
      href="https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/03科技部計畫結案報告.pdf"
      className="link-pill"
      target="_blank"
      rel="noopener noreferrer"
    >
      Paper (PDF)
    </a>
  </div>

  {/* 場域／官方連結 & tag */}
  <div className="pub-footer">
    <div className="pub-venue-group">
      <a
        href="https://wsts.nstc.gov.tw/STSWeb/Award/AwardMultiQuery.aspx?year=112&code=QS05&organ=&name=%e8%91%89%e7%bf%94%e7%a6%8e"
        className="badge badge-venue"
        target="_blank"
        rel="noopener noreferrer"
      >
        NSTC Undergraduate Research Grant
      </a>
    </div>

    <div className="pub-skill-group">
      <span className="badge-firstauthor">FIRST AUTHOR</span>
      <span className="badge badge-skill">Clinical psychology</span>
      <span className="badge badge-skill">Social media</span>
      <span className="badge badge-skill">Quantitative analysis</span>
    </div>
  </div>
</article>

</div>
</section>




          {/* PROJECTS */}
          <section className="section section-projects" id="projects">
            <h2 className="title">Projects</h2>

            <div className="grid">
              {/* 1. Web-Based CT Search & Viewer */}
              <article className="card">
                <div className="card-glow" />
                <h3 className="card-title">
                  Web-Based CT Search &amp; Viewer (BodyMaps / PanTS)
                </h3>
                <p className="card-text">
                  Interactive CT search and visualization interface for large
                  thoracic segmentation datasets (PanTS, 300GB+). Combines a
                  structured case search panel with a 3D viewer that supports
                  slice navigation, organ label overlays, opacity controls, and
                  export of PNG/GIF/video for clinical review and teaching.
                </p>
                <div className="card-links">
                  <a
                    className="link-pill"
                    href="https://github.com/jen900704/BodyMaps-Search"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>
                  <a
                    className="link-pill"
                    href="https://huggingface.co/spaces/jen900704/PanTS_Search"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live demo
                  </a>
                  <span className="link-pill link-pill--muted">React</span>
<span className="link-pill link-pill--muted">Flask</span>
<span className="link-pill link-pill--muted">Medical imaging</span>

                </div>
              </article>

              {/* 2. Random Forest MDD */}
              <article className="card">
                <div className="card-glow" />
                <h3 className="card-title">
                  Random Forest MDD Severity Prediction
                </h3>
                <p className="card-text">
                  Predictive modeling of baseline MADRS1 using clinical and
                  demographic variables. Implements a linear regression baseline
                  and a Random Forest regressor, with evaluation and feature
                  importance analysis for interpretability.
                </p>
                <div className="card-links">
                  <a
                    className="link-pill"
                    href="https://github.com/jen900704/Random-Forest-MDD-Severity-Prediction"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <span className="link-pill link-pill--muted">Python</span>
<span className="link-pill link-pill--muted">scikit-learn</span>

                </div>
              </article>

                  {/* 3. TF-IDF Disaster Tweet Classification */}
<article className="card">
  <div className="card-glow" />

  <h3 className="card-title">
    TF-IDF Disaster Tweet Classification
  </h3>

  <p className="card-text">
    Natural language processing project based on the Kaggle
    “Natural Language Processing with Disaster Tweets” competition.
    Builds a TF-IDF + logistic regression pipeline to classify tweets
    as disaster-related or non-disaster-related, including text
    cleaning, feature engineering, model training, evaluation, and
    creation of a Kaggle submission file.
  </p>

  <div className="card-links">
    <a
      className="link-pill"
      href="https://github.com/jen900704/TF-IDF-logistic-regression-disaster-tweet-classification"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
    </a>

    {/* 這三個是技術標籤，和其他專案保持一致 */}
    <span className="link-pill link-pill--muted">TF-IDF</span>
    <span className="link-pill link-pill--muted">Logistic Regression</span>
    <span className="link-pill link-pill--muted">NLP</span>
  </div>
</article>


              {/* 4. PCA + K-Means */}
              <article className="card">
                <div className="card-glow" />
                <h3 className="card-title">PCA and K-Means Clustering</h3>
                <p className="card-text">
                  Unsupervised exploration of a tabular dataset using PCA for
                  dimensionality reduction and K-Means clustering. Includes
                  visualizations of cluster structure in the reduced feature
                  space.
                </p>
                <div className="card-links">
                  <a
                    className="link-pill"
                    href="https://github.com/jen900704/Unsupervised-learning-using-PCA-and-K-means-clustering"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <span className="link-pill link-pill--muted">Unsupervised learning</span>

                </div>
              </article>

              {/* 5. CNN Cancer Classification */}
              <article className="card">
                <div className="card-glow" />
                <h3 className="card-title">CNN Cancer Detection</h3>
                <p className="card-text">
                  Convolutional neural network for binary cancer image
                  classification on a Kaggle-style dataset. Covers data loading,
                  model definition, training loop, and evaluation metrics.
                </p>
                <div className="card-links">
                  <a
                    className="link-pill"
                    href="https://github.com/jen900704/CNN-Cancer-Classification"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <span className="link-pill link-pill--muted">
                    CNN · Medical imaging
                  </span>
                </div>
              </article>
            </div>
          </section>

          <section className="section section-art-portfolio" id="art-portfolio">
  <div className="art-portfolio-inner">
    <h2 className="title">Art Portfolio (2023)</h2>

    <p className="text art-portfolio-intro">
      A selection of art therapy–oriented works exploring emotion, trauma, and
      healing.
    </p>

    <PortfolioFlipbook />

    <p className="art-portfolio-link">
      <a
        href="https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/art-therapy-portfolio-2023.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open full PDF in a new tab
      </a>
    </p>
  </div>
</section>


{/* EXHIBITIONS */}
<section className="section section-exhibitions" id="exhibitions">
  <h2 className="title">Exhibitions</h2>

  <div className="art-exhibition-block">
    <div className="exh-row">
      <span className="exh-title">
        Young Designers' Exhibition – “Freak’in Walk”
      </span>
      <span className="exh-date">May 2024</span>
    </div>

    <div className="exh-meta">
      Taipei Nangang Exhibition Center, Taipei, Taiwan
    </div>

    <ul className="exh-list">
      <li>
        Captured the various challenges pedestrians face on the streets and
        presented them in a visually engaging fashion show.
      </li>
      <li>
        Accessible at:{" "}
        <a
          href="https://freakinwalk.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://freakinwalk.netlify.app/
        </a>
      </li>
    </ul>
  </div>
</section>



          {/* CLINICAL TRAINING (COMING SOON) */}
<section className="section section-clinical" id="clinical">
  <h2 className="title">Clinical Training</h2>
  <div className="grid grid--single">
    <article className="card">
      <div className="card-glow" />
      <h3 className="card-title">
        Clinical Practicum (Spring 2026)
      </h3>
      <p className="card-meta">
        Johns Hopkins AIDS Psychiatry Service,{" "}
        <a
          href="https://www.hopkinsmedicine.org/infectious-diseases/patient-care/locations/john-g-bartlett-specialty-practice"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-link"
        >
          John G. Bartlett Specialty Practice
        </a>
      </p>
      <p className="card-text">
        Planned clinical practicum focused on integrated psychiatric
        care for people living with HIV at Johns Hopkins. Anticipated
        training includes mood and trauma-related disorders in medical
        settings, interdisciplinary teamwork, and trauma-informed,
        culturally responsive care. Details will be updated.
      </p>
      <div className="card-links">
        <span className="link-pill link-pill--muted">
          Coming soon
        </span>
      </div>
    </article>
  </div>
</section>

        

           {/* EDUCATION */}
<section className="section section-education" id="education">
  <div className="education-inner">
    <h2 className="title">Education</h2>

    <ul className="edu-list">
      {/* JHU CMHC */}
      <li className="edu-item">
        <div className="edu-degree">
          M.S., Clinical Mental Health Counseling
        </div>

        <div className="edu-school-row">
          <span className="edu-school-name">Johns Hopkins University</span>
          <span className="edu-school-dates">Aug 2024 – May 2027 · expected</span>
        </div>

        <div className="edu-meta-row">
          <span className="edu-pill">GPA 3.97 / 4.0</span>
          <span className="edu-pill">
            JHU Merit Scholarship · USD $16,600 to date (renewable)
          </span>
        </div>

        <div className="edu-meta-row">
  <span className="edu-pill edu-pill--outline">
    Chair, Mental Health & Wellbeing Committee (CSI), JHU Lambda Chapter
  </span>
</div>

      </li>

      {/* CU Boulder MSCS */}
      <li className="edu-item">
        <div className="edu-degree">M.S., Computer Science</div>

        <div className="edu-school-row">
          <span className="edu-school-name">University of Colorado Boulder</span>
          <span className="edu-school-dates">Aug 2024 – Mar 2026 · expected</span>
        </div>

        <div className="edu-meta-row">
          <span className="edu-pill">GPA 3.97 / 4.0</span>
        </div>
      </li>

      {/* Fu Jen BA */}
      <li className="edu-item">
        <div className="edu-degree">
          B.A., Applied Arts and Clinical Psychology
        </div>

        <div className="edu-school-row">
          <span className="edu-school-name">Fu Jen Catholic University</span>
          <span className="edu-school-dates">Sep 2020 – Jun 2024</span>
        </div>

        <div className="edu-meta-row">
          <span className="edu-pill">GPA 4.0 / 4.0</span>
          <span className="edu-pill">Ranked 1 / 62 · Graduated first in department</span>
        </div>

        <div className="edu-note">
          Primary major in Applied Arts with additional coursework toward a
          second major in Clinical Psychology.
        </div>
      </li>
    </ul>

    <div className="edu-note-block">
  <span className="edu-label">Languages</span>
  <span className="edu-text">
    Mandarin Chinese (native), English (professional), Japanese (JLPT N1; one-year fully funded exchange at{" "}
    <a
      href="https://www.koryu.or.jp/tw/business/young/invitation/second.html"
      target="_blank"
      rel="noopener noreferrer"
    >
      Sapporo Sacred Heart School in Japan
    </a>
    , supported by a highly competitive award of approximately JPY 2–4 million).
  </span>
</div>

  </div>
</section>

        </div>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} Hsiang-Chen Yeh
      </footer>
    </div>
  );
}

export default App;
