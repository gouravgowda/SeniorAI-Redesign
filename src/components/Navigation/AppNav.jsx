import React, { useState, useEffect } from 'react';
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
    Badge,
    Chip,
    Divider,
    ListItemIcon,
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
    Notifications,
    Star,
    Settings,
    Logout,
    Person,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import Logo from '../Logo/Logo';
import { apiRequest } from '../../config/api';

const AppNav = () => {
    const { mode, toggleTheme } = useTheme();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [userPoints, setUserPoints] = useState(0);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        fetchUserPoints();
    }, []);

    const fetchUserPoints = async () => {
        try {
            const userId = localStorage.getItem('userId') || 'guest';
            const response = await apiRequest(`/api/user/${userId}/points`);
            setUserPoints(response.points || 0);
        } catch (error) {
            console.error('Error fetching points:', error);
            setUserPoints(245); // Fallback
        }
    };

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
                        <Chip
                            icon={<Star sx={{ fontSize: 18 }} />}
                            label={userPoints}
                            size="small"
                            sx={{
                                bgcolor: 'primary.main',
                                color: '#fff',
                                fontWeight: 700,
                                mr: 1,
                            }}
                        />
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
                    PaperProps={{
                        sx: { minWidth: 200, mt: 1 }
                    }}
                >
                    <MenuItem onClick={() => { navigate('/profile'); handleProfileClose(); }}>
                        <ListItemIcon>
                            <Person fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => { navigate('/leaderboard'); handleProfileClose(); }}>
                        <ListItemIcon>
                            <EmojiEvents fontSize="small" />
                        </ListItemIcon>
                        Leaderboard
                    </MenuItem>
                    <MenuItem onClick={() => { navigate('/settings'); handleProfileClose(); }}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {
                        if (window.confirm('Are you sure you want to logout?')) {
                            localStorage.clear();
                            navigate('/login');
                            handleProfileClose();
                        } else {
                            handleProfileClose();
                        }
                    }}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
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

                <Chip
                    icon={<Star sx={{ fontSize: 20 }} />}
                    label={`${userPoints} pts`}
                    size="medium"
                    sx={{
                        bgcolor: 'primary.main',
                        color: '#fff',
                        fontWeight: 700,
                        mr: 2,
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}
                    onClick={() => navigate('/leaderboard')}
                />

                <IconButton onClick={toggleTheme} sx={{ mr: 1 }}>
                    {mode === 'light' ? <DarkMode /> : <LightMode />}
                </IconButton>

                <IconButton sx={{ mr: 1 }}>
                    <Badge badgeContent={notificationCount} color="error">
                        <Notifications />
                    </Badge>
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
                    PaperProps={{
                        sx: { minWidth: 200, mt: 1 }
                    }}
                >
                    <MenuItem onClick={() => { navigate('/profile'); handleProfileClose(); }}>
                        <ListItemIcon>
                            <Person fontSize="small" />
                        </ListItemIcon>
                        Dashboard
                    </MenuItem>
                    <MenuItem onClick={() => { navigate('/leaderboard'); handleProfileClose(); }}>
                        <ListItemIcon>
                            <EmojiEvents fontSize="small" />
                        </ListItemIcon>
                        Leaderboard
                    </MenuItem>
                    <MenuItem onClick={() => { navigate('/settings'); handleProfileClose(); }}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {
                        if (window.confirm('Are you sure you want to logout?')) {
                            localStorage.clear();
                            navigate('/login');
                            handleProfileClose();
                        } else {
                            handleProfileClose();
                        }
                    }}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar >
        </AppBar >
    );
};

export default AppNav;
