import { Inngest } from "inngest";
import { serve } from "inngest/express";

export const inngest = new Inngest({ id: "saarthi-ai" });

export const inngestMiddleware = serve({
    client: inngest,
    functions: [
        // Add inngest functions here
    ],
});
