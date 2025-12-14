import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Chip,
    Grid,
} from '@mui/material';
import { ArrowForward, Psychology, TrendingUp, Work } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/Cards/GlassCard';

// Mock recommendations (will be replaced with Gemini API)
const mockRecommendations = [
    {
        domain: 'AI & Machine Learning',
        confidence: 0.92,
        reasoning:
            'Your strong interest in intelligent systems, data analysis, and problem-solving aligns perfectly with AI/ML. This field offers cutting-edge opportunities in research and industry.',
        careerPaths: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'NLP Engineer'],
        marketDemand: 'Very High',
        icon: '🤖',
    },
    {
        domain: 'Web Development',
        confidence: 0.85,
        reasoning:
            'Your creative approach and interest in user interfaces make web development an excellent choice. You can build impactful applications that reach millions.',
        careerPaths: ['Frontend Developer', 'Full Stack Engineer', 'UI/UX Developer'],
        marketDemand: 'High',
        icon: '🌐',
    },
    {
        domain: 'Cloud Computing',
        confidence: 0.78,
        reasoning:
            'Your interest in scalable systems and automation indicates strong potential in cloud computing and DevOps. This field is critical for modern infrastructure.',
        careerPaths: ['Cloud Architect', 'DevOps Engineer', 'Site Reliability Engineer'],
        marketDemand: 'Very High',
        icon: '☁️',
    },
];

const Recommendations = () => {
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to get recommendations
        const fetchRecommendations = async () => {
            setLoading(true);
            // TODO: Replace with actual Gemini API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setRecommendations(mockRecommendations);
            setLoading(false);
        };

        fetchRecommendations();
    }, []);

    const handleSelectDomain = (domain) => {
        localStorage.setItem('selectedDomain', domain);
        navigate('/roadmap');
    };

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: (theme) =>
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(135deg, #FEF7FF 0%, #E8DEF8 100%)'
                            : 'linear-gradient(135deg, #1C1B1F 0%, #2B2930 100%)',
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                        <Psychology sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                    </motion.div>
                    <Typography variant="h5" fontWeight={600}>
                        Analyzing your profile...
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Our AI is finding your perfect domain match
                    </Typography>
                </Box>
            </Box>
        );
    }

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
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    sx={{ mb: 6, textAlign: 'center' }}
                >
                    <Typography variant="h3" fontWeight={800} gutterBottom>
                        Your Perfect Domains 🎯
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Based on your interests and goals, here are your top recommendations
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {recommendations.map((rec, index) => (
                        <Grid item xs={12} key={index}>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <GlassCard sx={{ p: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                        <Box
                                            sx={{
                                                fontSize: 64,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {rec.icon}
                                        </Box>

                                        <Box sx={{ flex: 1 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    mb: 2,
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <Typography variant="h5" fontWeight={700}>
                                                    {rec.domain}
                                                </Typography>
                                                <Chip
                                                    label={`${Math.round(rec.confidence * 100)}% Match`}
                                                    color="primary"
                                                    size="small"
                                                />
                                                <Chip
                                                    label={`${rec.marketDemand} Demand`}
                                                    color="success"
                                                    size="small"
                                                    icon={<TrendingUp />}
                                                />
                                            </Box>

                                            <Typography variant="body1" color="text.secondary" paragraph>
                                                {rec.reasoning}
                                            </Typography>

                                            <Box sx={{ mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <Work fontSize="small" color="primary" />
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Career Paths:
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                    {rec.careerPaths.map((career, idx) => (
                                                        <Chip key={idx} label={career} size="small" variant="outlined" />
                                                    ))}
                                                </Box>
                                            </Box>

                                            <Button
                                                variant="contained"
                                                endIcon={<ArrowForward />}
                                                onClick={() => handleSelectDomain(rec.domain)}
                                                sx={{ borderRadius: 3, mt: 2 }}
                                            >
                                                Choose This Domain
                                            </Button>
                                        </Box>
                                    </Box>
                                </GlassCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    sx={{ mt: 6, textAlign: 'center' }}
                >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Not sure yet? You can always explore other domains later
                    </Typography>
                    <Button variant="text" onClick={() => navigate('/')}>
                        Retake Quiz
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Recommendations;
