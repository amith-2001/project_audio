import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

function ParticleFabric({ mouse }) {
  const ref = useRef();
  const count = 100;

  // base positions + current positions
  const basePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  }, [count]);

  const positions = useMemo(() => basePositions.slice(), [basePositions]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const mx = mouse.current.x;
    const my = mouse.current.y;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      // base oscillation
      const ox = basePositions[ix] + Math.sin(t + basePositions[iy] * 5) * 0.02;
      const oy = basePositions[iy] + Math.cos(t + basePositions[ix] * 5) * 0.02;
      const oz = basePositions[iz];

      // mouse repulsion (projected roughly into same plane)
      const dx = ox - mx * 3;
      const dy = oy - my * 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = 0.05;          // how strong the push is
      const radius = 1;             // how far the mouse affects

      if (dist < radius) {
        const force = (radius - dist) * influence;
        positions[ix] = ox + (dx / dist) * force;
        positions[iy] = oy + (dy / dist) * force;
      } else {
        // ease back to base
        positions[ix] = THREE.MathUtils.lerp(positions[ix], ox, 0.05);
        positions[iy] = THREE.MathUtils.lerp(positions[iy], oy, 0.05);
      }
      positions[iz] = oz;
    }

    ref.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#1a1a1aff"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function SoundFabric() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />

      <pointLight position={[0, 0, 3]} intensity={0.8} color="#60a5fa" />
      <ParticleFabric mouse={mouse} />
    </Canvas>
  );
}
