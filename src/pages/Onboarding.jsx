import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Rocket, TrendingUp, School } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/Cards/GlassCard';

const Onboarding = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <School sx={{ fontSize: 48 }} />,
            title: 'Personalized Guidance',
            description: 'AI-powered recommendations based on your interests and goals',
        },
        {
            icon: <TrendingUp sx={{ fontSize: 48 }} />,
            title: 'Structured Roadmaps',
            description: 'Step-by-step learning paths from beginner to advanced',
        },
        {
            icon: <Rocket sx={{ fontSize: 48 }} />,
            title: 'AI Mentor Support',
            description: '24/7 intelligent assistant to guide your learning journey',
        },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #FEF7FF 0%, #E8DEF8 100%)'
                        : 'radial-gradient(circle at 50% -20%, rgba(187, 175, 254, 0.15) 0%, rgba(0, 6, 40, 1) 80%)',
                pt: 12,
                pb: 8,
            }}
        >
            <Container maxWidth="lg">
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    sx={{ textAlign: 'center', mb: 8 }}
                >
                    <Typography
                        variant="h2"
                        component={motion.h1}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #BBAFFE 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Welcome to SeniorAI 🎓
                    </Typography>

                    <Typography
                        variant="h5"
                        component={motion.p}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                    >
                        Your AI-powered guide to choosing the right engineering domain and building a successful career
                    </Typography>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/quiz')}
                            sx={{
                                px: 6,
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                borderRadius: 8,
                                textTransform: 'none',
                                boxShadow: '0 8px 24px rgba(103, 80, 164, 0.3)',
                            }}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 4,
                    }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.2 }}
                        >
                            <GlassCard sx={{ p: 4, textAlign: 'center', height: '100%' }}>
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
                    ))}
                </Box>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    sx={{ mt: 8, textAlign: 'center' }}
                >
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Join thousands of engineering students finding their perfect domain
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                        <Box>
                            <Typography variant="h4" fontWeight={700} color="primary">
                                8+
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Domains
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight={700} color="primary">
                                100+
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Resources
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight={700} color="primary">
                                AI
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Powered
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Onboarding;
