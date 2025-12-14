import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { SmartToy, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../../context/ThemeContext';

const ChatBubble = ({ message, sender = 'user', timestamp }) => {
    const { mode } = useTheme();
    const isUser = sender === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    mb: 2,
                    gap: 1.5,
                    flexDirection: isUser ? 'row-reverse' : 'row',
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: isUser ? 'primary.main' : 'secondary.main',
                        width: 36,
                        height: 36,
                    }}
                >
                    {isUser ? <Person /> : <SmartToy />}
                </Avatar>

                <Box
                    sx={{
                        maxWidth: '70%',
                    }}
                >
                    <Box
                        sx={{
                            px: 2.5,
                            py: 1.5,
                            borderRadius: 3,
                            background: isUser
                                ? mode === 'light'
                                    ? 'linear-gradient(135deg, #6750A4 0%, #9A82DB 100%)'
                                    : 'linear-gradient(135deg, #D0BCFF 0%, #E8DEF8 100%)'
                                : mode === 'light'
                                    ? 'rgba(0, 0, 0, 0.05)'
                                    : 'rgba(255, 255, 255, 0.05)',
                            color: isUser
                                ? mode === 'light' ? '#fff' : '#000'
                                : mode === 'light' ? '#000' : '#fff',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {isUser ? (
                            <Typography variant="body1">{message}</Typography>
                        ) : (
                            <Box
                                sx={{
                                    '& p': { margin: 0, marginBottom: 1 },
                                    '& p:last-child': { marginBottom: 0 },
                                    '& code': {
                                        background: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontFamily: 'monospace',
                                    },
                                    '& pre': {
                                        background: mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        overflow: 'auto',
                                    },
                                }}
                            >
                                <ReactMarkdown>{message}</ReactMarkdown>
                            </Box>
                        )}
                    </Box>

                    {timestamp && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: 'block',
                                mt: 0.5,
                                ml: isUser ? 0 : 1,
                                mr: isUser ? 1 : 0,
                                textAlign: isUser ? 'right' : 'left',
                            }}
                        >
                            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                    )}
                </Box>
            </Box>
        </motion.div>
    );
};

export default ChatBubble;
