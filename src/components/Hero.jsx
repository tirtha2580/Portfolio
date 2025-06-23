import React, { useRef, useMemo, useState } from 'react';
import { Box, Typography, Container, Stack, Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CloseIcon from '@mui/icons-material/Close';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker, Viewer } from '@react-pdf-viewer/core';

const ParticleExplosion = () => {
  const particlesRef = useRef();
  const particleCount = 1000;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] *= 1.005 + Math.sin(t) * 0.0005;
      pos[i * 3 + 1] *= 1.005 + Math.cos(t) * 0.0005;
      pos[i * 3 + 2] *= 1.005;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00f2fe" size={0.03} />
    </points>
  );
};



const HoverText = ({ children, variant, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.1, color: '#00f2fe', textShadow: '0px 0px 8px #00f2fe' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Typography variant={variant} {...props}>
      {children}
    </Typography>
  </motion.div>
);

const Hero = () => {
  const [openResume, setOpenResume] = useState(false);

  return (
    <Box
      id="about"
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      {/* 3D Canvas Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={1} />
          <ParticleExplosion />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Box>

      {/* Foreground Content */}
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <HoverText variant="h2" sx={{ fontWeight: 'bold' }}>
            Hi, I'm <span style={{ color: '#00f2fe' }}>Tirthamoy Biswas</span>
          </HoverText>
          <HoverText variant="h5" sx={{ mt: 2 }}>
            I'm a Full Stack Developer & Designer
          </HoverText>
          <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 2, flexWrap: 'wrap' }}>
            <HoverText variant="h6" sx={{ fontWeight: 300 }}>
              Junior Software Developer
            </HoverText>
            <HoverText variant="h6" sx={{ fontWeight: 300 }}>
              Web Developer & Designer
            </HoverText>
            <HoverText variant="h6" sx={{ fontWeight: 300 }}>
              Android Developer
            </HoverText>
            <HoverText variant="h6" sx={{ fontWeight: 300 }}>
              Programmer
            </HoverText>
          </Stack>
          <Stack direction="row" spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#00f2fe',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#00c2fe',
                  boxShadow: '0 0 10px #00f2fe',
                },
              }}
              href="#contact"
            >
              Contact
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#00f2fe',
                color: '#00f2fe',
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: '#00c2fe',
                  backgroundColor: 'rgba(0,242,254,0.1)',
                  boxShadow: '0 0 10px #00f2fe',
                },
              }}
              onClick={() => setOpenResume(true)}
            >
              Resume
            </Button>
          </Stack>
        </motion.div>
      </Container>

      {/* Resume Dialog */}
      <Dialog open={openResume} onClose={() => setOpenResume(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setOpenResume(false)}
            sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ height: '80vh',padding: 4, overflowY: 'auto' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl="/public/CV/TirthamoyCV.pdf" />
            </Worker>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Hero;
