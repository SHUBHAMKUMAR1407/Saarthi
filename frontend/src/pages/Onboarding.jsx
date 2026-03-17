import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { onboardingSchema } from "@/lib/schema";
import { useApi } from "../hooks/use-api";
import { industries } from "@/data/industries";

export default function Onboarding() {
    const navigate = useNavigate();
    const { fetchWithAuth } = useApi();
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(onboardingSchema),
    });

    const onSubmit = async (values) => {
        try {
            setUpdateLoading(true);
            
            const subIndustry = values.subIndustry || "";
            const formattedIndustry = `${values.industry}-${subIndustry
                .toLowerCase()
                .replace(/ /g, "-")}`;

            const payload = {
                ...values,
                industry: formattedIndustry,
            };
            
            console.log("Submitting onboarding payload:", payload);


            const res = await fetchWithAuth("/user/update", {
                method: "POST",
                body: JSON.stringify(payload),
            });
            console.log("Onboarding API Response:", res);

            if (res && (res.success || res.user)) {
                toast.success("Profile updated! Redirecting...");
                navigate("/dashboard", { replace: true });
            } else {
                const errorMsg = res?.error || "Update failed. Server returned no error message.";
                console.error("Update failed details:", res);
                toast.error(errorMsg);
            }

        } catch (error) {
            console.error("Onboarding submission error:", error);
            // If error has a response object with more info
            const serverError = error.message || "Something went wrong during onboarding";
            toast.error(serverError);
        } finally {
            setUpdateLoading(false);
        }
    };





    const watchIndustry = watch("industry");

    return (
        <div className="flex items-center justify-center mt-10 md:mt-20 pb-10">
            <Card className="w-full max-w-lg mx-2 transition-all hover:shadow-primary/5">

                    <CardHeader>
                        <CardTitle className="gradient-title text-4xl">
                            Complete Your Profile
                        </CardTitle>
                        <CardDescription>
                            Select your industry to get personalized career insights and
                            recommendations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <Select
                                    onValueChange={(value) => {
                                        setValue("industry", value);
                                        setSelectedIndustry(
                                            industries.find((ind) => ind.id === value)
                                        );
                                        setValue("subIndustry", "");
                                    }}
                                >
                                    <SelectTrigger id="industry">
                                        <SelectValue placeholder="Select an industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Industries</SelectLabel>
                                            {industries.map((ind) => (
                                                <SelectItem key={ind.id} value={ind.id}>
                                                    {ind.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.industry && (
                                    <p className="text-sm text-red-500">
                                        {errors.industry.message}
                                    </p>
                                )}
                            </div>

                            {watchIndustry && (
                                <div className="space-y-2">
                                    <Label htmlFor="subIndustry">Specialization</Label>
                                    <Select
                                        onValueChange={(value) => setValue("subIndustry", value)}
                                    >
                                        <SelectTrigger id="subIndustry">
                                            <SelectValue placeholder="Select your specialization" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Specializations</SelectLabel>
                                                {selectedIndustry?.subIndustries.map((sub) => (
                                                    <SelectItem key={sub} value={sub}>
                                                        {sub}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.subIndustry && (
                                        <p className="text-sm text-red-500">
                                            {errors.subIndustry.message}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="experience">Years of Experience</Label>
                                <Input
                                    id="experience"
                                    type="number"
                                    min="0"
                                    max="50"
                                    placeholder="Enter years of experience"
                                    {...register("experience")}
                                />
                                {errors.experience && (
                                    <p className="text-sm text-red-500">
                                        {errors.experience.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="skills">Skills</Label>
                                <Input
                                    id="skills"
                                    placeholder="e.g., Python, JavaScript, Project Management"
                                    {...register("skills")}
                                />
                                <p className="text-sm text-muted-foreground">
                                    Separate multiple skills with commas
                                </p>
                                {errors.skills && (
                                    <p className="text-sm text-red-500">{errors.skills.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Professional Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us about your professional background..."
                                    className="h-32"
                                    {...register("bio")}
                                />
                                {errors.bio && (
                                    <p className="text-sm text-red-500">{errors.bio.message}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full" disabled={updateLoading}>
                                {updateLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Complete Profile"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
        </div>
    );
}
