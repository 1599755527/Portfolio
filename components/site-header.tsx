'use client';

import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const pathname = usePathname();
  const projectPaths = ['/projects', '/scratch-game-analysis', '/western-embers', '/fairy-blackjack', '/infinimart', '/omen', '/de-brasserie', '/overdrive-onslaught'];
  const activeSection = pathname === '/'
    ? 'home'
    : pathname === '/resume'
    ? 'resume'
    : pathname === '/about'
      ? 'about'
      : projectPaths.includes(pathname)
        ? 'projects'
        : null;

  return (
    <header className="portfolio-header">
      <a href="/Portfolio/" className="brand">
        <span className="brand-name">Dennis Fei</span>
        <span className="brand-role">Game Designer / Systems Designer / Level Designer</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/Portfolio/" className={activeSection === 'home' ? 'active' : undefined}>Home</a>
        <div className="nav-projects">
          <a href="/Portfolio/projects" className={activeSection === 'projects' ? 'active' : undefined}>Projects</a>
          <div className="project-dropdown">
            <a href="/Portfolio/scratch-game-analysis">Scritchy Scratchy — Systems Analysis</a>
            <a href="/Portfolio/western-embers">Western Embers</a>
            <a href="/Portfolio/infinimart">Infinimart</a>
            <a href="/Portfolio/fairy-blackjack">Fairy Blackjack</a>
            <a href="/Portfolio/omen">Omen</a>
            <a href="/Portfolio/de-brasserie">De_Brasserie</a>
            <a href="/Portfolio/overdrive-onslaught">Overdrive Onslaught</a>
          </div>
        </div>
        <a href="/Portfolio/resume" className={activeSection === 'resume' ? 'active' : undefined}>Resume</a>
        <a href="/Portfolio/about" className={activeSection === 'about' ? 'active' : undefined}>About Me</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="portfolio-footer">
    <div className="portfolio-footer-inner">
      <a className="portfolio-filing" href="https://beian.miit.gov.cn/?utm_source=chatgpt.com#/Integrated/index" target="_blank" rel="noreferrer">ICP Registration No. 2026066714 (Jiangsu)</a>
      <span className="portfolio-copyright">© 2026 Dennis Fei</span>
      <span aria-hidden="true" />
    </div>
  </footer>;
}
