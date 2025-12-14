const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function suggestProjects(domain, level = 'Beginner') {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `You are an expert engineering mentor helping students build strong project portfolios.

Generate project ideas for:
- Domain: ${domain}
- Difficulty Level: ${level}

Provide 5 project ideas suitable for this level.

For each project, include:
1. **title**: Clear, descriptive project name
2. **description**: 2-3 sentences explaining what the project does
3. **skills**: Array of 3-5 technologies/skills used
4. **estimatedTime**: Realistic completion time
5. **difficulty**: Confirm the level (Beginner/Intermediate/Advanced)
6. **githubTips**: 2-3 tips for presenting this project on GitHub (README structure, what to highlight, etc.)

Also provide:
- **portfolioAdvice**: General advice for building a strong portfolio in this domain
  - mustHaveProjects: Number of projects to have
  - recommendedTechnologies: Array of key technologies to showcase
  - githubProfileTips: Array of 3-5 tips for the overall GitHub profile
  - resumeHighlights: Array of 3-5 points to emphasize on resume

Output as JSON:
{
  "projects": [
    {
      "title": "string",
      "description": "string",
      "skills": ["string"],
      "estimatedTime": "string",
      "difficulty": "string",
      "githubTips": ["string"]
    }
  ],
  "portfolioAdvice": {
    "mustHaveProjects": number,
    "recommendedTechnologies": ["string"],
    "githubProfileTips": ["string"],
    "resumeHighlights": ["string"]
  }
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const suggestions = JSON.parse(jsonMatch[0]);
            return suggestions;
        }

        throw new Error('Failed to parse project suggestions from AI response');
    } catch (error) {
        console.error('Error in suggestProjects:', error);
        throw error;
    }
}

module.exports = { suggestProjects };
