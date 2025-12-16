import React, { useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    IconButton,
    Collapse,
} from '@mui/material';
import {
    ExpandMore,
    TrendingUp,
    AttachMoney,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import GlassCard from './Cards/GlassCard';

const DomainCard = ({ domain, onClick, delay = 0 }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <GlassCard
                onClick={onClick}
                sx={{
                    p: 3,
                    height: '100%',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: `0 12px 40px ${domain.color}40`,
                        '&::before': {
                            opacity: 0.1,
                        },
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: domain.gradient,
                        opacity: 0.05,
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none',
                    },
                }}
            >
                {/* Icon */}
                <Box
                    sx={{
                        fontSize: 60,
                        mb: 2,
                        textAlign: 'center',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                    }}
                >
                    {domain.icon}
                </Box>

                {/* Title */}
                <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        background: domain.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {domain.title}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, textAlign: 'center', minHeight: 40 }}
                >
                    {domain.description}
                </Typography>

                {/* Difficulty Badge */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Chip
                        label={domain.difficulty}
                        size="small"
                        sx={{
                            bgcolor: `${domain.color}20`,
                            color: domain.color,
                            fontWeight: 600,
                            border: `1px solid ${domain.color}40`,
                        }}
                    />
                </Box>

                {/* Expand Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                        onClick={handleExpand}
                        size="small"
                        sx={{
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s',
                            color: domain.color,
                        }}
                    >
                        <ExpandMore />
                    </IconButton>
                </Box>

                {/* Expanded Content */}
                <Collapse in={expanded}>
                    <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${domain.color}20` }}>
                        {/* Tech Stack */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                Tech Stack:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {domain.techStack.map((tech, index) => (
                                    <Chip
                                        key={index}
                                        label={tech}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontSize: '0.7rem' }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Job Demand */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                            <Typography variant="caption" color="text.secondary">
                                Demand: <strong>{domain.jobDemand}</strong>
                            </Typography>
                        </Box>

                        {/* Salary Range */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AttachMoney sx={{ fontSize: 16, color: 'primary.main' }} />
                            <Typography variant="caption" color="text.secondary">
                                Salary: <strong>{domain.avgSalary}</strong>
                            </Typography>
                        </Box>
                    </Box>
                </Collapse>
            </GlassCard>
        </motion.div>
    );
};

export default DomainCard;
