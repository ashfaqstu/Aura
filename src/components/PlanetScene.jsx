// src/components/EarthModel.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";

function Earth() {
  const group = useRef();
  const { scene } = useGLTF("/models/earth.glb"); // or import if in src/assets

  // auto-rotate
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} scale={1.5}>
      <primitive object={scene} />
    </group>
  );
}

export default function PlanetScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Earth />
      <OrbitControls enableZoom enablePan={false} />
    </Canvas>
  );
}
