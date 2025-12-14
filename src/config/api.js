const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Helper to make API requests
 * @param {string} endpoint - The API endpoint (e.g., '/mentor/chat')
 * @param {object} options - Fetch options (method, body, etc.)
 */
export async function apiRequest(endpoint, options = {}) {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
    }
}

export const API_ENDPOINTS = {
    MENTOR_CHAT: '/mentor/chat',
    GENERATE_ROADMAP: '/roadmap/generate',
    RECOMMEND_DOMAIN: '/domain/recommend',
    SUGGEST_PROJECTS: '/projects/suggest',
    GET_RESOURCES: '/resources',
    SAVE_PROGRESS: '/user/progress'
};
