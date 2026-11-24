import { useEffect, useRef, useState, type ReactNode } from 'react';
import { publications, type Publication } from './publications';
import { researchRoles, clinical, education, skills, honors, peopleLinks } from './content';
import { Waveform } from './Waveform';
import { Icon } from './Icon';
import { PortfolioFlipbook } from './PortfolioFlipbook';
import './App.css';

const base = import.meta.env.BASE_URL;
const EMAIL = 'hyeh10@jh.edu';

const nav = [
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'experience', label: 'Experience' },
  { id: 'beyond', label: 'Beyond' },
];
// Older links (#clinical, #art-portfolio, ...) keep working.
const hashAliases: Record<string, string> = {
  'art-portfolio': 'beyond', exhibitions: 'beyond', projects: 'software', clinical: 'clinical', education: 'education',
};

/* ---------- small helpers ---------- */
function LinkedPeople({ text }: { text: string }): ReactNode {
  const name = Object.keys(peopleLinks).find(person => text.includes(person));
  if (!name) return <>{text}</>;
  const start = text.indexOf(name);
  return <><LinkedPeople text={text.slice(0, start)} /><a href={peopleLinks[name]}>{name}</a><LinkedPeople text={text.slice(start + name.length)} /></>;
}
function AuthorNames({ text, coSecond }: { text: string; coSecond?: boolean }) {
  return <>{text.split('Hsiang-Chen Yeh').map((part, i) => <span key={i}>{i > 0 && <strong className="me">Hsiang-Chen Yeh{coSecond && <sup title="Co-second author">†</sup>}</strong>}{part}</span>)}</>;
}
function SectionHead({ index, kicker, title, children }: { index: string; kicker: string; title: string; children?: ReactNode }) {
  return <header className="section-head" data-reveal>
    <p className="kicker"><span className="kicker-index">{index}</span>{kicker}</p>
    <h2>{title}</h2>
    {children && <p className="section-lede">{children}</p>}
  </header>;
}

/* ---------- reveal on scroll ---------- */
function useReveal(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/* ---------- theme ---------- */
type Theme = 'light' | 'dark';
function readTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const flip = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    setTheme(next);
  };
  return <button type="button" className="icon-button" onClick={flip} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} title={theme === 'dark' ? 'Light theme' : 'Dark theme'}>
    <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
  </button>;
}

/* ---------- header ---------- */
function SiteHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
    <div className="header-inner">
      <a className="brand" href="#top" onClick={() => setOpen(false)} aria-label="Hsiang-Chen (Jen) Yeh, back to top">
        <span className="brand-mark" aria-hidden="true">HY</span>
        <span className="brand-name">Jen Yeh</span>
      </a>
      <nav aria-label="Main" id="main-nav">
        {nav.map(n => <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined} onClick={() => setOpen(false)}>{n.label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="cv-chip" href={`${base}Jen_CV_short.pdf`}>CV<Icon name="arrow" /></a>
        <ThemeToggle />
        <button type="button" className="icon-button menu-button" aria-expanded={open} aria-controls="main-nav" aria-label="Menu" onClick={() => setOpen(o => !o)}><Icon name={open ? 'close' : 'menu'} /></button>
      </div>
    </div>
  </header>;
}

/* ---------- hero ---------- */
function Hero() {
  return <section className="hero" id="top" aria-labelledby="name">
    <Waveform />
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow" data-reveal>Speech · Language · Mental health</p>
        <h1 id="name" data-reveal>Hsiang-Chen Yeh</h1>
        <p className="thesis" data-reveal>I’m <span className="nick">Jen</span>. I study whether mental health models built on speech and language <em>measure what they claim to.</em></p>
        <div className="bio" data-reveal>
          <p>Informed by clinical training, I develop speech, language, and multimodal AI methods for mental health and psychological understanding. I am an M.S. student in Clinical Mental Health Counseling at Johns Hopkins University and hold an M.S. in Computer Science from the University of Colorado Boulder.</p>
          <p><LinkedPeople text="I work with Berrak Sisman at JHU, and with H. Andrew Schwartz and Ryan L. Boyd at Vanderbilt." /></p>
        </div>
        <div className="hero-actions" data-reveal>
          <a className="btn btn-primary" href={`${base}Jen_CV_short.pdf`}><Icon name="file" />Curriculum Vitae</a>
          <a className="btn btn-ghost" href={`mailto:${EMAIL}`}><Icon name="mail" />Email</a>
          <span className="social">
            <a href="https://scholar.google.com/citations?user=D2c37nAAAAAJ" aria-label="Google Scholar" title="Google Scholar"><Icon name="scholar" /></a>
            <a href="https://github.com/jen900704" aria-label="GitHub" title="GitHub"><Icon name="github" /></a>
            <a href="https://www.linkedin.com/in/hsiang-chen-yeh-760bb02ba/" aria-label="LinkedIn" title="LinkedIn"><Icon name="linkedin" /></a>
          </span>
        </div>
        <p className="status-pill" data-reveal>Applying to PhD programs for Fall 2027</p>
      </div>
      <figure className="portrait-wrap" data-reveal>
        <img className="portrait" src={`${base}portrait.webp`} alt="Portrait of Hsiang-Chen (Jen) Yeh" width="640" height="640" fetchPriority="high" />
        <figcaption>
          <span><strong>Johns Hopkins</strong> Speech &amp; ML Lab</span>
          <span><strong>Vanderbilt</strong> HLAB · CSS Lab</span>
        </figcaption>
      </figure>
    </div>
  </section>;
}

/* ---------- research ---------- */
function Bar({ label, value, display, tone }: { label: string; value: number; display: string; tone?: 'muted' }) {
  return <div className={`bar${tone ? ' bar-muted' : ''}`}>
    <div className="bar-top"><span>{label}</span><span className="bar-value">{display}</span></div>
    <div className="bar-track"><div className="bar-fill" style={{ ['--v' as string]: `${value}%` }} /></div>
  </div>;
}
const questions = [
  { title: 'Is the model hearing symptoms, or the speaker?', body: 'Speaker-controlled evaluation, and edited audio (text-to-speech and voice conversion) that separates a person’s voice from their words.' },
  { title: 'Do interpretable features add information?', body: 'Controlled tests of psychological word categories and word-level prosody, with reliability analysis before clinical claims.' },
  { title: 'Can speech track change within one person?', body: 'Speech and transcript representations for day-to-day symptom measurement from daily speech diaries.' },
  { title: 'How do people make sense of experience in language?', body: 'Everyday causal explanation at scale, and narratives about onset and diagnostic delay in borderline personality disorder.' },
] as const;

function Research() {
  return <section id="research" className="section" aria-labelledby="research-title">
    <SectionHead index="01" kicker="Research" title="What I work on">
      Clinical training taught me that one label rarely captures a person. My research asks what speech and language models are actually responding to, and whether their scores hold up for people they have not seen.
    </SectionHead>
    <h3 id="research-title" className="sr-only">Research questions</h3>
    <ol className="questions">
      {questions.map((q, i) => <li key={q.title} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }}>
        <span className="q-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
        <h3>{q.title}</h3>
        <p>{q.body}</p>
      </li>)}
    </ol>

    <h3 className="sub-head" data-reveal>Selected findings</h3>
    <div className="findings">
      <article className="finding" data-reveal>
        <p className="finding-venue">Interspeech 2026</p>
        <p className="finding-number">97.65% <span className="arrow" aria-hidden="true">→</span> 58.74%</p>
        <p className="finding-claim">Same model, same test segments: accuracy depended on whether the test speakers had been heard in training.</p>
        <div className="bars" role="img" aria-label="Accuracy 97.65 percent with speaker overlap, 58.74 percent on unseen speakers">
          <Bar label="Test speakers heard in training" value={97.65} display="97.65%" />
          <Bar label="Unseen speakers" value={58.74} display="58.74%" tone="muted" />
        </div>
        <p className="finding-foot">wav2vec 2.0 · training size held at 5,117 segments · same 714 test segments</p>
      </article>
      <article className="finding" data-reveal style={{ ['--d' as string]: '80ms' }}>
        <p className="finding-venue">EMNLP 2026 · Main</p>
        <p className="finding-number finding-words">Interpretive, not predictive</p>
        <p className="finding-claim">LIWC was tested against controls that keep its numeric shape but break its meaning. Its predictive gains were inconsistent; its value is in describing language.</p>
        <ul className="chips-grid" aria-label="Conditions compared">
          <li className="chip-strong">Intact LIWC</li><li>PCA-rotated</li><li>Participant-shuffled</li><li>Random-marginal</li>
        </ul>
        <p className="finding-foot">Two English and three Chinese corpora</p>
      </article>
      <article className="finding" data-reveal style={{ ['--d' as string]: '160ms' }}>
        <p className="finding-venue">ICASSP 2027 · under review</p>
        <p className="finding-number">.997 <span className="vs">vs</span> .044</p>
        <p className="finding-claim">Word-aligned prosody gives very stable speaker summaries, yet they barely track depression severity.</p>
        <dl className="stats">
          <div><dt>Consistency of speaker summaries</dt><dd>up to .997</dd></div>
          <div><dt>|ρ| with PHQ-8 on DAIC-WOZ</dt><dd>at most .044</dd></div>
        </dl>
        <p className="finding-foot">Generalizability theory · four corpora</p>
      </article>
    </div>
  </section>;
}

/* ---------- publications ---------- */
function Paper({ paper, i }: { paper: Publication; i: number }) {
  return <li className={`paper${paper.figure ? ' has-figure' : ''}`} data-reveal style={{ ['--d' as string]: `${Math.min(i, 4) * 50}ms` }}>
    <div className="paper-meta">
      <span className={`venue-tag kind-${paper.kind}`}>{paper.venue}</span>
    </div>
    <div className="paper-body">
      <h4>{paper.title}</h4>
      <p className="authors"><AuthorNames text={paper.authors} coSecond={paper.coSecond} /></p>
      {paper.note && <p className="paper-note">{paper.note}</p>}
      {paper.highlight && <p className="paper-highlight">{paper.highlight}</p>}
      {paper.links && paper.links.length > 0 && <div className="paper-links" role="group" aria-label={`Links for ${paper.title}`}>
        {paper.links.map(l => <a key={l.href} className="pill-link" href={l.href} aria-label={`${l.label}: ${paper.title}`}>{l.label}<Icon name="arrow" /></a>)}
      </div>}
    </div>
    {paper.figure && <figure className="paper-figure">
      <a href={`${base}${paper.figure.src}`} target="_blank" rel="noopener noreferrer" aria-label={`Open figure: ${paper.figure.caption}`}>
        <img src={`${base}${paper.figure.src}`} alt={paper.figure.alt} width={paper.figure.width} height={paper.figure.height} loading="lazy" />
      </a>
      <figcaption>{paper.figure.caption}</figcaption>
    </figure>}
  </li>;
}
const pubGroups: { title: string; items: Publication[] }[] = [
  { title: 'Publications', items: publications.filter(p => p.kind === 'published' && (p.type ?? 'paper') === 'paper') },
  { title: 'Under review', items: publications.filter(p => p.kind === 'review') },
  { title: 'In preparation', items: publications.filter(p => p.kind === 'preparation') },
  { title: 'Report & poster', items: publications.filter(p => p.kind === 'published' && p.type && p.type !== 'paper') },
];
function Publications() {
  return <section id="publications" className="section" aria-labelledby="pub-title">
    <SectionHead index="02" kicker="Publications" title="Papers & manuscripts" />
    <h3 id="pub-title" className="sr-only">Publications list</h3>
    {pubGroups.map(g => <div key={g.title} className="pub-group">
      <h3 className="pub-group-title" data-reveal>{g.title}<span className="count">{g.items.length}</span></h3>
      <ul className="papers">{g.items.map((p, i) => <Paper key={p.title} paper={p} i={i} />)}</ul>
    </div>)}
    <p className="footnote"><sup>†</sup> Co-second author.</p>
  </section>;
}

/* ---------- experience ---------- */
type Role = (typeof researchRoles)[number];
const advisorLabel = (r: Role) => ('adviserLabel' in r && r.adviserLabel) ? r.adviserLabel : r.adviser.includes(' and ') ? 'Advisors' : 'Advisor';
function Experience() {
  return <section id="experience" className="section" aria-labelledby="exp-title">
    <SectionHead index="03" kicker="Experience" title="Research, clinical training & education">
      Research in speech and language, grounded in psychology and supervised clinical training.
    </SectionHead>
    <h3 id="exp-title" className="sr-only">Experience</h3>
    <div className="exp-layout">
      <div>
        <h3 className="sub-head" data-reveal>Research</h3>
        <ol className="timeline">
          {researchRoles.filter(r => r.current).map(r => <li key={r.lab} data-reveal className="is-current">
            <span className="tl-dot" aria-hidden="true" />
            <p className="tl-date">{r.date}</p>
            <h4><a href={r.href}>{r.lab}</a></h4>
            <p className="tl-inst">{r.institution}</p>
            <p className="tl-role">{r.role} · <span className="muted">{advisorLabel(r)}:</span> <LinkedPeople text={r.adviser} /></p>
            <p className="tl-desc">{r.description}</p>
          </li>)}
        </ol>
        <details className="earlier" data-reveal>
          <summary>Earlier research experience <span className="count">{researchRoles.filter(r => !r.current).length}</span></summary>
          <ol className="timeline timeline-compact">
            {researchRoles.filter(r => !r.current).map(r => <li key={r.lab}>
              <span className="tl-dot" aria-hidden="true" />
              <p className="tl-date">{r.date}</p>
              <h4><a href={r.href}>{r.lab}</a></h4>
              <p className="tl-inst">{r.institution} · {advisorLabel(r)}: <LinkedPeople text={r.adviser} /></p>
              <p className="tl-desc">{r.description}</p>
            </li>)}
          </ol>
        </details>
      </div>
      <div className="exp-side">
        <div id="clinical" className="side-block">
          <h3 className="sub-head" data-reveal>Clinical training</h3>
          {clinical.map(c => <article key={c.site} className="card clinical-card" data-reveal>
            <p className="tl-date">{c.date}</p>
            <h4>{c.href ? <a href={c.href}>{c.site}</a> : c.site}</h4>
            <p className="tl-role">{c.role}</p>
            <p className="tl-inst">Supervisor: <a href={c.supervisorHref}>{c.supervisor}</a></p>
            <p className="tl-desc">{c.description}</p>
          </article>)}
        </div>
        <div id="education" className="side-block">
          <h3 className="sub-head" data-reveal>Education</h3>
          {education.map(e => <article key={e.school} className="card edu-card" data-reveal>
            <div className="edu-top"><h4>{e.school}</h4><span className="tl-date">{e.date}</span></div>
            <p className="tl-role">{e.degree}</p>
            <p className="gpa">{e.gpa}</p>
            <p className="tl-desc">{e.detail}</p>
          </article>)}
        </div>
      </div>
    </div>

    <div className="two-col">
      <div data-reveal>
        <h3 className="sub-head">Methods & skills</h3>
        {skills.map(s => <div key={s.group} className="skill-group">
          <p className="skill-label">{s.group}</p>
          <p className="skill-line">{s.items.join(' · ')}</p>
        </div>)}
      </div>
      <div data-reveal>
        <h3 className="sub-head">Honors & service</h3>
        {honors.map(h => <div key={h.group} className="honor-group">
          <p className="skill-label">{h.group}</p>
          <ul className="dated">{h.items.map(([d, t]) => <li key={t}><span className="tl-date">{d}</span><span>{t}</span></li>)}</ul>
        </div>)}
      </div>
    </div>

    <div id="software" className="software card" data-reveal>
      <div className="software-body">
        <p className="skill-label">Software</p>
        <h4>BodyMaps / PanTS CT search and viewer</h4>
        <p className="tl-desc">A web interface for exploring CT scans and segmentation masks, with cohort search, slice navigation, and visualization controls.</p>
        <div className="paper-links">
          <a className="pill-link" href="https://github.com/jen900704/BodyMaps-PanTS-Search-Viewer">Code<Icon name="arrow" /></a>
          <a className="pill-link" href="https://pan-ts-viewer.vercel.app">Demo<Icon name="arrow" /></a>
        </div>
      </div>
    </div>

    <div id="murmur" className="software card" data-reveal>
      <div className="software-body">
        <p className="skill-label">Software · 2026</p>
        <h4>Murmur 低語日記: a private voice and writing journal</h4>
        <p className="tl-desc">An offline web app in Traditional Chinese and English that brings speech and language analysis to everyday self-reflection. Voice features are measured on the phone and compared only with the person's own usual range. Writing is analyzed with transparent word categories that show the exact words behind each number, with a downloadable evidence report. It also offers counseling-theory exercises and a bedtime ritual. Nothing leaves the device unless the person chooses.</p>
        <p className="tl-desc">Around the app: a multi-agent evaluation of its optional AI conversation (which found and fixed gaps in its risk screen), a preregistered bandit simulation with off-policy evaluation, a construct-validity study of its English word categories against 43,396 human emotion labels (AUC .68 to .94), and a DLATK pipeline.</p>
        <div className="paper-links">
          <a className="pill-link" href="https://jen900704.github.io/murmur-voice-journal/">App<Icon name="arrow" /></a>
          <a className="pill-link" href="https://github.com/jen900704/murmur-voice-journal">Code<Icon name="arrow" /></a>
          <a className="pill-link" href="https://github.com/jen900704/murmur-voice-journal/blob/main/docs/architecture.md">Architecture<Icon name="arrow" /></a>
        </div>
      </div>
    </div>
  </section>;
}

/* ---------- beyond ---------- */
function Beyond() {
  return <section id="beyond" className="section" aria-labelledby="beyond-title">
    <SectionHead index="04" kicker="Beyond research" title="Design & community" />
    <h3 id="beyond-title" className="sr-only">Beyond research</h3>
    <div className="beyond-grid">
      <a className="card feature-card" href="https://freakinwalk.netlify.app/" data-reveal>
        <p className="skill-label">Exhibition · May 2024</p>
        <h4>Freak’in Walk</h4>
        <p className="tl-desc">A fashion design project on the everyday challenges of walking through city streets, shown in a runway exhibition at the Young Designers’ Exhibition, Taipei.</p>
        <span className="more">Explore the exhibition<Icon name="arrow" /></span>
      </a>
      <div className="card" data-reveal style={{ ['--d' as string]: '80ms' }}>
        <p className="skill-label">Community</p>
        <p className="tl-desc">Student Group Convener, Taiwanese Psychological Association (2022–2024): organized lectures and seminars. Chair, Chi Sigma Iota Student Mental Health &amp; Wellbeing Committee at Johns Hopkins (2025–2026).</p>
        <p className="skill-label" style={{ marginTop: 20 }}>Creative practice</p>
        <p className="tl-desc">Finalist, 31st International Times Young Creative Awards (2022). Selected participant, Professional Ballet Dancer Experience Camp, <a href="https://www.facebook.com/taiwanballet">Taiwan Ballet Company</a> (2022).</p>
      </div>
    </div>
    <div className="card portfolio-card" data-reveal>
      <div className="portfolio-head">
        <div><p className="skill-label">Design portfolio · 2023</p><h4>Visual work on emotion and healing</h4></div>
        <a className="pill-link" href="https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/art-therapy-portfolio-2023.pdf">Full PDF<Icon name="arrow" /></a>
      </div>
      <PortfolioFlipbook />
    </div>
  </section>;
}

/* ---------- contact / footer ---------- */
function Contact() {
  return <section className="contact" aria-labelledby="contact-title" data-reveal>
    <p className="kicker"><span className="kicker-index">05</span>Contact</p>
    <h2 id="contact-title">I’m glad to talk about research, collaboration, or PhD programs.</h2>
    <div className="hero-actions">
      <a className="btn btn-primary" href={`mailto:${EMAIL}`}><Icon name="mail" />{EMAIL}</a>
      <a className="btn btn-ghost" href={`${base}Jen_CV_short.pdf`}><Icon name="file" />CV (PDF)</a>
    </div>
  </section>;
}

function App() {
  const [active, setActive] = useState('');
  const firstRun = useRef(true);
  useReveal(null);
  useEffect(() => {
    // map legacy hashes
    const go = () => {
      const h = window.location.hash.slice(1);
      const target = hashAliases[h] ?? h;
      if (!target) return;
      const el = document.getElementById(target);
      if (el && (hashAliases[h] || firstRun.current)) el.scrollIntoView({ block: 'start' });
      firstRun.current = false;
    };
    go();
    window.addEventListener('hashchange', go);
    return () => window.removeEventListener('hashchange', go);
  }, []);
  useEffect(() => {
    const ids = nav.map(n => n.id);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return <>
    <a className="skip-link" href="#research">Skip to content</a>
    <SiteHeader active={active} />
    <main>
      <Hero />
      <div className="container">
        <Research />
        <Publications />
        <Experience />
        <Beyond />
        <Contact />
      </div>
    </main>
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© 2026 Hsiang-Chen (Jen) Yeh</span>
        <span>Updated November 2026</span>
      </div>
    </footer>
  </>;
}
export default App;
