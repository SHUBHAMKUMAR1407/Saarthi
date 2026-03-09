import mongoose from 'mongoose';

const coverLetterSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobDescription: { type: String }
}, { timestamps: true });

export default mongoose.model('CoverLetter', coverLetterSchema);
