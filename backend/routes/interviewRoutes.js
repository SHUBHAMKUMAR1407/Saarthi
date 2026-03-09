import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { generateQuiz, saveQuizResult, getAssessments } from '../controllers/interviewController.js';

const router = express.Router();

router.get('/assessments', ClerkExpressRequireAuth(), getAssessments);
router.post('/quiz', ClerkExpressRequireAuth(), saveQuizResult);
router.post('/quiz/generate', ClerkExpressRequireAuth(), generateQuiz);

export default router;
