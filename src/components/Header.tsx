// Header.tsx

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { getAuth, onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { CircleDollarSign, LogOut } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const [user, setUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      console.error('Erro ao sair:', error);
    });
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#0B1621', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          {/* Logo */}
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#08fa00',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <CircleDollarSign />
              Knaip Bills
            </Typography>
          </Box>

          {/* Menu Mobile ou Botões Desktop */}
          {isMobile ? (
            <IconButton size="large" edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box display="flex" gap={2}>
              <Button
                component={Link}
                to="/dashboard"
                variant={location.pathname === '/dashboard' ? 'contained' : 'outlined'}
                size="small"
                sx={{
                  backgroundColor: location.pathname === '/dashboard' ? '#148b32' : 'transparent',
                  color: location.pathname === '/dashboard' ? '#fff' : '#fff',
                  borderColor: '#148b32',
                  '&:hover': {
                    backgroundColor: '#148b32',
                    color: '#fff',
                  },
                }}
              >
                Dashboard
              </Button>

              <Button
                component={Link}
                to="/transactions"
                variant={location.pathname === '/transactions' ? 'contained' : 'outlined'}
                size="small"
                sx={{
                  backgroundColor:
                    location.pathname === '/transactions' ? '#148b32' : 'transparent',
                  color: location.pathname === '/transactions' ? '#fff' : '#fff',
                  borderColor: '#148b32',
                  '&:hover': {
                    backgroundColor: '#148b32',
                    color: '#fff',
                  },
                }}
              >
                Transações
              </Button>
            </Box>
          )}

          {/* Perfil */}
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              alt={user?.displayName || 'Usuário'}
              src={user?.photoURL || ''}
              sx={{ width: 30, height: 30 }}
            />
            {!isMobile && (
              <>
                <Typography variant="body2" sx={{ color: '#f4f4f5' }}>
                  {user?.displayName || 'Usuário'}
                </Typography>
                <IconButton onClick={handleLogout} size="small" sx={{ color: '#f4f4f5' }}>
                  <LogOut size={18} />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ color: 'white', width: 250, backgroundColor: '#0B1621', height: '100%' }}
          role="presentation"
          onClick={toggleDrawer}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/transactions">
                <ListItemText primary="Transações" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <LogOut size={18} style={{ marginRight: 8, color: 'white' }} />
                <ListItemText primary="Sair" sx={{ color: 'white' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
