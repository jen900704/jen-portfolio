import { useState } from 'react';
const totalPages = 29;
const imageBase = 'https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/art-therapy-portfolio-2023';
export function PortfolioFlipbook() {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  function goTo(next: number) { setState('loading'); setPage(next); }
  return <div className="portfolio-viewer">
    <div className="portfolio-controls">
      <button type="button" disabled={page === 1} onClick={() => goTo(page - 1)}>← Previous</button>
      <label>Page <select aria-label="Portfolio page" value={page} onChange={e => goTo(Number(e.target.value))}>{Array.from({ length: totalPages }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</select> of {totalPages}</label>
      <button type="button" disabled={page === totalPages} onClick={() => goTo(page + 1)}>Next →</button>
    </div>
    <div className="portfolio-frame" aria-busy={state === 'loading'}>
      {state === 'error' ? <p role="status">This page could not load. <button type="button" onClick={() => setState('loading')}>Try again</button> or open the full PDF below.</p> : <img key={page} src={`${imageBase}/Slide${page}.PNG`} alt={`Art portfolio, page ${page} of ${totalPages}`} onLoad={() => setState('ready')} onError={() => setState('error')} />}
    </div>
  </div>;
}
