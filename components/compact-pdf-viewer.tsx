'use client';

import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentLoadingTask, RenderTask } from 'pdfjs-dist/types/src/pdf';

type CompactPdfViewerProps = { src: string; title: string };

export function CompactPdfViewer({ src, title }: CompactPdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [scale, setScale] = useState(.5);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let renderTask: RenderTask | undefined;
    let loadingTask: PDFDocumentLoadingTask | undefined;

    async function renderPdf() {
      try {
        const pdfjs = await import('pdfjs-dist');
        const pdfUrl = new URL(src, window.location.origin).href;
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('/Portfolio/pdf.worker.min.js', window.location.origin).href;
        loadingTask = pdfjs.getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        setPages(pdf.numPages);
        const currentPage = Math.min(page, pdf.numPages);
        if (currentPage !== page) setPage(currentPage);
        const pdfPage = await pdf.getPage(currentPage);
        const viewport = pdfPage.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        renderTask = pdfPage.render({
          canvas,
          canvasContext: context,
          viewport,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
        });
        await renderTask.promise;
        if (!cancelled) setError(false);
      } catch (renderError) {
        if (!cancelled && (renderError as { name?: string }).name !== 'RenderingCancelledException') setError(true);
      }
    }

    renderPdf();
    return () => {
      cancelled = true;
      renderTask?.cancel();
      void loadingTask?.destroy();
    };
  }, [page, scale, src]);

  const printPdf = () => {
    const printWindow = window.open(src, '_blank', 'noopener,noreferrer');
    printWindow?.addEventListener('load', () => printWindow.print(), { once: true });
  };

  return <div className="compact-pdf-viewer" aria-label={title}>
    <div className="compact-pdf-toolbar">
      <button type="button" onClick={() => setScale(value => Math.max(.3, value - .1))} aria-label="Zoom Out" title="Zoom Out">−</button>
      <span className="pdf-zoom">{Math.round(scale * 100)}%</span>
      <button type="button" onClick={() => setScale(value => Math.min(2, value + .1))} aria-label="Zoom In" title="Zoom In">＋</button>
      <button type="button" onClick={() => setPage(value => Math.max(1, value - 1))} disabled={page <= 1} aria-label="Previous Page" title="Previous Page">‹</button>
      <span className="pdf-page">{page} / {pages}</span>
      <button type="button" onClick={() => setPage(value => Math.min(pages, value + 1))} disabled={page >= pages} aria-label="Next Page" title="Next Page">›</button>
      <a href={src} target="_blank" rel="noreferrer" aria-label="Open Fullscreen" title="Open Fullscreen">↗</a>
      <a href={src} download aria-label="Download" title="Download">⇩</a>
      <button type="button" onClick={printPdf} aria-label="Print" title="Print">▣</button>
    </div>
    <div className="compact-pdf-stage">
      {error ? <p>Failed to load PDF.<a href={src} target="_blank" rel="noreferrer">Open the file</a></p> : <canvas ref={canvasRef}/>} 
    </div>
  </div>;
}
