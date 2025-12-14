const { GoogleGenerativeAI } = require('@google/generative-ai');
const functions = require('firebase-functions');

const genAI = new GoogleGenerativeAI(functions.config().gemini?.api_key || process.env.GEMINI_API_KEY);

async function generateRoadmap(domain, studentLevel = 'Beginner') {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `You are an expert engineering educator creating comprehensive learning roadmaps.

Create a detailed, structured learning roadmap for: ${domain}

Student Starting Level: ${studentLevel}

Generate a complete roadmap from Beginner → Intermediate → Advanced with 8-12 steps total.

For each step, provide:
1. **id**: Unique identifier (e.g., "step_1", "step_2")
2. **title**: Clear, specific topic name
3. **level**: "Beginner", "Intermediate", or "Advanced"
4. **description**: 2-3 sentences explaining what the student will learn
5. **skills**: Array of 3-5 specific skills/topics to master
6. **estimatedTime**: Realistic time estimate (e.g., "2-3 weeks", "1 month")
7. **resources**: Array of 3-5 learning resources with:
   - type: "video", "article", "course", "book", or "practice"
   - title: Resource name
   - url: Actual URL or "#" if placeholder
   - source: Platform name (YouTube, Coursera, etc.)
8. **practicalTasks**: Array of 2-4 hands-on projects/exercises

Ensure:
- Logical progression with each step building on previous knowledge
- Variety in resource types (videos, articles, documentation, practice)
- Specific, actionable practical tasks
- Realistic time estimates
- Industry-relevant skills

Output as JSON:
{
  "roadmap": [
    {
      "id": "string",
      "title": "string",
      "level": "string",
      "description": "string",
      "skills": ["string"],
      "estimatedTime": "string",
      "resources": [
        {
          "type": "string",
          "title": "string",
          "url": "string",
          "source": "string"
        }
      ],
      "practicalTasks": ["string"]
    }
  ],
  "totalEstimatedTime": "string",
  "prerequisites": ["string"]
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const roadmap = JSON.parse(jsonMatch[0]);
            return roadmap;
        }

        throw new Error('Failed to parse roadmap from AI response');
    } catch (error) {
        console.error('Error in generateRoadmap:', error);
        throw error;
    }
}

module.exports = { generateRoadmap };
