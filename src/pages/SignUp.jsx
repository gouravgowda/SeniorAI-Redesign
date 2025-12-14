import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Container, InputAdornment, IconButton } from '@mui/material';
import { Google, GitHub, Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/Cards/GlassCard';
import Logo from '../components/Logo/Logo';

import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        // Add actual registration logic here
        // For now, simulate success and redirect to login
        alert('Account created successfully! Please login.');
        navigate('/login');
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
            console.log('User signed up:', user);

            // Redirect after successful sign up
            navigate('/');
        } catch (error) {
            console.error('Sign up error:', error);
            if (error.code === 'auth/operation-not-allowed') {
                alert(`Error: ${providerName} sign-in is not enabled in your Firebase Console. Please enable it in Authentication > Sign-in method.`);
            } else if (error.code === 'auth/popup-closed-by-user') {
                // Ignore
            } else {
                alert(`Sign up failed: ${error.message}`);
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
                        Create your account to start your journey
                    </Typography>
                </Box>

                <GlassCard sx={{ p: 4, backdropFilter: 'blur(20px)' }}>
                    <form onSubmit={handleSignUp}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                label="Full Name"
                                name="name"
                                type="text"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

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

                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

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
                                Create Account
                            </Button>
                        </Box>
                    </form>

                    <Box sx={{ my: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ height: '1px', flex: 1, bgcolor: 'divider' }} />
                        <Typography variant="caption" color="text.secondary">
                            OR SIGN UP WITH
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
                        Already have an account?{' '}
                        <Typography
                            component="span"
                            color="primary"
                            fontWeight="600"
                            onClick={() => navigate('/login')}
                            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        >
                            Login
                        </Typography>
                    </Typography>
                </GlassCard>
            </Container>
        </Box>
    );
};

export default SignUp;
