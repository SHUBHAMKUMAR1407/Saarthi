import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getIndustryInsights = async (req, res) => {
    try {
        const { industry } = req.query;
        if (!industry) {
            return res.status(400).json({ error: "Industry is required" });
        }

        const prompt = `Provide 3 key industry insights for ${industry} in 2024. Return as a JSON array of strings.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Basic cleanup and parsing
        const cleanedText = text.replace(/```json|```/g, "").trim();
        const insights = JSON.parse(cleanedText);

        res.json(insights);
    } catch (error) {
        console.error("Error fetching industry insights:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
