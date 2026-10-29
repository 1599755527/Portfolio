import { SiteFooter, SiteHeader } from '@/components/site-header';

export default function About() {
  return (
    <main>
      <SiteHeader />
      <section className="simple-page about-page">
        <h1>About Me</h1>
        <div className="about-layout">
          <div className="about-copy">
            <p>I am a game designer focused on level and systems design. In my projects, I consider how each level or map creates a clear player experience, and how mechanics, system structures, and player decisions shape the game as a whole. My goal is to support different playstyles while making sure each design decision serves the overall game.</p>
            <p>In level design, I develop detailed layouts with a focus on player flow, pacing, greyboxing, and encounter design. In systems design, I focus on core gameplay, risk management, mechanics, and interactions between systems to create meaningful choices and experiences that stay engaging.</p>
          </div>
          <img className="about-photo" src="/Portfolio/tengfei-portrait.jpg" alt="Portrait of Dennis Fei" />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
