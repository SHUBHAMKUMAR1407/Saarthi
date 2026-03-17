import React, { useState, useEffect } from "react";
import { useApi } from "../hooks/use-api";
import { BarLoader } from "react-spinners";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    BriefcaseIcon,
    LineChart,
    TrendingUp,
    TrendingDown,
    Brain,
    RefreshCw,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { industries } from "@/data/industries";

export default function Dashboard() {
    const { fetchWithAuth } = useApi();
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const navigate = useNavigate();

    const fetchInsights = async (industry = "") => {
        try {
            setLoading(true);
            // First check onboarding status
            const statusRes = await fetchWithAuth("/user/onboarding-status");
            if (!statusRes.isOnboarded) {
                navigate("/onboarding");
                return;
            }

            const url = industry ? `/dashboard/insights?industry=${industry}` : "/dashboard/insights";
            const res = await fetchWithAuth(url);

            if (res.insights) {
                setInsights(res.insights);
                // Also set the selected industry if it came from profile
                if (!industry) {
                    // Try to find the name from the ID if it's formatted as 'id-subid'
                    // but for simplicity we'll just use the ID from response if we had it
                }
            }
        } catch (error) {
            toast.error("Failed to fetch industry insights");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    const handleIndustryChange = (value) => {
        setSelectedIndustry(value);
        fetchInsights(value);
    };

    if (loading && !insights) {
        return (
            <div className="px-5 container mx-auto mt-24">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
                </div>
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <BarLoader width={"100%"} color="#3b82f6" />
                    <p className="mt-4 text-muted-foreground animate-pulse text-lg">
                        AI is analyzing the market for you...
                    </p>
                </div>
            </div>
        );
    }

    if (!insights) {
        return (
            <div className="px-5 flex flex-col items-center justify-center h-[80vh]">
                <h1 className="text-6xl font-bold gradient-title mb-5">Industry Insights</h1>
                <p className="text-xl text-muted-foreground mb-8 text-center max-w-lg">
                    No insights found. Please complete your profile to generate insights for your industry.
                </p>
                <Button onClick={() => navigate("/onboarding")} size="lg">
                    Complete Profile
                </Button>
            </div>
        );
    }

    // Transform salary data for the chart
    const salaryData = insights.salaryRanges.map((range) => ({
        name: range.role,
        min: range.min / 1000,
        max: range.max / 1000,
        median: range.median / 1000,
    }));

    const getDemandLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case "high":
                return "bg-green-500";
            case "medium":
                return "bg-yellow-500";
            case "low":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const getMarketOutlookInfo = (outlook) => {
        switch (outlook?.toLowerCase()) {
            case "positive":
                return { icon: TrendingUp, color: "text-green-500" };
            case "neutral":
                return { icon: LineChart, color: "text-yellow-500" };
            case "negative":
                return { icon: TrendingDown, color: "text-red-500" };
            default:
                return { icon: LineChart, color: "text-gray-500" };
        }
    };

    const marketInfo = getMarketOutlookInfo(insights.marketOutlook);
    const OutlookIcon = marketInfo.icon;
    const outlookColor = marketInfo.color;

    // Format dates safely
    const lastUpdatedDate = insights.lastUpdated ? format(new Date(insights.lastUpdated), "dd MMM yyyy") : "N/A";
    const nextUpdateDistance = insights.nextUpdate ? formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true }) : "N/A";

    return (
        <div className="px-5 container mx-auto mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 mt-24 gap-4">
                <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
                <div className="flex items-center gap-3">
                    <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
                        <SelectTrigger className="w-full md:w-[250px] bg-card border-2 border-primary/20 hover:border-primary/50 transition-all rounded-xl h-11 text-lg">
                            <SelectValue placeholder="Explore Other Industries" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            {industries.map((ind) => (
                                <SelectItem key={ind.id} value={ind.id} className="cursor-pointer">
                                    {ind.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => fetchInsights(selectedIndustry)}
                        className={`transition-all ${loading ? "animate-spin" : ""}`}
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-8 animate-in fade-in duration-700">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="px-3 py-1 bg-background">
                            Sector: <span className="text-primary ml-1 capitalize font-semibold tracking-wide">
                                {selectedIndustry ?
                                    industries.find(i => i.id === selectedIndustry)?.name || selectedIndustry :
                                    "Your Profile Industry"}
                            </span>
                        </Badge>
                    </div>

                    <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
                </div>

                {/* Market Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="hover:shadow-lg transition-all border-l-4 border-l-primary/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
                            <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{insights.marketOutlook}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Next update {nextUpdateDistance}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all border-l-4 border-l-green-500/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Industry Growth</CardTitle>
                            <TrendingUp className="h-5 w-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {insights.growthRate?.toFixed(1)}%
                            </div>
                            <Progress value={Math.min(100, (insights.growthRate || 0) * 3)} className="mt-3 h-2" />
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all border-l-4 border-l-yellow-500/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
                            <BriefcaseIcon className="h-5 w-5 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{insights.demandLevel}</div>
                            <div className={`h-2 w-full rounded-full mt-3 ${getDemandLevelColor(insights.demandLevel)} opacity-60`} />
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all border-l-4 border-l-purple-500/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Core Requirements</CardTitle>
                            <Brain className="h-5 w-5 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {insights.topSkills?.slice(0, 3).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-[10px] px-1.5">
                                        {skill}
                                    </Badge>
                                ))}
                                {insights.topSkills?.length > 3 && (
                                    <Badge variant="outline" className="text-[10px] px-1.5">+{insights.topSkills.length - 3} more</Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Salary Ranges Chart */}
                <Card className="hover:shadow-md transition-all">
                    <CardHeader className="border-b bg-muted/5">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <LineChart className="h-6 w-6 text-primary" />
                            Salary Ranges by Role
                        </CardTitle>
                        <CardDescription>
                            Annual compensation benchmarks (in thousands USD)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salaryData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} unit="K" />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-background/95 backdrop-blur-md border border-primary/20 rounded-xl p-4 shadow-xl">
                                                        <p className="font-bold text-lg mb-2 text-primary border-b pb-1">{label}</p>
                                                        {payload.map((item) => (
                                                            <div key={item.name} className="flex items-center justify-between gap-6 py-1">
                                                                <span className="text-sm text-muted-foreground">{item.name}:</span>
                                                                <span className="font-mono font-bold">${item.value}K</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Bar dataKey="min" fill="#94a3b8" name="Min Salary" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="median" fill="#3b82f6" name="Median Salary" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="max" fill="#1e40af" name="Max Salary" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Industry Trends & Recommended Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="hover:shadow-md transition-all bg-gradient-to-br from-background to-muted/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Key Industry Trends
                            </CardTitle>
                            <CardDescription>
                                Current shifts and innovations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {insights.keyTrends?.map((trend, index) => (
                                    <li key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                                        <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                        <span className="font-medium text-sm leading-relaxed">{trend}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all bg-gradient-to-br from-background to-muted/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5 text-primary" />
                                Strategic Skills
                            </CardTitle>
                            <CardDescription>Future-proof your career</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {insights.recommendedSkills?.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm rounded-lg border-2 border-primary/10 hover:border-primary/40 cursor-default transition-all">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                            <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                <p className="text-xs text-primary font-medium italic">
                                    "Mastering these skills could increase your market value by up to 25% in the current landscape."
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

