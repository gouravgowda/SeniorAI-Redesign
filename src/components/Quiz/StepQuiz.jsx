import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    LinearProgress,
    Chip,
    Alert,
} from '@mui/material';
import {
    CheckCircle,
    Cancel,
    EmojiEvents,
    Refresh,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const StepQuiz = ({ open, onClose, quiz, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerSelect = (questionId, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerIndex
        });
    };

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate score
            let correctCount = 0;
            quiz.questions.forEach(q => {
                if (selectedAnswers[q.id] === q.correctAnswer) {
                    correctCount++;
                }
            });
            const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
            setScore(finalScore);
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
    };

    const handleFinish = () => {
        const passed = score >= 70;
        onComplete(passed, score);
        onClose();
        // Reset for next time
        setTimeout(() => {
            setCurrentQuestion(0);
            setSelectedAnswers({});
            setShowResults(false);
            setScore(0);
        }, 300);
    };

    if (!quiz) return null;

    const currentQ = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
    const isAnswered = selectedAnswers[currentQ?.id] !== undefined;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    background: (theme) => theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(232,222,248,0.3) 100%)'
                        : 'linear-gradient(135deg, rgba(43,41,48,0.95) 0%, rgba(103,80,164,0.1) 100%)',
                }
            }}
        >
            {!showResults ? (
                <>
                    <DialogTitle>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h5" fontWeight={700}>
                                {quiz.title}
                            </Typography>
                            <Chip
                                label={`${currentQuestion + 1}/${quiz.questions.length}`}
                                color="primary"
                                sx={{ fontWeight: 600 }}
                            />
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ mt: 2, height: 6, borderRadius: 3 }}
                        />
                    </DialogTitle>

                    <DialogContent>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Typography variant="h6" fontWeight={600} sx={{ mb: 3, mt: 2 }}>
                                    {currentQ.question}
                                </Typography>

                                <RadioGroup
                                    value={selectedAnswers[currentQ.id] ?? ''}
                                    onChange={(e) => handleAnswerSelect(currentQ.id, parseInt(e.target.value))}
                                >
                                    {currentQ.options.map((option, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <FormControlLabel
                                                value={index}
                                                control={<Radio />}
                                                label={option}
                                                sx={{
                                                    mb: 1,
                                                    p: 2,
                                                    borderRadius: 2,
                                                    border: '2px solid',
                                                    borderColor: selectedAnswers[currentQ.id] === index
                                                        ? 'primary.main'
                                                        : 'divider',
                                                    backgroundColor: selectedAnswers[currentQ.id] === index
                                                        ? 'primary.light'
                                                        : 'transparent',
                                                    transition: 'all 0.3s',
                                                    width: '100%',
                                                    ml: 0,
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                    }
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </RadioGroup>
                            </motion.div>
                        </AnimatePresence>
                    </DialogContent>

                    <DialogActions sx={{ p: 3, pt: 0 }}>
                        <Button
                            onClick={handlePrevious}
                            disabled={currentQuestion === 0}
                        >
                            Previous
                        </Button>
                        <Box sx={{ flex: 1 }} />
                        <Button
                            onClick={onClose}
                            color="inherit"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            disabled={!isAnswered}
                        >
                            {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </DialogActions>
                </>
            ) : (
                <>
                    <DialogTitle>
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <EmojiEvents
                                sx={{
                                    fontSize: 64,
                                    color: score >= 70 ? 'success.main' : 'warning.main',
                                    mb: 2
                                }}
                            />
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                Quiz Complete!
                            </Typography>
                            <Typography variant="h3" fontWeight={900} color="primary">
                                {score}%
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {score >= 70
                                    ? '🎉 Congratulations! You passed!'
                                    : '💪 Keep learning! Try again to improve.'}
                            </Typography>
                        </Box>
                    </DialogTitle>

                    <DialogContent>
                        <Alert
                            severity={score >= 70 ? 'success' : 'warning'}
                            sx={{ mb: 3 }}
                        >
                            {score >= 70
                                ? 'Great job! You can now mark this step as complete.'
                                : 'You need 70% or higher to pass. Review the material and try again!'}
                        </Alert>

                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Review Answers:
                        </Typography>

                        {quiz.questions.map((q, index) => {
                            const userAnswer = selectedAnswers[q.id];
                            const isCorrect = userAnswer === q.correctAnswer;

                            return (
                                <Box
                                    key={q.id}
                                    sx={{
                                        mb: 3,
                                        p: 2,
                                        borderRadius: 2,
                                        border: '2px solid',
                                        borderColor: isCorrect ? 'success.main' : 'error.main',
                                        backgroundColor: isCorrect
                                            ? 'rgba(76,175,80,0.05)'
                                            : 'rgba(244,67,54,0.05)'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                                        {isCorrect ? (
                                            <CheckCircle color="success" />
                                        ) : (
                                            <Cancel color="error" />
                                        )}
                                        <Typography variant="body1" fontWeight={600} sx={{ flex: 1 }}>
                                            {index + 1}. {q.question}
                                        </Typography>
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                                        Your answer: <strong>{q.options[userAnswer]}</strong>
                                    </Typography>

                                    {!isCorrect && (
                                        <Typography variant="body2" color="success.main" sx={{ ml: 4, mt: 0.5 }}>
                                            ✓ Correct answer: <strong>{q.options[q.correctAnswer]}</strong>
                                        </Typography>
                                    )}

                                    <Alert severity="info" sx={{ mt: 1, ml: 4 }}>
                                        <Typography variant="body2">
                                            <strong>Explanation:</strong> {q.explanation}
                                        </Typography>
                                    </Alert>
                                </Box>
                            );
                        })}
                    </DialogContent>

                    <DialogActions sx={{ p: 3, pt: 0 }}>
                        <Button
                            onClick={handleRetry}
                            startIcon={<Refresh />}
                            variant="outlined"
                        >
                            Retry Quiz
                        </Button>
                        <Box sx={{ flex: 1 }} />
                        <Button
                            onClick={handleFinish}
                            variant="contained"
                            color={score >= 70 ? 'success' : 'primary'}
                        >
                            {score >= 70 ? 'Complete Step' : 'Close'}
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default StepQuiz;
