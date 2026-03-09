import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';

import connectDB from './lib/db.js';
import User from './models/User.js';

import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import coverLetterRoutes from './routes/coverLetterRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import { inngestMiddleware } from './lib/inngest.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// --- Clerk Webhook Endpoint ---
// Note: Webhooks need raw body, so we define this before express.json()
app.post("/api/webhook/clerk", express.raw({ type: "application/json" }), async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error("Missing CLERK_WEBHOOK_SECRET in .env");
        return res.status(400).json({ error: "Missing webhook secret" });
    }

    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({ error: "Missing Svix headers" });
    }

    const payload = req.body;
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;

    try {
        evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error("Error verifying webhook:", err.message);
        return res.status(400).json({ error: "Verification failed" });
    }

    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook received: ${eventType} for user ${id}`);

    if (eventType === "user.created" || eventType === "user.updated") {
        try {
            await User.findOneAndUpdate(
                { clerkUserId: id },
                {
                    clerkUserId: id,
                    email: (email_addresses && email_addresses.length > 0) ? email_addresses[0].email_address : "",
                    name: `${first_name || ""} ${last_name || ""}`.trim(),
                    imageUrl: image_url,
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`User ${id} synced to database via webhook.`);
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error syncing user to database:", error);
            return res.status(500).json({ error: "Database sync failed", details: error.message });
        }
    }

    if (eventType === "user.deleted") {
        try {
            await User.findOneAndDelete({ clerkUserId: id });
            console.log(`User ${id} deleted via webhook.`);
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error deleting user from database:", error);
            return res.status(500).json({ error: "Deletion failed" });
        }
    }

    res.status(200).json({ success: true });
});

// Standard Middleware
app.use(express.json());

// Main Routes
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/cover-letter', coverLetterRoutes);
app.use('/api/interview', interviewRoutes);

// Inngest Endpoint
app.use("/api/inngest", inngestMiddleware);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Saarthi AI Express Backend is running with MongoDB!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
