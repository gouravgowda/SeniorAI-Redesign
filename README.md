# 🎓 PathFinder - AI-Powered Engineering Domain Guidance Platform

An intelligent web application that helps first-year engineering students discover their perfect technical domain and provides structured learning roadmaps powered by Google Gemini AI.

## ✨ Features

### 🤖 AI-Powered Recommendations
- **Smart Domain Quiz**: 7 carefully crafted questions analyzing interests, strengths, and goals
- **Gemini AI Analysis**: Advanced AI analyzes responses to recommend top 3 technical domains
- **Confidence Scoring**: Each recommendation includes confidence percentage and detailed reasoning
- **Career Insights**: Specific career paths and market demand for each domain

### 🗺️ Personalized Learning Roadmaps
- **Structured Progression**: Beginner → Intermediate → Advanced learning paths
- **Detailed Steps**: Each step includes skills, resources, estimated time, and practical tasks
- **Progress Tracking**: Visual progress indicators with circular and linear charts
- **Resource Integration**: Curated YouTube videos, articles, documentation, and tools

### 💬 AI Mentor Chat
- **24/7 Intelligent Assistant**: Powered by Gemini AI for context-aware responses
- **Beginner-Friendly**: Explains complex concepts with analogies and examples
- **Real-time Help**: Debug errors, clarify concepts, get career advice
- **Conversation History**: Maintains context across multiple messages

### 📚 Curated Resources
- **Organized Library**: Videos, articles, documentation, and development tools
- **Filter by Type**: Easy filtering and categorization
- **Quality Content**: Hand-picked resources for each domain

### 💡 Project Portfolio Builder
- **Level-based Projects**: Beginner, intermediate, and advanced project ideas
- **GitHub Tips**: Guidance on building a strong portfolio
- **Skill Mapping**: Projects mapped to specific technologies and skills

### 🎨 Modern UI/UX
- **Material You Design**: Beautiful, modern interface with glassmorphism effects
- **Light/Dark Mode**: Theme toggle with localStorage persistence
- **Smooth Animations**: Framer Motion powered transitions
- **Fully Responsive**: Seamless experience on mobile, tablet, and desktop

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library with Material You design
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering for AI responses

### Backend
- **Firebase Cloud Functions** - Serverless backend
- **Google Gemini AI** - AI recommendations and chat
- **Firebase Firestore** - NoSQL database
- **Firebase Hosting** - Static site hosting
- **Firebase Storage** - File storage

### APIs
- **Gemini API** - AI-powered recommendations, roadmaps, and chat
- **YouTube Data API** - Resource curation (optional)

##  📁 Project Structure

```
engineering-guidance-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation/      # App navigation (desktop + mobile)
│   │   ├── Cards/           # Glassmorphism cards
│   │   ├── Chat/            # Chat bubble components
│   │   ├── Progress/        # Progress trackers
│   │   └── Quiz/            # Quiz question cards
│   ├── pages/               # Main application screens
│   │   ├── Onboarding.jsx   # Welcome page
│   │   ├── DomainQuiz.jsx   # Domain discovery quiz
│   │   ├── Recommendations.jsx  # AI recommendations
│   │   ├── Roadmap.jsx      # Learning roadmap viewer
│   │   ├── AIMentor.jsx     # AI chat interface
│   │   ├── Resources.jsx    # Resource library
│   │   └── Projects.jsx     # Project ideas
│   ├── context/             # React context providers
│   │   └── ThemeContext.jsx # Theme management
│   ├── styles/              # Global styles and theme
│   │   ├── theme.js         # Material-UI theme config
│   │   └── global.css       # Global CSS styles
│   ├── config/              # Configuration files
│   │   └── firebase.js      # Firebase initialization
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # React entry point
├── functions/               # Firebase Cloud Functions
│   ├── src/
│   │   ├── gemini/          # Gemini AI integrations
│   │   │   ├── domainRecommender.js
│   │   │   ├── roadmapGenerator.js
│   │   │   ├── aiMentor.js
│   │   │   └── projectSuggester.js
│   │   ├── youtube/         # Resource curation
│   │   │   └── resourceCurator.js
│   │   └── user/            # User management
│   │       └── progressManager.js
│   ├── index.js             # Functions entry point
│   └── package.json         # Functions dependencies
├── firebase.json            # Firebase configuration
├── firestore.rules          # Database security rules
├── .env.example             # Environment variables template
└── package.json             # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase CLI: `npm install -g firebase-tools`
- Google Cloud account with Gemini API access

### 1. Clone Repository
```bash
git clone <repository-url>
cd engineering-guidance-platform
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install Cloud Functions dependencies
cd functions
npm install
cd ..
```

### 3. Firebase Setup
```bash
# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Select:
# - Firestore
# - Functions
# - Hosting
```

### 4. Environment Configuration

Create `.env` file in root:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

Configure Firebase Functions environment variables:
```bash
firebase functions:config:set gemini.api_key="your_gemini_api_key"
firebase functions:config:set youtube.api_key="your_youtube_api_key"
```

### 5. Run Locally

**Frontend:**
```bash
npm run dev
# Opens at http://localhost:5173
```

**Firebase Emulators:**
```bash
firebase emulators:start
# Functions at http://localhost:5001
# Firestore UI at http://localhost:4000
```

## 📦 Deployment

### Deploy Everything
```bash
npm run build
firebase deploy
```

### Deploy Specific Services
```bash
# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting

# Deploy firestore rules
firebase deploy --only firestore:rules
```

## 🔑 API Endpoints

Base URL (Production): `https://us-central1-your-project.cloudfunctions.net`

### POST `/recommendDomain`
Analyzes quiz responses and returns domain recommendations.

**Request:**
```json
{
  "answers": [
    { "question": "...", "answer": "..." }
  ]
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "domain": "AI & Machine Learning",
      "confidence": 0.92,
      "reasoning": "...",
      "careerPaths": ["ML Engineer", "Data Scientist"],
      "marketDemand": "Very High"
    }
  ]
}
```

### POST `/generateRoadmap`
Generates learning roadmap for a domain.

**Request:**
```json
{
  "domain": "Web Development",
  "studentLevel": "Beginner"
}
```

### POST `/mentorChat`
AI mentor chat endpoint.

**Request:**
```json
{
  "userId": "user123",
  "message": "What is React?",
  "conversationHistory": [],
  "userContext": { "selectedDomain": "Web Development" }
}
```

### POST `/saveProgress`
Saves user progress for roadmap steps.

**Request:**
```json
{
  "userId": "user123",
  "stepId": "step_1",
  "completed": true
}
```

## 🎨 Customization

### Theme Colors
Edit `src/styles/theme.js` to customize Material You colors for light and dark modes.

### Quiz Questions
Modify questions in `src/pages/DomainQuiz.jsx` to change the domain discovery quiz.

### Domains
Add new domains by updating the Gemini AI prompts in `functions/src/gemini/`.

## 📊 Firestore Collections

### `users`
```javascript
{
  userId: string,
  name: string,
  email: string,
  selectedDomain: string,
  progress: { [stepId]: boolean },
  createdAt: timestamp
}
```

### `domains`
```javascript
{
  domainId: string,
  name: string,
  roadmap: [...],
  projects: { beginner: [...], intermediate: [...], advanced: [...] }
}
```

### `chats`
```javascript
{
  chatId: string,
  userId: string,
  messages: [{ sender, text, timestamp }]
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent recommendations
- Material-UI for beautiful components
- Firebase for robust backend infrastructure
- Framer Motion for smooth animations

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ for engineering students worldwide**
