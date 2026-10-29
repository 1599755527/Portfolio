import { SiteFooter, SiteHeader } from '@/components/site-header';
import { ContinuousPdfViewer } from '@/components/continuous-pdf-viewer';
import { WorkbookViewer } from '@/components/workbook-viewer';
import { WesternEmbersLevelBrowser } from '@/components/western-embers-level-browser';

const galleryImages = [
  { src: '/Portfolio/western-embers-gallery-main-3.png', label: "Story 3" },
  { src: '/Portfolio/western-embers-gallery-main-5.png', label: "Story 5" },
  { src: '/Portfolio/western-embers-gallery-main-6.png', label: "Story 6" },
  { src: '/Portfolio/western-embers-gallery-main-7.png', label: "Story 7" },
  { src: '/Portfolio/western-embers-gallery-main-8.png', label: "Story 8" },
  { src: '/Portfolio/western-embers-gallery-ex-1.png', label: 'EX-1' },
  { src: '/Portfolio/western-embers-gallery-ex-2.png', label: 'EX-2' },
  { src: '/Portfolio/western-embers-gallery-ex-3.png', label: 'EX-3' },
  { src: '/Portfolio/western-embers-gallery-ex-4.png', label: 'EX-4' },
  { src: '/Portfolio/western-embers-gallery-ex-5.png', label: 'EX-5' },
  { src: '/Portfolio/western-embers-gallery-ex-6.png', label: 'EX-6' },
  { src: '/Portfolio/western-embers-gallery-ex-7.png', label: 'EX-7' },
  { src: '/Portfolio/western-embers-gallery-ex-8.png', label: 'EX-8' },
];

export default function WesternEmbersPage() {
  return <main><SiteHeader /><article className="detail-page de-brasserie-page western-embers-page">
    <header className="detail-hero"><h1>Western Embers</h1><p>Solo Arknights Event Design Proposal</p><p>September 2025 – December 2025</p></header>
    <WesternEmbersLevelBrowser />
    <p className="western-embers-browser-tip"><strong>Tip</strong><span>Drag the stage list to browse all stages. Select a node to view its map, routes, enemies, and 3D scene. Hover over tiles on the map for names and mechanic descriptions.</span></p>
    <section className="detail-section western-embers-overview">
      <h2>Overview</h2>
      <div className="western-embers-overview-grid">
        <div className="western-embers-overview-copy">
          <p className="overview-item"><span>Project Overview: </span>Western Embers is an original Arknights event level proposal set on Columbia's western frontier after Come Catastrophes or Wakes of Vultures. Jessica leaves the life Blacksteel and the Brynley family planned for her and joins the pioneers of Davistown to start again on the frontier. As they travel west, she becomes involved in conflicts over land and Originium between local settlers, the Infected, immigrants, and major corporations.</p>
          <p>The event includes two INST tutorials, eight story stages, and eight EX stages with Challenge Modes. Supply points, pack beasts, Originium deposits, mine carts, and tracks connect the narrative theme directly to stage and enemy mechanics.</p>
          <dl className="detail-facts">
            <div><dt>Genre: </dt><dd>Arknights Event Level Design Proposal</dd></div>
            <div><dt>Mode: </dt><dd>Single-Player</dd></div>
            <div><dt>Platform: </dt><dd>PC / Mobile</dd></div>
            <div><dt>Tools: </dt><dd>Maya / Blender / Photoshop / Word</dd></div>
            <div><dt>Completed: </dt><dd>December 2025</dd></div>
            <div><dt>Role: </dt><dd>Event Design / Level Design / Mechanics / Enemy Design</dd></div>
          </dl>
        </div>
        <div className="western-embers-document">
          <div className="project-pdf western-embers-pdf"><ContinuousPdfViewer src="/Portfolio/western-embers-activity-design.pdf" title="Western Embers complete event design document" downloadName="Western_Embers_Event_Design_EN.pdf" /></div>
          <a className="attachment-link" href="/Portfolio/western-embers-activity-design.pdf" download="Western_Embers_Event_Design_EN.pdf">Complete Event Design PDF <span>Download</span></a>
        </div>
      </div>
    </section>
    <section className="detail-section western-embers-mechanisms">
      <h2>Core Mechanics</h2>
      <div className="western-embers-mechanism-row">
        <div className="western-embers-mechanism-copy">
          <h3>Stage Mechanics</h3>
          <p>The stage mechanics center on contested resources, primarily Originium deposits and mine carts. Both sides can use them, allowing a single mechanic tile to serve opposing purposes rather than only strengthening one side.</p>
          <p>Originium deposits have separate friendly and enemy SP gauges. Naturally regenerating friendly SP grants combat benefits, while enemies build their gauge by attacking deposits. A full enemy gauge activates mine carts on the field.</p>
          <p>Mine carts travel back and forth on fixed tracks, transporting certain enemies and changing their subsequent routes. Sustained attacks against the cart's direction of travel can reverse it early. Both sides compete over the same resources and transport tools, making the map itself part of combat.</p>
        </div>
        <figure className="western-embers-mechanism-visual"><img src="/Portfolio/western-embers-mechanism-relationship.png" alt="Western Embers core mechanic relationships" /></figure>
      </div>
      <div className="western-embers-mechanism-row reverse">
        <figure className="western-embers-mechanism-visual"><img src="/Portfolio/western-embers-enemy-interaction.png" alt="Western Embers enemy and stage mechanic interactions" /></figure>
        <div className="western-embers-mechanism-copy">
          <h3>Enemy Mechanics</h3>
          <p>Enemy mechanics revolve around supply points and a custom enemy, the pack beast. Supply points strengthen passing enemies and beasts, while beasts act as mounts that alter movement and combat. I designed enemies around the stage mechanics: each has a clear base role, then gains new attacks or behaviors from buffs, beasts, or mine carts. This lets one enemy create different threats in different environments without relying entirely on new enemy types for complexity.</p>
          <p>Enemies have different permissions to interact with stage mechanics. Some mount beasts for movement and attack bonuses; others use carts to reposition or attack deposits to disrupt resource control. Buff effects also fit each enemy's role, such as stronger next attacks, altered attacks, beast summons, operator control, or direct effects on deposits.</p>
        </div>
      </div>
    </section>
    <section className="detail-section western-embers-enemies">
      <h2>Core Enemy Design</h2>
      <p className="western-embers-enemy-intro">I wanted each enemy to actively use supply points, beasts, carts, or deposits and demand a different response. I first established its base role, then considered what new threat should emerge from a buff or interaction. Players should assess an enemy's current mechanic state as well as recognize its type.</p>
      <div className="western-embers-enemy-copy">
        <div><h3>Drunken Pioneer</h3><p>The Drunken Pioneer creates movement pressure. On foot, it is an ordinary melee enemy; mounted, it accelerates and can bypass some blockers. Players cannot rely on a single choke point. The beast changes movement and deployment decisions, beyond simply strengthening the enemy.</p></div>
        <div><h3>Pioneer Beastcaller</h3><p>The Beastcaller extends the influence of supply points and beasts across the battlefield. When buffed, it summons a beast at the farthest supply point. Even after clearing nearby beasts, players must watch distant supply points and consider the whole map.</p></div>
      </div>
      <div className="western-embers-enemy-feature">
        <div className="western-embers-enemy-feature-copy">
          <div><h3>Corporate Overseer</h3><p>The Corporate Overseer is a high-threat enemy that can use both beasts and carts. Each mount changes its attacks: carts strengthen pressure against operators along the track, while beasts expand its attack and control range. It combines mechanics in later stages to demonstrate enemies actively using map resources.</p></div>
          <div><h3>Pioneer Shieldguard</h3><p>The Shieldguard draws attention to deposits and carts. Its buffed attacks prioritize deposits, and dismounting a cart immediately grants an empowered basic attack. This ties transport directly to attack timing, requiring players to consider routes, cart states, and deposit safety together.</p></div>
        </div>
        <figure className="western-embers-enemy-roster"><img src="/Portfolio/western-embers-enemy-roster.png" alt="Western Embers regular and elite enemy roster" /></figure>
      </div>
    </section>
    <section className="detail-section western-embers-boss">
      <h2>Boss Design</h2>
      <h3 className="western-embers-boss-name">Silas, the Lasso</h3>
      <p>Silas is the final boss of Western Embers and brings the event's mechanics together. He recombines familiar supply points, beasts, deposits, and carts under greater pressure. He competes for resources directly, while duels and mounting disrupt an otherwise stable deployment.</p>
      <div className="western-embers-boss-stages">
        <div><h3>Phase 1: Resource Control and Focused Pressure</h3><p>The first phase introduces Silas's basic combat behavior. He has melee and ranged attacks, can hit elevated tiles, takes buffs from beasts or supply points, and attacks deposits to apply attack-speed pressure to nearby operators.</p><p>I added a duel that periodically selects the highest-cost operator in range and briefly turns combat into a one-on-one encounter. It repeatedly disrupts deployment and prioritizes expensive damage dealers already on the field.</p></div>
        <div><h3>Phase 2: Intensified Mechanics</h3><p>After his first defeat, Silas revives into phase two. When invincibility ends, he immediately fires six empowered attacks at multiple targets. He then summons beasts at supply points, gains attack and attack speed, and acquires buffs more frequently.</p><p>This phase increases survival pressure and brings previously separate mechanics into play together. Players must handle Silas while continuing to track beasts, supply points, and deposits.</p></div>
        <div><h3>Mounted Combination: Final Stage</h3><p>At 75% health in phase two, Silas selects and combines with a beast if one is present. He gains attack, health, and movement speed, with continuously empowered basic attacks.</p><p>Placing mounting late in the fight makes the beast system a key condition affecting the boss. Managing beasts limits regular enemies and also controls how much Silas can strengthen himself later.</p></div>
      </div>
    </section>
    <section className="detail-section western-embers-level-design">
      <h2>Level Design</h2>
      <div className="western-embers-level-row">
        <div className="western-embers-level-copy">
          <p>Level design in Western Embers has two goals: gradually teach the relationship between supply points, beasts, deposits, and carts; and create new combinations through layouts and enemy routes instead of relying only on higher enemy stats.</p>
          <p>The structure comprises two tutorials, eight story stages, and eight EX stages. Tutorials introduce supply points/beasts and deposits/carts separately. Story stages gradually combine them, moving players from single-mechanic understanding to managing resources, routes, and map devices simultaneously. EX stages assume that knowledge and increase challenge through more complex routing and combinations.</p>
        </div>
        <figure className="western-embers-level-visual"><img src="/Portfolio/western-embers-level-ex5.png?v=2" alt="Western Embers EX-5 3D layout" /></figure>
      </div>
      <div className="western-embers-level-row reverse">
        <figure className="western-embers-level-visual"><img src="/Portfolio/western-embers-level-7.png?v=2" alt="Western Embers Story 7 3D layout" /></figure>
        <div className="western-embers-level-copy">
          <p>For each map, I establish enemy routes, special tile positions, and deployable spaces before considering their interactions. Supply point placement affects buff timing; beast spawns change movement threats; carts can change later routes entirely. These mechanics become part of deployment decisions rather than isolated devices on the map.</p>
          <p>I control pacing through route splits, intersections, and key combat areas. Enemies may converge on one defensive area from different routes, or use carts to switch routes quickly. The goal is to make primary threats readable in advance while requiring ongoing adjustments to changing mechanic states.</p>
        </div>
      </div>
      <div className="western-embers-progression-layout">
        <div className="western-embers-progression">
          <h3>Teaching Mechanics and Increasing Difficulty</h3>
          <p>Early stages limit simultaneous mechanics to build a clear foundation. INST-1 introduces enemy mechanics such as supply points, followed by different enemy types in Story 1–2. INST-2 introduces deposits and carts. Later story stages combine both systems and increase interactions among enemies, map mechanics, and players.</p>
          <p>Late stages introduce no new mechanics, instead increasing complexity through existing combinations. Players track buffs, route changes, cart positions, and deposit states together, culminating in the boss stage.</p>
        </div>
        <div className="western-embers-workbook">
          <WorkbookViewer src="/Portfolio/western-embers-level-design.json" downloadSrc="/Portfolio/western-embers-level-design.xlsx" title="Western Embers complete level design workbook" downloadName="Western_Embers_Level_Design_EN.xlsx" />
          <a className="attachment-link" href="/Portfolio/western-embers-level-design.xlsx" download="Western_Embers_Level_Design_EN.xlsx">Complete Level Design Excel <span>Download</span></a>
        </div>
      </div>
    </section>
    <section className="detail-section western-embers-story">
      <h2>Story Synopsis</h2>
      <p>The story takes place after Come Catastrophes or Wakes of Vultures. Jessica leaves her former life with Blacksteel and her family, accompanying Davistown's residents westward. In the frontier's mines and wilderness, townspeople and local pioneers clash over resources, identity, and living space. Corporate control of supplies, minerals, and transport deepens these tensions.</p>
      <p>Jessica discovers that the townspeople and pioneers are not true enemies. Some pioneers cooperate with the newcomers to seek more resources and room to live. Others, led by Silas, the Lasso, uphold the existing order. They distrust the corporations but fear that reckless resistance will hurt those with nowhere else to go first.</p>
      <p>Jessica eventually confronts Silas. When corporations cut supplies to some settlements to keep the mines operating, he realizes the old order cannot protect them. He stops obstructing the others and joins their efforts. The resistance wins only limited concessions rather than transforming the frontier's resource structure, but groups that once opposed one another begin standing together.</p>
    </section>
    <section className="detail-section western-embers-gallery-section">
      <h2>Gallery</h2>
      <div className="western-embers-gallery">
        {galleryImages.map((image) => <figure key={image.label}>
          <img src={image.src} alt={`Western Embers ${image.label} stage 3D layout`} />
          <figcaption>{image.label}</figcaption>
        </figure>)}
      </div>
    </section>
  </article><SiteFooter /></main>;
}
