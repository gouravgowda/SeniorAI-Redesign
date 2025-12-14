import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Grid,
    Chip,
    Link,
    IconButton,
} from '@mui/material';
import {
    PlayCircle,
    Article,
    Code,
    Description,
    OpenInNew,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import GlassCard from '../components/Cards/GlassCard';
import { apiRequest, API_ENDPOINTS } from '../config/api';

const mockResources = {
    videos: [
        {
            title: 'Complete Python Course for Beginners',
            url: '#',
            source: 'YouTube',
            duration: '6 hours',
            tags: ['Python', 'Beginner'],
        },
        {
            title: 'Machine Learning A-Z',
            url: '#',
            source: 'YouTube',
            duration: '44 hours',
            tags: ['ML', 'Advanced'],
        },
        {
            title: 'React Tutorial for Beginners',
            url: '#',
            source: 'YouTube',
            duration: '3 hours',
            tags: ['React', 'Frontend'],
        },
    ],
    articles: [
        {
            title: 'Introduction to Neural Networks',
            url: '#',
            source: 'Medium',
            readTime: '12 min',
            tags: ['ML', 'AI'],
        },
        {
            title: 'Understanding REST APIs',
            url: '#',
            source: 'Dev.to',
            readTime: '8 min',
            tags: ['Backend', 'API'],
        },
        {
            title: 'Cloud Computing Basics',
            url: '#',
            source: 'AWS Blog',
            readTime: '15 min',
            tags: ['Cloud', 'AWS'],
        },
    ],
    documentation: [
        {
            title: 'Python Official Documentation',
            url: 'https://docs.python.org/',
            source: 'Python.org',
            tags: ['Python', 'Reference'],
        },
        {
            title: 'React Documentation',
            url: 'https://react.dev/',
            source: 'React.dev',
            tags: ['React', 'Frontend'],
        },
        {
            title: 'TensorFlow Guides',
            url: 'https://www.tensorflow.org/',
            source: 'TensorFlow',
            tags: ['ML', 'AI'],
        },
    ],
    tools: [
        {
            title: 'Visual Studio Code',
            url: 'https://code.visualstudio.com/',
            description: 'Powerful code editor with extensions',
            tags: ['Editor', 'Essential'],
        },
        {
            title: 'Google Colab',
            url: 'https://colab.research.google.com/',
            description: 'Free Jupyter notebook environment',
            tags: ['ML', 'Python'],
        },
        {
            title: 'Postman',
            url: 'https://www.postman.com/',
            description: 'API development and testing',
            tags: ['API', 'Testing'],
        },
    ],
};

const Resources = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [resources, setResources] = useState({ videos: [], articles: [], documentation: [], tools: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            try {
                const domain = localStorage.getItem('selectedDomain') || 'Web Development';
                // Using a simple slug or ID for the API if needed, but passing the full name for now 
                // as the backend doesn't validate strictly yet, or we can slugify it.
                // The backend 'getResources' expects 'domainId'. 
                // Let's assume for now we pass the raw domain string and backend handles it or returns default.
                // Actually, let's slugify it to be safe if the backend expects IDs.
                const domainId = domain.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');

                const data = await apiRequest(`${API_ENDPOINTS.GET_RESOURCES}/${domainId}`);
                if (data) {
                    setResources(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.error('Error fetching resources:', error);
                // Fallback to mock data if API fails or is empty for this domain
                setResources(mockResources);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const renderResourceCard = (resource, type) => {
        return (
            <Grid item xs={12} sm={6} md={4} key={resource.title}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <GlassCard sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {resource.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {resource.source}
                                </Typography>
                            </Box>
                            <IconButton
                                size="small"
                                href={resource.url}
                                target="_blank"
                                sx={{ color: 'primary.main' }}
                            >
                                <OpenInNew fontSize="small" />
                            </IconButton>
                        </Box>

                        {resource.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {resource.description}
                            </Typography>
                        )}

                        {(resource.duration || resource.readTime) && (
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                                {resource.duration || resource.readTime}
                            </Typography>
                        )}

                        <Box sx={{ mt: 'auto', display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {resource.tags.map((tag, idx) => (
                                <Chip key={idx} label={tag} size="small" />
                            ))}
                        </Box>
                    </GlassCard>
                </motion.div>
            </Grid>
        );
    };

    const tabContent = [
        { label: 'Videos', icon: <PlayCircle />, data: resources.videos || [] },
        { label: 'Articles', icon: <Article />, data: resources.articles || [] },
        { label: 'Documentation', icon: <Description />, data: resources.documentation || [] },
        { label: 'Tools', icon: <Code />, data: resources.tools || [] },
    ];

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
                        Learning Resources 📚
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Curated resources to accelerate your learning journey
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                            },
                        }}
                    >
                        {tabContent.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                icon={tab.icon}
                                iconPosition="start"
                            />
                        ))}
                    </Tabs>
                </Box>

                <Grid container spacing={3}>
                    {tabContent[activeTab].data.map((resource) =>
                        renderResourceCard(resource, tabContent[activeTab].label.toLowerCase())
                    )}
                </Grid>

                <Box sx={{ mt: 6, textAlign: 'center' }}>
                    <GlassCard sx={{ p: 4 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Can't find what you're looking for?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Ask our AI Mentor for personalized resource recommendations
                        </Typography>
                    </GlassCard>
                </Box>
            </Container>
        </Box>
    );
};

export default Resources;
