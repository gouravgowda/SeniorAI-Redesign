import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Container, InputAdornment, IconButton, Divider } from '@mui/material';
import { Google, GitHub, Visibility, VisibilityOff, Email, Lock, ArrowForward } from '@mui/icons-material';
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
        // Store a simple logged-in state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', 'guest-user');
        localStorage.setItem('userName', formData.email.split('@')[0]);
        navigate('/');
    };

    const handleSocialLogin = async (providerName) => {
        if (!auth) {
            // Fallback for demo - just set logged in state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', `${providerName}-user`);
            localStorage.setItem('userName', `${providerName} User`);
            navigate('/');
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

            // Store user data
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('userName', user.displayName || user.email);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userPhoto', user.photoURL || '');

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
            <Container maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Logo and Header */}
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Box sx={{ display: 'inline-block', mb: 3 }}>
                                <Logo size="large" />
                            </Box>
                        </motion.div>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            Welcome Back! 👋
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Sign in to continue your learning journey
                        </Typography>
                    </Box>

                    <GlassCard sx={{ p: 4, backdropFilter: 'blur(20px)' }}>
                        {/* Social Login Buttons */}
                        <Box sx={{ mb: 3 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                size="large"
                                startIcon={<Google />}
                                onClick={() => handleSocialLogin('google')}
                                sx={{
                                    py: 1.5,
                                    mb: 2,
                                    borderWidth: 2,
                                    fontWeight: 600,
                                    '&:hover': {
                                        borderWidth: 2,
                                        transform: 'translateY(-2px)',
                                        boxShadow: 2,
                                    },
                                    transition: 'all 0.3s',
                                }}
                            >
                                Continue with Google
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                size="large"
                                startIcon={<GitHub />}
                                onClick={() => handleSocialLogin('github')}
                                sx={{
                                    py: 1.5,
                                    borderWidth: 2,
                                    fontWeight: 600,
                                    '&:hover': {
                                        borderWidth: 2,
                                        transform: 'translateY(-2px)',
                                        boxShadow: 2,
                                    },
                                    transition: 'all 0.3s',
                                }}
                            >
                                Continue with GitHub
                            </Button>
                        </Box>

                        {/* Divider */}
                        <Box sx={{ my: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Divider sx={{ flex: 1 }} />
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                OR SIGN IN WITH EMAIL
                            </Typography>
                            <Divider sx={{ flex: 1 }} />
                        </Box>

                        {/* Email/Password Form */}
                        <form onSubmit={handleLogin}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography
                                        variant="caption"
                                        color="primary"
                                        sx={{
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        Forgot Password?
                                    </Typography>
                                </Box>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        boxShadow: '0 4px 15px rgba(103, 80, 164, 0.4)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                            boxShadow: '0 6px 20px rgba(103, 80, 164, 0.5)',
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </form>

                        {/* Sign Up Link */}
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
                                fontWeight="700"
                                onClick={() => navigate('/signup')}
                                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                            >
                                Create Account
                            </Typography>
                        </Typography>
                    </GlassCard>

                    {/* Guest Access */}
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            onClick={() => {
                                localStorage.setItem('isLoggedIn', 'true');
                                localStorage.setItem('userId', 'guest');
                                localStorage.setItem('userName', 'Guest User');
                                navigate('/');
                            }}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Continue as Guest →
                        </Typography>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Login;
