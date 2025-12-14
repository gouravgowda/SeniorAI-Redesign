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

    const curatedProjects = {
        'Web Development': {
            beginner: [
                { title: 'Personal Portfolio Site', difficulty: 'Easy', estimatedTime: '5-10 hours', skills: ['HTML', 'CSS', 'Flexbox'], description: 'Build a responsive personal portfolio to showcase your skills and projects. Focus on semantic HTML and modern CSS layout.' },
                { title: 'Weather Dashboard', difficulty: 'Easy', estimatedTime: '8-12 hours', skills: ['JavaScript', 'API', 'DOM'], description: 'Create a weather app that fetches real-time data from an API. Learn how to handle asynchronous requests and update the UI dynamically.' },
                { title: 'Task Management App', difficulty: 'Easy', estimatedTime: '10-15 hours', skills: ['React', 'State', 'Props'], description: 'A simple todo list app with add, delete, and mark-as-done features. Perfect for understanding React state management.' }
            ],
            intermediate: [
                { title: 'E-commerce Storefront', difficulty: 'Medium', estimatedTime: '20-30 hours', skills: ['React', 'Context API', 'Router'], description: 'Build a multi-page e-commerce site with product listings, cart functionality, and checkout flow simulation.' },
                { title: 'Blog with CMS', difficulty: 'Medium', estimatedTime: '25-35 hours', skills: ['Next.js', 'Headless CMS', 'GraphQL'], description: 'Create a static blog using Next.js and fetch content from a Headless CMS like Contentful or Strapi.' },
                { title: 'Chat Application', difficulty: 'Medium', estimatedTime: '30-40 hours', skills: ['Socket.io', 'Node.js', 'Express'], description: 'Real-time chat app with multiple rooms. Learn about WebSockets and real-time data communication.' }
            ],
            advanced: [
                { title: 'Social Media Dashboard', difficulty: 'Hard', estimatedTime: '40+ hours', skills: ['MERN Stack', 'Auth', 'Redux'], description: 'Full-stack social platform with user authentication, posts, likes, and comments. Involves complex state and database modeling.' },
                { title: 'Project Management Tool', difficulty: 'Hard', estimatedTime: '50+ hours', skills: ['TypeScript', 'Drag & Drop', 'Firebase'], description: 'A Kanban-style broad with drag-and-drop tasks, real-time updates, and team collaboration features.' },
                { title: 'AI Code Assistant', difficulty: 'Hard', estimatedTime: '40+ hours', skills: ['OpenAI API', 'React', 'Node.js'], description: 'Build a tool that suggests code snippets or explains code using a Large Language Model API.' }
            ]
        },
        // Fallback for other domains
        'default': {
            beginner: [
                { title: 'Calculator App', difficulty: 'Easy', estimatedTime: '5 hours', skills: ['Logic', 'UI'], description: 'Basic calculator with arithmetic operations.' },
                { title: 'Note Taking App', difficulty: 'Easy', estimatedTime: '8 hours', skills: ['Storage', 'CRUD'], description: 'Simple app to creation, edit, and delete text notes.' }
            ],
            intermediate: [
                { title: 'Currency Converter', difficulty: 'Medium', estimatedTime: '15 hours', skills: ['API', 'Math'], description: 'Real-time currency conversion tool.' },
                { title: 'Quiz Application', difficulty: 'Medium', estimatedTime: '20 hours', skills: ['Logic', 'State'], description: 'Interactive quiz with score tracking and timers.' }
            ],
            advanced: [
                { title: 'Full Stack Dashboard', difficulty: 'Hard', estimatedTime: '40 hours', skills: ['Full Stack', 'Data Viz'], description: 'Admin panel with charts, data tables, and auth.' }
            ]
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const domain = localStorage.getItem('selectedDomain') || 'Web Development';

                // 1. Try to get curated projects for this domain locally first (Instant)
                const localData = curatedProjects[domain] || curatedProjects['default'];
                const localProjectsForLevel = localData[level] || [];

                // Set local data immediately to show something
                setProjectIdeas(prev => ({ ...prev, [level]: localProjectsForLevel }));

                // 2. OPTIONAL: Fetch from AI to supplement (if needed), but don't blocking rendering
                // We'll skip the API call for now to guarantee reliability on Vercel
                /*
                const data = await apiRequest(API_ENDPOINTS.SUGGEST_PROJECTS, {
                    method: 'POST',
                    body: { domain, level }
                });
                if (data.projects && data.projects.length > 0) {
                     setProjectIdeas(prev => ({ ...prev, [level]: data.projects }));
                }
                */

            } catch (error) {
                console.error('Error fetching projects:', error);
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
