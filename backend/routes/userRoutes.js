import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { updateUser, getUserOnboardingStatus } from '../controllers/userController.js';

const router = express.Router();

// Protected routes using Clerk middleware
router.get('/onboarding-status', ClerkExpressRequireAuth(), getUserOnboardingStatus);
router.post('/update', ClerkExpressRequireAuth(), updateUser);

export default router;
