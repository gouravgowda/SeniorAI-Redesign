import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid,
    Switch,
    FormControlLabel,
    Divider,
} from '@mui/material';
import { AccountCircle, Edit } from '@mui/icons-material';
import { motion } from 'framer-motion';
import GlassCard from '../components/Cards/GlassCard';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Student',
        email: 'student@seniorai.com',
        selectedDomain: localStorage.getItem('selectedDomain') || 'AI & Machine Learning',
        enrollmentDate: new Date().toLocaleDateString(),
    });

    const handleSave = () => {
        setIsEditing(false);
        // TODO: Save to backend
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
                        Profile
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Manage your account and preferences
                    </Typography>

                    <GlassCard sx={{ p: 4, mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    bgcolor: 'primary.main',
                                    fontSize: '2.5rem',
                                }}
                            >
                                {profileData.name.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography variant="h5" fontWeight={600}>
                                    {profileData.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {profileData.email}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Full Name"
                                    fullWidth
                                    value={profileData.name}
                                    disabled={!isEditing}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, name: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    value={profileData.email}
                                    disabled={!isEditing}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, email: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Selected Domain"
                                    fullWidth
                                    value={profileData.selectedDomain}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Enrolled Since"
                                    fullWidth
                                    value={profileData.enrollmentDate}
                                    disabled
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                            {!isEditing ? (
                                <Button
                                    variant="contained"
                                    startIcon={<Edit />}
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <>
                                    <Button variant="contained" onClick={handleSave}>
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </Box>
                    </GlassCard>

                    <GlassCard sx={{ p: 4 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Learning Stats
                        </Typography>
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" fontWeight={700} color="primary">
                                        {
                                            Object.keys(
                                                JSON.parse(
                                                    localStorage.getItem('roadmapProgress') || '{}'
                                                )
                                            ).filter(
                                                (key) =>
                                                    JSON.parse(
                                                        localStorage.getItem('roadmapProgress') || '{}'
                                                    )[key]
                                            ).length
                                        }
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Steps Completed
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" fontWeight={700} color="primary">
                                        {
                                            Object.keys(
                                                JSON.parse(localStorage.getItem('quizResults') || '{}')
                                            ).filter(
                                                (key) =>
                                                    JSON.parse(
                                                        localStorage.getItem('quizResults') || '{}'
                                                    )[key]?.passed
                                            ).length
                                        }
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Quizzes Passed
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" fontWeight={700} color="primary">
                                        {Math.round(
                                            (Object.keys(
                                                JSON.parse(
                                                    localStorage.getItem('roadmapProgress') || '{}'
                                                )
                                            ).filter(
                                                (key) =>
                                                    JSON.parse(
                                                        localStorage.getItem('roadmapProgress') || '{}'
                                                    )[key]
                                            ).length /
                                                10) *
                                            100
                                        )}
                                        %
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Overall Progress
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </GlassCard>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Profile;
