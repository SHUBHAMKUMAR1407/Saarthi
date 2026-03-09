import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { saveResume, getResume, improveWithAI } from '../controllers/resumeController.js';

const router = express.Router();

router.get('/', ClerkExpressRequireAuth(), getResume);
router.post('/', ClerkExpressRequireAuth(), saveResume);
router.post('/improve', ClerkExpressRequireAuth(), improveWithAI);

export default router;
