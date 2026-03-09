import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { Eye, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useApi } from "../hooks/use-api";
import { BarLoader } from "react-spinners";

export default function CoverLetterList() {
    const navigate = useNavigate();
    const { fetchWithAuth } = useApi();
    const [coverLetters, setCoverLetters] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLetters = async () => {
        try {
            setLoading(true);
            const res = await fetchWithAuth("/cover-letter");
            if (res.success) setCoverLetters(res.coverLetters);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load cover letters");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLetters();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetchWithAuth(`/cover-letter/${id}`, {
                method: "DELETE",
            });
            if (res.success) {
                toast.success("Cover letter deleted successfully!");
                fetchLetters();
            }
        } catch (error) {
            toast.error(error.message || "Failed to delete cover letter");
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto py-6">
                <BarLoader className="mt-4" width={"100%"} color="gray" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
                <h1 className="text-6xl font-bold gradient-title">My Cover Letters</h1>
                <Link to="/ai-cover-letter/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New
                    </Button>
                </Link>
            </div>

            {!coverLetters?.length ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No Cover Letters Yet</CardTitle>
                        <CardDescription>
                            Create your first cover letter to get started
                        </CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                <div className="space-y-4">
                    {coverLetters.map((letter) => (
                        <Card key={letter._id} className="group relative ">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl gradient-title">
                                            {letter.jobTitle} at {letter.companyName}
                                        </CardTitle>
                                        <CardDescription>
                                            Created {format(new Date(letter.createdAt), "PPP")}
                                        </CardDescription>
                                    </div>
                                    <div className="flex space-x-2">
                                        <AlertDialog>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => navigate(`/ai-cover-letter/${letter._id}`)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" size="icon">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Cover Letter?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently
                                                        delete your cover letter for {letter.jobTitle} at{" "}
                                                        {letter.companyName}.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(letter._id)}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-muted-foreground text-sm line-clamp-3">
                                    {letter.jobDescription}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
