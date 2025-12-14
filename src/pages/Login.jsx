import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Container, InputAdornment, IconButton } from '@mui/material';
import { Google, GitHub, Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/Cards/GlassCard';
import Logo from '../components/Logo/Logo';

import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // For now, simulate success and redirect
        // In a real app, use signInWithEmailAndPassword here
        navigate('/');
    };

    const handleSocialLogin = async (providerName) => {
        if (!auth) {
            alert("Firebase is not configured. Please set up your .env file with Firebase credentials to use social login.");
            return;
        }
        try {
            let provider;
            if (providerName === 'google') {
                provider = new GoogleAuthProvider();
            } else if (providerName === 'github') {
                provider = new GithubAuthProvider();
            }

            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('User logged in:', user);

            // Redirect after successful login
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            if (error.code === 'auth/operation-not-allowed') {
                alert(`Error: ${providerName} sign-in is not enabled in your Firebase Console. Please enable it in Authentication > Sign-in method.`);
            } else if (error.code === 'auth/popup-closed-by-user') {
                // Ignore
            } else {
                alert(`Login failed: ${error.message}`);
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #FEF7FF 0%, #E8DEF8 100%)'
                        : 'radial-gradient(circle at 50% -20%, rgba(187, 175, 254, 0.15) 0%, rgba(0, 6, 40, 1) 80%)',
                p: 2,
            }}
        >
            <Container maxWidth="xs">
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Box sx={{ display: 'inline-block', mb: 2 }}>
                        <Logo size="large" />
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Welcome back! Please login to continue.
                    </Typography>
                </Box>

                <GlassCard sx={{ p: 4, backdropFilter: 'blur(20px)' }}>
                    <form onSubmit={handleLogin}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                label="Email Address"
                                name="email"
                                type="email"
                                fullWidth
                                required
                                value={formData.email}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                required
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Typography
                                variant="caption"
                                color="primary"
                                sx={{
                                    textAlign: 'right',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' }
                                }}
                            >
                                Forgot Password?
                            </Typography>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    fontSize: '1rem',
                                    background: 'linear-gradient(135deg, #BBAFFE 0%, #7B61FF 100%)',
                                    color: '#000628',
                                    fontWeight: 700,
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </form>

                    <Box sx={{ my: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ height: '1px', flex: 1, bgcolor: 'divider' }} />
                        <Typography variant="caption" color="text.secondary">
                            OR CONTINUE WITH
                        </Typography>
                        <Box sx={{ height: '1px', flex: 1, bgcolor: 'divider' }} />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<Google />}
                            onClick={() => handleSocialLogin('google')}
                            sx={{ py: 1 }}
                        >
                            Google
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<GitHub />}
                            onClick={() => handleSocialLogin('github')}
                            sx={{ py: 1 }}
                        >
                            GitHub
                        </Button>
                    </Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        sx={{ mt: 3 }}
                    >
                        Don't have an account?{' '}
                        <Typography
                            component="span"
                            color="primary"
                            fontWeight="600"
                            onClick={() => navigate('/signup')}
                            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        >
                            Sign Up
                        </Typography>
                    </Typography>
                </GlassCard>
            </Container>
        </Box>
    );
};

export default Login;
