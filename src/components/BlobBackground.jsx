import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const BlobBackground = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
      meshRef.current.rotation.y = Math.cos(t * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={4}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#00f2fe"
        metalness={0.6}
        roughness={0.3}
        transparent
        opacity={0.2}
        emissive="#00f2fe"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
};

export default BlobBackground;
