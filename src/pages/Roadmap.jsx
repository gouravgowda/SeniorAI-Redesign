import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Checkbox,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Link,
    Grid,
} from '@mui/material';
import {
    ExpandMore,
    CheckCircle,
    PlayCircle,
    Article,
    Code,
    AccessTime,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import GlassCard from '../components/Cards/GlassCard';
import RoadmapProgress from '../components/Progress/RoadmapProgress';
import StepQuiz from '../components/Quiz/StepQuiz';
import quizData from '../data/quizData';

import domainRoadmaps from '../data/roadmaps';
import additionalDomainRoadmaps from '../data/additionalRoadmaps';

// Combine all roadmaps
const allRoadmaps = {
    ...domainRoadmaps,
    ...additionalDomainRoadmaps,
};

// Fallback mock roadmap for domains not yet implemented
const fallbackRoadmap = [
    {
        id: 'step_1',
        title: 'Fundamentals & Prerequisites',
        level: 'Beginner',
        description: 'Learn the fundamental concepts and required prerequisites for this domain.',
        skills: ['Core Concepts', 'Basic Tools', 'Foundation Knowledge'],
        estimatedTime: '3-4 weeks',
        resources: [
            { type: 'video', title: 'Introduction Course', url: '#', source: 'YouTube' },
            { type: 'article', title: 'Official Documentation', url: '#', source: 'Docs' },
        ],
        practicalTasks: [
            'Complete introductory tutorials',
            'Set up development environment',
            'Build first simple project',
        ],
        completed: false,
    },
    {
        id: 'step_2',
        title: 'Intermediate Skills Development',
        level: 'Intermediate',
        description: 'Develop intermediate-level skills and work on real-world projects.',
        skills: ['Advanced Concepts', 'Best Practices', 'Problem Solving'],
        estimatedTime: '6-8 weeks',
        resources: [
            { type: 'course', title: 'Intermediate Course', url: '#', source: 'Online Platform' },
            { type: 'practice', title: 'Practice Exercises', url: '#', source: 'Practice Site' },
        ],
        practicalTasks: [
            'Build portfolio projects',
            'Solve practical problems',
            'Contribute to open source',
        ],
        completed: false,
    },
    {
        id: 'step_3',
        title: 'Advanced Topics & Specialization',
        level: 'Advanced',
        description: 'Master advanced topics and specialize in specific areas of interest.',
        skills: ['Expert-Level Skills', 'Industry Standards', 'Professional Practice'],
        estimatedTime: '8-12 weeks',
        resources: [
            { type: 'course', title: 'Advanced Course', url: '#', source: 'Online Platform' },
            { type: 'book', title: 'Expert-Level Book', url: '#', source: 'Publisher' },
        ],
        practicalTasks: [
            'Work on complex projects',
            'Contribute to the field',
            'Pursue certifications',
        ],
        completed: false,
    },
];

const Roadmap = () => {
    const [roadmap, setRoadmap] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [expanded, setExpanded] = useState('step_1');
    const [quizOpen, setQuizOpen] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentStepId, setCurrentStepId] = useState(null);
    const [quizResults, setQuizResults] = useState({});

    useEffect(() => {
        const domain = localStorage.getItem('selectedDomain') || 'AI & Machine Learning';
        setSelectedDomain(domain);

        // Load saved progress from localStorage - NOW DOMAIN-SPECIFIC
        const allProgress = JSON.parse(localStorage.getItem('roadmapProgress') || '{}');
        const savedProgress = allProgress[domain] || {};

        // Load quiz results - DOMAIN-SPECIFIC
        const allQuizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
        const savedQuizResults = allQuizResults[domain] || {};
        setQuizResults(savedQuizResults);

        // Get roadmap for selected domain or use fallback
        const domainRoadmap = allRoadmaps[domain] || fallbackRoadmap;

        // Merge saved progress with domain roadmap
        const updatedRoadmap = domainRoadmap.map(step => ({
            ...step,
            completed: savedProgress[step.id] || false
        }));
        setRoadmap(updatedRoadmap);
    }, []);

    const handleStepToggle = (stepId) => {
        const updatedRoadmap = roadmap.map(step =>
            step.id === stepId ? { ...step, completed: !step.completed } : step
        );
        setRoadmap(updatedRoadmap);

        // Save progress to localStorage - DOMAIN-SPECIFIC
        const domain = selectedDomain;
        const allProgress = JSON.parse(localStorage.getItem('roadmapProgress') || '{}');

        const progress = {};
        updatedRoadmap.forEach(step => {
            progress[step.id] = step.completed;
        });

        allProgress[domain] = progress;
        localStorage.setItem('roadmapProgress', JSON.stringify(allProgress));
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleTakeQuiz = (stepId) => {
        const quiz = quizData[stepId];
        if (quiz) {
            setCurrentQuiz(quiz);
            setCurrentStepId(stepId);
            setQuizOpen(true);
        }
    };

    const handleQuizComplete = (passed, score) => {
        const domain = selectedDomain;
        const allQuizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
        const domainQuizResults = allQuizResults[domain] || {};

        domainQuizResults[currentStepId] = { passed, score, timestamp: Date.now() };
        allQuizResults[domain] = domainQuizResults;

        setQuizResults(domainQuizResults);
        localStorage.setItem('quizResults', JSON.stringify(allQuizResults));

        // Optionally auto-complete step if passed
        if (passed) {
            handleStepToggle(currentStepId);
        }
    };

    const completedSteps = roadmap.filter(step => step.completed).length;
    const recentSteps = roadmap.slice(0, 5).map(step => ({
        id: step.id,
        title: step.title,
        completed: step.completed,
    }));

    const getLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case 'beginner':
                return 'success';
            case 'intermediate':
                return 'warning';
            case 'advanced':
                return 'error';
            default:
                return 'default';
        }
    };

    const getResourceIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'video':
                return <PlayCircle fontSize="small" />;
            case 'article':
            case 'docs':
                return <Article fontSize="small" />;
            case 'practice':
            case 'course':
                return <Code fontSize="small" />;
            default:
                return <Article fontSize="small" />;
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
                <Grid container spacing={4}>
                    {/* Left side - Roadmap */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                {selectedDomain} Roadmap
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Follow this structured path from beginner to expert
                            </Typography>
                        </Box>

                        {roadmap.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Accordion
                                    expanded={expanded === step.id}
                                    onChange={handleAccordionChange(step.id)}
                                    sx={{
                                        mb: 2,
                                        borderRadius: 3,
                                        '&:before': { display: 'none' },
                                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{
                                            '& .MuiAccordionSummary-content': {
                                                my: 2,
                                                alignItems: 'center',
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                                            <Checkbox
                                                checked={step.completed}
                                                onChange={() => handleStepToggle(step.id)}
                                                onClick={(e) => e.stopPropagation()}
                                                icon={
                                                    <Box
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: '50%',
                                                            border: '3px solid',
                                                            borderColor: 'divider',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: 'all 0.3s',
                                                            '&:hover': {
                                                                borderColor: 'primary.main',
                                                                backgroundColor: 'action.hover',
                                                            }
                                                        }}
                                                    >
                                                        <CheckCircle sx={{ fontSize: 36, color: 'action.disabled' }} />
                                                    </Box>
                                                }
                                                checkedIcon={
                                                    <Box
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: '50%',
                                                            border: '3px solid',
                                                            borderColor: 'success.main',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: 'success.light',
                                                            transition: 'all 0.3s',
                                                            animation: 'pulse 0.3s ease-in-out',
                                                            '@keyframes pulse': {
                                                                '0%': { transform: 'scale(1)' },
                                                                '50%': { transform: 'scale(1.1)' },
                                                                '100%': { transform: 'scale(1)' },
                                                            },
                                                        }}
                                                    >
                                                        <CheckCircle sx={{ fontSize: 36, color: 'success.main' }} />
                                                    </Box>
                                                }
                                                sx={{
                                                    p: 0,
                                                    '&:hover': {
                                                        backgroundColor: 'transparent',
                                                    }
                                                }}
                                            />

                                            <Box sx={{ flex: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                    <Typography variant="h6" fontWeight={600}>
                                                        {step.title}
                                                    </Typography>
                                                    <Chip
                                                        label={step.level}
                                                        size="small"
                                                        color={getLevelColor(step.level)}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <AccessTime fontSize="small" color="action" />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {step.estimatedTime}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Box>
                                            <Typography variant="body1" paragraph>
                                                {step.description}
                                            </Typography>

                                            <Box sx={{ mb: 3 }}>
                                                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                                    Skills to Learn:
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                    {step.skills.map((skill, idx) => (
                                                        <Chip key={idx} label={skill} size="small" variant="outlined" />
                                                    ))}
                                                </Box>
                                            </Box>

                                            <Box sx={{ mb: 3 }}>
                                                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                                    Resources:
                                                </Typography>
                                                {step.resources.map((resource, idx) => (
                                                    <Box
                                                        key={idx}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1,
                                                            mb: 1,
                                                            p: 1,
                                                            borderRadius: 2,
                                                            '&:hover': { bgcolor: 'action.hover' },
                                                        }}
                                                    >
                                                        {getResourceIcon(resource.type)}
                                                        <Link href={resource.url} underline="none" sx={{ flex: 1 }}>
                                                            {resource.title}
                                                        </Link>
                                                        <Chip label={resource.source} size="small" />
                                                    </Box>
                                                ))}
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                                    Practical Tasks:
                                                </Typography>
                                                {step.practicalTasks.map((task, idx) => (
                                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                                                        <Typography variant="body2">•</Typography>
                                                        <Typography variant="body2">{task}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>

                                            {/* Quiz Section */}
                                            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        📝 Test Your Knowledge
                                                    </Typography>
                                                    {quizResults[step.id] && (
                                                        <Chip
                                                            label={`Score: ${quizResults[step.id].score}%`}
                                                            size="small"
                                                            color={quizResults[step.id].passed ? 'success' : 'warning'}
                                                        />
                                                    )}
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    Take a quiz to validate your understanding of this step. Passing score: 70%
                                                </Typography>
                                                <Button
                                                    variant={quizResults[step.id]?.passed ? 'outlined' : 'contained'}
                                                    onClick={() => handleTakeQuiz(step.id)}
                                                    disabled={!quizData[step.id]}
                                                    fullWidth
                                                    sx={{ textTransform: 'none' }}
                                                >
                                                    {quizResults[step.id]?.passed ? '✓ Retake Quiz' : '🎯 Take Quiz'}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </motion.div>
                        ))}

                        {/* Completion Celebration Card */}
                        {completedSteps === roadmap.length && roadmap.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <GlassCard
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        background: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? 'linear-gradient(135deg, rgba(103, 80, 164, 0.1) 0%, rgba(154, 130, 219, 0.1) 100%)'
                                                : 'linear-gradient(135deg, rgba(208, 188, 255, 0.1) 0%, rgba(232, 222, 248, 0.1) 100%)',
                                        border: '2px solid',
                                        borderColor: 'primary.main',
                                    }}
                                >
                                    <Typography variant="h3" sx={{ mb: 2 }}>
                                        🎉 Congratulations! 🎉
                                    </Typography>
                                    <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
                                        You've Completed the {selectedDomain} Roadmap!
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                        Amazing work! You've mastered all the fundamentals. Here's what to do next in your career:
                                    </Typography>

                                    <Grid container spacing={3} sx={{ textAlign: 'left' }}>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
                                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                                    💼 Start Job Hunting
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    • Update your resume with new skills<br />
                                                    • Apply for junior/entry-level positions<br />
                                                    • Practice technical interviews<br />
                                                    • Network on LinkedIn
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
                                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                                    🚀 Build Real Projects
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    • Create 2-3 portfolio projects<br />
                                                    • Contribute to open source<br />
                                                    • Participate in hackathons<br />
                                                    • Deploy projects live
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
                                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                                    🎓 Deepen Your Expertise
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    • Specialize in a niche area<br />
                                                    • Take advanced courses/certifications<br />
                                                    • Read research papers<br />
                                                    • Follow industry experts
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
                                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                                    🤝 Network & Learn
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    • Attend tech meetups & conferences<br />
                                                    • Join online communities<br />
                                                    • Find a mentor in the field<br />
                                                    • Share your knowledge (blog/YouTube)
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={() => window.open('/projects', '_self')}
                                            sx={{ borderRadius: 3, px: 4 }}
                                        >
                                            View Portfolio Projects
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={() => window.open('/mentor', '_self')}
                                            sx={{ borderRadius: 3, px: 4 }}
                                        >
                                            Ask AI Mentor
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={() => window.open('/resources', '_self')}
                                            sx={{ borderRadius: 3, px: 4 }}
                                        >
                                            Explore Resources
                                        </Button>
                                    </Box>
                                </GlassCard>
                            </motion.div>
                        )}
                    </Grid>

                    {/* Right side - Progress */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <RoadmapProgress
                                completedSteps={completedSteps}
                                totalSteps={roadmap.length}
                                steps={recentSteps}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Quiz Dialog */}
            <StepQuiz
                open={quizOpen}
                onClose={() => setQuizOpen(false)}
                quiz={currentQuiz}
                onComplete={handleQuizComplete}
            />
        </Box>
    );
};

export default Roadmap;
