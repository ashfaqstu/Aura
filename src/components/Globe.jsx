// src/components/EarthGlobe.jsx
import Globe from "react-globe.gl";
import { useEffect, useRef } from "react";

export default function EarthGlobe() {
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      // make it spin automatically
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8; // adjust speed
    }
  }, []);

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundColor="rgba(0,0,0,0)" // transparent background (no space)
      onGlobeClick={(coords) => {
        console.log("Clicked at:", coords); // { lat: ..., lng: ... }
        alert(`Lat: ${coords.lat}, Lng: ${coords.lng}`);
      }}
      width={800}
      height={600}
    />
  );
}
