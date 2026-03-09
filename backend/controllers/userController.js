import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const getUserOnboardingStatus = async (req, res) => {
    try {
        const { auth } = req;
        let user = await User.findOne({ clerkUserId: auth.userId });

        // Auto-sync: If user is authenticated in Clerk but missing in MongoDB
        if (!user) {
            try {
                const clerkUser = await clerkClient.users.getUser(auth.userId);
                user = await User.create({
                    clerkUserId: auth.userId,
                    email: clerkUser.emailAddresses[0].email_address,
                    name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
                    imageUrl: clerkUser.imageUrl,
                });
                console.log(`Auto-synced missing user: ${auth.userId}`);
            } catch (clerkError) {
                console.error('Error fetching user from Clerk:', clerkError);
                return res.status(404).json({ error: 'User not found and sync failed' });
            }
        }

        const isOnboarded = !!(user.industry && user.experience);
        res.json({ isOnboarded });
    } catch (error) {
        console.error('Error fetching onboarding status:', error);
        res.status(500).json({ error: 'Internal server error' });
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
