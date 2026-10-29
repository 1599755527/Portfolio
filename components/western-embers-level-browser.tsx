'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Box, Map, Route, Users, X } from 'lucide-react';
import {
  exLevels,
  mainLevels,
  type Enemy,
  type LevelVariant,
  type WesternEmbersLevel,
} from '@/lib/western-embers-levels';

type Collection = 'main' | 'ex';
type View = 'map' | 'route' | 'render' | 'enemies';

const nodeY = [46, 112, 70, 142, 92, 42, 118, 75, 136, 62];
const exNodeY = [64, 104, 70, 110, 76, 116, 82, 122];
const viewMeta: Record<View, { label: string; icon: typeof Map }> = {
  map: { label: "Map", icon: Map },
  route: { label: "Routes", icon: Route },
  render: { label: "3D View", icon: Box },
  enemies: { label: "Enemies", icon: Users },
};

export function WesternEmbersLevelBrowser() {
  const [collection, setCollection] = useState<Collection>('main');
  const [selected, setSelected] = useState<WesternEmbersLevel | null>(null);
  const [variant, setVariant] = useState<'normal' | 'challenge'>('normal');
  const [view, setView] = useState<View | null>(null);
  const [trackX, setTrackX] = useState(34);
  const [dragging, setDragging] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [showExTip, setShowExTip] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, originX: 0 });
  const levels = collection === 'main' ? mainLevels : exLevels;
  const yPositions = collection === 'main' ? nodeY : exNodeY;

  const clampTrack = (value: number) => {
    const width = viewportRef.current?.clientWidth ?? 920;
    const maximum = width / 2 - 110;
    const minimum = width / 2 - ((levels.length - 1) * 220 + 110);
    return Math.min(maximum, Math.max(minimum, value));
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setShowHint(false), 4200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const handleWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('.we-enemy-list,.we-enemy-description')) return;
      event.preventDefault();
      event.stopPropagation();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const maximum = viewport.clientWidth / 2 - 110;
      const minimum = viewport.clientWidth / 2 - ((levels.length - 1) * 220 + 110);
      setTrackX((current) => Math.min(maximum, Math.max(minimum, current - delta * 0.7)));
      setShowHint(false);
    };
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [levels.length]);

  const centerLevel = (level: WesternEmbersLevel) => {
    const index = levels.findIndex((item) => item.id === level.id);
    const width = viewportRef.current?.clientWidth ?? 920;
    setTrackX(width / 2 - (index * 220 + 110));
    setSelected(level);
    setVariant('normal');
    setView(null);
    setShowHint(false);
  };

  const switchCollection = () => {
    const enteringEx = collection === 'main';
    setShowHint(false);
    setSwitching(true);
    window.setTimeout(() => {
      setCollection((current) => (current === 'main' ? 'ex' : 'main'));
      setSelected(null);
      setView(null);
      setTrackX(34);
      setShowExTip(enteringEx);
      if (enteringEx) window.setTimeout(() => setShowExTip(false), 4200);
      window.setTimeout(() => setSwitching(false), 30);
    }, 180);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, moved: false, startX: event.clientX, originX: trackX };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    setShowHint(false);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 5) dragRef.current.moved = true;
    setTrackX(clampTrack(dragRef.current.originX + delta));
  };

  const stopDrag = () => {
    dragRef.current.active = false;
    setDragging(false);
  };

  const content = useMemo<LevelVariant | undefined>(() => {
    if (!selected) return undefined;
    if (selected.type === 'ex') return variant === 'normal' ? selected.normal : selected.challenge;
    return selected.content;
  }, [selected, variant]);

  return (
    <section className="we-browser" aria-label="Western Embers stage browser">
      <div
        ref={viewportRef}
        className={`we-map-viewport${collection === 'ex' ? ' is-ex' : ''}${switching ? ' is-switching' : ''}${dragging ? ' is-dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onClick={(event) => {
          if (dragRef.current.moved) return;
          const target = event.target as HTMLElement;
          if (!target.closest('.we-level-node,.we-mode-switch,.we-level-panel,.we-detail-view')) setSelected(null);
        }}
      >
        <div className="we-map-noise" aria-hidden="true" />
        <div className="we-track" style={{ transform: `translate3d(${trackX}px,0,0)` }}>
          <svg className="we-connections" viewBox="0 0 2200 260" aria-hidden="true">
            <polyline points={levels.map((_, index) => `${index * 220 + 33},${yPositions[index] + 42}`).join(' ')} />
          </svg>
          {levels.map((level, index) => (
            <button
              type="button"
              className={`we-level-node ${level.type === 'inst' ? 'is-inst' : ''} ${selected?.id === level.id ? 'is-selected' : ''}`}
              key={level.id}
              style={{ left: index * 220, top: yPositions[index] }}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                centerLevel(level);
              }}
              aria-pressed={selected?.id === level.id}
            >
              <span className="we-node-bar">{level.type === 'inst' ? 'TUTORIAL' : 'OPERATION'}</span>
              <span className="we-node-body"><span className="we-node-gem" />{level.id}</span>
            </button>
          ))}
        </div>

        <button type="button" className="we-mode-switch" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); switchCollection(); }}>
          {collection === 'main' ? "Switch to EX" : "Switch to Story"}
        </button>

        <p className={`we-hint${showHint ? ' is-visible' : ''}`}>Drag to browse stages. Select a node to view its map, routes, enemies, and 3D scene.</p>
        {collection === 'ex' && <p className={`we-hint we-ex-hint${showExTip ? ' is-visible' : ''}`}>EX stages include Normal and Challenge Modes.</p>}

        <aside className={`we-level-panel${selected ? ' is-open' : ''}`} onPointerDown={(event) => event.stopPropagation()}>
          {selected && (
            <>
              <button className="we-panel-close" type="button" aria-label="Close stage details" onClick={() => setSelected(null)}><X size={19} /></button>
              <div className="we-panel-heading"><small>OPERATION</small><strong>{selected.id}</strong></div>
              {selected.type === 'ex' && (
                <div className="we-variant-row">
                  <div className="we-variant-switch" aria-label="EX stage mode">
                    <button className={variant === 'normal' ? 'active' : ''} onClick={() => setVariant('normal')}>Normal</button>
                    <button className={variant === 'challenge' ? 'active' : ''} onClick={() => setVariant('challenge')}>Challenge</button>
                  </div>
                  <p className="we-challenge-effect"><strong>Challenge Effect: </strong>{selected.challengeEffect}</p>
                </div>
              )}
              {selected.mechanisms.length > 0 && <div className="we-mechanisms">{selected.mechanisms.map((item) => <span key={item}>{item}</span>)}</div>}
              <div className="we-entry-grid">
                {(Object.keys(viewMeta) as View[]).map((key) => {
                  const Icon = viewMeta[key].icon;
                  return <button type="button" key={key} onClick={() => setView(key)}><Icon size={24} /><span>{viewMeta[key].label}</span></button>;
                })}
              </div>
            </>
          )}
        </aside>

        {selected && view && <DetailView level={selected} view={view} content={content} onBack={() => setView(null)} />}
      </div>
    </section>
  );
}

function DetailView({ level, view, content, onBack }: { level: WesternEmbersLevel; view: View; content?: LevelVariant; onBack: () => void }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; title: string; description: string } | null>(null);
  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const image = view === 'map' ? content?.map : view === 'route' ? content?.routeMap : content?.render;
  const legend = view === 'map' ? content?.mapLegend : content?.routeLegend;

  const prepareMapSampler = (imageElement: HTMLImageElement) => {
    if (view !== 'map') return;
    const canvas = document.createElement('canvas');
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    canvas.getContext('2d', { willReadFrequently: true })?.drawImage(imageElement, 0, 0);
    mapCanvasRef.current = canvas;
  };

  const handleMapPointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
    const imageElement = event.currentTarget;
    const canvas = mapCanvasRef.current;
    if (view !== 'map' || !canvas || !imageElement.naturalWidth || !imageElement.naturalHeight) return;

    const bounds = imageElement.getBoundingClientRect();
    const naturalRatio = imageElement.naturalWidth / imageElement.naturalHeight;
    const boxRatio = bounds.width / bounds.height;
    const renderedWidth = boxRatio > naturalRatio ? bounds.height * naturalRatio : bounds.width;
    const renderedHeight = boxRatio > naturalRatio ? bounds.height : bounds.width / naturalRatio;
    const renderedLeft = bounds.left + (bounds.width - renderedWidth) / 2;
    const renderedTop = bounds.top + (bounds.height - renderedHeight) / 2;

    if (event.clientX < renderedLeft || event.clientX > renderedLeft + renderedWidth || event.clientY < renderedTop || event.clientY > renderedTop + renderedHeight) {
      setTooltip(null);
      return;
    }

    const sourceX = Math.min(canvas.width - 1, Math.max(0, Math.floor((event.clientX - renderedLeft) / renderedWidth * canvas.width)));
    const sourceY = Math.min(canvas.height - 1, Math.max(0, Math.floor((event.clientY - renderedTop) / renderedHeight * canvas.height)));
    const pixel = canvas.getContext('2d', { willReadFrequently: true })?.getImageData(sourceX, sourceY, 1, 1).data;
    if (!pixel) return;

    const parseColor = (color: string) => color.startsWith('#') ? [parseInt(color.slice(1, 3), 16), parseInt(color.slice(3, 5), 16), parseInt(color.slice(5, 7), 16)] : null;
    const candidates = (content?.mapLegend ?? []).flatMap((item) => [
      { item, rgb: parseColor(item.color) },
      ...(item.secondaryColor ? [{ item, rgb: parseColor(item.secondaryColor) }] : []),
      ...(item.color === 'transparent' ? [{ item, rgb: [255, 255, 255] }] : []),
    ]).filter((candidate): candidate is { item: NonNullable<typeof content>['mapLegend'][number]; rgb: number[] } => Boolean(candidate.rgb));
    const match = candidates.map((candidate) => ({
      ...candidate,
      distance: Math.hypot(pixel[0] - candidate.rgb[0], pixel[1] - candidate.rgb[1], pixel[2] - candidate.rgb[2]),
    })).sort((a, b) => a.distance - b.distance)[0];

    if (!match || match.distance > 72) {
      setTooltip(null);
      return;
    }

    setTooltip({
      x: Math.min(72, Math.max(2, (event.clientX - bounds.left) / bounds.width * 100)),
      y: Math.min(76, Math.max(2, (event.clientY - bounds.top) / bounds.height * 100)),
      title: match.item.label,
      description: match.item.description ?? "No additional description for this tile.",
    });
  };

  return (
    <div className="we-detail-view" onPointerDown={(event) => event.stopPropagation()}>
      <div className="we-detail-frame">
        <header className="we-detail-header">
          <button type="button" onClick={onBack}><ArrowLeft size={19} />Back</button>
          <div><small>{level.id}</small><strong>{viewMeta[view].label}</strong></div>
        </header>
        {view === 'enemies' ? (
          content?.enemies.length ? <EnemyDetail enemies={content.enemies} /> : <EmptyState label="Enemy configurations will be added later" />
        ) : (
          <div className="we-detail-layout">
            <aside className="we-detail-legend">
              <h3>{view === 'route' ? "Route Notes" : view === 'map' ? "Map Notes" : "Scene Notes"}</h3>
              {view === 'render' ? <p>{image ? "3D stage layout preview." : "3D scene assets will be added later."}</p> : legend?.length ? <ul>{legend.map((item) => <li key={item.label} title={item.description}><span className={`we-swatch${item.color === 'transparent' ? ' transfer' : ''}${item.symbol ? ` symbol-${item.symbol}` : ''}`} style={{ '--legend-color': item.color, background: item.color } as React.CSSProperties}>{item.color === 'transparent' ? '→' : null}</span>{item.secondaryColor && <span className="we-swatch secondary" style={{ background: item.secondaryColor }} />}<span>{item.label}</span></li>)}</ul> : <p>Route notes will be added when the route map is complete.</p>}
            </aside>
            <div className="we-detail-media is-render">
              {image ? <div className="we-media-inner"><img src={image} alt={`${level.id} ${viewMeta[view].label}`} onLoad={(event) => prepareMapSampler(event.currentTarget)} onPointerMove={handleMapPointerMove} onPointerLeave={() => setTooltip(null)} />{tooltip && <div className="we-tooltip" style={{ left: `${tooltip.x}%`, top: `${tooltip.y}%` }}><strong>{tooltip.title}</strong><span>{tooltip.description}</span></div>}</div> : <EmptyState label={`${viewMeta[view].label} will be added later`} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EnemyDetail({ enemies }: { enemies: Enemy[] }) {
  const [selectedId, setSelectedId] = useState(enemies[0]?.id ?? 0);
  useEffect(() => setSelectedId(enemies[0]?.id ?? 0), [enemies]);
  const selectedEnemy = enemies.find((enemy) => enemy.id === selectedId) ?? enemies[0];

  return <div className="we-enemy-detail">
    <aside className="we-enemy-list" aria-label="Enemies in This Stage">
      <div className="we-enemy-list-heading"><small>ENEMY</small><strong>Enemy Types</strong></div>
      <div className="we-enemy-list-grid">
        {enemies.map((enemy) => <button
          type="button"
          className={enemy.id === selectedEnemy.id ? 'active' : ''}
          key={enemy.id}
          onClick={() => setSelectedId(enemy.id)}
          aria-pressed={enemy.id === selectedEnemy.id}
        >
          <span className="we-enemy-number">{enemy.id}</span>
          <span>{enemy.name}</span>
        </button>)}
      </div>
    </aside>
    <article className="we-enemy-description">
      <header><span>{String(selectedEnemy.id).padStart(2, '0')}</span><div><h2>{selectedEnemy.name}</h2><p>{selectedEnemy.category}</p></div></header>
      <section>
        <h3>Mechanics</h3>
        <ul>{selectedEnemy.mechanics.map((mechanic) => <li key={mechanic}>{mechanic}</li>)}</ul>
        {selectedEnemy.phases?.map((phase) => <div className="we-enemy-phase" key={phase.title}>
          <h3>{phase.title}</h3>
          <ul>{phase.mechanics.map((mechanic) => <li key={mechanic}>{mechanic}</li>)}</ul>
        </div>)}
      </section>
    </article>
  </div>;
}

function EmptyState({ label }: { label: string }) {
  return <div className="we-empty"><span aria-hidden="true">＋</span><p>{label}</p></div>;
}
