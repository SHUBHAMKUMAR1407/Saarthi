import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    contactInfo: {
        email: String,
        mobile: String,
        linkedin: String,
        twitter: String
    },
    summary: String,
    skills: [String],
    experience: [{
        title: String,
        organization: String,
        startDate: String,
        endDate: String,
        description: String,
        current: Boolean
    }],
    education: [{
        title: String,
        organization: String,
        startDate: String,
        endDate: String,
        description: String,
        current: Boolean
    }],
    projects: [{
        title: String,
        organization: String,
        startDate: String,
        endDate: String,
        description: String,
        current: Boolean
    }]
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
