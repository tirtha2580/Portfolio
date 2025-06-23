// src/components/Education.jsx
import React, { useRef, useMemo } from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const educationData = [
  {
    degree: 'B.Tech - Computer Science and Engineering',
    institution: 'Maulana Abul Kalam Azad University of Technology, West Bengal',
    duration: 'July 2024 – Present'
  },
  {
    degree: 'Diploma - Computer Science and Technology',
    institution: 'ELITE INSTITUTE OF ENGINEERING AND MANAGEMENT,Kolkata',
    details: 'CGPA: 8.7 / 10',
    duration: 'Aug 2021 – May 2024'
  },
  {
    degree: 'Higher Secondary (H.S)',
    details: 'Percentage: 80%',
    duration: 'Aug 2019 – May 2021'
  }
];

const GalaxySwirl = () => {
  const groupRef = useRef();
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 400; i++) {
      const angle = 0.1 * i;
      const radius = 0.2 * i;
      const x = radius * Math.cos(angle);
      const y = (Math.random() - 0.5) * 10;
      const z = radius * Math.sin(angle);
      arr.push([x, y, z]);
    }
    return arr;
  }, []);

  useFrame(() => {
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef}>
      {points.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
};

const Education = () => {
  return (
    <Box
      id="education"
      sx={{
        minHeight: '80vh',
        backgroundColor: '#000',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        py: 10
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      >
        <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <GalaxySwirl />
        </Canvas>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#00f2fe', mb: 6 }}
        >
          <br />
          <br />
          My Education
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {educationData.map((edu, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    backgroundColor: '#121212',
                    border: '1px solid #00f2fe',
                    boxShadow: '0 0 15px #00f2fe'
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#00f2fe' }}>{edu.degree}</Typography>
                  {edu.institution && (
                    <Typography variant="body2" sx={{ mb: 1, color: 'lightgray' }}>{edu.institution}</Typography>
                  )}
                  {edu.details && (
                    <Typography variant="body2" sx={{ mb: 1, color: 'lightgray' }}>{edu.details}</Typography>
                  )}
                  <Typography variant="body2" sx={{ color: 'gray' }}>{edu.duration}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Education;
