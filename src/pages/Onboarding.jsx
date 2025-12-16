import React, { useRef } from 'react';
import { Box, Typography, Button, Container, Grid, Divider } from '@mui/material';
import {
    Rocket,
    TrendingUp,
    School,
    EmojiEvents,
    Psychology,
    Code,
    Groups,
    ArrowForward,
} from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import GlassCard from '../components/Cards/GlassCard';
import DomainCard from '../components/DomainCard';
import { domains } from '../data/domains';

const Onboarding = () => {
    const navigate = useNavigate();
    const statsRef = useRef(null);
    const isStatsInView = useInView(statsRef, { once: true });

    const features = [
        {
            icon: <Psychology sx={{ fontSize: 48 }} />,
            title: 'AI-Powered Guidance',
            description: 'Get personalized recommendations based on your interests, skills, and career goals',
        },
        {
            icon: <TrendingUp sx={{ fontSize: 48 }} />,
            title: 'Structured Roadmaps',
            description: 'Follow step-by-step learning paths from beginner to advanced levels',
        },
        {
            icon: <Code sx={{ fontSize: 48 }} />,
            title: 'Hands-on Projects',
            description: 'Build real-world projects to strengthen your portfolio and skills',
        },
        {
            icon: <School sx={{ fontSize: 48 }} />,
            title: 'Curated Resources',
            description: 'Access handpicked tutorials, courses, and documentation for each domain',
        },
        {
            icon: <EmojiEvents sx={{ fontSize: 48 }} />,
            title: 'Gamified Learning',
            description: 'Earn points, badges, and compete on leaderboards to stay motivated',
        },
        {
            icon: <Groups sx={{ fontSize: 48 }} />,
            title: '24/7 AI Mentor',
            description: 'Ask questions anytime and get instant, intelligent guidance',
        },
    ];

    const howItWorks = [
        {
            step: '1',
            title: 'Take the Quiz',
            description: 'Answer questions about your interests and strengths',
            color: '#667eea',
        },
        {
            step: '2',
            title: 'Get Recommendations',
            description: 'Receive AI-powered domain suggestions tailored for you',
            color: '#11998e',
        },
        {
            step: '3',
            title: 'Follow Your Roadmap',
            description: 'Learn step-by-step with personalized learning paths',
            color: '#f5576c',
        },
    ];

    const stats = [
        { value: 8, suffix: '+', label: 'Tech Domains' },
        { value: 1000, suffix: '+', label: 'Students Guided' },
        { value: 500, suffix: '+', label: 'Learning Resources' },
        { value: 100, suffix: '+', label: 'Project Ideas' },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '100vh',
                    background: (theme) =>
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(135deg, #FEF7FF 0%, #E8DEF8 100%)'
                            : 'radial-gradient(circle at 50% -20%, rgba(187, 175, 254, 0.15) 0%, rgba(0, 6, 40, 1) 80%)',
                    pt: 12,
                    pb: 8,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        sx={{ textAlign: 'center' }}
                    >
                        <Typography
                            variant="h1"
                            component={motion.h1}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                                mb: 2,
                                background: (theme) => theme.palette.mode === 'light'
                                    ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                                    : 'linear-gradient(135deg, #FFFFFF 0%, #BBAFFE 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Find Your Perfect Tech Path 🚀
                        </Typography>

                        <Typography
                            variant="h5"
                            component={motion.p}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            color="text.secondary"
                            sx={{ mb: 4, maxWidth: 700, mx: 'auto', fontSize: { xs: '1.1rem', md: '1.3rem' } }}
                        >
                            AI-powered guidance to choose the right engineering domain and build a successful career
                        </Typography>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForward />}
                                onClick={() => navigate('/quiz')}
                                sx={{
                                    px: 6,
                                    py: 2,
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    borderRadius: 8,
                                    textTransform: 'none',
                                    boxShadow: '0 8px 24px rgba(103, 80, 164, 0.3)',
                                    '&:hover': {
                                        boxShadow: '0 12px 32px rgba(103, 80, 164, 0.4)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Start Your Journey
                            </Button>
                        </motion.div>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 10, bgcolor: 'background.default' }} id="features">
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
                            Why SeniorAI? ✨
                        </Typography>
                        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
                            Everything you need to discover, learn, and master your chosen tech domain
                        </Typography>
                    </motion.div>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <GlassCard
                                        sx={{
                                            p: 4,
                                            textAlign: 'center',
                                            height: '100%',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                color: 'primary.main',
                                                mb: 2,
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" fontWeight={700} gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </GlassCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Explore Domains Section */}
            <Box sx={{ py: 10, background: (theme) => theme.palette.mode === 'light' ? 'linear-gradient(135deg, #FEF7FF 0%, #E8DEF8 50%, #FEF7FF 100%)' : 'transparent' }} id="domains">
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
                            Explore Tech Domains 🎯
                        </Typography>
                        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
                            Discover the perfect domain for your skills, interests, and career goals
                        </Typography>
                    </motion.div>

                    <Grid container spacing={3}>
                        {domains.map((domain, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={domain.id}>
                                <DomainCard
                                    domain={domain}
                                    delay={index * 0.05}
                                    onClick={() => {
                                        localStorage.setItem('selectedDomain', domain.title);
                                        navigate('/roadmap');
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box sx={{ py: 10, bgcolor: 'background.default' }} id="how-it-works">
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
                            How It Works 🔄
                        </Typography>
                        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
                            Your journey to tech mastery in three simple steps
                        </Typography>
                    </motion.div>

                    <Grid container spacing={4} alignItems="stretch">
                        {howItWorks.map((step, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.6 }}
                                    style={{ height: '100%' }}
                                >
                                    <GlassCard sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: '50%',
                                                background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}CC 100%)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 20px',
                                                fontSize: '2rem',
                                                fontWeight: 700,
                                                color: '#fff',
                                                boxShadow: `0 8px 20px ${step.color}40`,
                                            }}
                                        >
                                            {step.step}
                                        </Box>
                                        <Typography variant="h5" fontWeight={700} gutterBottom>
                                            {step.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {step.description}
                                        </Typography>
                                    </GlassCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box ref={statsRef} sx={{ py: 10, background: (theme) => theme.palette.mode === 'light' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {stats.map((stat, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <Box sx={{ textAlign: 'center', color: '#fff' }}>
                                        <Typography variant="h2" fontWeight={700} sx={{ mb: 1 }}>
                                            {isStatsInView && (
                                                <CountUp end={stat.value} duration={2.5} />
                                            )}
                                            {stat.suffix}
                                        </Typography>
                                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Final CTA Section */}
            <Box sx={{ py: 12, bgcolor: 'background.default' }}>
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <GlassCard sx={{ p: 6, textAlign: 'center' }}>
                            <Rocket sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h3" fontWeight={700} gutterBottom>
                                Ready to Begin?
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
                                Join thousands of engineering students discovering their perfect tech domain
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForward />}
                                onClick={() => navigate('/quiz')}
                                sx={{
                                    px: 6,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: 8,
                                    textTransform: 'none',
                                }}
                            >
                                Take the Quiz Now
                            </Button>
                        </GlassCard>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
};

export default Onboarding;
