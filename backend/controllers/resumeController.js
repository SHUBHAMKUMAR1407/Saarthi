import Resume from '../models/Resume.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getResume = async (req, res) => {
    try {
        const { auth } = req;
        const resume = await Resume.findOne({ userId: auth.userId });
        res.json(resume);
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const saveResume = async (req, res) => {
    try {
        const { auth } = req;
        const resumeData = req.body;

        const resume = await Resume.findOneAndUpdate(
            { userId: auth.userId },
            { ...resumeData, userId: auth.userId },
            { new: true, upsert: true }
        );

        res.json(resume);
    } catch (error) {
        console.error("Error saving resume:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const improveWithAI = async (req, res) => {
    try {
        const { auth } = req;
        const { type, currentContent } = req.body;

        const prompt = `Improve the following ${type} content for a professional resume: "${currentContent}". Provide a more impactful and concise version.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedContent = response.text();

        res.json({ improvedContent });
    } catch (error) {
        console.error("Error improving with AI:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
