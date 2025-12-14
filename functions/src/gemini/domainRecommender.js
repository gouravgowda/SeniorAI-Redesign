const { GoogleGenerativeAI } = require('@google/generative-ai');
const functions = require('firebase-functions');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(functions.config().gemini?.api_key || process.env.GEMINI_API_KEY);

async function recommendDomain(quizAnswers) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `You are an expert engineering career counselor with deep knowledge of technical domains and industry trends.

Analyze these student responses from a domain discovery quiz:

${quiz Answers.map((qa, idx) => `${idx + 1}. ${qa.question}\n   Answer: ${qa.answer}`).join('\n\n')
    }

Based on this information, recommend the top 3 technical engineering domains this student should pursue.

For each recommendation, provide:
    1. Domain name
    2. Confidence score(0.0 to 1.0) indicating how well the student's profile matches
    3. Detailed reasoning explaining why this domain suits them
    4. 3 - 5 specific career paths in this domain
    5. Current market demand(Very High, High, Medium, or Low)

    Consider:
    - Student's interests and passion areas
        - Natural strengths and working style
            - Problem - solving approaches
                - Career environment preferences
                    - Current industry trends and job market
                        - Learning curve and prerequisites

Output the recommendations as a JSON array with this exact structure:
    {
        "recommendations": [
            {
                "domain": "string",
                "confidence": number,
                "reasoning": "string",
                "careerPaths": ["string"],
                "marketDemand": "string"
            }
        ]
    }

Ensure recommendations are practical, well - justified, and ranked by confidence score.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const recommendations = JSON.parse(jsonMatch[0]);
      return recommendations;
    }
    
    throw new Error('Failed to parse recommendations from AI response');
  } catch (error) {
    console.error('Error in recommendDomain:', error);
    throw error;
  }
}

module.exports = { recommendDomain };
