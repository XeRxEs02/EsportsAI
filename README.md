# EsportsAI - Advanced Esports Analytics & Intelligence Platform

![EsportsAI Logo](public/placeholder-logo.png)

A comprehensive, AI-powered esports analytics platform that provides real-time insights, tournament tracking, team performance analysis, and intelligent news aggregation for competitive gaming.

## 🌟 Features

### 🏆 Tournament Management
- **Real-time Tournament Tracking**: Live updates on major esports tournaments across all games
- **Prize Pool Monitoring**: Track tournament prize pools and registration status
- **Multi-Game Support**: Valorant, Counter-Strike 2, Dota 2, League of Legends, and PUBG
- **Regional Coverage**: Global and regional tournament data

### 📊 Advanced Analytics Dashboard
- **Team Performance Metrics**: Win rates, rankings, and historical performance data
- **Interactive Charts**: Bar charts, pie charts, and line graphs for data visualization
- **Leaderboards**: Top 10 teams by win rate for each game
- **Viewership Analytics**: Tournament viewership trends and statistics

### 🤖 AI-Powered Intelligence
- **GPT-4o-mini Integration**: Advanced AI analysis of esports trends and news
- **Sentiment Analysis**: Automated sentiment detection from news articles
- **Predictive Insights**: AI-driven predictions and market analysis
- **Custom Query Analysis**: Natural language queries for esports intelligence

### 📰 Smart News Aggregation
- **Multi-Source News Feed**: ESPN Esports, NewsAPI, and custom sources
- **Real-time Updates**: Live news feed with automatic refresh (60-second intervals)
- **AI News Analysis**: Automated summarization and trend identification
- **Sentiment Tracking**: News sentiment analysis and historical data

### 🎯 User Experience
- **Responsive Design**: Mobile-first design with dark theme
- **Intuitive Navigation**: Clean, modern interface with sidebar navigation
- **Real-time Updates**: Live data refresh without page reload
- **Performance Optimized**: Fast loading with efficient data caching

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.0.0 (Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (shadcn/ui)
- **Charts**: Recharts
- **State Management**: SWR (React Hooks for Data Fetching)
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB (Mongoose ODM)
- **AI Integration**: OpenAI GPT-4o-mini
- **External APIs**:
  - NewsAPI (news aggregation)
  - ESPN Esports API (sports data)
  - PandaScore API (planned integration)

### Infrastructure
- **Deployment**: Vercel (frontend), Railway/Heroku (backend)
- **Database Hosting**: MongoDB Atlas
- **Version Control**: Git
- **Package Management**: npm/pnpm

## 📁 Project Structure

```
esportsai/
├── app/                          # Next.js App Router
│   ├── analyze/                  # AI Query Analysis Page
│   ├── dashboard/                # Analytics Dashboard
│   ├── insights/                 # AI Insights History
│   ├── globals.css               # Global Styles
│   ├── layout.tsx                # Root Layout
│   ├── loading.tsx               # Loading UI
│   └── page.tsx                  # Homepage
├── backend/                      # Express.js Backend
│   ├── models/                   # MongoDB Models
│   │   ├── analysisModel.js      # AI Analysis Schema
│   │   └── newsModel.js          # News Article Schema
│   ├── server.js                 # Main Server File
│   ├── package.json              # Backend Dependencies
│   └── .env                      # Environment Variables
├── components/                   # React Components
│   ├── ui/                       # Reusable UI Components
│   ├── chart-tabs.tsx            # Analytics Charts
│   ├── game-section.tsx          # Game-specific Data
│   ├── game-tabs.tsx             # Game Navigation
│   ├── news-card.tsx             # News Article Card
│   ├── sidebar.tsx               # Navigation Sidebar
│   └── stat-card.tsx             # Statistics Card
├── hooks/                        # Custom React Hooks
├── lib/                          # Utility Functions
│   └── utils.ts                  # Helper Functions
├── public/                       # Static Assets
└── styles/                       # Additional Styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- OpenAI API key
- NewsAPI key (optional, fallback available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/esportsai.git
   cd esportsai
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your API keys:
     ```
     OPENAI_API_KEY=your_openai_key
     NEWS_API_KEY=your_newsapi_key
     MONGO_URI=your_mongodb_connection_string
     PORT=5001
     ```

5. **Start the development servers**
   ```bash
   # Terminal 1: Frontend
   npm run dev

   # Terminal 2: Backend
   cd backend && npm start
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## 📊 API Endpoints

### Core Endpoints
- `GET /api/ping` - Health check
- `GET /api/news` - Fetch latest esports news
- `POST /api/ai-analyze-news` - AI-powered news analysis
- `GET /api/games` - Available games data
- `POST /analyze` - Custom AI query analysis
- `GET /api/insights` - AI analysis history

### Data Models

#### News Article Schema
```javascript
{
  title: String,
  description: String,
  url: String,
  source: String,
  publishedAt: String,
  sentiment: String,
  aiSummary: String,
  createdAt: Date
}
```

#### AI Analysis Schema
```javascript
{
  query: String,
  answer: String,
  sentiment: String,
  createdAt: Date
}
```

## 🎮 Supported Games

- **Valorant** - Tactical 5v5 FPS
- **Counter-Strike 2** - Competitive FPS
- **Dota 2** - MOBA (Multiplayer Online Battle Arena)
- **League of Legends** - MOBA
- **PUBG** - Battle Royale

## 🤖 AI Features

### News Analysis
- Automated trend detection
- Sentiment analysis (positive/negative/neutral)
- Impact assessment on teams and games
- Future outlook predictions

### Custom Queries
- Natural language esports queries
- Historical data analysis
- Performance predictions
- Strategic insights

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full dashboard experience
- **Tablet**: Adapted layouts and navigation
- **Mobile**: Touch-friendly interface with collapsible sidebar

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Backend
cd backend
npm start            # Start backend server
npm run dev          # Development mode with auto-restart
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (via ESLint)
- **Tailwind**: Utility-first CSS with consistent design system

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Add environment variables in Vercel dashboard

### Backend (Railway/Heroku)
1. Create a new project on Railway or Heroku
2. Connect your repository
3. Set environment variables
4. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Data Sources**: ESPN Esports, NewsAPI, PandaScore
- **AI Provider**: OpenAI GPT-4o-mini
- **UI Framework**: shadcn/ui components
- **Icons**: Lucide React
- **Charts**: Recharts library

## 📞 Support

For support, email support@esportsai.com or join our Discord community.

---

**EsportsAI** - Transforming esports data into actionable intelligence ⚡
