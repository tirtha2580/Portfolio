// src/components/About.jsx
import React, { useState, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Typewriter } from 'react-simple-typewriter';

// Wave mesh animation
const WaveMesh = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i];
        const y = pos[i + 1];
        pos[i + 2] = Math.sin(x * 0.3 + t) * 0.5 + Math.cos(y * 0.3 + t) * 0.5;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const geometry = new THREE.PlaneGeometry(15, 15, 32, 32);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.3, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color="#00f2fe" wireframe transparent opacity={0.2} />
    </mesh>
  );
};

const About = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      id="about"
      sx={{
        minHeight: '85vh',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        py: 10,
        backgroundColor: '#0d0d0d',
      }}
    >
      {/* 3D Wave Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1.5} />
          <WaveMesh />
        </Canvas>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Animated Image Box */}
          <Grid item xs={12} md={5}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(0,255,255,0.2)',
                  boxShadow: '0 0 20px #00f2fe',
                  width: 350,
                  height: 380,
                  margin: '0 auto',
                }}
              >
                <img
                  src={hovered ? '/public/images/profile5.jpeg' : '/public/images/frontImg.jpeg'}
                  alt="Your Name"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            </motion.div>
          </Grid>

          {/* Text with animations */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, textShadow: "0 0 10px #00f2fe" }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#00f2fe' }}>
                  About Me
                </Typography>
              </motion.div>

             <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
  Hello! I am an aspiring developer currently pursuing a B.Tech in Computer Science and Engineering.
  I bring a diverse skill set spanning frontend and backend development, as well as database management.
  My hands-on experience and training in technologies like <span style={{ color: '#00f2fe', fontWeight: 'bold' }}>React.js</span>, 
  <span style={{ color: '#00f2fe', fontWeight: 'bold' }}>React Native</span>, <span style={{ color: '#00f2fe', fontWeight: 'bold' }}>Express.js</span>,<span style={{ color: '#00f2fe', fontWeight: 'bold' }}>Node.js</span>,<span style={{ color: '#00f2fe', fontWeight: 'bold' }}>Python</span>, and 
  <span style={{ color: '#00f2fe', fontWeight: 'bold' }}>MongoDB</span> enable me to effectively contribute to full-stack projects and deliver impactful solutions.
</Typography>


              <Typography variant="h6" sx={{ mt: 3, fontWeight: 400 }}>
                <span style={{ color: '#0ff', marginRight: 8 }}>🔹</span>
                <Typewriter
                  words={[
                    'Junior Software Developer',
                    'Web Developer & Designer',
                    'App Developer',
                    'Programmer',
                  ]}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
