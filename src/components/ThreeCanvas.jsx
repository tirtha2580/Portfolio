import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const ThreeCanvas = () => (
  <Canvas style={{ height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
    <ambientLight intensity={0.5} />
    <Stars />
    <OrbitControls enableZoom={false} />
  </Canvas>
);

export default ThreeCanvas;
