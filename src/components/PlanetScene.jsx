import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import './PlanetScene.css'

function Planet() {
  return (
    <mesh rotation={[0.4, 0.6, 0]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshPhysicalMaterial
        color="#93c5fd"
        emissive="#60a5fa"
        emissiveIntensity={0.25}
        roughness={0.2}
        metalness={0.05}
        clearcoat={0.45}
        clearcoatRoughness={0.18}
      />
    </mesh>
  )
}

function Atmosphere() {
  return (
    <mesh scale={1.2}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshBasicMaterial color="#bfdbfe" transparent opacity={0.15} />
    </mesh>
  )
}

export default function PlanetScene() {
  return (
    <div className="planet-scene" role="img" aria-label="Stylised rotating blue planet floating in space">
      <Canvas
        className="planet-scene__canvas"
        dpr={[1, 1.8]}
        camera={{ position: [3.2, 1.8, 3.6], fov: 45 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 6, 3]} intensity={1.1} color="#dbeafe" />
        <group>
          <Planet />
          <Atmosphere />
        </group>
        <Stars radius={18} depth={45} count={1200} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.55} />
      </Canvas>
    </div>
  )
}

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
