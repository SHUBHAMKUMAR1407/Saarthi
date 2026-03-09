import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { getIndustryInsights } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/insights', ClerkExpressRequireAuth(), getIndustryInsights);

export default router;
