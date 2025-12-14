import React from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { motion } from 'framer-motion';
import GlassCard from '../Cards/GlassCard';

const QuestionCard = ({
    question,
    options = [],
    selectedAnswer,
    onAnswerChange,
    questionNumber,
    totalQuestions
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <GlassCard sx={{ p: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" color="primary" fontWeight={600}>
                        Question {questionNumber} of {totalQuestions}
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
                        {question}
                    </Typography>
                </Box>

                <RadioGroup value={selectedAnswer} onChange={onAnswerChange}>
                    {options.map((option, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Box
                                sx={{
                                    mb: 1.5,
                                    p: 1.5,
                                    borderRadius: 2,
                                    border: '2px solid',
                                    borderColor: selectedAnswer === option ? 'primary.main' : 'transparent',
                                    background: selectedAnswer === option
                                        ? (theme) => theme.palette.mode === 'light'
                                            ? 'rgba(103, 80, 164, 0.1)'
                                            : 'rgba(208, 188, 255, 0.1)'
                                        : 'transparent',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        background: (theme) => theme.palette.mode === 'light'
                                            ? 'rgba(103, 80, 164, 0.05)'
                                            : 'rgba(208, 188, 255, 0.05)',
                                    },
                                }}
                                onClick={() => onAnswerChange({ target: { value: option } })}
                            >
                                <FormControlLabel
                                    value={option}
                                    control={<Radio />}
                                    label={
                                        <Typography variant="body1" fontWeight={selectedAnswer === option ? 600 : 400}>
                                            {option}
                                        </Typography>
                                    }
                                    sx={{ width: '100%', m: 0 }}
                                />
                            </Box>
                        </motion.div>
                    ))}
                </RadioGroup>
            </GlassCard>
        </motion.div>
    );
};

export default QuestionCard;
