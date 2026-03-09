import React, { useState, useEffect } from "react";
import { useApi } from "../hooks/use-api";
import { BarLoader } from "react-spinners";
import ResumeBuilder from "../components/resume/resume-builder";

export default function ResumePage() {
    const { fetchWithAuth } = useApi();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await fetchWithAuth("/resume");
                if (res.success && res.resume) {
                    setResume(res.resume);
                }
            } catch (error) {
                console.error("Failed to fetch resume:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto py-6">
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-6xl font-bold gradient-title">Resume Builder</h1>
                </div>
                <BarLoader className="mt-4" width={"100%"} color="gray" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6">
            <ResumeBuilder initialContent={resume?.content || ""} />
        </div>
    );
}
