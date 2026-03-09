import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const getUserOnboardingStatus = async (req, res) => {
    try {
        const { auth } = req;
        console.log(`Checking onboarding status for user: ${auth.userId}`);
        let user = await User.findOne({ clerkUserId: auth.userId });

        if (user) {
            console.log(`User ${auth.userId} found in MongoDB.`);
        } else {
            console.log(`User ${auth.userId} NOT found in MongoDB. Attempting auto-sync...`);
            try {
                if (!process.env.CLERK_SECRET_KEY) {
                    console.error("CRITICAL: CLERK_SECRET_KEY is missing in backend environment!");
                }
                const clerkUser = await clerkClient.users.getUser(auth.userId);
                console.log(`Successfully fetched user from Clerk: ${clerkUser.emailAddresses[0].email_address}`);

                user = await User.create({
                    clerkUserId: auth.userId,
                    email: clerkUser.emailAddresses[0].email_address,
                    name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
                    imageUrl: clerkUser.imageUrl,
                });
                console.log(`Successfully auto-synced user to MongoDB: ${auth.userId}`);
            } catch (clerkError) {
                console.error('Error during auto-sync from Clerk:', clerkError.message);
                // Return a specific error so we can see it in Render logs
                return res.status(500).json({
                    error: 'Auto-sync failed',
                    message: clerkError.message,
                    hint: "Check CLERK_SECRET_KEY on Render"
                });
            }
        }

        const isOnboarded = !!(user.industry && user.experience);
        console.log(`Onboarding status for ${auth.userId}: ${isOnboarded}`);
        res.json({ isOnboarded });
    } catch (error) {
        console.error('Error in getUserOnboardingStatus:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { auth } = req;
        const { industry, experience, bio, skills } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { clerkUserId: auth.userId },
            { industry, experience, bio, skills },
            { new: true, upsert: true }
        );

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
