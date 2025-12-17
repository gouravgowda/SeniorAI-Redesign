import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import AppNav from './components/Navigation/AppNav';
import ProtectedRoute from './components/ProtectedRoute';
import Onboarding from './pages/Onboarding';
import DomainQuiz from './pages/DomainQuiz';
import Recommendations from './pages/Recommendations';
import Roadmap from './pages/Roadmap';
import AIMentor from './pages/AIMentor';
import Resources from './pages/Resources';
import Projects from './pages/Projects';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './styles/global.css';

// Component to conditionally render AppNav
const AppContent = () => {
  const location = useLocation();
  const hideNavPaths = ['/login', '/signup'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {showNav && <AppNav />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Onboarding />} />
        <Route path="/quiz" element={<DomainQuiz />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route
          path="/mentor"
          element={
            <ProtectedRoute>
              <AIMentor />
            </ProtectedRoute>
          }
        />
        <Route path="/resources" element={<Resources />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
