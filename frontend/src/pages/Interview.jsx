import React, { useState, useEffect } from "react";
import StatsCards from "../components/interview/stats-cards";
import PerformanceChart from "../components/interview/performace-chart";
import QuizList from "../components/interview/quiz-list";
import { useApi } from "../hooks/use-api";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

export default function InterviewPrep() {
    const { fetchWithAuth } = useApi();
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const res = await fetchWithAuth("/interview/assessments");
                if (res.success && res.assessments) {
                    setAssessments(res.assessments);
                }
            } catch (error) {
                toast.error("Failed to load assessments");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAssessments();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto py-6">
                <BarLoader className="mt-4" width={"100%"} color="gray" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-6xl font-bold gradient-title">
                    Interview Preparation
                </h1>
            </div>
            <div className="space-y-6">
                <StatsCards assessments={assessments} />
                <PerformanceChart assessments={assessments} />
                <QuizList assessments={assessments} />
            </div>
        </div>
    );
}
