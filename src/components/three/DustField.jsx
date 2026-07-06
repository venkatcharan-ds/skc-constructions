import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 500;

function DustParticles() {
  const pointsRef = useRef(null);
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  const speeds = useMemo(
    () => new Float32Array(COUNT).map(() => 0.05 + Math.random() * 0.15),
    []
  );

  useFrame((state) => {
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    const posAttr = geo.attributes.position;
    for (let i = 0; i < COUNT; i += 1) {
      const y = posAttr.getY(i) + speeds[i] * 0.01;
      posAttr.setY(i, y > 5 ? -5 : y);
    }
    posAttr.needsUpdate = true;

    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = Math.sin(t * 0.02) * 0.1;

    const targetX = state.pointer.x * 0.6;
    const targetY = state.pointer.y * 0.3;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#f5b400"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function DustField() {
  return (
    <>
      <fog attach="fog" args={["#111111", 4, 16]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#f5b400" />
      <DustParticles />
    </>
  );
}
