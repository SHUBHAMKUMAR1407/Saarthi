import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { generateCoverLetter, getCoverLetters, getCoverLetter, deleteCoverLetter } from '../controllers/coverLetterController.js';

const router = express.Router();

router.get('/', ClerkExpressRequireAuth(), getCoverLetters);
router.post('/', ClerkExpressRequireAuth(), generateCoverLetter);
router.get('/:id', ClerkExpressRequireAuth(), getCoverLetter);
router.delete('/:id', ClerkExpressRequireAuth(), deleteCoverLetter);

export default router;
