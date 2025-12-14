import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Grid,
    Chip,
    Button,
} from '@mui/material';
import { Code, GitHub, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import GlassCard from '../components/Cards/GlassCard';
import { apiRequest, API_ENDPOINTS } from '../config/api';

const portfolioTips = [
    'Create a clean, professional README for each project',
    'Include live demo links and screenshots',
    'Document your code with comments',
    'Showcase your problem-solving approach',
    'Pin your best projects on GitHub profile',
    'Contribute to open-source projects',
];

const Projects = () => {
    const [projectIdeas, setProjectIdeas] = useState({ beginner: [], intermediate: [], advanced: [] });
    const [loading, setLoading] = useState(false);
    const [level, setLevel] = useState('beginner');

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const domain = localStorage.getItem('selectedDomain') || 'Web Development';

                // Check cache first
                const cachedProjects = localStorage.getItem(`projects_${domain}_${level}`);
                if (cachedProjects) {
                    const data = JSON.parse(cachedProjects);
                    setProjectIdeas(prev => ({ ...prev, [level]: data }));
                } else {
                    const data = await apiRequest(API_ENDPOINTS.SUGGEST_PROJECTS, {
                        method: 'POST',
                        body: { domain, level }
                    });

                    if (data.projects) {
                        setProjectIdeas(prev => ({ ...prev, [level]: data.projects }));
                        // Cache result
                        localStorage.setItem(`projects_${domain}_${level}`, JSON.stringify(data.projects));
                    }
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                // Keep existing state (empty) or handle error UI
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [level]);

    const handleLevelChange = (event, newLevel) => {
        if (newLevel !== null) {
            setLevel(newLevel);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return 'success';
            case 'medium':
                return 'warning';
            case 'hard':
                return 'error';
            default:
                return 'default';
        }
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
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Project Ideas 💡
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Build your portfolio with these hands-on projects
                    </Typography>
                </Box>

                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <ToggleButtonGroup
                        value={level}
                        exclusive
                        onChange={handleLevelChange}
                        sx={{
                            '& .MuiToggleButton-root': {
                                px: 4,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 3,
                            },
                        }}
                    >
                        <ToggleButton value="beginner">Beginner</ToggleButton>
                        <ToggleButton value="intermediate">Intermediate</ToggleButton>
                        <ToggleButton value="advanced">Advanced</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Grid container spacing={3}>
                    {loading ? (
                        <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                            <Typography>Loading projects...</Typography>
                        </Box>
                    ) : (projectIdeas[level] || []).map((project, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <Code color="primary" />
                                        <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
                                            {project.title}
                                        </Typography>
                                        <Chip
                                            label={project.difficulty}
                                            size="small"
                                            color={getDifficultyColor(project.difficulty)}
                                        />
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {project.description}
                                    </Typography>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" color="text.secondary" gutterBottom>
                                            Skills: {(project.skills || []).join(', ')}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            Estimated time: {project.estimatedTime}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mt: 'auto', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {(project.skills || []).map((skill, idx) => (
                                            <Chip key={idx} label={skill} size="small" variant="outlined" />
                                        ))}
                                    </Box>
                                </GlassCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 6 }}>
                    <GlassCard sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <GitHub sx={{ fontSize: 40, color: 'primary.main' }} />
                            <Box>
                                <Typography variant="h5" fontWeight={700}>
                                    GitHub Portfolio Tips
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Stand out with a professional portfolio
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={2}>
                            {portfolioTips.map((tip, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                        <Star sx={{ color: 'primary.main', fontSize: 20, mt: 0.5 }} />
                                        <Typography variant="body2">{tip}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Button variant="outlined" startIcon={<GitHub />} sx={{ borderRadius: 3 }}>
                                View Sample Portfolios
                            </Button>
                        </Box>
                    </GlassCard>
                </Box>
            </Container>
        </Box>
    );
};

export default Projects;
