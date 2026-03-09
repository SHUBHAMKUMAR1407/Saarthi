import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import { BarLoader } from "react-spinners";
import { useApi } from "../hooks/use-api";
import { toast } from "sonner";

export default function CoverLetterView() {
    const { id } = useParams();
    const { fetchWithAuth } = useApi();
    const [coverLetter, setCoverLetter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLetter = async () => {
            try {
                setLoading(true);
                const res = await fetchWithAuth(`/cover-letter/${id}`);
                if (res.success) setCoverLetter(res.coverLetter);
            } catch (error) {
                toast.error("Failed to fetch cover letter");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchLetter();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto py-6">
                <BarLoader className="mt-4" width={"100%"} color="gray" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col space-y-2">
                <Link to="/ai-cover-letter">
                    <Button variant="link" className="gap-2 pl-0">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Cover Letters
                    </Button>
                </Link>

                <h1 className="text-6xl font-bold gradient-title mb-6">
                    {coverLetter?.jobTitle} at {coverLetter?.companyName}
                </h1>
            </div>

            <div className="py-4">
                <MDEditor value={coverLetter?.content || ""} preview="preview" height={700} />
            </div>
        </div>
    );
}
