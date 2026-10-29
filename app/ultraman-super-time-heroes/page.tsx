import { SiteFooter, SiteHeader } from '@/components/site-header';

export default function UltramanSuperTimeHeroes() {
  return <main><SiteHeader />
    <article className="detail-page de-brasserie-page ultraman-page">
      <header className="detail-hero"><h1>Ultraman: Super Time Heroes</h1><p>Combat Design / QA Internship</p><p>June 2025 – August 2025</p></header>
      <div className="ultraman-video"><iframe src="https://player.bilibili.com/player.html?isOutside=true&aid=114339763785845&bvid=BV1EToWY1EUj&cid=29422258905&p=1" title="Ultraman: Super Time Heroes video" scrolling="no" allowFullScreen /><p>Public Launch: July 29, 2025</p></div>
      <section className="ultraman-responsibilities">
        <h2>Responsibilities</h2>
        <ul>
          <li>Helped test combat actions created by other designers during production, organizing and reporting feedback.</li>
          <li>Assisted with combat actions and skills, including those for the playable hero Ultraman Cosmos.</li>
          <li>Helped develop enemy AI behavior trees covering movement, decision-making, combat interactions, and skill execution.</li>
          <li>Assisted with approximately 10 enemy skills, linking visual effects to animations, calculating damage, and configuring attack distances and areas.</li>
          <li>Supported pre-launch testing, reported bugs and improvement opportunities to designers, and suggested refinements to core mechanics. Continued testing and troubleshooting after launch, reporting approximately 30 bugs in total.</li>
        </ul>
      </section>
      <section className="detail-section ultraman-overview">
        <h2>Overview</h2>
        <p className="overview-item"><span>Project Description: </span>Ultraman: Super Time Heroes is an officially licensed mobile action RPG. Players control popular Ultraman heroes including Tiga, Blazar, Zero, Z Delta Rise Claw, Saga, Noa, and Ginga Strium. Combat features combos, aerial launches, back attacks, guard breaks, dodges, and follow-up skills, alongside competitive real-player battles.</p>
        <dl className="detail-facts">
          <div><dt>Genre: </dt><dd>2D Side-Scrolling Action RPG</dd></div>
          <div><dt>Mode: </dt><dd>Multiplayer</dd></div>
          <div><dt>Engine: </dt><dd>Unity</dd></div>
          <div><dt>Team Size: </dt><dd>100–200 people</dd></div>
          <div><dt>Platform: </dt><dd>Mobile</dd></div>
          <div><dt>Role: </dt><dd>Combat Design</dd></div>
        </dl>
      </section>
    </article>
    <SiteFooter />
  </main>;
}
