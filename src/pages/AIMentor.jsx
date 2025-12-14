import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    IconButton,
    CircularProgress,
    Paper,
} from '@mui/material';
import { Send, SmartToy } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from '../components/Chat/ChatBubble';
import GlassCard from '../components/Cards/GlassCard';
import { apiRequest, API_ENDPOINTS } from '../config/api';

const AIMentor = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            message: "Hello! I'm your AI mentor. I'm here to help you with any questions about your learning journey, programming concepts, career advice, or anything else you'd like to know. How can I assist you today?",
            timestamp: new Date().toISOString(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            sender: 'user',
            message: input,
            timestamp: new Date().toISOString(),
        };

        // Send user message immediately
        setMessages([...messages, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const aiData = await apiRequest(API_ENDPOINTS.MENTOR_CHAT, {
                method: 'POST',
                body: {
                    message: userMessage.message,
                    history: messages.slice(-5), // Send recent history
                    context: {
                        // TODO: Add selectedDomain and currentStep from context/user state later
                        selectedDomain: 'General Engineering',
                        currentStep: 'Exploration'
                    }
                }
            });

            const aiResponse = {
                id: messages.length + 2,
                sender: 'ai',
                message: aiData.response,
                timestamp: new Date().toISOString(),
            };

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorResponse = {
                id: messages.length + 2,
                sender: 'ai',
                message: "I'm having trouble connecting to my brain right now. Please try again later.",
                timestamp: new Date().toISOString(),
                isError: true
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickQuestions = [
        'What is the difference between React and Vue?',
        'How do I start with Machine Learning?',
        'What are the best resources for Data Structures?',
        'Career advice for web developers',
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #FEF7FF 0%, #E8DEF8 100%)'
                        : 'linear-gradient(135deg, #1C1B1F 0%, #2B2930 100%)',
                pt: 12,
                pb: 3,
            }}
        >
            <Container maxWidth="md" sx={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        AI Mentor Chat 🤖
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Ask me anything about programming, domains, or your learning journey
                    </Typography>
                </Box>

                {/* Quick Questions */}
                {messages.length <= 1 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                            Quick questions:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {quickQuestions.map((q, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Paper
                                        onClick={() => setInput(q)}
                                        sx={{
                                            px: 2,
                                            py: 1,
                                            cursor: 'pointer',
                                            background: (theme) =>
                                                theme.palette.mode === 'light'
                                                    ? 'rgba(255,255,255,0.8)'
                                                    : 'rgba(43,41,48,0.8)',
                                            '&:hover': {
                                                background: (theme) =>
                                                    theme.palette.mode === 'light'
                                                        ? 'rgba(103,80,164,0.1)'
                                                        : 'rgba(208,188,255,0.1)',
                                            },
                                        }}
                                    >
                                        <Typography variant="caption">{q}</Typography>
                                    </Paper>
                                </motion.div>
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Chat Messages */}
                <GlassCard
                    sx={{
                        flex: 1,
                        p: 3,
                        overflowY: 'auto',
                        mb: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    hover={false}
                >
                    <Box sx={{ flex: 1 }}>
                        <AnimatePresence>
                            {messages.map((msg) => (
                                <ChatBubble
                                    key={msg.id}
                                    message={msg.message}
                                    sender={msg.sender}
                                    timestamp={msg.timestamp}
                                />
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <SmartToy color="secondary" />
                                    <Typography variant="body2" color="text.secondary">
                                        AI is typing...
                                    </Typography>
                                    <CircularProgress size={16} />
                                </Box>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </Box>
                </GlassCard>

                {/* Input Field */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        ref={inputRef}
                        fullWidth
                        variant="outlined"
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        multiline
                        maxRows={3}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 4,
                                background: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? 'rgba(255,255,255,0.9)'
                                        : 'rgba(43,41,48,0.9)',
                            },
                        }}
                    />
                    <IconButton
                        color="primary"
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        sx={{
                            width: 56,
                            height: 56,
                            background: 'linear-gradient(135deg, #6750A4 0%, #9A82DB 100%)',
                            color: '#fff',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #4F378B 0%, #6750A4 100%)',
                            },
                            '&:disabled': {
                                background: 'rgba(0,0,0,0.12)',
                            },
                        }}
                    >
                        <Send />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
};

export default AIMentor;
