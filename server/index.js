require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin
// Note: GOOGLE_APPLICATION_CREDENTIALS env var should point to service account key
// OR it will attempt to use default credentials if running in an environment that supports it
if (!admin.apps.length) {
    try {
        // Check if we have explicit credentials from Environment Variables (Vercel)
        if (process.env.FIREBASE_PRIVATE_KEY) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    // Handle escaped newlines in private key
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                })
            });
            console.log('Firebase initialized with Environment Variables');
        } else {
            // Fallback to default (Google Cloud / Local with credentials file)
            admin.initializeApp({
                credential: admin.credential.applicationDefault()
            });
            console.log('Firebase initialized with Application Default Credentials');
        }
    } catch (error) {
        console.error('Firebase Initialization Error:', error);
    }
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Logic
const { chatWithMentor } = require('./src/gemini/aiMentor');
const { generateRoadmap } = require('./src/gemini/roadmapGenerator');
const { recommendDomain } = require('./src/gemini/domainRecommender');
const { suggestProjects } = require('./src/gemini/projectSuggester');
const { getResources } = require('./src/youtube/resourceCurator');
const { saveProgress } = require('./src/user/progressManager');
const {
    addPoints,
    getUserPoints,
    getLeaderboard,
    getUserRank,
    getUserActivities
} = require('./src/user/pointsManager');

// --- Routes ---

// Health Check
app.get('/', (req, res) => {
    res.send('SeniorAI Backend is running!');
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is healthy' });
});

// AI Mentor Chat
app.post('/api/mentor/chat', async (req, res) => {
    try {
        const { message, history, context } = req.body;
        const response = await chatWithMentor(message, history, context);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Generate Roadmap
app.post('/api/roadmap/generate', async (req, res) => {
    try {
        const { domain, level } = req.body;
        const roadmap = await generateRoadmap(domain, level);
        res.json(roadmap);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Recommend Domain
app.post('/api/domain/recommend', async (req, res) => {
    try {
        const { quizAnswers } = req.body;
        const recommendations = await recommendDomain(quizAnswers);
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Suggest Projects
app.post('/api/projects/suggest', async (req, res) => {
    try {
        const { domain, level } = req.body;
        const suggestions = await suggestProjects(domain, level);
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Resources
app.get('/api/resources/:domainId', async (req, res) => {
    try {
        const { domainId } = req.params;
        const resources = await getResources(domainId);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Save Progress
app.post('/api/user/progress', async (req, res) => {
    try {
        const { userId, stepId, completed } = req.body;
        const result = await saveProgress(userId, stepId, completed);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Gamification Endpoints ---

// Add Points
app.post('/api/user/points', async (req, res) => {
    try {
        const { userId, activity, customAmount } = req.body;
        const result = await addPoints(userId, activity, customAmount);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User Points
app.get('/api/user/:userId/points', async (req, res) => {
    try {
        const { userId } = req.params;
        const pointsData = await getUserPoints(userId);
        res.json(pointsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Leaderboard
app.get('/api/leaderboard', async (req, res) => {
    try {
        const { timeframe = 'all', limit = 100 } = req.query;
        const leaderboard = await getLeaderboard(timeframe, parseInt(limit));
        res.json({ leaderboard });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User Rank
app.get('/api/user/:userId/rank', async (req, res) => {
    try {
        const { userId } = req.params;
        const rankData = await getUserRank(userId);
        res.json(rankData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User Activities
app.get('/api/user/:userId/activities', async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 10 } = req.query;
        const activities = await getUserActivities(userId, parseInt(limit));
        res.json({ activities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server only if running directly (not in Vercel)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
