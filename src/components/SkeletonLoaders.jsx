import React from 'react';
import { Box, Skeleton as MuiSkeleton } from '@mui/material';
import GlassCard from './Cards/GlassCard';

// Card Skeleton for loading states
export const CardSkeleton = ({ count = 1, height = 200 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <GlassCard key={index} sx={{ p: 3, mb: 2 }}>
                    <MuiSkeleton variant="rectangular" height={40} sx={{ mb: 2, borderRadius: 2 }} />
                    <MuiSkeleton variant="text" width="80%" sx={{ mb: 1 }} />
                    <MuiSkeleton variant="text" width="60%" sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <MuiSkeleton variant="circular" width={32} height={32} />
                        <MuiSkeleton variant="circular" width={32} height={32} />
                        <MuiSkeleton variant="circular" width={32} height={32} />
                    </Box>
                </GlassCard>
            ))}
        </>
    );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5 }) => {
    return (
        <Box>
            {Array.from({ length: rows }).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                    }}
                >
                    <MuiSkeleton variant="circular" width={40} height={40} />
                    <Box sx={{ flex: 1 }}>
                        <MuiSkeleton variant="text" width="40%" />
                        <MuiSkeleton variant="text" width="60%" />
                    </Box>
                    <MuiSkeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 2 }} />
                </Box>
            ))}
        </Box>
    );
};

// Chart Skeleton
export const ChartSkeleton = ({ height = 250 }) => {
    return (
        <Box sx={{ position: 'relative', height }}>
            <MuiSkeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ borderRadius: 2 }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {Array.from({ length: 7 }).map((_, i) => (
                    <MuiSkeleton
                        key={i}
                        variant="rectangular"
                        width={30}
                        height={Math.random() * 100 + 50}
                        sx={{ borderRadius: 1 }}
                    />
                ))}
            </Box>
        </Box>
    );
};

// Stats Card Skeleton
export const StatsCardSkeleton = ({ count = 4 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <GlassCard key={index} sx={{ p: 3, textAlign: 'center' }}>
                    <MuiSkeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 2 }} />
                    <MuiSkeleton variant="text" width="80%" sx={{ mx: 'auto', mb: 1 }} />
                    <MuiSkeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
                </GlassCard>
            ))}
        </>
    );
};

// Domain Card Skeleton
export const DomainCardSkeleton = ({ count = 8 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <GlassCard key={index} sx={{ p: 3 }}>
                    <MuiSkeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 2 }} />
                    <MuiSkeleton variant="text" width="80%" sx={{ mx: 'auto', mb: 1 }} />
                    <MuiSkeleton variant="text" width="100%" sx={{ mb: 1 }} />
                    <MuiSkeleton variant="rectangular" width={100} height={24} sx={{ mx: 'auto', borderRadius: 2 }} />
                </GlassCard>
            ))}
        </>
    );
};

export default {
    CardSkeleton,
    TableSkeleton,
    ChartSkeleton,
    StatsCardSkeleton,
    DomainCardSkeleton,
};
