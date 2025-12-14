import React from 'react';
import { Card as MuiCard, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme as useAppTheme } from '../../context/ThemeContext';

const GlassCard = ({
    children,
    elevation = 0,
    sx = {},
    hover = true,
    ...props
}) => {
    const muiTheme = useTheme();
    const { mode } = useAppTheme();

    const glassStyle = {
        background: mode === 'light'
            ? 'rgba(255, 255, 255, 0.7)'
            : 'rgba(10, 16, 53, 0.6)', // Amzigo Deep Navy Transparent
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${mode === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
        boxShadow: mode === 'light'
            ? '0 8px 32px rgba(0, 0, 0, 0.1)'
            : '0 8px 32px rgba(0, 0, 0, 0.4)',
        borderRadius: muiTheme.shape.borderRadius,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden', // Contain glow
        ...sx,
    };

    const hoverStyle = hover ? {
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
                ? '0 12px 40px rgba(94, 63, 255, 0.15)'
                : '0 12px 40px rgba(187, 175, 254, 0.15)', // Light Purple Glow
            border: `1px solid ${mode === 'light' ? 'rgba(94, 63, 255, 0.3)' : 'rgba(187, 175, 254, 0.3)'}`,
        },
    } : {};

    return (
        <MuiCard
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            elevation={elevation}
            sx={{
                ...glassStyle,
                ...hoverStyle,
            }}
            {...props}
        >
            {children}
        </MuiCard>
    );
};

export default GlassCard;
