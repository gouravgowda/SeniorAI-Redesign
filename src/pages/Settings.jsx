import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Switch,
    FormControlLabel,
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Notifications, Palette, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/Cards/GlassCard';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    const navigate = useNavigate();
    const { mode, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(false);

    const handleClearProgress = () => {
        if (window.confirm('Are you sure you want to clear all your progress? This cannot be undone.')) {
            localStorage.removeItem('roadmapProgress');
            localStorage.removeItem('quizResults');
            localStorage.removeItem('selectedDomain');
            alert('Progress cleared successfully!');
            navigate('/');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                pt: 12,
                pb: 8,
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #FEF7FF 0%, #E8DEF8 100%)'
                        : 'linear-gradient(135deg, #1C1B1F 0%, #2B2930 100%)',
            }}
        >
            <Container maxWidth="md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        Settings
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Customize your SeniorAI experience
                    </Typography>

                    {/* Appearance Settings */}
                    <GlassCard sx={{ p: 4, mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Palette color="primary" />
                            <Typography variant="h6" fontWeight={600}>
                                Appearance
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={mode === 'dark'}
                                    onChange={toggleTheme}
                                    color="primary"
                                />
                            }
                            label="Dark Mode"
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                            Switch between light and dark themes
                        </Typography>
                    </GlassCard>

                    {/* Notification Settings */}
                    <GlassCard sx={{ p: 4, mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Notifications color="primary" />
                            <Typography variant="h6" fontWeight={600}>
                                Notifications
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                        <Box sx={{ mb: 2 }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={notifications}
                                        onChange={(e) => setNotifications(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Enable Notifications"
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                                Receive reminders about your learning progress
                            </Typography>
                        </Box>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={emailUpdates}
                                    onChange={(e) => setEmailUpdates(e.target.checked)}
                                    color="primary"
                                    disabled={!notifications}
                                />
                            }
                            label="Email Updates"
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                            Get weekly progress updates via email
                        </Typography>
                    </GlassCard>

                    {/* Learning Preferences */}
                    <GlassCard sx={{ p: 4, mb: 3 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Learning Preferences
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Selected Domain</InputLabel>
                            <Select
                                value={localStorage.getItem('selectedDomain') || 'AI & Machine Learning'}
                                label="Selected Domain"
                                onChange={(e) => {
                                    const newDomain = e.target.value;
                                    const currentDomain = localStorage.getItem('selectedDomain');

                                    if (newDomain !== currentDomain) {
                                        if (window.confirm(`Switch to ${newDomain}? Your progress in ${currentDomain} will be saved separately.`)) {
                                            localStorage.setItem('selectedDomain', newDomain);
                                            // Reload to show new domain's roadmap
                                            window.location.href = '/roadmap';
                                        }
                                    }
                                }}
                            >
                                <MenuItem value="AI & Machine Learning">AI & Machine Learning</MenuItem>
                                <MenuItem value="Web Development">Web Development</MenuItem>
                                <MenuItem value="Cybersecurity">Cybersecurity</MenuItem>
                                <MenuItem value="Cloud Computing">Cloud Computing</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography variant="body2" color="text.secondary">
                            Each domain has separate progress tracking. Your progress in other domains is saved.
                        </Typography>
                    </GlassCard>

                    {/* Data & Privacy */}
                    <GlassCard sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Delete color="error" />
                            <Typography variant="h6" fontWeight={600}>
                                Data & Privacy
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="body1" gutterBottom>
                            Clear Learning Progress
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            This will delete all your completed steps, quiz results, and domain selection.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClearProgress}
                            startIcon={<Delete />}
                        >
                            Clear All Progress
                        </Button>
                    </GlassCard>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Settings;
