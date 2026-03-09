import Assessment from '../models/Assessment.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getAssessments = async (req, res) => {
    try {
        const { auth } = req;
        const assessments = await Assessment.find({ userId: auth.userId }).sort({ createdAt: -1 });
        res.json(assessments);
    } catch (error) {
        console.error("Error fetching assessments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const saveQuizResult = async (req, res) => {
    try {
        const { auth } = req;
        const { quizResult, industry, category } = req.body;

        const assessment = await Assessment.create({
            userId: auth.userId,
            quizResult,
            industry,
            category
        });

        res.json(assessment);
    } catch (error) {
        console.error("Error saving assessment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const generateQuiz = async (req, res) => {
    try {
        const { industry, category } = req.body;

        const prompt = `Generate a technical quiz for ${industry} in the category of ${category}. Return exactly 5 multiple choice questions in JSON format: [{"question": "text", "options": ["a", "b", "c", "d"], "answer": "text"}].`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanedText = text.replace(/```json|```/g, "").trim();
        const quiz = JSON.parse(cleanedText);

        res.json(quiz);
    } catch (error) {
        console.error("Error generating quiz:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
