import User from '../models/User.js';

export const getUserOnboardingStatus = async (req, res) => {
    try {
        const { auth } = req;
        const user = await User.findOne({ clerkUserId: auth.userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
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
