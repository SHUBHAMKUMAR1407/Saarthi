import CoverLetter from '../models/CoverLetter.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getCoverLetters = async (req, res) => {
    try {
        const { auth } = req;
        const coverLetters = await CoverLetter.find({ userId: auth.userId }).sort({ createdAt: -1 });
        res.json(coverLetters);
    } catch (error) {
        console.error("Error fetching cover letters:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCoverLetter = async (req, res) => {
    try {
        const { auth } = req;
        const { id } = req.params;
        const coverLetter = await CoverLetter.findOne({ _id: id, userId: auth.userId });
        res.json(coverLetter);
    } catch (error) {
        console.error("Error fetching cover letter:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const generateCoverLetter = async (req, res) => {
    try {
        const { auth } = req;
        const { companyName, jobTitle, jobDescription } = req.body;

        const prompt = `Write a professional cover letter for a ${jobTitle} position at ${companyName}. Job Description: ${jobDescription}. Use a professional and enthusiastic tone.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const content = response.text();

        const newCoverLetter = await CoverLetter.create({
            userId: auth.userId,
            companyName,
            jobTitle,
            jobDescription,
            content
        });

        res.json(newCoverLetter);
    } catch (error) {
        console.error("Error generating cover letter:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteCoverLetter = async (req, res) => {
    try {
        const { auth } = req;
        const { id } = req.params;
        await CoverLetter.findOneAndDelete({ _id: id, userId: auth.userId });
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting cover letter:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
