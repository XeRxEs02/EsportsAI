import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import OpenAI from "openai";
import cors from "cors";
import axios from "axios";
import Analysis from "./models/analysisModel.js";
import News from "./models/newsModel.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());

// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL || 'https://esportsai.vercel.app'
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Connect to MongoDB
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
console.log("✅ Connected to MongoDB");

const db = client.db("esports");
const collection = db.collection("players");

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'EsportsAI Backend API' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Ping endpoint for connectivity testing
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

// ======================================
// 🧠 AI-Powered Endpoint
// ======================================
app.post("/analyze", async (req, res) => {
  try {
    const { query } = req.body;

    // Fetch sample data from the esports database
    const players = await collection.find({}).limit(5).toArray();

    // Generate AI analysis using OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert esports data analyst. IMPORTANT: Respond ONLY in plain text. Do NOT use ANY markdown formatting whatsoever - no **bold**, no ## headers, no *italics*, no ---, no lists with -, no numbered lists with numbers. Just write normal paragraphs and sentences like regular text. Keep responses clear and readable.",
        },
        {
          role: "user",
          content: `Database: ${JSON.stringify(players)}\n\nQuestion: ${query}`,
        },
      ],
    });

    const aiResponse = response.choices[0].message.content;

    // Save AI analysis to MongoDB
    try {
      const analysisCollection = db.collection("analyses");
      await analysisCollection.insertOne({
        query,
        answer: aiResponse,
        sentiment: "pending",
        createdAt: new Date()
      });
      console.log("🗄️ Saved AI analysis to MongoDB");
    } catch (dbError) {
      console.error('MongoDB save error:', dbError.message);
      // Don't fail the request if DB save fails
    }

    res.json({ success: true, answer: aiResponse });
  } catch (error) {
    console.error("❌ Error in /analyze:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// AI-powered news analysis endpoint
app.post('/api/ai-analyze-news', async (req, res) => {
  try {
    const { articles } = req.body;

    if (!articles || !Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({ error: 'Articles array is required' });
    }

    // Create a comprehensive prompt for AI analysis
    const articleTitles = articles.map((article, index) =>
      `${index + 1}. ${article.title || 'Untitled'}`
    ).join('\n');

    const articleDescriptions = articles.map((article, index) =>
      `${index + 1}. ${article.description || 'No description'}`
    ).join('\n\n');

    const prompt = `You are an esports industry analyst. Analyze these recent esports news articles and provide insights in plain text without using any markdown formatting like **, ##, or special characters.

ARTICLES:
${articleTitles}

DETAILED CONTENT:
${articleDescriptions}

Please provide:
1. Top Trends: Identify the 3-5 most significant trends or themes emerging from these articles
2. Sentiment Analysis: Overall sentiment (positive/negative/neutral) and key emotional drivers
3. Impact Assessment: Which games/teams/players are most affected by current news
4. Future Outlook: What these trends suggest about the esports landscape in the coming weeks
5. Key Takeaways: 2-3 actionable insights for esports enthusiasts or professionals

Keep your analysis concise but insightful, focusing on data-driven observations. Respond in plain text only.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const analysis = response.choices[0].message.content;

    // Save AI-analyzed news to MongoDB
    try {
      // Extract sentiment from analysis (simple approach)
      const sentiment = analysis.toLowerCase().includes('positive') ? 'positive' :
                       analysis.toLowerCase().includes('negative') ? 'negative' : 'neutral';

      // Save each analyzed article
      for (const article of articles) {
        const newsItem = new News({
          title: article.title,
          description: article.description,
          url: article.url,
          source: article.source?.name || article.source || 'Unknown',
          publishedAt: article.publishedAt,
          sentiment: sentiment,
          aiSummary: analysis,
        });

        await newsItem.save();
      }

      console.log(`🗄️ Saved ${articles.length} AI-analyzed news articles to MongoDB`);
    } catch (dbError) {
      console.error('MongoDB save error:', dbError.message);
      // Don't fail the request if DB save fails
    }

    res.json({
      success: true,
      analysis: analysis,
      timestamp: new Date().toISOString(),
      articlesAnalyzed: articles.length
    });

  } catch (error) {
    console.error('AI Analysis error:', error.message);

    // Provide fallback analysis if AI fails
    const fallbackAnalysis = `## AI Analysis Unavailable

I'm currently unable to provide AI-powered analysis due to a technical issue. However, based on the ${req.body?.articles?.length || 0} articles loaded:

### Manual Observations:
- **Trend Detection**: Multiple gaming and esports stories are currently trending
- **Content Focus**: Articles cover competitive gaming, industry developments, and player/team updates
- **Sources**: Content from various gaming news outlets and platforms

Please try again in a few moments. The live news feed continues to update automatically.`;

    res.status(500).json({
      success: false,
      error: "AI analysis failed",
      fallbackAnalysis: fallbackAnalysis,
      timestamp: new Date().toISOString()
    });
  }
});

// News history endpoint - retrieve AI-analyzed articles from MongoDB
app.get('/api/news/history', async (req, res) => {
  try {
    const history = await News.find().sort({ createdAt: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    console.error('News history fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch news history' });
  }
});

// AI Insights: Sentiment Analysis
app.get('/api/insights/sentiment', async (req, res) => {
  try {
    const stats = await News.aggregate([
      { $group: { _id: "$sentiment", count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    console.error('Sentiment analysis error:', err.message);
    res.status(500).json({ error: 'Failed to fetch sentiment data' });
  }
});

// AI Insights: Trending Topics/Sources
app.get('/api/insights/trends', async (req, res) => {
  try {
    const trends = await News.aggregate([
      { $group: { _id: "$source", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    res.json(trends);
  } catch (err) {
    console.error('Trends analysis error:', err.message);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
});

// AI Insights: Analysis History
app.get('/api/insights', async (req, res) => {
  try {
    const analysisCollection = db.collection("analyses");
    const insights = await analysisCollection.find({}).sort({ createdAt: -1 }).limit(10).toArray();
    res.json({ success: true, insights });
  } catch (error) {
    console.error('Insights fetch error:', error.message);
    res.status(500).json({ success: false, error: "Failed to fetch insights" });
  }
});

// Placeholder routes for esports data
app.get('/api/games', async (req, res) => {
  try {
    // Placeholder for PandaScore API integration
    res.json({
      games: [
        { id: 1, name: 'League of Legends', slug: 'lol' },
        { id: 2, name: 'Counter-Strike 2', slug: 'cs2' },
        { id: 3, name: 'Valorant', slug: 'valorant' },
        { id: 4, name: 'Dota 2', slug: 'dota2' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

app.get('/api/news', async (req, res) => {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  try {
    // Use NewsAPI directly (ESPN API requires authentication and may not be publicly available)
    if (NEWS_API_KEY) {
      const newsApiUrl = `https://newsapi.org/v2/everything?q=esports+OR+gaming+OR+"league+of+legends"+OR+"counter+strike"+OR+valorant+OR+"dota+2"&sortBy=publishedAt&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`;

      console.log('Fetching news from NewsAPI...');
      const newsResponse = await axios.get(newsApiUrl, {
        timeout: 10000
      });

      if (newsResponse.data && newsResponse.data.articles && newsResponse.data.articles.length > 0) {
        const articles = newsResponse.data.articles.map((article, index) => ({
          id: index + 1,
          title: article.title || 'No title available',
          description: article.description || article.title || 'No description available',
          source: article.source?.name || 'Unknown',
          url: article.url || '#',
          image: article.urlToImage || null,
          publishedAt: article.publishedAt || new Date().toISOString()
        }));

        console.log(`✅ Successfully fetched ${articles.length} news articles`);
        return res.json({ news: articles });
      } else {
        console.log('NewsAPI returned no articles');
      }
    } else {
      console.log('NewsAPI key not configured');
    }
  } catch (error) {
    console.error('News API error:', error.message);
  }

  // If API fails or no key, return placeholder data
  console.log('News API failed, returning placeholder data');
  res.json({
    news: [
      {
        id: 1,
        title: 'Live Esports News Feed',
        description: 'Real-time esports news updates will appear here. NewsAPI key is configured but API call failed.',
        source: 'EsportsAI',
        url: '#',
        image: null,
        publishedAt: new Date().toISOString()
      }
    ]
  });
});

// ======================================
// 🌐 Server Initialization
// ======================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 EsportsAI Backend running on http://localhost:${PORT}`);
});
