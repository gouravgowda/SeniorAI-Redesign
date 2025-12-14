import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Light Mode (Clean & Professional)
                primary: {
                    main: '#5E3FFF', // Deep Purple
                    light: '#BBAFFE',
                    dark: '#3A20B8',
                    contrastText: '#FFFFFF',
                },
                secondary: {
                    main: '#000628',
                    light: '#1A214D',
                    dark: '#000000',
                    contrastText: '#FFFFFF',
                },
                background: {
                    default: '#F5F7FA',
                    paper: '#FFFFFF',
                    glass: 'rgba(255, 255, 255, 0.8)',
                },
                text: {
                    primary: '#000628',
                    secondary: '#4A5568',
                },
            }
            : {
                // Dark Mode (Amzigo Inspired - Deep Navy & Light Purple)
                primary: {
                    main: '#BBAFFE', // Amzigo Light Purple
                    light: '#D4C9FF',
                    dark: '#8B7ED6',
                    contrastText: '#000628',
                },
                secondary: {
                    main: '#FFFFFF',
                    light: '#FFFFFF',
                    dark: '#CCCCCC',
                    contrastText: '#000628',
                },
                background: {
                    default: '#000628', // Amzigo Deep Navy
                    paper: '#0A1035', // Slightly lighter navy
                    glass: 'rgba(10, 16, 53, 0.7)',
                },
                text: {
                    primary: '#FFFFFF',
                    secondary: 'rgba(255, 255, 255, 0.7)',
                },
                action: {
                    hover: 'rgba(187, 175, 254, 0.08)',
                    selected: 'rgba(187, 175, 254, 0.16)',
                },
            }),
    },
    typography: {
        fontFamily: "'Outfit', 'Inter', sans-serif",
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.02em',
        },
    },
    shape: {
        borderRadius: 8, // Amzigo uses sharper corners (~4-8px)
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: mode === 'light' ? '#F5F7FA' : '#000628',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: mode === 'light' ? '#CBD5E0' : 'rgba(187, 175, 254, 0.2)',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: mode === 'light' ? '#A0AEC0' : 'rgba(187, 175, 254, 0.4)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 24px',
                    fontSize: '0.95rem',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: mode === 'light'
                            ? '0 4px 12px rgba(94, 63, 255, 0.2)'
                            : '0 4px 12px rgba(187, 175, 254, 0.2)',
                    },
                },
                contained: {
                    background: mode === 'light'
                        ? 'linear-gradient(135deg, #5E3FFF 0%, #3A20B8 100%)'
                        : 'linear-gradient(135deg, #BBAFFE 0%, #9F8FFF 100%)',
                    color: mode === 'light' ? '#FFFFFF' : '#000628',
                },
                outlined: {
                    borderColor: mode === 'light' ? 'rgba(94, 63, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                        background: mode === 'light' ? 'rgba(94, 63, 255, 0.05)' : 'rgba(187, 175, 254, 0.05)',
                    }
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: '6px',
                },
            },
        },
    },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
export const theme = createAppTheme('dark'); // Default export for backwards compatibility
