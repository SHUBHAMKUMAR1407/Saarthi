import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    quizResult: {
        score: Number,
        totalQuestions: Number,
        answers: [Object]
    },
    industry: String,
    category: String
}, { timestamps: true });

export default mongoose.model('Assessment', assessmentSchema);
