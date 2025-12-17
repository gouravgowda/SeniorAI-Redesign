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

    // Webhook function to trigger welcome email
    const sendWelcomeEmailWebhook = async (name, email) => {
        try {
            const response = await fetch('https://api.agentx.so/v1/agent/6942c185573fd82339f22c7c/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer AIzaSyCMfIBdosDTJqOVFr2HxvjAVI7BxP7EWl0'
                },
                body: JSON.stringify({
                    message: `New user registered: Name: ${name}, Email: ${email}. Please send them a welcome email to ${email}.`
                })
            });

            if (response.ok) {
                console.log('Welcome email webhook triggered successfully');
            } else {
                console.error('Webhook failed:', await response.text());
            }
        } catch (error) {
            console.error('Error triggering webhook:', error);
            // Don't block registration if webhook fails
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            // Store user data in localStorage (simulate registration)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', 'user-' + Date.now());
            localStorage.setItem('userName', formData.name);
            localStorage.setItem('userEmail', formData.email);

            // Trigger webhook for welcome email
            await sendWelcomeEmailWebhook(formData.name, formData.email);

            // Show success message
            alert('Account created successfully! Check your email for a welcome message.');

            // Redirect to login or home
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    const handleSocialLogin = async (providerName) => {
        if (!auth) {
            // Fallback for demo - simulate social login
            const demoName = `${providerName.charAt(0).toUpperCase() + providerName.slice(1)} User`;
            const demoEmail = `${providerName}user@example.com`;

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', `${providerName}-user`);
            localStorage.setItem('userName', demoName);
            localStorage.setItem('userEmail', demoEmail);

            // Trigger webhook
            await sendWelcomeEmailWebhook(demoName, demoEmail);

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
            console.log('User signed up:', user);

            // Store user data
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('userName', user.displayName || user.email);
            localStorage.setItem('userEmail', user.email);

            // Trigger webhook for welcome email
            await sendWelcomeEmailWebhook(
                user.displayName || user.email.split('@')[0],
                user.email
            );

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
