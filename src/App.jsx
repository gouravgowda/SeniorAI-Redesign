import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import AppNav from './components/Navigation/AppNav';
import Onboarding from './pages/Onboarding';
import DomainQuiz from './pages/DomainQuiz';
import Recommendations from './pages/Recommendations';
import Roadmap from './pages/Roadmap';
import AIMentor from './pages/AIMentor';
import Resources from './pages/Resources';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import SignUp from './pages/SignUp'; // Add import
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Box sx={{ minHeight: '100vh' }}>
          <AppNav />
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> {/* Add route */}
            <Route path="/quiz" element={<DomainQuiz />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/mentor" element={<AIMentor />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
