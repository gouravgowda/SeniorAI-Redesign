import React from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import { CheckCircleOutline, Circle, EmojiEvents } from '@mui/icons-material';
import { motion } from 'framer-motion';
import GlassCard from '../Cards/GlassCard';

const RoadmapProgress = ({ completedSteps = 0, totalSteps = 10, steps = [] }) => {
    const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

    return (
        <GlassCard
            sx={{
                p: 4,
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(232,222,248,0.3) 100%)'
                        : 'linear-gradient(135deg, rgba(43,41,48,0.95) 0%, rgba(103,80,164,0.1) 100%)',
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #6750A4 0%, #9A82DB 100%)',
                        boxShadow: '0 4px 12px rgba(103, 80, 164, 0.3)',
                    }}
                >
                    <EmojiEvents sx={{ fontSize: 28, color: '#fff' }} />
                </Box>
                <Typography variant="h5" fontWeight={700}>
                    Your Progress
                </Typography>
            </Box>

            {/* Progress Circle */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
                py: 3,
                borderRadius: 3,
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'rgba(103,80,164,0.05)'
                        : 'rgba(208,188,255,0.05)',
            }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                    <Box
                        sx={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            background: `conic-gradient(
                                #6750A4 0% ${progressPercentage}%,
                                rgba(0,0,0,0.1) ${progressPercentage}% 100%
                            )`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                width: '90px',
                                height: '90px',
                                borderRadius: '50%',
                                background: (theme) => theme.palette.background.paper,
                            }
                        }}
                    >
                        <Typography
                            variant="h3"
                            fontWeight={900}
                            sx={{
                                position: 'relative',
                                zIndex: 1,
                                background: 'linear-gradient(135deg, #6750A4 0%, #9A82DB 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {Math.round(progressPercentage)}%
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="h6" fontWeight={600} gutterBottom>
                    {completedSteps} / {totalSteps} Steps
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {completedSteps === totalSteps
                        ? '🎉 Roadmap Complete!'
                        : `${totalSteps - completedSteps} steps remaining`}
                </Typography>
            </Box>

            {/* Linear Progress Bar */}
            <Box sx={{ mb: 4 }}>
                <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    sx={{
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 6,
                            background: 'linear-gradient(90deg, #6750A4 0%, #9A82DB 100%)',
                        },
                    }}
                />
            </Box>

            {/* Steps List */}
            {steps.length > 0 && (
                <Box>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                        Learning Path:
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            maxHeight: '400px',
                            overflowY: 'auto',
                            pr: 1,
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: (theme) => theme.palette.mode === 'light'
                                    ? 'rgba(0,0,0,0.05)'
                                    : 'rgba(255,255,255,0.05)',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: (theme) => theme.palette.mode === 'light'
                                    ? 'rgba(103,80,164,0.3)'
                                    : 'rgba(208,188,255,0.3)',
                                borderRadius: '4px',
                                '&:hover': {
                                    background: (theme) => theme.palette.mode === 'light'
                                        ? 'rgba(103,80,164,0.5)'
                                        : 'rgba(208,188,255,0.5)',
                                },
                            },
                        }}
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: step.completed
                                            ? (theme) => theme.palette.mode === 'light'
                                                ? 'rgba(76,175,80,0.08)'
                                                : 'rgba(76,175,80,0.15)'
                                            : (theme) => theme.palette.mode === 'light'
                                                ? 'rgba(0,0,0,0.02)'
                                                : 'rgba(255,255,255,0.02)',
                                        border: '1px solid',
                                        borderColor: step.completed
                                            ? 'success.main'
                                            : (theme) => theme.palette.mode === 'light'
                                                ? 'rgba(0,0,0,0.06)'
                                                : 'rgba(255,255,255,0.06)',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateX(4px)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }
                                    }}
                                >
                                    {step.completed ? (
                                        <CheckCircleOutline
                                            sx={{
                                                color: 'success.main',
                                                fontSize: 28,
                                                animation: 'pulse 2s ease-in-out infinite',
                                                '@keyframes pulse': {
                                                    '0%, 100%': { opacity: 1 },
                                                    '50%': { opacity: 0.7 },
                                                },
                                            }}
                                        />
                                    ) : (
                                        <Circle
                                            sx={{
                                                color: 'text.disabled',
                                                fontSize: 28
                                            }}
                                        />
                                    )}
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            variant="body1"
                                            fontWeight={600}
                                            sx={{
                                                color: step.completed ? 'success.dark' : 'text.primary',
                                            }}
                                        >
                                            {step.title}
                                        </Typography>
                                    </Box>
                                    {step.completed && (
                                        <Chip
                                            label="Done"
                                            size="small"
                                            color="success"
                                            sx={{ fontWeight: 600 }}
                                        />
                                    )}
                                </Box>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
            )}

            {/* Motivational Message */}
            {completedSteps > 0 && completedSteps < totalSteps && (
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(103,80,164,0.1) 0%, rgba(154,130,219,0.1) 100%)',
                        border: '1px solid',
                        borderColor: 'primary.main',
                    }}
                >
                    <Typography variant="body2" textAlign="center" fontWeight={500}>
                        💪 Keep going! You're making great progress!
                    </Typography>
                </Box>
            )}
        </GlassCard>
    );
};

export default RoadmapProgress;
