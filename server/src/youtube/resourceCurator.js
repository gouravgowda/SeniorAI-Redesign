const admin = require('firebase-admin');

async function getResources(domainId) {
    try {
        const db = admin.firestore();

        // Fetch resources from Firestore
        const resourcesRef = db.collection('resources');
        const snapshot = await resourcesRef.where('domainId', '==', domainId).get();

        if (snapshot.empty) {
            console.log(`No resources found in Firestore for domain: ${domainId}. Returning popular curated resources.`);
            return getCuratedResources(domainId);
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

        // If we have very few videos from DB, mix in some curated ones
        if (resources.videos.length < 3) {
            const curated = getCuratedResources(domainId);
            // Add curated videos that aren't duplicates (simple check by title)
            curated.videos.forEach(v => {
                if (!resources.videos.some(rv => rv.title === v.title)) {
                    resources.videos.push(v);
                }
            });
        }

        return resources;
    } catch (error) {
        console.error('Error in getResources:', error);
        // Fallback to curated even on error
        return getCuratedResources(domainId);
    }
}

function getCuratedResources(domainId) {
    // Normalize domainId
    const id = domainId.toLowerCase().replace(/-/g, ' ').replace(/_/g, ' ');

    // Default resources (Web Dev / General)
    let resources = {
        videos: [
            {
                title: 'Harvard CS50 - Introduction to Computer Science',
                url: 'https://www.youtube.com/watch?v=8hly31xKli0',
                source: 'Harvard University',
                duration: '24 hours',
                type: 'video',
                tags: ['CS Basics', 'Beginner']
            }
        ],
        articles: [
            {
                title: 'Roadmap.sh - Developer Roadmaps',
                url: 'https://roadmap.sh',
                source: 'Roadmap.sh',
                type: 'article',
                tags: ['Career Path']
            }
        ],
        documentation: [],
        tools: []
    };

    if (id.includes('web') || id.includes('frontend') || id.includes('full stack')) {
        resources.videos = [
            {
                title: 'HTML & CSS Full Course - Beginner to Pro',
                url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc',
                source: 'SuperSimpleDev',
                duration: '6.5 hours',
                type: 'video',
                tags: ['HTML', 'CSS', 'Beginner']
            },
            {
                title: 'JavaScript Mastery Complete Course',
                url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
                source: 'freeCodeCamp',
                duration: '3 hours',
                type: 'video',
                tags: ['JavaScript', 'Basics']
            },
            {
                title: 'React JS - React Tutorial for Beginners',
                url: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
                source: 'Programming with Mosh',
                duration: '2.5 hours',
                type: 'video',
                tags: ['React', 'Frontend']
            },
            {
                title: 'Next.js 14 Full Course 2024',
                url: 'https://www.youtube.com/watch?v=ZVnjOPwW4ZA',
                source: 'JavaScript Mastery',
                duration: '5 hours',
                type: 'video',
                tags: ['Next.js', 'Advanced']
            }
        ];
        resources.articles = [
            {
                title: 'MDN Web Docs',
                url: 'https://developer.mozilla.org/',
                source: 'Mozilla',
                type: 'documentation',
                tags: ['Reference']
            },
            {
                title: 'W3Schools Web Tutorials',
                url: 'https://www.w3schools.com/',
                source: 'W3Schools',
                type: 'article',
                tags: ['Tutorials']
            }
        ];
        resources.tools = [
            { title: 'VS Code', url: 'https://code.visualstudio.com/', description: 'Best Code Editor', type: 'tool', tags: ['Editor'] },
            { title: 'Chrome DevTools', url: 'https://developer.chrome.com/docs/devtools/', description: 'Browser Debugging', type: 'tool', tags: ['Debug'] }
        ];
    } else if (id.includes('ai') || id.includes('machine learning') || id.includes('data')) {
        resources.videos = [
            {
                title: 'Machine Learning for Everybody – Full Course',
                url: 'https://www.youtube.com/watch?v=i_LwzRVP7bg',
                source: 'freeCodeCamp',
                duration: '4 hours',
                type: 'video',
                tags: ['ML', 'Python']
            },
            {
                title: 'Neural Networks from Scratch',
                url: 'https://www.youtube.com/watch?v=Wo5dMEP_BbI',
                source: 'Sentdex',
                duration: 'Playlist',
                type: 'video',
                tags: ['Deep Learning', 'Advanced']
            },
            {
                title: 'Python for Data Science - Course for Beginners',
                url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
                source: 'freeCodeCamp',
                duration: '12 hours',
                type: 'video',
                tags: ['Data Science', 'Python']
            },
            {
                title: 'Stanford CS229: Machine Learning',
                url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I',
                source: 'Stanford Online',
                duration: 'Playlist',
                type: 'video',
                tags: ['Academic', 'Theory']
            }
        ];
        resources.tools = [
            { title: 'Google Colab', url: 'https://colab.research.google.com/', description: 'Cloud Jupyter Notebooks', type: 'tool', tags: ['ML'] },
            { title: 'Kaggle', url: 'https://www.kaggle.com/', description: 'Datasets & Competitions', type: 'tool', tags: ['Data'] }
        ];
    } else if (id.includes('mobile') || id.includes('android') || id.includes('ios') || id.includes('app')) {
        resources.videos = [
            {
                title: 'Flutter Course for Beginners',
                url: 'https://www.youtube.com/watch?v=VPvVD8t02U8',
                source: 'freeCodeCamp',
                duration: '37 hours',
                type: 'video',
                tags: ['Flutter', 'Cross-Platform']
            },
            {
                title: 'Android Development for Beginners',
                url: 'https://www.youtube.com/watch?v=fis26HvvDII',
                source: 'freeCodeCamp',
                duration: '11 hours',
                type: 'video',
                tags: ['Android', 'Kotlin']
            },
            {
                title: 'React Native Tutorial for Beginners',
                url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
                source: 'Programming with Mosh',
                duration: '2 hours',
                type: 'video',
                tags: ['React Native']
            }
        ];
    }

    return resources;
}

module.exports = { getResources };
