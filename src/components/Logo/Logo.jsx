import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const Logo = ({ size = 'medium' }) => {
    const theme = useTheme();
    const isSmall = size === 'small';

    // Size configuration
    const dimensions = {
        small: { fontSize: '1.25rem', iconSize: 24, gap: 1 },
        medium: { fontSize: '1.5rem', iconSize: 32, gap: 1.5 },
        large: { fontSize: '2.5rem', iconSize: 48, gap: 2 },
    };

    const { fontSize, iconSize, gap } = dimensions[size];

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: gap,
                cursor: 'pointer',
                userSelect: 'none',
            }}
        >
            {/* Geometric Icon */}
            <Box
                component={motion.div}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, type: "spring" }}
                sx={{
                    width: iconSize,
                    height: iconSize,
                    background: 'linear-gradient(135deg, #BBAFFE 0%, #7B61FF 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(187, 175, 254, 0.4)',
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '60%',
                        height: '60%',
                        background: '#000628', // Navy center
                        borderRadius: '4px',
                    }
                }}
            >
                {/* Inner Dot */}
                <Box
                    sx={{
                        width: '30%',
                        height: '30%',
                        background: '#FFFFFF',
                        borderRadius: '2px',
                        zIndex: 1,
                    }}
                />
            </Box>

            {/* Typography */}
            <Typography
                variant="h6"
                sx={{
                    fontSize: fontSize,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    fontFamily: "'Outfit', sans-serif",
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #FFFFFF 0%, #BBAFFE 100%)'
                        : 'linear-gradient(135deg, #000628 0%, #3A20B8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                Senior
                <Typography
                    component="span"
                    sx={{
                        fontSize: 'inherit',
                        fontWeight: 400, // Thinner weight for AI
                        ml: 0.5,
                        color: theme.palette.text.primary,
                        WebkitTextFillColor: theme.palette.text.primary,
                    }}
                >
                    AI
                </Typography>
            </Typography>
        </Box>
    );
};

export default Logo;
