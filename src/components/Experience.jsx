// src/components/Experience.jsx
import React, { useRef, useMemo } from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const experienceData = [
  {
    title: 'EdTech Website Development Project',
    duration: 'June 2024 – Sept 2024',
    points: [
      'Built a responsive interface with React.js and MUI including student/admin dashboards and course catalog.',
      'Implemented JWT-based authentication, user registration, and password recovery using Nodemailer and MongoDB.',
      'Designed an RBAC-enabled admin dashboard for managing users, courses, and analytics.',
      'Ensured cross-device compatibility using CSS Grid, Flexbox, and MUI grid system.',
      'Developed REST APIs and handled backend authentication/database operations using Express.js and MongoDB.'
    ]
  },
  {
    title: 'Solar Industry Project – Frontend UI/UX',
    duration: 'Oct 2024 – Dec 2024',
    points: [
      'Designed clean, responsive, modern UI using React.js, MUI, Magic UI, and Tailwind CSS.',
      'Integrated smooth animations and transitions with Framer Motion to enhance user experience.',
      'Worked closely with the design team to implement Figma-based designs pixel-perfectly.'
    ]
  },
  {
    title: 'E-commerce Mobile App – Frontend',
    duration: 'Jan 2025 – March 2025',
    points: [
      'Designed user-friendly and responsive e-commerce UI using React Native.',
      'Focused on mobile-first UX principles and seamless navigation patterns.'
    ]
  },
  {
    title: 'Freelancing Project - Electrical Instruments Website',
    duration: 'April 2025 – May 2025',
    points: [
      'Developed a modern and responsive frontend using React.js, MUI, and Tailwind CSS.',
      'Created a stunning UI/UX with smooth transitions, routing animations, and attractive effects.',
      'Successfully deployed on a live NGINX server via BitWise SSH access and custom domain configuration.'
    ]
  }
];

const BubbleEffect = () => {
  const groupRef = useRef();
  const bubbles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30
        ],
        size: Math.random() * 0.3 + 0.1
      });
    }
    return arr;
  }, []);

  useFrame(() => {
    groupRef.current.children.forEach((mesh) => {
      mesh.position.y += 0.01;
      if (mesh.position.y > 10) mesh.position.y = -10;
    });
  });

  return (
    <group ref={groupRef}>
      {bubbles.map((b, i) => (
        <mesh key={i} position={b.position}>
          <sphereGeometry args={[b.size, 16, 16]} />
          <meshStandardMaterial color="#00f2fe" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const Experience = () => {
  return (
    <Box
      id="experience"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        py: 10
      }}
    >
      {/* Background Effects */}
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
        <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <BubbleEffect />
        </Canvas>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#00f2fe', mb: 4 }}
        >
          Work Experience
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'justify',
            textDecoration: 'underline',
            fontWeight: 500,
            color: 'grey',
            mb: 4
          }}
        >
          Infosyst (June 2024 – April 2025)
        </Typography>

        

      <Grid container spacing={4}>
  {experienceData.map((exp, idx) => (
    <Grid item xs={12} key={idx}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: idx * 0.2 }}
      >
        {/* Show Freelancing heading before its paper */}
        {exp.title.includes('Freelancing Project') && (
          <Typography
            variant="h5"
            sx={{
              textAlign: 'justify',
              textDecoration: 'underline',
              fontWeight: 500,
              color: 'grey',
              mb: 2
            }}
          >
            Freelancing Project (April  – May,2025)
          </Typography>
        )}

        <Paper
          elevation={3}
         sx={{
    p: 4,
    backgroundColor: '#121212',
    border: '1px solid #00f2fe',
    boxShadow: '0 0 20px #00f2fe50',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 0 30px 10px #00f2fe, 0 0 60px 20px #00f2fe66',
      borderColor: '#00f2fe'
    }
  }}
        >
          <Typography variant="h6" sx={{ color: '#00f2fe' }}>{exp.title}</Typography>
          <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic', color: '#fff' }}>{exp.duration}</Typography>
          <ul>
            {exp.points.map((point, i) => (
              <li key={i} style={{ marginBottom: 8, color: 'grey' }}>{point}</li>
            ))}
          </ul>
        </Paper>
      </motion.div>
    </Grid>
  ))}
</Grid>

      </Container>
    </Box>
  );
};

export default Experience;
