import { useEffect, useRef, useState } from 'react';
import { PortfolioFlipbook } from './PortfolioFlipbook';
import { publications, type Publication } from './publications';
import './App.css';

type Page = 'research' | 'experience' | 'beyond';
const pages: { id: Page; label: string }[] = [
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'beyond', label: 'Beyond Research' },
];
const base = import.meta.env.BASE_URL;
const routeFromHash = (): Page => {
  const hash = window.location.hash.slice(1);
  if (['beyond', 'art-portfolio', 'exhibitions'].includes(hash)) return 'beyond';
  if (['experience', 'clinical', 'education', 'projects'].includes(hash)) return 'experience';
  return 'research';
};

const researchRoles = [
  {
    lab: 'Speech and Machine Learning Lab',
    institution: 'Johns Hopkins University · Center for Language & Speech Processing',
    role: 'Research Assistant · Adviser: Berrak Sisman',
    date: 'Oct 2025–Present',
    href: 'https://www.clsp.jhu.edu/faculty/berrak-sisman/',
    linkLabel: 'Adviser profile: Berrak Sisman',
    description: 'Built controlled speech-model evaluations for depression and PTSD, examining speaker leakage and measurement reliability.',
  },
  {
    lab: 'Human Language Analysis Lab',
    institution: 'Vanderbilt University',
    role: 'Summer 2026 Research Intern; continuing collaborator · Adviser: H. Andrew Schwartz',
    date: 'Jun 2026–Present',
    href: 'https://computing.vanderbilt.edu/person/h-andrew-schwartz/',
    linkLabel: 'Adviser profile: H. Andrew Schwartz',
    description: 'Developing and validating speech representations for PTSD and affective outcomes across clinical corpora.',
  },
  {
    lab: 'Borderline Personality Disorder Research Collaboration',
    institution: 'Cross-institutional research collaboration',
    role: 'First-author manuscript with Vasudha Varadarajan and Allison Lahnala',
    date: 'Jul 2026–Present',
    href: 'https://www.lti.cs.cmu.edu/people/staff/varadarajan-vasudha.html',
    linkLabel: 'Collaborator profile: Vasudha Varadarajan',
    description: 'Studying onset timing, diagnostic delay, and meaning-making with collaborators at the Language Technologies Institute at Carnegie Mellon University and McMaster University.',
  },
  {
    lab: 'Youth Violence AI Surveillance System',
    institution: 'JHU Bloomberg School of Public Health',
    role: 'Research Assistant · Adviser: Ahmed Hassoon',
    date: 'Jan–Sep 2026',
    href: 'https://publichealth.jhu.edu/faculty/3198/ahmed-hassoon',
    linkLabel: 'Adviser profile: Ahmed Hassoon',
    description: 'Built a HIPAA-compliant Azure and large language model pipeline for youth-violence surveillance in electronic health records.',
  },
  {
    lab: 'Research on Experience and Action with Language Models',
    institution: 'Computational Social Science Lab · Vanderbilt University',
    role: 'Research Assistant · Adviser: Ryan L. Boyd',
    date: 'Oct 2025–Present',
    href: 'https://computing.vanderbilt.edu/person/ryan-boyd/',
    linkLabel: 'Adviser profile: Ryan L. Boyd',
    description: 'Applied AttributioNet to more than 125,000 observations across contexts.',
  },
  {
    lab: 'Computational Cognition, Vision, & Learning Group',
    institution: 'Johns Hopkins University',
    role: 'Research Assistant · Advisers: Zongwei Zhou and Alan Yuille',
    date: 'Aug–Dec 2025',
    href: 'https://ccvl.jhu.edu/',
    linkLabel: 'Lab website',
    description: 'Built PanTS Viewer for more than 300 GB of computed tomography data.',
  },
  {
    lab: 'Tsinghua University, Institute for AI Industry Research',
    institution: 'Human-Centered Intelligence Program',
    role: 'Research Assistant · Adviser: Jiangtao Gong',
    date: 'May–Oct 2025',
    href: 'https://air.tsinghua.edu.cn/en/',
    linkLabel: 'Institute website',
    description: 'Co-led psychometric evaluation of generative AI for music-evoked autobiographical memories.',
  },
  {
    lab: 'WellCheq',
    institution: 'Digital mental health platform · Remote, US',
    role: 'Researcher · Adviser: Jodi Miller',
    date: 'Jan–Aug 2025',
    href: 'https://wellcheq.com/about-us',
    linkLabel: 'Organization website',
    description: 'Authored two trauma-informed, school-based intervention guides.',
  },
  {
    lab: 'Trauma Intervention Research Team',
    institution: 'Johns Hopkins School of Nursing',
    role: 'Research Assistant · Adviser: Tamar Rodney',
    date: 'Nov 2024–Nov 2025',
    href: 'https://nursing.jhu.edu/faculty-research/faculty/directory/tamar-rodney/',
    linkLabel: 'Adviser profile: Tamar Rodney',
    description: 'Synthesized linguistic markers of therapeutic change for an NIH R21 application.',
  },
  {
    lab: 'Forensic Psychology and Language Analysis Lab',
    institution: 'Fu Jen Catholic University · College of Medicine',
    role: 'Research Assistant · Adviser: Chien Huang',
    date: 'Jun 2022–Jun 2024',
    href: 'https://researchinfo.fju.edu.tw/professors/3114',
    linkLabel: 'Adviser profile: Chien Huang',
    description: 'Designed studies and conducted LIWC analyses of hate speech and prosocial lying.',
  },
];
const honors = [
  ['2023', 'Undergraduate Research Grant, National Science and Technology Council (Taiwan)'],
  ['2018–2019', 'Japan–Taiwan Exchange Association Full Scholarship (JPY 4 million)'],
  ['2026', 'Ad Hoc Reviewer, Journal of Language and Social Psychology'],
  ['2022–2024', 'Student Group Convener, Taiwanese Psychological Association'],
  ['2025–2026', 'Student Mental Health & Wellbeing Committee Chair, Chi Sigma Iota'],
  ['2022', 'Finalist, 31st International Times Young Creative Awards'],
];

const peopleLinks: Record<string, string> = {
  'Berrak Sisman': 'https://engineering.jhu.edu/faculty/berrak-sisman/',
  'H. Andrew Schwartz': 'https://haschwartz.com/',
  'Ahmed Hassoon': 'https://malonecenter.jhu.edu/people/ahmed-hassoon/',
  'Ryan L. Boyd': 'https://www.ryanboyd.io/',
  'Zongwei Zhou': 'https://www.zongweiz.com/',
  'Alan Yuille': 'https://www.cs.jhu.edu/~ayuille/',
  'Jiangtao Gong': 'https://air.tsinghua.edu.cn/en/info/1046/1477.htm',
  'Jodi Miller': 'https://wellcheq.com/about-us',
  'Tamar Rodney': 'https://nursing.jhu.edu/faculty-research/faculty/directory/tamar-rodney/',
  'Norma L. Day-Vines': 'https://education.jhu.edu/directory/norma-l-day-vines-phd/',
  'Chien Huang': 'https://researchinfo.fju.edu.tw/professors/3114',
  'Vasudha Varadarajan': 'https://www.lti.cs.cmu.edu/people/staff/varadarajan-vasudha.html',
  'Allison Lahnala': 'https://www.eng.mcmaster.ca/cas/faculty/allison-lahnala/',
};
function LinkedPeople({ text }: { text: string }) {
  const name = Object.keys(peopleLinks).find(person => text.includes(person));
  if (!name) return <>{text}</>;
  const start = text.indexOf(name);
  return <><LinkedPeople text={text.slice(0, start)} /><a href={peopleLinks[name]}>{name}</a><LinkedPeople text={text.slice(start + name.length)} /></>;
}

function AuthorNames({ text }: { text: string }) {
  return <>{text.split('Hsiang-Chen Yeh').map((part, i) => <span key={i}>{i > 0 && <strong>Hsiang-Chen Yeh</strong>}{part}</span>)}</>;
}
function Paper({ paper }: { paper: Publication }) {
  const links = paper.links?.filter((link, index, all) => all.findIndex(item => item.href === link.href) === index) ?? [];
  return <li className={`paper${paper.figure ? ' paper-with-figure' : ''}`}>
    {paper.figure && <figure className="paper-figure">
      <a href={`${base}${paper.figure.src}`} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge figure: ${paper.title}`}>
        <img src={`${base}${paper.figure.src}`} alt={paper.figure.alt} width={paper.figure.width} height={paper.figure.height} loading="lazy" />
      </a>
      <figcaption>{paper.figure.caption} <span aria-hidden="true">↗</span></figcaption>
    </figure>}
    <div className="paper-content">
      <h3>{paper.title}</h3>
      <p className="authors"><AuthorNames text={paper.authors} /></p>
      <p className={paper.kind === 'published' ? 'venue' : 'status'}>{paper.status}</p>
      {paper.highlight && <p className="paper-highlight">{paper.highlight}</p>}
      {links.length > 0 && <div className="paper-resources" role="group" aria-label={`Resources for ${paper.title}`}>
        {links.map(link => <a className="resource-button" key={link.href} href={link.href} aria-label={`${link.label}: ${paper.title}`}>{link.label}</a>)}
      </div>}
    </div>
  </li>;
}
function Research({ showAll, setShowAll }: { showAll: boolean; setShowAll: (value: boolean) => void }) {
  const selectedCount = publications.filter(p => p.kind === 'published').length;
  return <>
    <section className="intro" aria-labelledby="name">
      <div>
        <h1 id="name">Hsiang-Chen Yeh <span className="nickname">Jen</span></h1>
        <p className="research-keywords">Computational mental health · Speech & NLP · Multimodal learning</p>
        <p className="research-statement">I develop speech, language, and multimodal AI methods for computational mental health. Informed by clinical training, I aim to build psychologically grounded models that generalize across people and meaningfully support mental health understanding and assessment.</p>
        <p>I am an M.S. student in Clinical Mental Health Counseling at Johns Hopkins University and hold an M.S. in Computer Science from the University of Colorado Boulder. <LinkedPeople text="I work with Berrak Sisman at JHU and H. Andrew Schwartz and Ryan L. Boyd at Vanderbilt." /></p>
        <p className="contact-links"><a className="action-link action-primary" href={`${base}Jen_CV_short.pdf`}>View CV <span className="file-label">PDF</span></a><a className="action-link action-secondary" href="mailto:hyeh10@jh.edu">Email</a><a href="https://github.com/jen900704">GitHub</a><a href="https://orcid.org/0009-0004-5613-4814">ORCID</a><a href="https://www.linkedin.com/in/hsiang-chen-yeh-760bb02ba">LinkedIn</a></p>
        <p className="availability">Seeking Fall 2027 PhD opportunities in speech, NLP, and computational mental health.</p>
      </div>
      <img className="portrait" src={`${base}portrait.png`} alt="Hsiang-Chen Yeh" width="148" height="180" />
    </section>
    <section aria-labelledby="ongoing-title">
      <h2 id="ongoing-title">Research focus</h2>
      <ul className="research-topics">
        <li><strong>Speech representations for mental health.</strong> Building psychologically grounded models and testing whether speech measures generalize across speakers and clinical contexts.</li>
        <li><strong>Language and psychological experience.</strong> Studying everyday causal explanations, diagnostic delay, and meaning-making in borderline personality disorder.</li>
      </ul>
    </section>
    <section className="publications-section" aria-labelledby="publications-title">
      <div className="section-heading">
        <h2 id="publications-title">Publications & Manuscripts</h2>
        <div className="publication-switch" role="group" aria-label="Publication selection">
          <button type="button" aria-pressed={!showAll} aria-controls="publication-results" onClick={() => setShowAll(false)}>Selected work <span className="count">{selectedCount}</span></button>
          <button type="button" aria-pressed={showAll} aria-controls="publication-results" onClick={() => setShowAll(true)}>All work <span className="count">{publications.length}</span></button>
        </div>
      </div>
      <p className="publication-summary" role="status" aria-live="polite" aria-atomic="true">{showAll ? `All ${publications.length} works · Publications, manuscripts, and reports` : `${selectedCount} selected publications · ${publications.length} works in total`}</p>
      <div id="publication-results" key={showAll ? 'all' : 'selected'}>
      {showAll && <h3 className="group-heading">Publications</h3>}
      <ul className="papers">{publications.filter(p => p.kind === 'published').map(p => <Paper key={p.title} paper={p} />)}</ul>
      {showAll && <>
        <h3 className="group-heading">Peer-reviewed poster</h3>
        <ul className="papers">{publications.filter(p => p.kind === 'poster').map(p => <Paper key={p.title} paper={p} />)}</ul>
        <h3 className="group-heading">Under review</h3>
        <ul className="papers">{publications.filter(p => p.kind === 'review').map(p => <Paper key={p.title} paper={p} />)}</ul>
        <h3 className="group-heading">In preparation</h3>
        <p className="muted small">Venues listed are intended submission targets.</p>
        <ul className="papers">{publications.filter(p => p.kind === 'preparation').map(p => <Paper key={p.title} paper={p} />)}</ul>
        <h3 className="group-heading">Reports & other scholarly work</h3>
        <ul className="papers">{publications.filter(p => p.kind === 'other').map(p => <Paper key={p.title} paper={p} />)}</ul>
      </>}
      </div>
    </section>
    <section aria-labelledby="recognition-title">
      <h2 id="recognition-title">Selected recognition & service</h2>
      <ul className="dated-list">{honors.slice(0, 4).map(([date, title]) => <li key={title}><span className="date">{date}</span><span>{title}</span></li>)}</ul>
      <p className="small"><a href="#experience">Full experience, education, and honors →</a></p>
    </section>
  </>;
}
function Experience() {
  return <>
    <header className="page-heading"><h1>Experience</h1><p>Research in speech and language, grounded in psychology and supervised clinical training.</p></header>
    <section><h2>Research experience</h2>
      <ul className="experience-list">{researchRoles.map(({ lab, institution, role, date, href, linkLabel, description }) => <li key={lab}>
        <div className="entry-heading"><h3><a href={href} title={linkLabel}>{lab}<span className="sr-only"> ({linkLabel})</span></a></h3><span className="date">{date}</span></div>
        <p>{institution}</p><p className="muted"><LinkedPeople text={role} /></p>
        <p><LinkedPeople text={description} /></p>
      </li>)}</ul>
    </section>
    <section><h2>Clinical training</h2>
      <ul className="experience-list">
        <li><div className="entry-heading"><h3><a href="https://www.hopkinsmedicine.org/psychiatry/specialty-areas/child-adolescent">Johns Hopkins Child & Adolescent Psychiatry / Pediatric Emergency Department</a></h3><span className="date">Aug 2026–May 2027</span></div>
          <p>Clinical Mental Health Counseling Intern · 600-hour internship</p>
          <p className="muted">Supervisor: <a href="https://profiles.hopkinsmedicine.org/provider/marco-grados/2705363">Marco Grados, MD, MPH</a></p>
          <p>Family-Based Crisis Intervention, suicide risk assessment, and safety planning for youth with ADHD, anxiety, depression, and oppositional defiant disorder.</p></li>
        <li><div className="entry-heading"><h3>Johns Hopkins AIDS Psychiatry Service, Bartlett Clinic</h3><span className="date">Jan–May 2026</span></div>
          <p>Practicum Trainee · 100-hour practicum</p>
          <p className="muted">Supervisor: <a href="https://valleyintegrativepsych.com/nicholas-p-schweizer-ed-d-lcpc/">Nicholas P. Schweizer, EdD, LCPC</a></p>
          <p>Clinical training with clients living with HIV and co-occurring depression, trauma, or substance use disorders.</p></li>
      </ul>
    </section>
    <section><h2>Education</h2>
      <ul className="experience-list">
        <li><div className="entry-heading"><h3>Johns Hopkins University</h3><span className="date">Aug 2024–May 2027 (expected)</span></div><p>M.S., Clinical Mental Health Counseling · GPA: 3.96/4.0</p><p className="muted">JHU Merit Scholarship: $26,400 awarded to date. Pursuing licensure as a Maryland Licensed Clinical Professional Counselor.</p></li>
        <li><div className="entry-heading"><h3>University of Colorado Boulder</h3><span className="date">Aug 2024–May 2026</span></div><p>M.S., Computer Science (online) · GPA: 3.93/4.0</p><p className="muted">Relevant coursework: Deep Learning for NLP; Introduction to Machine Learning; Approximation Algorithms and Linear Programming; Advanced Data Structures, RSA and Quantum Algorithms.</p></li>
        <li><div className="entry-heading"><h3>Fu Jen Catholic University</h3><span className="date">Sep 2020–Jun 2024</span></div><p>B.A., Applied Arts · GPA: 4.0/4.0; rank 1/62</p><p className="muted">Former double major in Clinical Psychology (B.S. program), College of Medicine. Valedictorian; six Outstanding Academic Awards.</p></li>
      </ul>
    </section>
    <section><h2>Methods & skills</h2>
      <p><strong>Psychology & behavioral methods:</strong> Psychological measurement, experimental and survey design, clinical interviewing, suicide risk assessment, and trauma-informed counseling.</p>
      <p><strong>Quantitative & computational methods:</strong> Reliability and construct validation, multilevel and robust regression, equivalence testing, speech/NLP representation learning, multimodal modeling, and participant-level validation.</p>
      <p><strong>Software & tools:</strong> Python, R, PyTorch, Hugging Face, scikit-learn, LIWC, Linux/Slurm, Git, and Microsoft Azure.</p>
      <p><strong>Languages:</strong> Mandarin (native), English (fluent), Japanese (JLPT N1).</p>
    </section>
    <section><h2>Leadership, service & honors</h2><ul className="dated-list">{honors.map(([date, title]) => <li key={title}><span className="date">{date}</span><span>{title}</span></li>)}</ul></section>
    <section><h2>Software & earlier projects</h2>
      <h3>BodyMaps / PanTS CT search and viewer</h3>
      <p>A web interface for exploring CT scans and segmentation masks, with cohort search, slice navigation, and visualization controls.</p>
      <p className="paper-links"><a href="https://github.com/jen900704/BodyMaps-PanTS-Search-Viewer">Code</a><a href="https://pan-ts-viewer.vercel.app">Demo</a></p>
      <details><summary>Earlier machine learning projects</summary><ul className="link-list">
        <li><a href="https://github.com/jen900704/Random-Forest-MDD-Severity-Prediction">Random Forest MDD Severity Prediction</a></li>
        <li><a href="https://github.com/jen900704/TF-IDF-logistic-regression-disaster-tweet-classification">TF-IDF Disaster Tweet Classification</a></li>
        <li><a href="https://github.com/jen900704/Unsupervised-learning-using-PCA-and-K-means-clustering">PCA and K-Means Clustering</a></li>
        <li><a href="https://github.com/jen900704/CNN-Cancer-Classification">CNN Cancer Detection</a></li>
      </ul></details>
    </section>
  </>;
}
function BeyondResearch() {
  return <>
    <header className="page-heading"><h1>Beyond research</h1><p>My interest in emotion and human experience also takes shape through visual art, design, and movement.</p></header>
    <section><h2>Freak’in Walk</h2><p className="muted">Young Designers’ Exhibition · Taipei Nangang Exhibition Center · May 2024</p>
      <p>I translated the everyday challenges of walking through city streets into fashion design, presenting the work in a runway exhibition.</p>
      <p><a href="https://freakinwalk.netlify.app/">Explore the exhibition →</a></p>
    </section>
    <section><h2>Art portfolio</h2><p className="muted">2023 · Visual explorations of emotion, trauma, and healing</p>
      <PortfolioFlipbook />
      <p className="small"><a href="https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/art-therapy-portfolio-2023.pdf">Open the complete portfolio (PDF)</a></p>
    </section>
    <section><h2>Dance & creative practice</h2>
      <ul className="dated-list"><li><span className="date">Summer 2022</span><span>Selected participant, Professional Ballet Dancer Experience Camp, <a href="https://www.facebook.com/taiwanballet">Taiwan Ballet Company</a>.</span></li><li><span className="date">2022</span><span>Finalist, 31st International Times Young Creative Awards.</span></li></ul>
    </section>
    <section><h2>Psychology beyond the lab</h2><p>As Student Group Convener for the Taiwanese Psychological Association (2022–2024), I organized psychology lectures and academic seminars and created promotional designs. At Johns Hopkins, I chaired the Chi Sigma Iota Student Mental Health & Wellbeing Committee (2025–2026).</p></section>
  </>;
}
function App() {
  const [page, setPage] = useState<Page>(routeFromHash);
  const [showAll, setShowAll] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const change = () => { setPage(routeFromHash()); window.scrollTo(0, 0); mainRef.current?.focus({ preventScroll: true }); };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => {
    document.title = page === 'research' ? 'Hsiang-Chen (Jen) Yeh | Computational Mental Health' : `${pages.find(p => p.id === page)?.label} | Hsiang-Chen (Jen) Yeh`;
  }, [page]);
  return <div className="site">
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); mainRef.current?.focus(); }}>Skip to content</a>
    <nav className="site-nav" aria-label="Main navigation">{pages.map(p => <a key={p.id} href={`#${p.id}`} aria-current={page === p.id ? 'page' : undefined}>{p.label}</a>)}</nav>
    <main id="main-content" tabIndex={-1} ref={mainRef}>{page === 'research' ? <Research showAll={showAll} setShowAll={setShowAll} /> : page === 'experience' ? <Experience /> : <BeyondResearch />}</main>
    <footer><span>Hsiang-Chen (Jen) Yeh</span><span>Updated September 2026 · <a href="mailto:hyeh10@jh.edu">hyeh10@jh.edu</a></span></footer>
  </div>;
}
export default App;
