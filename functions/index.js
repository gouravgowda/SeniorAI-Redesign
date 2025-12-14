const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Import function modules
const { recommendDomain } = require('./src/gemini/domainRecommender');
const { generateRoadmap } = require('./src/gemini/roadmapGenerator');
const { chatWithMentor } = require('./src/gemini/aiMentor');
const { suggestProjects } = require('./src/gemini/projectSuggester');
const { getResources } = require('./src/youtube/resourceCurator');
const { saveProgress } = require('./src/user/progressManager');

// Domain Recommendation Endpoint
exports.recommendDomain = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const { answers } = req.body;
            const recommendations = await recommendDomain(answers);
            res.status(200).json(recommendations);
        } catch (error) {
            console.error('Error in recommendDomain:', error);
            res.status(500).json({ error: 'Failed to generate recommendations' });
        }
    });
});

// Roadmap Generation Endpoint
exports.generateRoadmap = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const { domain, studentLevel } = req.body;
            const roadmap = await generateRoadmap(domain, studentLevel);
            res.status(200).json(roadmap);
        } catch (error) {
            console.error('Error in generateRoadmap:', error);
            res.status(500).json({ error: 'Failed to generate roadmap' });
        }
    });
});

// AI Mentor Chat Endpoint
exports.mentorChat = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const { userId, message, conversationHistory, userContext } = req.body;
            const response = await chatWithMentor(message, conversationHistory, userContext);
            res.status(200).json(response);
        } catch (error) {
            console.error('Error in mentorChat:', error);
            res.status(500).json({ error: 'Failed to get AI response' });
        }
    });
});

// Project Suggestions Endpoint
exports.suggestProjects = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const { domain, level } = req.body;
            const projects = await suggestProjects(domain, level);
            res.status(200).json(projects);
        } catch (error) {
            console.error('Error in suggestProjects:', error);
            res.status(500).json({ error: 'Failed to suggest projects' });
        }
    });
});

// Resources Endpoint
exports.getResources = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'GET') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const domainId = req.query.domainId;
            const resources = await getResources(domainId);
            res.status(200).json(resources);
        } catch (error) {
            console.error('Error in getResources:', error);
            res.status(500).json({ error: 'Failed to fetch resources' });
        }
    });
});

// Save Progress Endpoint
exports.saveProgress = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const { userId, stepId, completed } = req.body;
            const result = await saveProgress(userId, stepId, completed);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error in saveProgress:', error);
            res.status(500).json({ error: 'Failed to save progress' });
        }
    });
});
