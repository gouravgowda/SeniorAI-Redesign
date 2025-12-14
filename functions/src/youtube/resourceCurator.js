const admin = require('firebase-admin');

async function getResources(domainId) {
    try {
        const db = admin.firestore();

        // Fetch resources from Firestore
        const resourcesRef = db.collection('resources');
        const snapshot = await resourcesRef.where('domainId', '==', domainId).get();

        if (snapshot.empty) {
            // Return empty array if no resources found
            // In production, this could trigger YouTube API call to fetch and cache resources
            console.log(`No resources found for domain: ${domainId}`);
            return {
                videos: [],
                articles: [],
                documentation: [],
                tools: []
            };
        }

        const resources = {
            videos: [],
            articles: [],
            documentation: [],
            tools: []
        };

        snapshot.forEach(doc => {
            const resource = { id: doc.id, ...doc.data() };
            const type = resource.type.toLowerCase();

            if (type === 'video' || type === 'playlist') {
                resources.videos.push(resource);
            } else if (type === 'article' || type === 'blog') {
                resources.articles.push(resource);
            } else if (type === 'documentation' || type === 'docs') {
                resources.documentation.push(resource);
            } else if (type === 'tool' || type === 'software') {
                resources.tools.push(resource);
            }
        });

        return resources;
    } catch (error) {
        console.error('Error in getResources:', error);
        throw error;
    }
}

// TODO: Implement YouTube Data API integration
async function fetchYouTubeResources(domain) {
    // This would use YouTube Data API to search for relevant playlists and videos
    // For now, returning empty array
    return [];
}

module.exports = { getResources, fetchYouTubeResources };
