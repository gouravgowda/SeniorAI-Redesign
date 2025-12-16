import React from 'react';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { EmojiEvents, Star, Whatshot } from '@mui/icons-material';

const AchievementToast = ({ open, onClose, achievement }) => {
    const { width, height } = useWindowSize();
    const showConfetti = achievement?.showConfetti || false;

    const getIcon = () => {
        switch (achievement?.type) {
            case 'badge':
                return <EmojiEvents sx={{ fontSize: 40, color: '#FFD700' }} />;
            case 'streak':
                return <Whatshot sx={{ fontSize: 40, color: '#FF6B6B' }} />;
            default:
                return <Star sx={{ fontSize: 40, color: '#FFD700' }} />;
        }
    };

    return (
        <>
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={200}
                    gravity={0.3}
                />
            )}

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -100, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -100, scale: 0.5 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                        }}
                        style={{
                            position: 'fixed',
                            top: 100,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 2000,
                        }}
                    >
                        <Alert
                            severity="success"
                            onClose={onClose}
                            sx={{
                                minWidth: 300,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                '& .MuiAlert-icon': {
                                    color: '#fff',
                                },
                                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                                borderRadius: 3,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {getIcon()}
                                <Box>
                                    <Typography variant="h6" fontWeight={700}>
                                        🎉 {achievement?.title || 'Achievement Unlocked!'}
                                    </Typography>
                                    <Typography variant="body2">
                                        {achievement?.description || 'You earned points!'}
                                    </Typography>
                                    {achievement?.points && (
                                        <Typography variant="caption" fontWeight={600}>
                                            +{achievement.points} points
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AchievementToast;
