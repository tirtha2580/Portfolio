// src/components/ThreeEffects/FloatingTextCloud.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const techWords = [
  'React', 'JavaScript', 'Python', 'HTML', 'CSS', 'MongoDB',
  'Node.js', 'Express', 'Tailwind', 'MUI', 'Three.js', 'Git', 'TypeScript'
];

const getSpherePosition = (index, total, radius = 5) => {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  return [
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi),
  ];
};

const FloatingTextCloud = () => {
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y += 0.002;
  });

  return (
    <group ref={groupRef}>
      {techWords.map((word, i) => {
        const [x, y, z] = getSpherePosition(i, techWords.length);
        return (
          <Text
            key={i}
            position={[x, y, z]}
            fontSize={0.6}
            color="#00f2fe"
            anchorX="center"
            anchorY="middle"
          >
            {word}
            <meshStandardMaterial emissive="#00f2fe" emissiveIntensity={1.5} />
          </Text>
        );
      })}
    </group>
  );
};

export default FloatingTextCloud;
