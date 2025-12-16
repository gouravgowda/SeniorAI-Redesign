import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    BottomNavigation,
    BottomNavigationAction,
    useMediaQuery,
    useTheme as useMuiTheme,
    Menu,
    MenuItem,
    Avatar,
} from '@mui/material';
import {
    LightMode,
    DarkMode,
    Home,
    School,
    Chat,
    LibraryBooks,
    AccountCircle,
    MenuBook,
    EmojiEvents,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import Logo from '../Logo/Logo';

const AppNav = () => {
    const { mode, toggleTheme } = useTheme();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const navItems = [
        { label: 'Home', icon: <Home />, path: '/' },
        { label: 'Roadmap', icon: <MenuBook />, path: '/roadmap' },
        { label: 'AI Mentor', icon: <Chat />, path: '/mentor' },
        { label: 'Resources', icon: <LibraryBooks />, path: '/resources' },
        { label: 'Projects', icon: <School />, path: '/projects' },
        { label: 'Leaderboard', icon: <EmojiEvents />, path: '/leaderboard' },
    ];

    const getActiveIndex = () => {
        const index = navItems.findIndex(item => item.path === location.pathname);
        return index >= 0 ? index : 0;
    };

    if (isMobile) {
        return (
            <>
                {/* Top app bar for mobile */}
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        background: mode === 'light'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : 'rgba(43, 41, 48, 0.8)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                >
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Logo size="small" />
                        </Box>
                        <IconButton onClick={toggleTheme} color="inherit">
                            {mode === 'light' ? <DarkMode /> : <LightMode />}
                        </IconButton>
                        <IconButton onClick={handleProfileClick} color="inherit">
                            <Avatar sx={{ width: 32, height: 32, bgcolor: muiTheme.palette.primary.main }}>
                                <AccountCircle />
                            </Avatar>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Bottom navigation for mobile */}
                <BottomNavigation
                    value={getActiveIndex()}
                    onChange={(event, newValue) => {
                        navigate(navItems[newValue].path);
                    }}
                    showLabels
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        background: (theme) => theme.palette.mode === 'light'
                            ? 'rgba(255, 255, 255, 0.9)'
                            : 'rgba(10, 16, 53, 0.85)', // Amzigo Deep Navy
                        backdropFilter: 'blur(20px)',
                        borderTop: (theme) => `1px solid ${theme.palette.mode === 'light'
                            ? 'rgba(0, 0, 0, 0.05)'
                            : 'rgba(255, 255, 255, 0.08)'}`,
                        zIndex: 1200,
                    }}
                >
                    {navItems.map((item, index) => (
                        <BottomNavigationAction
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            onClick={() => navigate(item.path)}
                        />
                    ))}
                </BottomNavigation>

                {/* Profile menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileClose}
                >
                    <MenuItem onClick={() => { navigate('/profile'); handleProfileClose(); }}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => { navigate('/settings'); handleProfileClose(); }}>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={() => {
                        // Clear user data on logout
                        if (window.confirm('Are you sure you want to logout?')) {
                            navigate('/');
                            handleProfileClose();
                        } else {
                            handleProfileClose();
                        }
                    }}>
                        Logout
                    </MenuItem>
                </Menu>
            </>
        );
    }

    // Desktop navigation
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: mode === 'light'
                    ? 'rgba(255, 255, 255, 0.8)'
                    : 'rgba(43, 41, 48, 0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
            }}
        >
            <Toolbar>
                <Box sx={{ mr: 4 }}>
                    <Logo size="medium" />
                </Box>

                <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    {navItems.map((item) => (
                        <motion.div
                            key={item.label}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Box
                                onClick={() => navigate(item.path)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 2,
                                    py: 1,
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    background: location.pathname === item.path
                                        ? muiTheme.palette.primary.main
                                        : 'transparent',
                                    color: location.pathname === item.path
                                        ? '#fff'
                                        : mode === 'light' ? '#000' : '#fff',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        background: location.pathname === item.path
                                            ? muiTheme.palette.primary.dark
                                            : mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                                    },
                                }}
                            >
                                {item.icon}
                                <Typography variant="body2" fontWeight={600}>
                                    {item.label}
                                </Typography>
                            </Box>
                        </motion.div>
                    ))}
                </Box>

                <IconButton onClick={toggleTheme} sx={{ mr: 1 }}>
                    {mode === 'light' ? <DarkMode /> : <LightMode />}
                </IconButton>

                <IconButton onClick={handleProfileClick}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: muiTheme.palette.primary.main }}>
                        <AccountCircle />
                    </Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileClose}
                >
                    <MenuItem onClick={() => { navigate('/profile'); handleProfileClose(); }}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => { navigate('/settings'); handleProfileClose(); }}>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={() => {
                        // Clear user data on logout
                        if (window.confirm('Are you sure you want to logout?')) {
                            navigate('/login');
                            handleProfileClose();
                        } else {
                            handleProfileClose();
                        }
                    }}>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar >
        </AppBar >
    );
};

export default AppNav;
