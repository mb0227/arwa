import './AboutUs.css'

const AboutUs = () => {
  return (
    <>
      <div className="page-container">
        {/* Banner Section */}
        <section className="banner-section">
          <div className="header-gradient"></div>
          <div className="art-design-text">ART & DESIGN</div>
          <div className="hero-content-wrapper">
            <div className="hero-image-content">
              <img src="/mascot-01.svg" alt="MASCOT-01" className="mascot-main" />
              <div className="name-badge-container name-badge-desktop">
                <img src="/star-icon.svg" alt="Star" className="star-icon" />
                <div className="name-badge">
                  <span>Arwa</span>
                </div>
              </div>
            </div>
            <div className="hero-text-content">
              <div className="hero-text-block">
                <h1 className="hero-title-text">Hi! I'm Arwa</h1>
                <div className="name-badge-container name-badge-mobile">
                  <img src="/star-icon.svg" alt="Star" className="star-icon" />
                  <div className="name-badge">
                    <span>Arwa</span>
                  </div>
                </div>
                <div className="hero-description-text">
                  <p className="hero-description-para">
                    <span className="text-normal">A passionate freelance </span>
                    <span className="text-bold">Graphic designer</span>
                    <span className="text-normal"> dedicated to bringing your brand's vision to life. I made a </span>
                    <span className="text-bold">Bold choice</span>
                    <span className="text-normal"> — I left behind my college degree to pursue what I truly adore: graphic design. And honestly? I've never looked back.</span>
                  </p>
                  <p className="hero-description-para">
                    <span className="text-normal">The </span>
                    <span className="text-bold">creative freedom</span>
                    <span className="text-normal">, the joy of transforming ideas into visuals, and the constant learning? I live for it. I'm self-taught, endlessly curious, and committed to making </span>
                    <span className="text-bold">meaningful design</span>
                    <span className="text-normal"> that stands out.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <div className="philosophy-text-content">
            <div className="philosophy-title-wrapper">
              <h2 className="philosophy-title">My Philosophy</h2>
              <img src="/mascot-24.svg" alt="Heart icon" className="mascot-philosophy" />
            </div>
            <p className="philosophy-description">
              I believe in authentic storytelling, thoughtful design, and building brands with real purpose. It's not
              just about making things look good — it's about making people feel something.
            </p>
          </div>
          <div className="philosophy-image-content">
            <img src="/asset-1.svg" alt="Asset 1" className="philosophy-illustration" />
          </div>
        </section>

        {/* Fun Facts Section */}
        <section className="fun-facts-section">
          <h2 className="fun-facts-title">Few fun facts about moi</h2>
          <div className="fun-facts-cards">
            {/* Card 1: Moodboarding */}
            <div className="fact-card">
              <div className="card-background">
                <img src="/mask-group-1.png" alt="Moodboarding background" className="card-bg-image" />
              </div>
              <div className="card-content-wrapper">
                <div className="card-illustration">
                  <img src="/card-1-illustration.svg" alt="Card illustration" className="card-illustration-img" />
                </div>
                <div className="card-badge">
                  <span>Updated</span>
                </div>
                <div className="card-text-content">
                  <h3 className="card-title">Moodboarding</h3>
                  <p className="card-description">My faviorate part — it's my way of telling a story before the design even begins.</p>
                </div>
              </div>
            </div>

            {/* Card 2: Designed a logo on napkin */}
            <div className="fact-card">
              <div className="card-background">
                <img src="/mask-group-2.png" alt="Logo on napkin background" className="card-bg-image" />
              </div>
              <div className="card-content-wrapper">
                <div className="card-illustration">
                  <img src="/card-2-illustration.svg" alt="Card illustration" className="card-illustration-img" />
                </div>
                <div className="card-badge">
                  <span>Updated</span>
                </div>
                <div className="card-text-content">
                  <h3 className="card-title">Designed a logo on napkin</h3>
                  <p className="card-description">True story — inspiration strikes anywhere</p>
                </div>
              </div>
            </div>

            {/* Card 3: Constant learner */}
            <div className="fact-card">
              <div className="card-background">
                <img src="/mask-group-3.png" alt="Constant learner background" className="card-bg-image" />
              </div>
              <div className="card-content-wrapper">
                <div className="card-illustration">
                  <img src="/card-3-illustration.svg" alt="Card illustration" className="card-illustration-img" />
                </div>
                <div className="card-badge">
                  <span>Updated</span>
                </div>
                <div className="card-text-content">
                  <h3 className="card-title">Constant learner</h3>
                  <p className="card-description">I'm always exploring, experimenting, and evolving.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="brand-story-section">
          <div className="cta-text-content">
            <h2 className="cta-title">Let's Build Your Brand Story</h2>
            <p className="cta-description">
              Ready to bring your vision to life? Let's connect and create something amazing together.
            </p>
          </div>
          <button className="cta-button">
            <span>Explore Our Services</span>
            <img src="/arrow-right.svg" alt="Arrow" className="arrow-icon" />
          </button>
        </section>

        {/* Decorative Element */}
        {/* <div className="decorative-element">
        <img src="/group-2085663272.svg" alt="Decoration" className="decoration-svg" />
      </div> */}
      </div>
      <img src="/group-2085663272.svg" alt="Decoration" className="decoration-svg" />
    </>
  );
};

export default AboutUs;

