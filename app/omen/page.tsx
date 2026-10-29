import { ContinuousPdfViewer } from '@/components/continuous-pdf-viewer';
import { SiteFooter, SiteHeader } from '@/components/site-header';

const concepts = [
  { title: "Sweet Dream", image: '/Portfolio/omen-concept-sweet-dream.png', paragraphs: [
    "This concept explores happy memories gradually decaying. Early areas are bright and warm, like childhood memories. As players go deeper, the dream becomes dim and ruined, revealing that its supposed perfection rests on a professor's inability to accept his daughter's death.",
    "I chose the daughter's drawings as the Key, with a pocket watch, metronome, and spinning top as the three Omens, connecting them through memory, time, and hypnosis. The final encounter pairs the professor and his daughter as dual bosses. The shift from bright imagery to damaged spaces reinforces the dream's collapse.",
  ] },
  { title: "Misty Garden", image: '/Portfolio/omen-concept-misty-garden.png', paragraphs: [
    "This concept centers on a Chinese garden that suddenly appears in a modern city. Clear weather outside contrasts with the constant mist inside, creating mystery. Players gradually discover an unsettling set of rules: no loud noises, no touching artifacts, and no feeding animals.",
    "A scroll serves as the Key, with a porcelain vase, potted plant, and incense burner as the three Omens, giving the objects a consistent Chinese visual identity. Fish, bats, and turtles become distorted, surreal enemies. The final boss is a pair of dragons from the scroll, combining ink painting, armor, and weapons to create an eerie, oppressive atmosphere.",
  ] },
  { title: "Fairy-Tale World", image: '/Portfolio/omen-concept-fairy-tale.png', paragraphs: [
    "This concept follows a creator who cannot accept that their work is losing attention. Bright, traditional fairy-tale imagery initially presents a familiar, safe world. As players find more Omens, the environment decays, eventually leading to the writer's room, where blood-written text covers the walls and floor.",
    "The Key is a fairy-tale book with a pristine cover and decaying pages. A broken fountain pen, repeatedly revised parchment, and an overturned oil lamp serve as the three Omens, tracing the writer's cycle of creation, revision, and collapse. The writer is the final boss: still neatly dressed but covered in wounds, expressing a final fixation on personal image and creative work.",
  ] },
];

export default function OmenPage() {
  return <main>
    <SiteHeader />
    <article className="detail-page de-brasserie-page">
      <header className="detail-hero"><h1>Omen</h1><p>Level Design / Concept Design</p><p>September 2025 – May 2026</p></header>
      <div className="project-video"><video controls preload="metadata" playsInline><source src="/Portfolio/omen-hero.mp4" type="video/mp4" />Your browser does not support video playback.</video></div>
      <section className="detail-section">
        <h2>Overview</h2>
        <p className="overview-item"><span>Project Overview: </span>Omen is a top-down action RPG combining randomized roguelike exploration with narrative-driven levels. Players explore procedurally generated dungeons and encounter different Omens, whose influence shapes the levels and story paths they enter next.</p>
        <p>The game combines historical disasters, mythology, and psychological horror. A randomized first stage leads into handcrafted narrative levels in the second, balancing unpredictability, storytelling, and replayability.</p>
        <p className="overview-item"><span>Gameplay Loop: </span>Enter a randomized Stage 1 dungeon → explore and fight → encounter Omen objects → Omen weights influence the next route → enter the corresponding Stage 2 narrative level → complete its challenges → begin a new run.</p>
        <dl className="detail-facts"><div><dt>Genre: </dt><dd>Top-Down Action RPG / Roguelike</dd></div><div><dt>Mode: </dt><dd>Single-Player</dd></div><div><dt>Engine: </dt><dd>Unreal Engine 5</dd></div><div><dt>Team Size: </dt><dd>12 people</dd></div><div><dt>Team Members: </dt><dd>Shi Zhengye, Li Chengyu, Ma Tengfei, Wang Junxiang, Ji Zhouzhou, Dennis Fei, Liu Niandong, Wang Yake, Huang Rui, Dai Yichen, Wang Taozhe, Zhou Xiyin</dd></div><div><dt>Duration: </dt><dd>8 months</dd></div><div><dt>Platform: </dt><dd>PC</dd></div><div><dt>Responsibilities: </dt><dd>Level Design, Concept Design</dd></div><div><dt>Game Download: </dt><dd><a className="infinimart-demo-link" href="https://pan.baidu.com/s/1yYf_UslCDAOQqgXX__qPnw?pwd=sin1" target="_blank" rel="noreferrer">https://pan.baidu.com/s/1yYf_UslCDAOQqgXX__qPnw?pwd=sin1</a> Access code: sin1</dd></div></dl>
      </section>
      <section className="detail-section omen-concept-section">
        <h2>Concept Design</h2>
        <div className="omen-concept-overview-grid">
          <div className="omen-concept-intro">
            <p>Before production, I developed several concepts with different themes. Beyond choosing an art style, I established each level's core theme, narrative background, key objects, enemy direction, bosses, and atmosphere. Each map needed a distinct identity and a story conveyed through the environment, symbolic objects, and exploration. I first worked out why the world existed, what players would see, and what they would face, then translated those ideas into level structure and gameplay.</p>
            <p>For each concept, I built a Key, three Omens, a mini-boss, a final boss, regular enemies, and a visual direction around one theme. Together, these define the atmosphere, environmental elements, exploration goals, and final encounter, giving subsequent level work a consistent foundation.</p>
          </div>
          <div className="omen-concept-document"><div className="project-pdf omen-concept-pdf"><ContinuousPdfViewer src="/Portfolio/omen-concept-design.pdf" title="Omen concept design document" downloadName="Omen_Concept_Design_EN.pdf" /></div><a className="attachment-link" href="/Portfolio/omen-concept-design.pdf" download="Omen_Concept_Design_EN.pdf">Concept Design PDF <span>Download</span></a></div>
        </div>
        <div className="omen-concept-rows">
          {concepts.map((concept, index) => <article className={`omen-concept-row${index === 1 ? ' reverse' : ''}`} key={concept.title}>
            <div className="omen-concept-copy"><h3>{concept.title}</h3>{concept.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            <figure className="omen-concept-visual"><img src={concept.image} alt={`${concept.title} concept art`} />{index === 2 && <figcaption>All concept art was generated with AI.</figcaption>}</figure>
          </article>)}
        </div>
      </section>
      <section className="detail-section omen-level-design-section">
        <h2>Level Design</h2>
        <div className="project-video omen-level-design-video"><video controls preload="metadata" playsInline><source src="/Portfolio/omen-level-design.mp4" type="video/mp4" />Your browser does not support video playback.</video></div>
        <p className="omen-level-design-note">Without dedicated modeling support, level designers also created environment assets. The visuals therefore focus on validating atmosphere and spatial readability.</p>
        <div className="omen-garden-document-grid">
          <p>After developing several concepts, I discussed them with the producer and teammates. Considering the visuals, opportunities for level design, and production constraints, we selected the fairy-tale theme for production and continued with level design and environment building. Misty Garden was not selected for production, but I developed a separate level and mechanics document covering its surface and inner worlds, progression, puzzles, and combat pacing.</p>
          <div className="project-pdf omen-garden-pdf"><ContinuousPdfViewer src="/Portfolio/omen-garden-design.pdf" title="Misty Garden level and mechanics design document" /></div>
        </div>
        <div className="omen-level-process">
          <article className="omen-level-process-row sketch">
            <div><h3>1. 2D Level Sketch</h3><p>Before building in Unreal Engine, I draw top-down sketches to plan the overall structure, major areas, and player routes. I establish the spawn, exploration areas, boss arena, and connections while considering progression and route choices. Sketching lets me revise the structure quickly and check whether the core flow is clear before production.</p></div>
            <img src="/Portfolio/omen-level-sketch.jpg" alt="2D level sketch" />
          </article>
          <h3 className="omen-terrain-title">2. Terrain and Area Blockout</h3>
          <article className="omen-level-process-row image-left">
            <img src="/Portfolio/omen-terrain-layout.jpg" alt="Unreal Engine terrain and area planning" />
            <div><p>I then turn the 2D layout into playable space in Unreal Engine, establishing the position, size, and connections of major areas. I check whether movement from spawn through exploration spaces to the boss feels natural, adjusting route lengths, turns, and scale to avoid oversized, empty, or awkwardly connected spaces.</p><p>Once the broad layout is established, I refine the space with rivers, mountains, elevation changes, and terrain boundaries. These features add visual depth while separating routes and guiding movement. Rivers can divide areas naturally, while mountains constrain movement and distinguish spaces. The goal is to preserve the 2D design while making the actual environment more readable and comfortable to explore.</p></div>
          </article>
          <article className="omen-level-process-row image-left">
            <img src="/Portfolio/omen-environment-overview.png" alt="Top-down level layout" />
            <div><p>With the terrain established, I refine the layout around it, revisiting main routes, connections, spatial functions, area sizes, and entry order. I identify spaces to expand or compress and check whether progression from spawn remains clear. The final layout preserves the original goals while making fuller use of the terrain's spatial relationships.</p></div>
          </article>
          <div className="omen-environment-detail">
            <h3>3. Details and Visual Refinement</h3>
            <p>After terrain and main routes are set, I refine invisible walls, terrain edges, roads, and environment assets, adding small props to strengthen the atmosphere. Set dressing and visual hierarchy distinguish areas and help players recognize main paths and key spaces, while bringing the scene closer to the original concept direction.</p>
            <div className="omen-environment-images"><img src="/Portfolio/omen-environment-detail-01.png" alt="Environment detail A" /><img src="/Portfolio/omen-environment-detail-02.png" alt="Environment detail B" /></div>
          </div>
        </div>
        <h2 className="omen-gallery-title">Gallery</h2>
        <div className="omen-gallery">
          {Array.from({ length: 10 }, (_, index) => <img key={index} src={`/Portfolio/omen-gallery-${String(index + 1).padStart(2, '0')}.jpeg`} alt={`Fairy-tale level gallery ${index + 1}`} />)}
        </div>
      </section>
    </article>
    <SiteFooter />
  </main>;
}
