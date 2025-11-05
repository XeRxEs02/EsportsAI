import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  query: { type: String, required: true },
  answer: { type: String, required: true },
  sentiment: { type: String, default: "neutral" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Analysis", analysisSchema);
