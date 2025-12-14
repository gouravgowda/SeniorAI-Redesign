import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    LinearProgress,
    IconButton,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/Quiz/QuestionCard';

const quizQuestions = [
    {
        question: 'What excites you the most about technology?',
        options: [
            'Building intelligent systems that learn and adapt',
            'Creating beautiful and user-friendly websites',
            'Protecting systems from cyber threats',
            'Developing mobile applications',
            'Working with hardware and embedded systems',
        ],
    },
    {
        question: 'What is your preferred way of working?',
        options: [
            'Analyzing data and solving complex problems',
            'Designing interfaces and user experiences',
            'Testing and securing systems',
            'Building end-to-end applications',
            'Automating processes and deployments',
        ],
    },
    {
        question: 'Which skill do you want to develop the most?',
        options: [
            'Machine Learning and AI algorithms',
            'Frontend frameworks like React or Vue',
            'Network security and cryptography',
            'Cloud infrastructure and scalability',
            'Low-level programming and hardware control',
        ],
    },
    {
        question: 'What type of projects interest you?',
        options: [
            'Chatbots, recommendation systems, computer vision',
            'Interactive dashboards, e-commerce sites',
            'Penetration testing, security audits',
            'Scalable APIs, microservices',
            'IoT devices, robotics, firmware',
        ],
    },
    {
        question: 'How do you approach problem-solving?',
        options: [
            'Use data and statistics to find patterns',
            'Create visual solutions and prototypes',
            'Think like an attacker to find vulnerabilities',
            'Build systems that scale and perform well',
            'Optimize at the hardware/software interface',
        ],
    },
    {
        question: 'What kind of work environment appeals to you?',
        options: [
            'Research labs, data-driven companies',
            'Creative agencies, startups',
            'Security firms, government agencies',
            'Tech giants, cloud providers',
            'Hardware manufacturers, automotive industry',
        ],
    },
    {
        question: 'Which career path sounds most appealing?',
        options: [
            'AI/ML Engineer, Data Scientist',
            'Frontend Developer, UI/UX Engineer',
            'Security Analyst, Ethical Hacker',
            'DevOps Engineer, Cloud Architect',
            'Embedded Systems Engineer, IoT Developer',
        ],
    },
];

const DomainQuiz = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(''));
    const [isSubmitting, setIsSubmitting] = useState(false);

    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    const handleAnswerChange = (event) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Prepare quiz data
        const quizData = quizQuestions.map((q, index) => ({
            question: q.question,
            answer: answers[index],
        }));

        // Store in localStorage for now (will integrate with API later)
        localStorage.setItem('quizAnswers', JSON.stringify(quizData));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        navigate('/recommendations');
    };

    const canProceed = answers[currentQuestion] !== '';
    const isLastQuestion = currentQuestion === quizQuestions.length - 1;
    const allAnswered = answers.every(answer => answer !== '');

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
            <Container maxWidth="md">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Discover Your Perfect Domain
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Answer these questions to get personalized recommendations
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? 'rgba(0,0,0,0.1)'
                                        : 'rgba(255,255,255,0.1)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                    background: 'linear-gradient(90deg, #6750A4 0%, #9A82DB 100%)',
                                },
                            }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            {currentQuestion + 1} of {quizQuestions.length} questions
                        </Typography>
                    </Box>
                </Box>

                <AnimatePresence mode="wait">
                    <QuestionCard
                        key={currentQuestion}
                        question={quizQuestions[currentQuestion].question}
                        options={quizQuestions[currentQuestion].options}
                        selectedAnswer={answers[currentQuestion]}
                        onAnswerChange={handleAnswerChange}
                        questionNumber={currentQuestion + 1}
                        totalQuestions={quizQuestions.length}
                    />
                </AnimatePresence>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 4,
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={handleBack}
                        disabled={currentQuestion === 0}
                        sx={{ borderRadius: 3 }}
                    >
                        Back
                    </Button>

                    {isLastQuestion ? (
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={!allAnswered || isSubmitting}
                            sx={{ borderRadius: 3, px: 4 }}
                        >
                            {isSubmitting ? 'Analyzing...' : 'Get Recommendations'}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            endIcon={<ArrowForward />}
                            onClick={handleNext}
                            disabled={!canProceed}
                            sx={{ borderRadius: 3 }}
                        >
                            Next
                        </Button>
                    )}
                </Box>

                {/* Progress dots */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1,
                        mt: 4,
                    }}
                >
                    {quizQuestions.map((_, index) => (
                        <Box
                            key={index}
                            component={motion.div}
                            animate={{
                                scale: index === currentQuestion ? 1.2 : 1,
                            }}
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor:
                                    answers[index] !== ''
                                        ? 'primary.main'
                                        : index === currentQuestion
                                            ? 'primary.light'
                                            : 'action.disabled',
                                transition: 'all 0.3s',
                            }}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default DomainQuiz;
