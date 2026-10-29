import { ContinuousPdfViewer } from '@/components/continuous-pdf-viewer';
import { SiteFooter, SiteHeader } from '@/components/site-header';

export default function Resume() {
  return <main>
    <SiteHeader />
    <section className="simple-page resume-page">
      <h1 className="section-title">Resume</h1>
      <div className="resume-document">
        <div className="project-pdf resume-pdf">
          <ContinuousPdfViewer src="/Portfolio/teng-f-resume.pdf" title="Dennis Fei — Resume" downloadName="Teng_F_Resume.pdf" initialScale={1.2} />
        </div>
        <a className="attachment-link" href="/Portfolio/teng-f-resume.pdf" download="Teng_F_Resume.pdf">Resume PDF <span>Download</span></a>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
