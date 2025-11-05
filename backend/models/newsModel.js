import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  source: String,
  publishedAt: String,
  sentiment: String,
  aiSummary: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("News", newsSchema);
