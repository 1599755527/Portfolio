import { SiteFooter, SiteHeader } from '@/components/site-header';

const projects = [
  {
    href: '/Portfolio/scratch-game-analysis',
    image: '/Portfolio/scratch-game-hero.png',
    kicker: "Systems Analysis", title: "Scritchy Scratchy — Systems Analysis",
    description: "Using configuration data, expected-value calculations, and playtesting, I analyzed the game's economy, parallel progression curves, and automation pacing. I examined why the early game delivers strong stimulation while later upgrades have diminishing impact, and developed practical takeaways for future designs.",
    roles: ["Systems Analysis: Economy, Progression Curves, Automation, Long-Term Pacing", "Research and Communication: Data Organization, Flow Mapping, Charts, Design Takeaways"],
    facts: ["Type: Game Systems Analysis", "Subject: Scritchy Scratchy", "Tools: Excel, Word, ProcessOn", "Completed: August 20, 2026"],
  },
  {
    href: '/Portfolio/western-embers',
    image: '/Portfolio/western-embers-cover.png',
    kicker: "Arknights Event Design Proposal", title: "Western Embers",
    description: "Western Embers is an original event proposal set in the world of Arknights. It follows frontier communities and conflicts over Originium in western Columbia, introducing supply points, pack beasts, Originium deposits, mine carts, and tracks. The proposal includes two tutorial stages, eight story stages, and eight EX stages with Challenge Modes.",
    roles: ["Event Design: Theme, Story, Core Mechanics, Main Enemies", "Level Design: Layouts, Enemy Routes, Mechanic Tutorials, Difficulty Progression"],
    facts: ["Type: Arknights Event Level Design Proposal", "Mode: Single-Player", "Tools: Maya, Blender, Photoshop, Word", "Team Size: 1 person", "Duration: 4 months", "Platform: PC / Mobile"],
  },
  {
    href: '/Portfolio/infinimart',
    image: '/Portfolio/infinimart-cover.png',
    kicker: "Team Game Design Project", title: 'Infinimart',
    description: "A 2.5D top-down roguelike set in an endless supermarket maze at night. Players collect products in a shopping bag, using weight to increase damage and combinations to trigger special effects. They reorganize their inventory while shopping, fighting, and exploring for an escape from Infinimart.",
    roles: ["Level Design: Layouts, Player Guidance, Map Planning", "Encounter Design: Enemy and Reward Placement, Guidance, Pacing"],
    facts: ["Genre: 2.5D Top-Down Roguelike", "Mode: Single-Player", "Engine: Unreal Engine 5.6", "Team Size: 8 people", "Duration: 10 months", "Platform: PC"],
  },
  {
    href: '/Portfolio/fairy-blackjack',
    image: '/Portfolio/fairy-blackjack-hero.png',
    kicker: "Game Design Proposal", title: 'Fairy Blackjack',
    description: "A light-strategy party game for 2–4 players built on reworked blackjack rules. With their own hidden scores unknown, players use standing, information, and limited item resources to directly affect one another's risk.",
    roles: ["Systems Design: Risk, Agency, Hidden Information, Resources", "Multiplayer Blackjack Rules and a 45-Card Item System"],
    facts: ["Genre: Multiplayer Light-Strategy Party Card Game", "Mode: 2–4 Players", "Engine: Unreal Engine 5.7", "Tools: Word, ProcessOn", "Completed: August 31, 2026"],
  },
  {
    href: '/Portfolio/omen',
    image: '/Portfolio/omen-cover.png',
    kicker: "Team Game Design Project", title: "Omen",
    description: "A top-down action RPG combining randomized roguelike exploration with narrative-driven levels. Players explore procedural dungeons and encounter Omens that influence subsequent levels and story paths.",
    roles: ["Concept Design: Game Themes and Systems Documentation", "Level Design: Layouts, Player Guidance, Map Planning, Asset Placement, Iteration"],
    facts: ["Genre: Top-Down Action RPG / Roguelike", "Mode: Single-Player", "Engine: Unreal Engine 5", "Team Size: 12 people", "Duration: 8 months", "Platform: PC"],
  },
  {
    href: '/Portfolio/de-brasserie',
    image: 'https://static.wixstatic.com/media/15b662_46d94a1b9a104499bd5a9634f901d5af~mv2.jpg/v1/fill/w_600,h_602,al_c,lg_1,q_85,enc_auto/header_edited.jpg',
    kicker: "CS2 2v2 Level Design", title: 'De_Brasserie',
    description: "Brasserie is a competitive 2v2 bomb defusal map. Three vertical layers emphasize elevation differences and support varied approaches, allowing players to interact with the environment in their preferred style.",
    roles: ["Level Design: 2D Planning, Blockout, Routes, Sightlines, Map Balance", "Research and Iteration: Map Analysis, Playtesting, Feedback, Revisions"],
    facts: ["Genre: First-Person Shooter", "Mode: Multiplayer", "Engine: Hammer Editor", "Team Size: 1 person", "Duration: 7 weeks", "Platform: PC"],
  },
  {
    href: '/Portfolio/overdrive-onslaught',
    image: 'https://static.wixstatic.com/media/15b662_ff8fdba8e2a04a1ab431cdc363bf02e1~mv2.jpg/v1/fill/w_446,h_432,al_c,lg_1,q_85,enc_auto/image_edited.jpg',
    kicker: "Team Game Design Project", title: 'Overdrive Onslaught',
    description: "A pixel-art roguelike set in a Soviet laboratory. Collect and combine guitar pedals to modify weapons, defeat enemies, and save America through repeated upgrades, deaths, and restarts.",
    roles: ["Systems Design: Weapon Pedals, Enemy AI, Blueprints, In-Game UI", "Level and Encounter Design: Blockout, Enemy Setup, Combat Pacing, Balance, Lighting"],
    facts: ["Genre: 2D Top-Down Roguelike", "Mode: Single-Player", "Engine: Unreal Engine 5", "Team Size: 4 people", "Duration: 4 months", "Platform: PC"],
  },
];

export default function Home() {
  return <main><SiteHeader />
    <section className="home-section home-experience">
      <h1 className="section-title">Professional Experience</h1>
      <div className="experience-list"><article className="home-card experience-card">
        <a href="/Portfolio/ultraman-super-time-heroes" className="experience-cover"><img src="/Portfolio/ultraman-super-time-heroes.png" alt="Ultraman: Super Time Heroes cover" /><span className="cover-hover-title">Ultraman: Super Time Heroes</span></a>
        <h2><a href="/Portfolio/ultraman-super-time-heroes"><span className="home-card-title">Ultraman: Super Time Heroes</span></a></h2>
      </article></div>
    </section>
    <section className="home-section">
      <h1 className="section-title">Projects.</h1>
      <div className="home-projects">{projects.map((p)=><article className={`home-card${p.title === 'Overdrive Onslaught' ? ' home-card-centered' : ''}`} key={p.title}>
        <a href={p.href} className="cover-link"><img src={p.image} alt={`${p.title} project cover`} /><span className="cover-hover-title">{p.title}</span></a>
        <h2><a href={p.href}>{p.kicker && <small>{p.kicker}</small>}<span className="home-card-title">{p.title}</span></a></h2>{p.description && <p>{p.description}</p>}
        <dl>{p.facts.map(f=>{const [k,...v]=f.split(':');return <div className={p.title === "Western Embers" && k === "Tools" ? 'home-fact-tools' : undefined} key={f}><dt>{k}: </dt><dd>{v.join(':')}</dd></div>})}</dl>
        {p.roles.length > 0 && <div className="home-roles"><h3>Roles and Responsibilities</h3>{p.roles.map(role=><p key={role}>{role}</p>)}</div>}
      </article>)}</div>
    </section>
    <SiteFooter />
  </main>;
}
