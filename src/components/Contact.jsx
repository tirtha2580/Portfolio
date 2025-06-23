import React, { useRef, useState, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import {
  Box, Typography, Grid, TextField, Button, Container, Card, CardContent, InputAdornment
} from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function generateParticles(count) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }
  return positions;
}

const BouncingParticles = () => {
  const ref = useRef();
  const particles = useMemo(() => generateParticles(1000), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      for (let i = 0; i < ref.current.geometry.attributes.position.count; i++) {
        const y = Math.sin(t + i) * 0.5;
        ref.current.geometry.attributes.position.setY(i, y);
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial color="#00f2fe" size={0.06} sizeAttenuation depthWrite={false} />
    </Points>
  );
};

const ContactSection = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    location: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_yyt12sl', 'template_32fuonm', form.current, 'BCYqfgLSA75VMZalP')
      .then(
        () => {
          toast.success('Message sent successfully! 🎉...Thank You');
          form.current.reset();
        },
        (error) => {
          toast.error('Failed to send message 😢');
          console.error(error);
        }
      );
  };

  return (
    <Box id="contact" sx={{ minHeight: '50vh', backgroundColor: '#000', position: 'relative', overflow: 'hidden', py: 10 }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Box sx={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight />
          <BouncingParticles />
        </Canvas>
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: '#00f2fe', fontWeight: 'bold', mb: 6 }}>
          Connect With Me
        </Typography>
        <Grid container spacing={12}>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                <form ref={form} onSubmit={sendEmail} style={{ width: '100%' }}>
                  <Card
                    sx={{
                      background: 'linear-gradient(145deg, #0f2027, #203a43)',
                      borderRadius: 4,
                      color: '#fff',
                      boxShadow: '0 0 20px #00f2fe80',
                      padding: 4,
                      maxWidth: 500,
                      width: '100%',
                      margin: '0 auto',
                      transition: 'box-shadow 0.3s, transform 0.3s',
                      '&:hover': {
                        boxShadow: '0 0 40px #00f2fecc',
                        transform: 'scale(1.02)'
                      },
                      '&:focus-within': {
                        boxShadow: '0 0 45px #00f2fe',
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: '#00f2fe', fontWeight: 'bold', textAlign: 'center' }}>
                        Get in Touch
                      </Typography>
                      <Grid container spacing={3} style={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item xs={12}>
                          <TextField
                            name="full_name"
                            required
                            value={formData.full_name}
                            onChange={handleChange}
                            label="Full Name"
                            fullWidth
                            variant="filled"
                            InputProps={{
                              disableUnderline: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon sx={{ color: '#00f2fe' }} />
                                </InputAdornment>
                              )
                            }}
                            sx={{
                              backgroundColor: '#1e1e1e',
                              borderRadius: 2,
                              input: { color: '#fff' },
                              '& .MuiInputLabel-root': { color: '#fff' }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            label="Email"
                            type="email"
                            fullWidth
                            variant="filled"
                            InputProps={{
                              disableUnderline: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon sx={{ color: '#00f2fe' }} />
                                </InputAdornment>
                              )
                            }}
                            sx={{
                              backgroundColor: '#1e1e1e',
                              borderRadius: 2,
                              input: { color: '#fff' },
                              '& .MuiInputLabel-root': { color: '#fff' }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            label="Location"
                            fullWidth
                            variant="filled"
                            InputProps={{
                              disableUnderline: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LocationOnIcon sx={{ color: '#00f2fe' }} />
                                </InputAdornment>
                              )
                            }}
                            sx={{
                              backgroundColor: '#1e1e1e',
                              borderRadius: 2,
                              input: { color: '#fff' },
                              '& .MuiInputLabel-root': { color: '#fff' }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            label="Message"
                            multiline
                            rows={4}
                            fullWidth
                            variant="filled"
                            InputProps={{
                              disableUnderline: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MessageIcon sx={{ color: '#00f2fe' }} />
                                </InputAdornment>
                              )
                            }}
                            sx={{
                              backgroundColor: '#1e1e1e',
                              borderRadius: 2,
                              '& .MuiInputLabel-root': { color: '#fff' },
                              '& .MuiFilledInput-root': {
                                color: '#fff',
                                '& textarea': {
                                  color: '#fff'
                                }
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            sx={{
                              py: 1.4,
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              borderRadius: 3,
                              background: 'linear-gradient(to right, #00f2fe, #4facfe)',
                              color: '#000',
                              '&:hover': {
                                background: 'linear-gradient(to right, #4facfe, #00f2fe)'
                              }
                            }}
                          >
                            Send Message
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </form>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card sx={{ width: '100%', maxWidth: 1200, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', borderRadius: 4, padding: 5, border: '1px solid #00f2fe55', color: '#fff', marginTop: 13, boxShadow: '0 0 20px #00f2fe80' }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#00f2fe', fontWeight: 'bold' }}>Contact Info</Typography>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}><PhoneIcon sx={{ color: '#00f2fe', mr: 1 }} /> +91 8927734852</Box>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}><WhatsAppIcon sx={{ color: '#00f2fe', mr: 1 }} /> 8927734852</Box>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}><EmailIcon sx={{ color: '#00f2fe', mr: 1 }} /> tirthamoybiswas405@gmail.com</Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}><LocationOnIcon sx={{ color: '#00f2fe', mr: 1 }} /> Kolkata, India – 700113</Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
