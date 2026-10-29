'use client';

import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentLoadingTask, RenderTask } from 'pdfjs-dist/types/src/pdf';

export function ContinuousPdfViewer({ src, title, downloadName, initialScale = .5 }: { src: string; title: string; downloadName?: string; initialScale?: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(initialScale);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: PDFDocumentLoadingTask | undefined;
    const renderTasks: RenderTask[] = [];

    async function renderAllPages() {
      const stage = stageRef.current;
      if (!stage) return;
      stage.replaceChildren();
      try {
        const pdfjs = await import('pdfjs-dist');
        const pdfUrl = new URL(src, window.location.origin).href;
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('/Portfolio/pdf.worker.min.js', window.location.origin).href;
        loadingTask = pdfjs.getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        setPages(pdf.numPages);
        const outputScale = window.devicePixelRatio || 1;
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale });
          const wrapper = document.createElement('div');
          wrapper.className = 'continuous-pdf-page';
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) continue;
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;
          wrapper.appendChild(canvas);
          stage.appendChild(wrapper);
          const task = page.render({ canvas, canvasContext: context, viewport, transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0] });
          renderTasks.push(task);
          await task.promise;
        }
        if (!cancelled) setError(false);
      } catch (renderError) {
        if (!cancelled && (renderError as { name?: string }).name !== 'RenderingCancelledException') {
          stage.replaceChildren();
          setError(true);
        }
      }
    }

    void renderAllPages();
    return () => { cancelled = true; renderTasks.forEach(task => task.cancel()); void loadingTask?.destroy(); };
  }, [scale, src]);

  const printPdf = () => { const win = window.open(src, '_blank', 'noopener,noreferrer'); win?.addEventListener('load', () => win.print(), { once: true }); };

  return <div className="compact-pdf-viewer continuous-pdf-viewer" aria-label={title}>
    <div className="compact-pdf-toolbar"><button type="button" onClick={() => setScale(v => Math.max(.3, v - .1))} title="Zoom Out">−</button><span className="pdf-zoom">{Math.round(scale * 100)}%</span><button type="button" onClick={() => setScale(v => Math.min(1.5, v + .1))} title="Zoom In">＋</button><span className="pdf-page">{pages || '…'} pages</span><a href={src} target="_blank" rel="noreferrer" title="Open Fullscreen">↗</a><a href={src} download={downloadName || true} title="Download">⇩</a><button type="button" onClick={printPdf} title="Print">▣</button></div>
    <div className="compact-pdf-stage continuous-pdf-stage" ref={stageRef}>{error && <p>Failed to load PDF.<a href={src} target="_blank" rel="noreferrer">Open the file</a></p>}</div>
  </div>;
}
