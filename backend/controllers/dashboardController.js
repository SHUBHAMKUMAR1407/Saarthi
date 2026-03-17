import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/User.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getIndustryInsights = async (req, res) => {
    try {
        const { auth } = req;
        let { industry } = req.query;

        // If industry not provided, get it from user profile
        if (!industry) {
            const user = await User.findOne({ clerkUserId: auth.userId });
            if (!user || (!user.industry && !user.subIndustry)) {
                return res.status(400).json({ error: "No primary industry found in profile." });
            }
            // Prefer subIndustry if it's more specific, or join them
            industry = user.industry || user.subIndustry;
        }

        // Clean up industry string (remove trailing hyphens, etc.)
        industry = industry.replace(/-+$/, "").trim();
        const displayIndustry = industry.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");


        const prompt = `
          Analyze the current state of the ${displayIndustry} industry (${industry}) in 2024 and provide detailed professional insights.
          Return ONLY a JSON object with the following structure:
          {
            "marketOutlook": "Positive", "Neutral", or "Negative",
            "growthRate": number (e.g., 5.5),
            "demandLevel": "High", "Medium", or "Low",
            "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
            "salaryRanges": [
              { "role": "Junior Role", "min": number, "max": number, "median": number },
              { "role": "Mid-Level Role", "min": number, "max": number, "median": number },
              { "role": "Senior Role", "min": number, "max": number, "median": number },
              { "role": "Lead/Specialist Role", "min": number, "max": number, "median": number }
            ],
            "keyTrends": ["trend1", "trend2", "trend3"],
            "recommendedSkills": ["skill1", "skill2", "skill3"],
            "lastUpdated": "${new Date().toISOString()}",
            "nextUpdate": "${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()}"
          }

          Ensure the salary ranges are realistic for global standards in USD (yearly).
          The growthRate should be a percentage between -10 and 30.
          Return ONLY the JSON object, NO markdown markdown code blocks, NO extra text.
        `;


        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Basic cleanup and parsing
        const cleanedText = text.replace(/```json|```/g, "").trim();
        const insights = JSON.parse(cleanedText);

        res.json({ insights });
    } catch (error) {
        console.error("Error fetching industry insights:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

