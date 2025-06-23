// src/components/Preloader.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@mui/material';

const Preloader = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        setTimeout(onFinish, 2000); // Wait after reaching 100%
        return 100;
      });
    }, 30); // Slower for dramatic effect

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: percent === 100 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'fixed',
          width: '100%',
          height: '100vh',
          background: '#000',
          color: '#00f2fe',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2rem',
          zIndex: 9999,
          flexDirection: 'column',
        }}
      >
        {/* Rainbow Shadow Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              mb: 2,
              color: '#fff',
              textShadow: `
                0 0 10px red,
                0 0 20px orange,
                0 0 30px yellow,
                0 0 40px green,
                0 0 50px blue,
                0 0 60px indigo,
                0 0 70px violet`,
            }}
          >
            WELCOME
          </Typography>
        </motion.div>

        {/* Loading percentage */}
        <motion.div
          key={percent}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <Typography variant="h5" sx={{ color: '#00f2fe' }}>
            Loading {percent}%
          </Typography>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
