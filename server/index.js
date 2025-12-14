require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin
// Note: GOOGLE_APPLICATION_CREDENTIALS env var should point to service account key
// OR it will attempt to use default credentials if running in an environment that supports it
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
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

// --- Routes ---

// Health Check
app.get('/', (req, res) => {
    res.send('SeniorAI Backend is running!');
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

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
