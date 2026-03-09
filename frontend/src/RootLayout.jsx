import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from "@clerk/themes";
import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/header";
import { Toaster } from "sonner";
import { Outlet, useNavigate } from 'react-router-dom';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            navigate={(to) => navigate(to)}
            appearance={{ baseTheme: dark }}
        >
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange storageKey="vite-ui-theme">
                <Header />
                <main className="min-h-screen">
                    <Outlet />
                </main>
                <Toaster richColors />

                <footer className="bg-muted/50 py-12">
                    <div className="container mx-auto px-4 text-center text-gray-200">
                        <p>Made with 💗 by Shubham Kumar</p>
                    </div>
                </footer>
            </ThemeProvider>
        </ClerkProvider>
    );
}
