const { GoogleGenerativeAI } = require('@google/generative-ai');
const functions = require('firebase-functions');

const genAI = new GoogleGenerativeAI(functions.config().gemini?.api_key || process.env.GEMINI_API_KEY);

async function chatWithMentor(message, conversationHistory = [], userContext = {}) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Build conversation context
        const historyText = conversationHistory
            .slice(-5) // Keep last 5 messages for context
            .map(msg => `${msg.sender === 'user' ? 'Student' : 'Mentor'}: ${msg.message}`)
            .join('\n');

        const prompt = `You are a friendly, knowledgeable senior engineering mentor helping first-year college students navigate their learning journey.

**Student Context:**
- Selected Domain: ${userContext.selectedDomain || 'Not selected yet'}
- Current Learning Step: ${userContext.currentStep || 'Just starting'}

**Recent Conversation:**
${historyText || 'This is the start of the conversation'}

**Student's New Question:**
${message}

**Your Role:**
1. Provide clear, beginner-friendly explanations
2. Use analogies and real-world examples when explaining complex concepts
3. Be encouraging and supportive
4. Suggest specific resources when helpful (courses, documentation, practice platforms)
5. Ask follow-up questions to deepen understanding
6. Keep responses concise (2-4 paragraphs max)
7. Use markdown formatting for code examples, lists, and emphasis

**Response Guidelines:**
- If asked about a concept: Explain simply with examples
- If asked for resources: Suggest 2-3 high-quality options
- If asked about career: Give realistic, actionable advice
- If asked for debugging help: Guide them through the problem-solving process
- If student seems stuck: Encourage and provide alternative approaches

Respond naturally and conversationally. Format your response in markdown.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiMessage = response.text();

        return {
            response: aiMessage,
            suggestedResources: [], // Could parse links from response
            followUpQuestions: [] // Could generate based on topic
        };
    } catch (error) {
        console.error('Error in chatWithMentor:', error);
        throw error;
    }
}

module.exports = { chatWithMentor };
