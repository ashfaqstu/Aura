import './Home.css'
import SplashCursor from '../components/SplashCursor'
import planetIllustration from '../assets/nassy-planet.png'
// import ModelViewer from '../components/ModelViewer'
import "@google/model-viewer";
export default function Home() {
  return (
    <div>
      
      
    <section className="home-hero flex h-full justify-center items-center" data-hide-navbar="true" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
      
      <div>
        <SplashCursor SPLAT_RADIUS={.01} />
        <div className="star-field" aria-hidden="true">
        <div className="star-layer star-layer--far" />
        <div className="star-layer star-layer--mid" />
        <div className="star-layer star-layer--near" />
      </div>
      <div className="nebula nebula--one" aria-hidden="true" />
      <div className="nebula nebula--two" aria-hidden="true" />

      <div className="hero-title text-6xl md:text-8xl lg:text-9xl font-extrabold text-center z-10">
        AURA
      </div>
      </div>
      {/* <div className="fixed bottom-0 ">
        <img src={planetIllustration} alt="Planet Illustration" className="planet-illustration" />  
      </div> */}
      <div className="model-wrapper z-10">
        <model-viewer className="fixed bottom-0"
        src="/aura/earth.glb"         
        alt="3D Earth model"
        auto-rotate
        camera-controls
        shadow-intensity="1"
        style={{ width: "800px", height: "800px" }}
      ></model-viewer>
      </div>
    </section>
      
    </div>
  )
}