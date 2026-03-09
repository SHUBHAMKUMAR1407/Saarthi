import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    industry: {
        type: String
    },
    bio: {
        type: String
    },
    experience: {
        type: Number
    },
    skills: {
        type: [String]
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
