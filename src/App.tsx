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
  ['Speech and Machine Learning Lab', 'Johns Hopkins University · Center for Language & Speech Processing', 'Research Assistant · Adviser: Berrak Sisman', 'Oct 2025–Present', 'https://sites.google.com/view/jhusmile', 'Lab website'],
  ['Human Language Analysis Lab', 'Vanderbilt University', 'Summer Research Intern; continuing collaborator · Adviser: H. Andrew Schwartz', 'Jun 2026–Present', 'https://humanlanguage.org/', 'Lab website'],
  ['Youth Violence AI Surveillance System', 'JHU Bloomberg School of Public Health', 'Research Assistant · Adviser: Ahmed Hassoon', 'Jan–Sep 2026', 'https://malonecenter.jhu.edu/people/ahmed-hassoon/', 'Adviser profile: Ahmed Hassoon'],
  ['Research on Experience and Action with Language Models', 'Computational Social Science Lab · Vanderbilt University', 'Research Assistant · Adviser: Ryan L. Boyd', 'Oct 2025–Present', 'https://www.ryanboyd.io/', 'Adviser website: Ryan L. Boyd'],
  ['Computational Cognition, Vision, & Learning Group', 'Johns Hopkins University', 'Research Assistant · Advisers: Zongwei Zhou and Alan Yuille', 'Aug–Dec 2025', 'https://ccvl.jhu.edu/', 'Lab website'],
  ['Institute for AI Industry Research', 'Tsinghua University · Human-Centered Intelligence Program', 'Research Assistant · Adviser: Jiangtao Gong', 'May–Oct 2025', 'https://air.tsinghua.edu.cn/en/', 'Institute website'],
  ['Wellcheq', 'Digital mental health platform', 'Researcher · Adviser: Jodi Miller', 'Jan–Aug 2025', 'https://wellcheq.com/', 'Organization website'],
  ['Trauma Intervention Research Team', 'Johns Hopkins School of Nursing', 'Research Assistant · Adviser: Tamar Rodney', 'Nov 2024–Nov 2025', 'https://nursing.jhu.edu/faculty-research/faculty/directory/tamar-rodney/', 'Adviser profile: Tamar Rodney'],
  ['Counseling Research Team', 'Johns Hopkins School of Education', 'Research Assistant · Adviser: Norma L. Day-Vines', 'Oct 2024–Present', 'https://education.jhu.edu/directory/norma-l-day-vines-phd/', 'Adviser profile: Norma L. Day-Vines'],
  ['Forensic Psychology and Language Analysis Lab', 'Fu Jen Catholic University · College of Medicine', 'Research Assistant · Adviser: Chien Huang', 'Jun 2022–Jun 2024', 'https://www.cpsy.fju.edu.tw/', 'Department of Clinical Psychology website'],
];
const honors = [
  ['2023', 'NSTC Research Grant for University Students, Taiwan'],
  ['2026', 'Ad Hoc Reviewer, Journal of Language and Social Psychology'],
  ['2020–2024', 'Valedictorian and six Outstanding Academic Awards, Fu Jen Catholic University'],
  ['2024–Present', 'JHU Merit Scholarship ($26,400 awarded to date)'],
  ['2022–2024', 'Student Group Convener, Taiwanese Psychological Association'],
  ['2025–2026', 'Student Mental Health & Wellbeing Committee Chair, Chi Sigma Iota'],
  ['2018–2019', 'Japan-Taiwan Exchange Association Full Scholarship'],
  ['2022', 'Finalist, 31st International Times Young Creative Awards'],
  ['2025–Present', 'Professional Member, American Counseling Association'],
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
  'Chien Huang': 'https://www.cpsy.fju.edu.tw/teacherEN.jsp?type=a',
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
  const primaryLink = paper.links?.[0];
  const extraLinks = paper.links?.filter(link => link.href !== primaryLink?.href) ?? [];
  return <li className="paper">
    <h3>{primaryLink ? <a href={primaryLink.href}>{paper.title}</a> : paper.title}</h3>
    <p className="authors"><AuthorNames text={paper.authors} /></p>
    <p className={paper.kind === 'published' ? 'venue' : 'status'}>{paper.status}</p>
    {extraLinks.length > 0 && <p className="paper-links">{extraLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</p>}
  </li>;
}
function Research() {
  const [showAll, setShowAll] = useState(false);
  return <>
    <section className="intro" aria-labelledby="name">
      <div>
        <h1 id="name">Hsiang-Chen <span className="nickname">(Jen)</span> Yeh</h1>
        <p className="research-keywords">Computational mental health · Speech & NLP · Multimodal learning</p>
        <p>I study how speech and language reflect emotion, meaning-making, and mental health. I develop and evaluate computational methods with an emphasis on psychologically meaningful, reliable signals.</p>
        <p>I am an M.S. student in Clinical Mental Health Counseling at Johns Hopkins University and hold an M.S. in Computer Science from the University of Colorado Boulder. <LinkedPeople text="I work with Berrak Sisman at JHU and H. Andrew Schwartz and Ryan L. Boyd at Vanderbilt." /></p>
        <p className="contact-links"><a className="action-link action-primary" href={`${base}Jen_CV_short.pdf`}>View CV <span className="file-label">PDF</span></a><a className="action-link action-secondary" href="mailto:hyeh10@jh.edu">Email</a><a href="https://github.com/jen900704">GitHub</a><a href="https://orcid.org/0009-0004-5613-4814">ORCID</a><a href="https://www.linkedin.com/in/hsiang-chen-yeh-760bb02ba">LinkedIn</a></p>
        <p className="availability">Seeking Fall 2027 PhD opportunities in speech, NLP, and computational mental health.</p>
      </div>
      <img className="portrait" src={`${base}portrait.png`} alt="Hsiang-Chen Yeh" width="148" height="180" />
    </section>
    <section aria-labelledby="publications-title">
      <div className="section-heading">
        <h2 id="publications-title">Publications & Manuscripts</h2>
        <div className="publication-switch" role="group" aria-label="Publication selection">
          <button type="button" aria-pressed={!showAll} onClick={() => setShowAll(false)}>Selected <span className="count">3</span></button>
          <button type="button" aria-pressed={showAll} onClick={() => setShowAll(true)}>All work <span className="count">{publications.length}</span></button>
        </div>
      </div>
      <ul className="papers">{publications.filter(p => p.kind === 'published').map(p => <Paper key={p.title} paper={p} />)}</ul>
      {showAll && <>
        <h3 className="group-heading">Peer-reviewed poster</h3>
        <ul className="papers">{publications.filter(p => p.kind === 'poster').map(p => <Paper key={p.title} paper={p} />)}</ul>
        <h3 className="group-heading">Under review</h3>
        <ul className="papers">{publications.filter(p => p.kind === 'review').map(p => <Paper key={p.title} paper={p} />)}</ul>
        <h3 className="group-heading">In preparation</h3>
        <p className="muted small">Author order is provisional. Venues listed are intended submission targets.</p>
        <ul className="papers">{publications.filter(p => p.kind === 'preparation').map(p => <Paper key={p.title} paper={p} />)}</ul>
        <h3 className="group-heading">Reports & other scholarly work</h3>
        <ul className="papers">{publications.filter(p => p.kind === 'other').map(p => <Paper key={p.title} paper={p} />)}</ul>
      </>}
    </section>
    <section aria-labelledby="ongoing-title">
      <h2 id="ongoing-title">Current research</h2>
      <ul className="research-topics">
        <li><strong>Speech representations and measurement.</strong> Preserving acoustic and semantic information, and testing when prosodic measures are reliable.</li>
        <li><strong>Language and psychological experience.</strong> Studying everyday causal explanations and how people make sense of borderline personality disorder across their lives.</li>
      </ul>
    </section>
    <section aria-labelledby="recognition-title">
      <h2 id="recognition-title">Selected recognition & service</h2>
      <ul className="dated-list">{[honors[0], honors[1], honors[2], honors[4]].map(([date, title]) => <li key={title}><span className="date">{date}</span><span>{title}</span></li>)}</ul>
      <p className="small"><a href="#experience">Full experience, education, and honors →</a></p>
    </section>
  </>;
}
function Experience() {
  return <>
    <header className="page-heading"><h1>Experience</h1><p>Research in speech and language, grounded in psychology and supervised clinical training.</p></header>
    <section><h2>Research experience</h2>
      <ul className="experience-list">{researchRoles.map(([lab, institution, role, date, href, linkLabel]) => <li key={lab}>
        <div className="entry-heading"><h3><a href={href} title={linkLabel}>{lab}<span className="sr-only"> ({linkLabel})</span></a></h3><span className="date">{date}</span></div>
        <p>{institution}</p><p className="muted"><LinkedPeople text={role} /></p>
        {lab === 'Wellcheq' && <p>Analyzed global mental health trends and authored two trauma-informed, school-based intervention guides.</p>}
      </li>)}</ul>
    </section>
    <section><h2>Clinical training</h2>
      <ul className="experience-list">
        <li><div className="entry-heading"><h3>Johns Hopkins Children’s Center</h3><span className="date">Aug 2026–May 2027</span></div>
          <p>Clinical Intern · 600 hours planned</p>
          <p className="muted">Supervisor: <a href="https://profiles.hopkinsmedicine.org/provider/marco-grados/2705363">Marco Grados, MD, MPH</a></p>
          <p>Child and adolescent psychiatry: ADHD, oppositional defiant disorder, anxiety, and depression.</p></li>
        <li><div className="entry-heading"><h3>Johns Hopkins AIDS Psychiatry Service, Bartlett Clinic</h3><span className="date">Jan–May 2026</span></div>
          <p>Practicum Trainee · 100 hours</p>
          <p className="muted">Supervisor: <a href="https://valleyintegrativepsych.com/nicholas-p-schweizer-ed-d-lcpc/">Nicholas P. Schweizer, Ed.D., LCPC</a></p>
          <p>Integrated psychiatric care for people living with HIV, including major depression, trauma, and substance use disorders.</p></li>
      </ul>
    </section>
    <section><h2>Education</h2>
      <ul className="experience-list">
        <li><div className="entry-heading"><h3>Johns Hopkins University</h3><span className="date">2024–Present</span></div><p>M.S., Clinical Mental Health Counseling</p></li>
        <li><div className="entry-heading"><h3>University of Colorado Boulder</h3><span className="date">2024–2026</span></div><p>M.S., Computer Science</p></li>
        <li><div className="entry-heading"><h3>Fu Jen Catholic University</h3><span className="date">2020–2024</span></div><p>B.A., Applied Arts · Graduated first in the department (1/62).</p><p className="muted">Former double major in Clinical Psychology (B.S. program), College of Medicine.</p></li>
      </ul>
    </section>
    <section><h2>Methods & skills</h2>
      <p><strong>Computational:</strong> Speech/NLP, multimodal learning, corpus analysis; Python, PyTorch, R.</p>
      <p><strong>Psychology and behavioral:</strong> Psychometrics, multilevel modeling, experimental and survey design; supervised clinical mental health counseling and trauma-informed care.</p>
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
    <main id="main-content" tabIndex={-1} ref={mainRef}>{page === 'research' ? <Research /> : page === 'experience' ? <Experience /> : <BeyondResearch />}</main>
    <footer><span>Hsiang-Chen (Jen) Yeh</span><span>Updated September 2026 · <a href="mailto:hyeh10@jh.edu">hyeh10@jh.edu</a></span></footer>
  </div>;
}
export default App;
