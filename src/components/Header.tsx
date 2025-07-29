// Header.tsx

import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
      {/* Header */}
      <header className="bg-[#0B1621]">
        <div className="container-app py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-primary-500 text-xl font-bold flex items-center gap-2">
                <CircleDollarSign />
                Knaip Bills
              </h1>
            </div>

            {/* Menu Mobile ou Botões Desktop */}
            {isMobile ? (
              <div className="flex items-center gap-3">
                {/* User Profile Mobile */}
                <div className="flex items-center gap-2">
                  <Avatar
                    alt={user?.displayName || 'Usuário'}
                    src={user?.photoURL || ''}
                    sx={{ width: 32, height: 32 }}
                  />
                  <span className="text-white text-sm font-medium">
                    {user?.displayName || 'Usuário'}
                  </span>
                </div>
                {/* Menu Button */}
                <IconButton
                  size="large"
                  edge="start"
                  onClick={toggleDrawer}
                  sx={{ color: '#37E359' }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Navigation Links */}
                <div className="flex gap-2">
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center ${
                      location.pathname === '/dashboard'
                        ? 'bg-primary-500 text-[#051626]'
                        : 'border border-primary-500 text-white hover:bg-primary-500 hover:text-[#051626]'
                    }`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/transacoes"
                    className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center ${
                      location.pathname === '/transacoes'
                        ? 'bg-primary-500 text-[#051626]'
                        : 'border border-primary-500 text-white hover:bg-primary-500 hover:text-[#051626]'
                    }`}
                  >
                    Transações
                  </Link>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-2 ml-4">
                  <Avatar
                    alt={user?.displayName || 'Usuário'}
                    src={user?.photoURL || ''}
                    sx={{ width: 32, height: 32 }}
                  />
                  <span className="text-white text-sm font-medium">
                    {user?.displayName || 'Usuário'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-primary-500 transition-colors p-1"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Drawer Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <div
          className="w-64 h-full bg-[#0B1621] text-white"
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
              <ListItemButton component={Link} to="/transacoes">
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
        </div>
      </Drawer>
    </>
  );
};

export default Header;
