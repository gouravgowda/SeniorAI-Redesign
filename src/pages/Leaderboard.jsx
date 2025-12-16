import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    Paper,
    CircularProgress,
} from '@mui/material';
import {
    EmojiEvents,
    WorkspacePremium,
    LocalFireDepartment,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import GlassCard from '../components/Cards/GlassCard';
import { apiRequest } from '../config/api';

const BADGE_COLORS = {
    BRONZE: '#CD7F32',
    SILVER: '#C0C0C0',
    GOLD: '#FFD700',
    PLATINUM: '#E5E4E2',
    DIAMOND: '#B9F2FF',
};

const BADGE_ICONS = {
    BRONZE: '🥉',
    SILVER: '🥈',
    GOLD: '🥇',
    PLATINUM: '💎',
    DIAMOND: '💠',
};

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [loading, setLoading] = useState(true);

    const timeframes = ['All Time', 'Monthly', 'Weekly'];
    const timeframeValues = ['all', 'monthly', 'weekly'];

    useEffect(() => {
        fetchLeaderboard();
        fetchUserRank();
    }, [activeTab]);

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const timeframe = timeframeValues[activeTab];
            const response = await apiRequest(`/api/leaderboard?timeframe=${timeframe}&limit=100`);
            setLeaderboardData(response.leaderboard || []);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            // Fallback to mock data
            setLeaderboardData(generateMockLeaderboard());
        } finally {
            setLoading(false);
        }
    };

    const fetchUserRank = async () => {
        try {
            // Get userId from localStorage or auth
            const userId = localStorage.getItem('userId') || 'guest';
            const response = await apiRequest(`/api/user/${userId}/rank`);
            setUserRank(response);
        } catch (error) {
            console.error('Error fetching user rank:', error);
        }
    };

    const generateMockLeaderboard = () => {
        const names = ['Alex Chen', 'Priya Sharma', 'John Doe', 'Sarah Kim', 'Michael Lee', 'Emma Watson', 'David Park', 'Lisa Kumar', 'Tom Smith', 'Anna Brown'];
        return names.map((name, index) => ({
            rank: index + 1,
            username: name,
            points: 1000 - (index * 75),
            badge: index < 2 ? 'DIAMOND' : index < 5 ? 'PLATINUM' : index < 8 ? 'GOLD' : 'SILVER',
            avatar: null,
        }));
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const getPodiumPosition = (rank) => {
        const positions = {
            1: { height: 180, color: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', icon: '🏆' },
            2: { height: 140, color: 'linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%)', icon: '🥈' },
            3: { height: 120, color: 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)', icon: '🥉' },
        };
        return positions[rank];
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #FEF7FF 0%, #E8DEF8 100%)'
                        : 'linear-gradient(135deg, #1C1B1F 0%, #2B2930 100%)',
                pt: 12,
                pb: 8,
            }}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        🏆 Leaderboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Compete with learners worldwide and climb the ranks!
                    </Typography>
                </Box>

                {/* User Rank Card */}
                {userRank && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <GlassCard sx={{ p: 3, mb: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <LocalFireDepartment sx={{ fontSize: 40, color: 'primary.main' }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight={600}>
                                            Your Rank: #{userRank.rank || '---'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {userRank.totalPoints || 0} points earned
                                        </Typography>
                                    </Box>
                                </Box>
                                <Chip
                                    label={userRank.badge || 'BRONZE'}
                                    icon={<span>{BADGE_ICONS[userRank.badge] || '🥉'}</span>}
                                    sx={{
                                        bgcolor: BADGE_COLORS[userRank.badge] || BADGE_COLORS.BRONZE,
                                        color: '#000',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                    }}
                                />
                            </Box>
                        </GlassCard>
                    </motion.div>
                )}

                {/* Timeframe Tabs */}
                <Box sx={{ mb: 4 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        centered
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                            },
                        }}
                    >
                        {timeframes.map((timeframe, index) => (
                            <Tab key={index} label={timeframe} />
                        ))}
                    </Tabs>
                </Box>

                {/* Top 3 Podium */}
                {!loading && leaderboardData.length >= 3 && (
                    <Box sx={{ mb: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 2 }}>
                            {/* 2nd Place */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <GlassCard
                                    sx={{
                                        width: 180,
                                        height: getPodiumPosition(2).height,
                                        background: getPodiumPosition(2).color,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                    }}
                                >
                                    <Typography variant="h2">{getPodiumPosition(2).icon}</Typography>
                                    <Avatar sx={{ width: 60, height: 60, mb: 1, border: '3px solid #fff' }}>
                                        {leaderboardData[1].username[0]}
                                    </Avatar>
                                    <Typography variant="h6" fontWeight={700} color="#000" align="center">
                                        {leaderboardData[1].username}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} color="#000">
                                        {leaderboardData[1].points} pts
                                    </Typography>
                                </GlassCard>
                            </motion.div>

                            {/* 1st Place */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <GlassCard
                                    sx={{
                                        width: 200,
                                        height: getPodiumPosition(1).height,
                                        background: getPodiumPosition(1).color,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                    }}
                                >
                                    <Typography variant="h1">{getPodiumPosition(1).icon}</Typography>
                                    <Avatar sx={{ width: 80, height: 80, mb: 1, border: '4px solid #fff' }}>
                                        {leaderboardData[0].username[0]}
                                    </Avatar>
                                    <Typography variant="h5" fontWeight={700} color="#000" align="center">
                                        {leaderboardData[0].username}
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600} color="#000">
                                        {leaderboardData[0].points} pts
                                    </Typography>
                                </GlassCard>
                            </motion.div>

                            {/* 3rd Place */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <GlassCard
                                    sx={{
                                        width: 160,
                                        height: getPodiumPosition(3).height,
                                        background: getPodiumPosition(3).color,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                    }}
                                >
                                    <Typography variant="h3">{getPodiumPosition(3).icon}</Typography>
                                    <Avatar sx={{ width: 50, height: 50, mb: 1, border: '2px solid #fff' }}>
                                        {leaderboardData[2].username[0]}
                                    </Avatar>
                                    <Typography variant="body1" fontWeight={700} color="#000" align="center">
                                        {leaderboardData[2].username}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} color="#000">
                                        {leaderboardData[2].points} pts
                                    </Typography>
                                </GlassCard>
                            </motion.div>
                        </Box>
                    </Box>
                )}

                {/* Full Leaderboard Table */}
                <GlassCard>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Rank</strong></TableCell>
                                        <TableCell><strong>User</strong></TableCell>
                                        <TableCell align="right"><strong>Points</strong></TableCell>
                                        <TableCell align="center"><strong>Badge</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {leaderboardData.map((user, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '&:hover': { bgcolor: 'action.hover' },
                                                bgcolor: user.rank <= 3 ? 'action.selected' : 'transparent',
                                            }}
                                        >
                                            <TableCell>
                                                <Chip
                                                    label={`#${user.rank}`}
                                                    size="small"
                                                    color={user.rank === 1 ? 'primary' : 'default'}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ width: 32, height: 32 }}>
                                                        {user.username[0]}
                                                    </Avatar>
                                                    <Typography fontWeight={user.rank <= 3 ? 600 : 400}>
                                                        {user.username}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography fontWeight={600}>{user.points}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={user.badge}
                                                    size="small"
                                                    icon={<span>{BADGE_ICONS[user.badge]}</span>}
                                                    sx={{
                                                        bgcolor: BADGE_COLORS[user.badge],
                                                        color: '#000',
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </GlassCard>

                {/* Info Card */}
                <Box sx={{ mt: 4 }}>
                    <GlassCard sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            How to Earn Points
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <Chip label="Complete Quiz: +10 pts" color="primary" />
                            <Chip label="Finish Roadmap Step: +25 pts" color="success" />
                            <Chip label="Complete Project: +50 pts" color="warning" />
                            <Chip label="Daily Login: +5 pts" color="info" />
                            <Chip label="View Resource: +2 pts" color="secondary" />
                        </Box>
                    </GlassCard>
                </Box>
            </Container>
        </Box>
    );
};

export default Leaderboard;
