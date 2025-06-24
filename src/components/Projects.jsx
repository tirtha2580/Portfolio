import React, { useRef, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Grid,
  Paper,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// 🚀 Your project data
const projectData = {
  web: [
    {
      title: 'Login Authentication System',
      image: '/projectImg/Login_.png',
      link: 'https://your-auth-system-link.com',
      description: 'MERN Stack | JWT Auth | OTP via Nodemailer | MUI UI',
      details: [
        '🔐 Built a secure login system using the MERN stack with user registration and JWT-based authentication.',
        '🔑 Used bcrypt for password hashing and implemented email-based OTP via Nodemailer.',
        '🔁 Developed REST API endpoints for registration, login, OTP verification, and protected routes.',
        '🎨 Styled frontend using React.js and MUI for clean UI/UX.'
      ]
    },
    {
      title: 'Food Recipe Finder',
      image: '/projectImg/food.webp',
      link: 'https://madefood.netlify.app/',
      description: 'React.js + MUI | Public API | Video Recipes | Netlify',
      details: [
        '🍽️ Developed a responsive web app to search/view recipes by name or category.',
        '🎨 Designed clean, interactive UI using React.js and MUI.',
        '🌐 Integrated with a public API to fetch recipe data dynamically.',
        '🎥 Embedded video guides for step-by-step cooking instructions.',
        '🚀 Deployed on Netlify for global access.'
      ]
    },
    {
      title: 'TaskManager Web App',
      image: '/projectImg/task1.png',
      link: 'https://task-nest-smoky.vercel.app/',
      description: 'MERN Stack | Tailwind CSS + MUI | Vercel + Render',
      details: [
        '📋 Built a task management app using React (Vite), Express.js, and MongoDB Atlas.',
        '🔐 Implemented JWT-based authentication and secure REST APIs with bcrypt hashing.',
        '🎨 UI designed using Tailwind CSS and MUI for dynamic task views (pending, completed, stats).',
        '🚀 Deployed frontend on Vercel and backend on Render for full-stack deployment.'
      ]
    }
  ],
  android: [
    {
      title: 'Global News App',
      image: '/projectImg/News.png',
      link: '/',//add live link here
      description: 'React Native + TypeScript + Public API (NewsData.io)',
      details: [
        '📰 Built a mobile app using React Native and NewsData.io API to browse and read news by category.',
        '🔖 Added bookmarking via AsyncStorage and deep linking to full articles.',
        '🔁 Used React Navigation and Context API for state management and smooth navigation.',
        '📱 Designed a clean, responsive UI optimized for Android devices.'
      ]
    }
  ],
  ml: [
    {
      title: 'Smart Education System',
      image: '/projectImg/education.png',
      link: '/',//add live link here
      description: 'Python + NLTK + Scikit-learn + Matplotlib',
      details: [
        '📊 Analyzed text files to extract relevant content based on keyword similarity.',
        '🧠 Used NLTK and Scikit-learn for NLP and ML-based similarity calculations.',
        '🖥️ Created a user-friendly Python GUI to simplify navigation and usability.',
        '📄 Enabled export of processed data as PDFs for future use.'
      ]
    }
  ]
};

// 🌌 Word cloud background
const WordCloud = () => {
  const groupRef = useRef();
  const techWords = [
    'React', 'JavaScript', 'Python', 'HTML', 'CSS', 'Node.js',
    'Express', 'MongoDB', 'MySQL', 'TypeScript', 'Tailwind',
    'MUI', 'Three.js', 'Git', 'Redux', 'Next.js', 'Figma',
    'Vercel', 'Nginx', 'PostgreSQL', 'Expo', 'Django',
  ];

  const words = useMemo(() => {
    const arr = [];
    const radius = 8;
    const layers = 10;
    const segments = 12;

    for (let i = 1; i < layers; i++) {
      const phi = Math.PI * (i / layers);
      for (let j = 0; j < segments; j++) {
        const theta = 2 * Math.PI * (j / segments);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const word = techWords[Math.floor(Math.random() * techWords.length)];
        arr.push({ word, basePosition: [x, y, z], wavePhase: Math.random() * Math.PI * 2 });
      }
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const { basePosition, wavePhase } = words[i];
      const waveY = Math.sin(t * 2 + wavePhase) * 0.6;
      child.position.set(basePosition[0], basePosition[1] + waveY, basePosition[2]);
      child.scale.setScalar(1 + 0.15 * Math.sin(t * 3 + wavePhase));
    });
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef}>
      {words.map((item, index) => (
        <Text
          key={index}
          position={item.basePosition}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {item.word}
        </Text>
      ))}
    </group>
  );
};

const Projects = () => {
  const [tab, setTab] = useState('web');
  const [expandedCard, setExpandedCard] = useState(null);

  const handleToggleDetails = (index) => {
    setExpandedCard((prev) => (prev === index ? null : index));
  };

  return (
    <Box
      id="projects"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        py: 10,
      }}
    >
      {/* 🌌 Background Canvas */}
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
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight intensity={1.2} position={[5, 5, 5]} color="#00f2fe" />
          <WordCloud />
        </Canvas>
      </Box>

      {/* 💡 Foreground Content */}
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#00f2fe', mb: 4 }}
        >
          My Projects
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            mb: 6,
            maxWidth: '100%',
            '& .MuiTabs-flexContainer': {
              justifyContent: { xs: 'flex-start', sm: 'center' },
            },
          }}
        >
          <Tab label="Web Development" value="web"  style={{fontSize:"17px",fontFamily:"cursive",fontWeight:"700"}}/>
          <Tab label="Android" value="android" style={{fontSize:"17px",fontFamily:"cursive",ontWeight:"700"}}/>
          <Tab label="Machine Learning & Data Analysis" value="ml"  style={{fontSize:"17px",fontFamily:"cursive",ontWeight:"700"}}/>
        </Tabs>

        <Grid container spacing={7} justifyContent="center">
          {projectData[tab].map((project, i) => (
            <Grid item size={{ xs: 12, md: 4 }} key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <Paper
                  elevation={5}
                  sx={{
                    backgroundColor: '#121212',
                    border: '1px solid #00f2fe',
                    boxShadow: '0 0 25px #00f2fe80',
                    overflow: 'hidden',
                    borderRadius: 3,
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 0 35px #00f2fe',
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 300,
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '8px 8px 0 0',
                    }}
                  />
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: '#00f2fe', mb: 1 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'lightgray', mb: 2 }}>
                      {project.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleDetails(i)}
                        fullWidth
                        sx={{
                          borderColor: '#00f2fe',
                          color: '#00f2fe',
                          '&:hover': {
                            backgroundColor: '#00f2fe',
                            color: '#000',
                          },
                        }}
                      >
                        {expandedCard === i ? 'Hide Details' : 'Details'}
                      </Button>

                      <Button
                        variant="contained"
                        href={project.link}
                        target="_blank"
                        fullWidth
                        sx={{
                          bgcolor: '#00f2fe',
                          color: '#000',
                          fontWeight: 'bold',
                          '&:hover': {
                            bgcolor: '#00c2fe',
                            boxShadow: '0 0 10px #00f2fe',
                          },
                        }}
                      >
                        Live
                      </Button>
                    </Box>

                    {/* Expanded Details */}
                    {expandedCard === i && (
                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          backgroundColor: '#1c1c1c',
                          borderRadius: 2,
                          color: 'white',
                        }}
                      >
                        {project.details?.map((point, idx) => (
      <Typography key={idx} variant="body2" sx={{ lineHeight: 1.6 }}>
        {point}
      </Typography>
    ))}
                      </Box>
                    )}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
