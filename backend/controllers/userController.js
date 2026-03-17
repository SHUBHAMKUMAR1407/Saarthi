import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const getUserOnboardingStatus = async (req, res) => {
    try {
        const { auth } = req;
        if (!auth?.userId) return res.status(401).json({ error: "Session expired" });

        const user = await User.findOne({ clerkUserId: auth.userId });
        
        // Strictly check if both industry and experience exist
        const isOnboarded = !!(user && user.industry && typeof user.experience === 'number');
        res.json({ isOnboarded });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { auth } = req;
        if (!auth?.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { industry, experience, bio, skills } = req.body;
        console.log(`Updating profile for user: ${auth.userId}`);

        // 1. Try to find existing user
        let user = await User.findOne({ clerkUserId: auth.userId });

        // 2. If not found, create one with basic info from Clerk
        if (!user) {
            console.log(`User ${auth.userId} not found, syncing from Clerk...`);
            const clerkUser = await clerkClient.users.getUser(auth.userId);
            const email = clerkUser.emailAddresses[0]?.email_address;
            
            if (!email) {
                return res.status(400).json({ error: "Clerk email missing" });
            }

            user = new User({
                clerkUserId: auth.userId,
                email,
                name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                imageUrl: clerkUser.imageUrl,
            });
        }

        // 3. Update the fields
        user.industry = industry;
        user.experience = Number(experience) || 0;
        user.bio = bio || "";
        user.skills = Array.isArray(skills) ? skills : [];

        // 4. Save
        const savedUser = await user.save();
        console.log(`Profile saved successfully for ${auth.userId}`);

        return res.status(200).json({ 
            success: true, 
            user: savedUser 
        });
    } catch (error) {
        console.error("Profile Update Failed:", error);
        return res.status(500).json({ 
            success: false, 
            error: error.message || "Failed to save profile. Please check all fields." 
        });
    }
};








