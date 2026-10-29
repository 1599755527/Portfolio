'use client';

import { useEffect, useState } from 'react';
type SheetData = { sheetName: string; rows: (string | number | null)[][] };

export function CompactSheetViewer({ src, downloadSrc, title, downloadName }: { src: string; downloadSrc: string; title: string; downloadName?: string }) {
  const [data, setData] = useState<SheetData | null>(null);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(.78);
  useEffect(() => { fetch(src).then(response => { if (!response.ok) throw new Error(); return response.json() as Promise<SheetData>; }).then(value => setData(value)).catch(() => setError(true)); }, [src]);
  const columnCount = data?.rows.reduce((max, row) => Math.max(max, row.length), 0) ?? 0;
  return <div className="compact-sheet-viewer" aria-label={title}>
    <div className="compact-sheet-toolbar"><strong>{data?.sheetName ?? 'Sheet1'}</strong><span>{data ? `${data.rows.length} rows × ${columnCount} columns` : "Loading…"}</span><button type="button" onClick={() => setZoom(v => Math.max(.55, v - .1))}>−</button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom(v => Math.min(1.2, v + .1))}>＋</button><a href={downloadSrc} download={downloadName || true}>Download Excel</a></div>
    <div className="compact-sheet-stage">{error ? <p>Unable to load the sheet. Please download the original Excel file.</p> : data && <table style={{ fontSize: `${zoom}rem` }}><tbody>{data.rows.map((row, ri) => <tr key={ri}><th>{ri + 1}</th>{Array.from({ length: columnCount }, (_, ci) => <td key={ci}>{row[ci] ?? ''}</td>)}</tr>)}</tbody></table>}</div>
  </div>;
}
