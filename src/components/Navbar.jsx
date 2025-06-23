import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { Link as ScrollLink } from 'react-scroll';

const navItems = ['About', 'Skills','Experience','Projects',  'Education', 'Contact'];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item}
            component={ScrollLink}
            to={item.toLowerCase()}
            smooth
            duration={500}
            spy={true}
            offset={-80}
            activeClass="active"
            onSetActive={() => setActiveNav(item)}
            sx={{
              color: activeNav === item ? '#00FFFF' : 'inherit',
              fontWeight: activeNav === item ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              '&.active': {
                color: '#00FFFF',
                fontWeight: 'bold',
              }
            }}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
        <ListItem button onClick={toggleDialog}>
          <ListItemText primary="Connect" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={isScrolled ? 4 : 0}
      sx={{
        background: isScrolled
          ? 'rgba(15, 12, 41, 0.85)'
          : 'linear-gradient(90deg, #0f0c29, #302b63, #24243e)',
        color: '#fff',
        transition: 'background 0.4s ease, box-shadow 0.3s ease'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {isMobile ? (
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item}
                component={ScrollLink}
                to={item.toLowerCase()}
                smooth
                duration={500}
                spy={true}
                offset={-80}
                activeClass="active"
                onSetActive={() => setActiveNav(item)}
                sx={{
                  color: activeNav === item ? '#00FFFF' : 'inherit',
                  fontWeight: activeNav === item ? 'bold' : 'normal',
                  borderBottom: activeNav === item ? '2px solid #00FFFF' : 'none',
                  transition: 'all 0.3s ease',
                  '&.active': {
                    color: '#00FFFF',
                    fontWeight: 'bold',
                    borderBottom: '2px solid #00FFFF',
                  }
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        )}

        <Button
          onClick={toggleDialog}
          sx={{
            background: 'linear-gradient(90deg, #00f2fe, #4facfe)',
            color: '#000',
            fontWeight: 'bold',
            animation: 'blinker 1.5s linear infinite',
            boxShadow: '0 0 10px #00f2fe, 0 0 20px #00f2fe',
            '&:hover': {
              boxShadow: '0 0 20px #00f2fe, 0 0 30px #00f2fe',
              background: 'linear-gradient(90deg, #4facfe, #00f2fe)'
            }
          }}
        >
          Connect
        </Button>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>

        <Dialog open={dialogOpen} onClose={toggleDialog}>
          <DialogTitle>Connect With Me</DialogTitle>
          <DialogContent>
            <Stack direction="row" spacing={4} sx={{ justifyContent: 'center', py: 2 }}>
              <IconButton
                href="https://github.com/tirtha2580"
                target="_blank"
                sx={{
                  color: '#333',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  '&:hover': {
                    border: '2px solid',
                    borderImage: 'linear-gradient(45deg, #00f2fe, #4facfe) 1',
                    boxShadow: '0 0 15px #00f2fe',
                    animation: 'blinker 1.5s linear infinite'
                  }
                }}
              >
                <GitHubIcon fontSize="large" />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/tirthamoy-biswas-a63609264/"
                target="_blank"
                sx={{
                  color: '#0077B5',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  '&:hover': {
                    border: '2px solid',
                    borderImage: 'linear-gradient(45deg, #00f2fe, #4facfe) 1',
                    boxShadow: '0 0 15px #4facfe',
                    animation: 'blinker 1.5s linear infinite'
                  }
                }}
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
              <IconButton
                href="mailto:tirthamoybiswas405@gmail.com"
                sx={{
                  color: '#D44638',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  '&:hover': {
                    border: '2px solid',
                    borderImage: 'linear-gradient(45deg, #00f2fe, #4facfe) 1',
                    boxShadow: '0 0 15px #D44638',
                    animation: 'blinker 1.5s linear infinite'
                  }
                }}
              >
                <EmailIcon fontSize="large" />
              </IconButton>
            </Stack>
          </DialogContent>
        </Dialog>

        <style>
          {`
            @keyframes blinker {
              50% { opacity: 0.6; }
            }
          `}
        </style>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
