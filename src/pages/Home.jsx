import PlanetScene from "../components/PlanetScene.jsx";

import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      <div className="home__background" aria-hidden="true" />
      <div className="home__stars" aria-hidden="true" />
      <div className="home__nebula home__nebula--left" aria-hidden="true" />
      <div className="home__nebula home__nebula--right" aria-hidden="true" />
      <div className="home__halo home__halo--top" aria-hidden="true" />
      <div className="home__halo home__halo--bottom" aria-hidden="true" />

      <div className="home__layout">
        <header className="home__hero">
          <h1 className="home__title ">AURA</h1>
        </header>
      <div style={{ width: "600px", height: "600px", margin: "0 auto" }}>
        <PlanetScene />
      </div>
        

        
      </div>
    </main>
  );
}