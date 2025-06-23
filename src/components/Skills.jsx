// src/components/Skills.jsx
import React, { useRef } from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import JavaScriptIcon from '/public/icons/js.png';
import TypeScriptIcon from '/public/icons/ts.png';
import PythonIcon from '/public/icons/python.png';
import SQLIcon from '/public/icons/sql.png';
import MongoIcon from '/public/icons/mongodb.png';
import MySQLIcon from '/public/icons/my.png';
import PostgreSQLIcon from '/public/icons/post.webp';
import ReactIcon from '/public/icons/React.webp';
import AngularIcon from '/public/icons/angularjs.png';
import BootstrapIcon from '/public/icons/Bootstrap.png';
import MUIIcon from '/public/icons/mui.png';
import TailwindIcon from '/public/icons/tail.png';
import ThreeIcon from '/public/icons/3js.png';
import ShadCnIcon from '/public/icons/shadcn.png';
import NodeIcon from '/public/icons/nodejs.png';
import ExpressIcon from '/public/icons/exp.png';
import GitHubIcon from '/public/icons/github.png';
import VSCodeIcon from '/public/icons/vscode.png';
import PostmanIcon from '/public/icons/postman.png';
import AndroidStudioIcon from '/public/icons/android.png';
import FigmaIcon from '/public/icons/figma.png';
import XAMPPIcon from '/public/icons/xampp.svg';
import VercelIcon from '/public/icons/vercel.png';
import StackOverflowIcon from '/public/icons/stackoverflow.png';

const WaterWave = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const positions = ref.current.geometry.attributes.position.array;
    const count = positions.length / 3;

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      positions[i * 3 + 2] = Math.sin(x * 0.3 + time) * 0.3 + Math.cos(y * 0.5 + time) * 0.3;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[50, 50, 64, 64]} />
      <meshStandardMaterial color="#00f2fe" opacity={0.3} transparent wireframe />
    </mesh>
  );
};

const SkillCategory = ({ category, items }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{ width: '100%' }}
  >
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: '#121212',
        border: '1px solid #00f2fe',
        '&:hover': {
          transform: 'scale(1.03)',
          transition: 'transform 0.3s ease',
          boxShadow: '0 0 20px #00f2fe'
        }
      }}
    >
      <Typography variant="h6" sx={{ color: '#00f2fe', mb: 1 }}>
        {category}
      </Typography>
      <Grid container spacing={1}>
        {items.map((item) => (
          <Grid item key={item.name}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid rgba(0,255,255,0.2)',
                borderRadius: 10,
                padding: '6px 12px',
                margin: '4px',
                boxShadow: '0 0 8px #00f2fe33',
                color: 'white',
                fontSize: '1rem'
              }}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{ width: 28, height: 28 }}
                />
              )}
              <span>{item.name}</span>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  </motion.div>
);

const Skills = () => {
  return (
    <Box
      id="skills"
      sx={{
        minHeight: '100vh',
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
        <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <WaterWave />
        </Canvas>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#00f2fe', mb: 4 }}
        >
          My Skills
        </Typography>

        <Grid container spacing={4}>
         
          <Grid item xs={12} md={9}>
            <SkillCategory category="Frontend" items={[{ name: 'React.js', icon: ReactIcon }, { name: 'Angular.js', icon: AngularIcon }, { name: 'Bootstrap', icon: BootstrapIcon }, { name: 'MUI', icon: MUIIcon }, { name: 'Tailwind', icon: TailwindIcon }, { name: 'Three.js', icon: ThreeIcon }, { name: 'ShadCn', icon: ShadCnIcon }]} />
          </Grid>
          <Grid item xs={12} md={3}>
            <SkillCategory category="Backend" items={[{ name: 'Node.js', icon: NodeIcon }, { name: 'Express.js', icon: ExpressIcon }]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SkillCategory category="Languages" items={[{ name: 'JavaScript', icon: JavaScriptIcon }, { name: 'TypeScript', icon: TypeScriptIcon }, { name: 'Python', icon: PythonIcon }, { name: 'SQL', icon: SQLIcon }]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SkillCategory category="Databases" items={[{ name: 'MongoDB', icon: MongoIcon }, { name: 'MySQL', icon: MySQLIcon }, { name: 'PostgreSQL', icon: PostgreSQLIcon }]} />
          </Grid>
          <Grid item xs={12}>
            <SkillCategory category="Development Tools" items={[{ name: 'Git & GitHub', icon: GitHubIcon }, { name: 'VS Code', icon: VSCodeIcon }, { name: 'Postman', icon: PostmanIcon }, { name: 'Android Studio', icon: AndroidStudioIcon }, { name: 'Figma', icon: FigmaIcon }, { name: 'XAMPP', icon: XAMPPIcon }, { name: 'Vercel', icon: VercelIcon }, { name: 'Stack Overflow', icon: StackOverflowIcon }]} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
