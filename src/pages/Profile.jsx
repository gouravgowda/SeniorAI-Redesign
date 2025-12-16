import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Avatar,
    Chip,
    LinearProgress,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    EmojiEvents,
    TrendingUp,
    CheckCircle,
    WhatshotOutlined,
    School,
    Code,
    Star,
    Share,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../components/Cards/GlassCard';
import { apiRequest } from '../config/api';

const Profile = () => {
    const [userStats, setUserStats] = useState({
        totalPoints: 245,
        badge: 'SILVER',
        rank: 47,
        stepsCompleted: 8,
        quizzesPassed: 3,
        projectsCompleted: 1,
        overallProgress: 35,
        currentStreak: 7,
    });

    const [activityData, setActivityData] = useState([]);
    const [skillsData, setSkillsData] = useState([
        { name: 'React', level: 75, color: '#61DAFB' },
        { name: 'Python', level: 60, color: '#3776AB' },
        { name: 'Node.js', level: 50, color: '#339933' },
        { name: 'MongoDB', level: 40, color: '#47A248' },
        { name: 'TypeScript', level: 45, color: '#3178C6' },
    ]);

    const [weeklyProgress, setWeeklyProgress] = useState([
        { day: 'Mon', points: 15 },
        { day: 'Tue', points: 22 },
        { day: 'Wed', points: 18 },
        { day: 'Thu', points: 30 },
        { day: 'Fri', points: 25 },
        { day: 'Sat', points: 35 },
        { day: 'Sun', points: 28 },
    ]);

    const [milestones, setMilestones] = useState([
        { id: 1, title: 'First Quiz Completed', date: '2024-12-10', completed: true },
        { id: 2, title: 'Completed 5 Roadmap Steps', date: '2024-12-12', completed: true },
        { id: 3, title: 'Earned Silver Badge', date: '2024-12-14', completed: true },
        { id: 4, title: 'Complete First Project', date: 'In Progress', completed: false },
        { id: 5, title: 'Reach Gold Badge', date: 'Upcoming', completed: false },
    ]);

    useEffect(() => {
        fetchUserData();
        generateHeatmapData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem('userId') || 'guest';
            const pointsResponse = await apiRequest(`/api/user/${userId}/points`);
            const rankResponse = await apiRequest(`/api/user/${userId}/rank`);

            setUserStats(prev => ({
                ...prev,
                totalPoints: pointsResponse.points || prev.totalPoints,
                badge: pointsResponse.badge || prev.badge,
                rank: rankResponse.rank || prev.rank,
            }));
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Use mock data on error
        }
    };

    const generateHeatmapData = () => {
        const data = [];
        const today = new Date();

        for (let i = 0; i < 90; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            data.push({
                date: date.toISOString().split('T')[0],
                count: Math.floor(Math.random() * 5),
            });
        }

        setActivityData(data.reverse());
    };

    const BADGE_CONFIG = {
        BRONZE: { color: '#CD7F32', icon: '🥉', label: 'Bronze' },
        SILVER: { color: '#C0C0C0', icon: '🥈', label: 'Silver' },
        GOLD: { color: '#FFD700', icon: '🥇', label: 'Gold' },
        PLATINUM: { color: '#E5E4E2', icon: '💎', label: 'Platinum' },
        DIAMOND: { color: '#B9F2FF', icon: '💠', label: 'Diamond' },
    };

    const currentBadge = BADGE_CONFIG[userStats.badge] || BADGE_CONFIG.BRONZE;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                pt: 12,
                pb: 8,
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #FEF7FF 0%, #E8DEF8 100%)'
                        : 'linear-gradient(135deg, #1C1B1F 0%, #2B2930 100%)',
            }}
        >
            <Container maxWidth="lg">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h3" fontWeight={700}>
                            Dashboard 📊
                        </Typography>
                        <Tooltip title="Share Progress">
                            <IconButton>
                                <Share />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* User Overview Card */}
                    <GlassCard sx={{ p: 4, mb: 4 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item>
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        bgcolor: currentBadge.color,
                                        fontSize: '3rem',
                                    }}
                                >
                                    {currentBadge.icon}
                                </Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h4" fontWeight={700} gutterBottom>
                                    Welcome Back, Student! 👋
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                    Domain: <strong>{localStorage.getItem('selectedDomain') || 'Web Development'}</strong>
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Chip
                                        label={`${currentBadge.label} Badge`}
                                        sx={{ bgcolor: `${currentBadge.color}40`, fontWeight: 600 }}
                                    />
                                    <Chip
                                        label={`Rank #${userStats.rank}`}
                                        icon={<EmojiEvents />}
                                        color="primary"
                                    />
                                    <Chip
                                        label={`${userStats.currentStreak} Day Streak`}
                                        icon={<WhatshotOutlined />}
                                        sx={{ bgcolor: '#FF6B6B', color: '#fff' }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </GlassCard>

                    {/* Progress Overview */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <GlassCard sx={{ p: 3, textAlign: 'center' }}>
                                <Box sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}>
                                    <CircularProgressbar
                                        value={userStats.overallProgress}
                                        text={`${userStats.overallProgress}%`}
                                        styles={buildStyles({
                                            textColor: currentBadge.color,
                                            pathColor: currentBadge.color,
                                            trailColor: '#E0E0E0',
                                        })}
                                    />
                                </Box>
                                <Typography variant="h6" fontWeight={600}>
                                    Overall Progress
                                </Typography>
                            </GlassCard>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <GlassCard sx={{ p: 3 }}>
                                <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h3" fontWeight={700} color="primary">
                                    {userStats.totalPoints}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Points
                                </Typography>
                            </GlassCard>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <GlassCard sx={{ p: 3 }}>
                                <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                                <Typography variant="h3" fontWeight={700} color="success.main">
                                    {userStats.stepsCompleted}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Steps Completed
                                </Typography>
                            </GlassCard>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <GlassCard sx={{ p: 3 }}>
                                <School sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                                <Typography variant="h3" fontWeight={700} color="warning.main">
                                    {userStats.projectsCompleted}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Projects Done
                                </Typography>
                            </GlassCard>
                        </Grid>
                    </Grid>

                    {/* Weekly Progress Chart */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={8}>
                            <GlassCard sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Weekly Activity 📈
                                </Typography>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={weeklyProgress}>
                                        <defs>
                                            <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis />
                                        <RechartsTooltip />
                                        <Area type="monotone" dataKey="points" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorPoints)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </GlassCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <GlassCard sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Skills Progress 💪
                                </Typography>
                                {skillsData.map((skill, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2" fontWeight={600}>
                                                {skill.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {skill.level}%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={skill.level}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor: '#E0E0E0',
                                                '& .MuiLinearProgress-bar': {
                                                    bgcolor: skill.color,
                                                    borderRadius: 4,
                                                },
                                            }}
                                        />
                                    </Box>
                                ))}
                            </GlassCard>
                        </Grid>
                    </Grid>

                    {/* Activity Heatmap */}
                    <GlassCard sx={{ p: 3, mb: 4 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Activity Heatmap 🔥
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Your learning activity over the past 90 days
                        </Typography>
                        <Box sx={{ overflowX: 'auto' }}>
                            <CalendarHeatmap
                                startDate={new Date(new Date().setDate(new Date().getDate() - 90))}
                                endDate={new Date()}
                                values={activityData}
                                classForValue={(value) => {
                                    if (!value) return 'color-empty';
                                    return `color-scale-${Math.min(value.count, 4)}`;
                                }}
                                tooltipDataAttrs={(value) => {
                                    return {
                                        'data-tip': value.date ? `${value.date}: ${value.count} activities` : 'No activity',
                                    };
                                }}
                            />
                        </Box>
                        <style jsx global>{`
                            .react-calendar-heatmap .color-empty { fill: #E0E0E0; }
                            .react-calendar-heatmap .color-scale-1 { fill: #C6E48B; }
                            .react-calendar-heatmap .color-scale-2 { fill: #7BC96F; }
                            .react-calendar-heatmap .color-scale-3 { fill: #239A3B; }
                            .react-calendar-heatmap .color-scale-4 { fill: #196127; }
                        `}</style>
                    </GlassCard>

                    {/* Milestones Timeline */}
                    <GlassCard sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Milestones & Achievements 🎯
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            {milestones.map((milestone, index) => (
                                <Box
                                    key={milestone.id}
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        mb: 3,
                                        position: 'relative',
                                        '&::before': index < milestones.length - 1 ? {
                                            content: '""',
                                            position: 'absolute',
                                            left: 15,
                                            top: 40,
                                            bottom: -24,
                                            width: 2,
                                            bgcolor: milestone.completed ? 'success.main' : 'grey.300',
                                        } : {},
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            bgcolor: milestone.completed ? 'success.main' : 'grey.300',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {milestone.completed ? (
                                            <CheckCircle sx={{ fontSize: 20, color: '#fff' }} />
                                        ) : (
                                            <Star sx={{ fontSize: 20, color: '#fff' }} />
                                        )}
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body1" fontWeight={600}>
                                            {milestone.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {milestone.date}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </GlassCard>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Profile;
