'use client';

import { useEffect, useMemo, useState } from 'react';

type CellData = {
  value: string | number | boolean | null;
  fill?: string;
  color?: string;
  bold?: boolean;
  align?: string;
  valign?: string;
  wrap?: boolean;
  colSpan?: number;
  rowSpan?: number;
  skip?: boolean;
};

type SheetData = {
  name: string;
  maxRow: number;
  maxColumn: number;
  columns: { width: number; hidden: boolean }[];
  rows: { height: number | null; hidden: boolean; cells: CellData[] }[];
};

type WorkbookData = { sheets: SheetData[] };

function columnLabel(index: number) {
  let label = '';
  let value = index + 1;
  while (value > 0) {
    value -= 1;
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26);
  }
  return label;
}

export function WorkbookViewer({ src, downloadSrc, title, downloadName }: { src: string; downloadSrc: string; title: string; downloadName: string }) {
  const [workbook, setWorkbook] = useState<WorkbookData | null>(null);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [zoom, setZoom] = useState(.72);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(src)
      .then(response => { if (!response.ok) throw new Error(); return response.json() as Promise<WorkbookData>; })
      .then(data => { setWorkbook(data); setError(false); })
      .catch(() => setError(true));
  }, [src]);

  const sheet = workbook?.sheets[sheetIndex] ?? null;
  // Legend uses descriptive columns; stage sheets preserve the map grid.
  const isLevelLayout = sheet?.name !== 'Legend' && sheet?.name !== '\u8bbe\u5b9a';
  const widths = useMemo(() => sheet?.columns.map((column, index, columns) => {
    const isInformationColumn = isLevelLayout && index >= columns.length - 3;
    return isLevelLayout && !isInformationColumn
      ? 30 * zoom
      : Math.max(34, Math.min(220, column.width * 7.2)) * zoom;
  }) ?? [], [sheet, zoom, isLevelLayout]);
  const layoutTableWidth = isLevelLayout ? widths.reduce((total, width) => total + width, 38 * zoom) : undefined;

  return <div className="workbook-viewer" aria-label={title}>
    <div className="workbook-toolbar">
      <label>Worksheet<select value={sheetIndex} onChange={event => setSheetIndex(Number(event.target.value))} disabled={!workbook}>
          {workbook?.sheets.map((item, index) => <option value={index} key={`${item.name}-${index}`}>{item.name}</option>)}
        </select>
      </label>
      <span>{sheet ? `${sheet.maxRow} rows × ${sheet.maxColumn} columns` : "Loading…"}</span>
      <button type="button" onClick={() => setZoom(value => Math.max(.45, value - .1))} aria-label="Zoom Out Sheet">−</button>
      <span>{Math.round(zoom * 100)}%</span>
      <button type="button" onClick={() => setZoom(value => Math.min(1.25, value + .1))} aria-label="Zoom In Sheet">＋</button>
      <a href={downloadSrc} download={downloadName}>Download Excel</a>
    </div>
    <div className="workbook-stage">
      {error && <p>Unable to load the sheet. Please download the original Excel file.</p>}
      {sheet && <table style={{
        fontSize: `${zoom}rem`,
        width: layoutTableWidth ? `${layoutTableWidth}px` : undefined,
        minWidth: layoutTableWidth ? `${layoutTableWidth}px` : undefined,
      }}>
        <colgroup><col style={{ width: 38 * zoom }} />{widths.map((width, index) => <col style={{ width }} key={index} />)}</colgroup>
        <thead><tr><th className="workbook-corner" />{sheet.columns.map((_, index) => <th key={index}>{columnLabel(index)}</th>)}</tr></thead>
        <tbody>{sheet.rows.map((row, rowIndex) => {
          const raidEffectIndex = row.cells.findIndex(cell => typeof cell.value === 'string' && (cell.value.trim().startsWith('Challenge:') || cell.value.trim().startsWith('\u7a81\u88ad\u6548\u679c')));
          return <tr key={rowIndex} style={{ display: row.hidden ? 'none' : undefined, height: isLevelLayout ? 30 * zoom : row.height ? row.height * zoom : undefined }}>
            <th>{rowIndex + 1}</th>
            {row.cells.map((cell, cellIndex) => {
              if (cell.skip || (raidEffectIndex >= 0 && cellIndex > raidEffectIndex)) return null;
              return <td
                key={cellIndex}
                colSpan={raidEffectIndex === cellIndex ? sheet.maxColumn - cellIndex : cell.colSpan}
                rowSpan={cell.rowSpan}
                style={{
                  backgroundColor: cell.fill,
                  color: cell.color,
                  fontWeight: cell.bold ? 700 : undefined,
                  textAlign: cell.align === 'centerContinuous' ? 'center' : cell.align as 'left' | 'center' | 'right' | undefined,
                  verticalAlign: cell.valign as 'top' | 'middle' | 'bottom' | undefined,
                  whiteSpace: cell.wrap ? 'normal' : 'nowrap',
                }}
              >{cell.value === null ? '' : String(cell.value)}</td>;
            })}
          </tr>;
        })}</tbody>
      </table>}
    </div>
  </div>;
}
