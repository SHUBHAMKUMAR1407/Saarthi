import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { coverLetterSchema } from "@/lib/schema";
import { useApi } from "../hooks/use-api";

export default function NewCoverLetter() {
    const navigate = useNavigate();
    const { fetchWithAuth } = useApi();
    const [generating, setGenerating] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(coverLetterSchema),
    });

    const onSubmit = async (data) => {
        try {
            setGenerating(true);
            const res = await fetchWithAuth("/cover-letter", {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (res.success && res.coverLetter) {
                toast.success("Cover letter generated successfully!");
                navigate(`/ai-cover-letter/${res.coverLetter._id}`);
                reset();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to generate cover letter");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col space-y-2">
                <Link to="/ai-cover-letter">
                    <Button variant="link" className="gap-2 pl-0">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Cover Letters
                    </Button>
                </Link>

                <div className="pb-6">
                    <h1 className="text-6xl font-bold gradient-title">
                        Create Cover Letter
                    </h1>
                    <p className="text-muted-foreground">
                        Generate a tailored cover letter for your job application
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Job Details</CardTitle>
                        <CardDescription>
                            Provide information about the position you're applying for
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input
                                        id="companyName"
                                        placeholder="Enter company name"
                                        {...register("companyName")}
                                    />
                                    {errors.companyName && (
                                        <p className="text-sm text-red-500">
                                            {errors.companyName.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jobTitle">Job Title</Label>
                                    <Input
                                        id="jobTitle"
                                        placeholder="Enter job title"
                                        {...register("jobTitle")}
                                    />
                                    {errors.jobTitle && (
                                        <p className="text-sm text-red-500">
                                            {errors.jobTitle.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="jobDescription">Job Description</Label>
                                <Textarea
                                    id="jobDescription"
                                    placeholder="Paste the job description here"
                                    className="h-32"
                                    {...register("jobDescription")}
                                />
                                {errors.jobDescription && (
                                    <p className="text-sm text-red-500">
                                        {errors.jobDescription.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={generating}>
                                    {generating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        "Generate Cover Letter"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
