import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import QuizResult from "./quiz-result";
import { BarLoader } from "react-spinners";
import { useApi } from "../../hooks/use-api";

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const { fetchWithAuth } = useApi();
    const [generatingQuiz, setGeneratingQuiz] = useState(false);
    const [savingResult, setSavingResult] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [resultData, setResultData] = useState(null);

    const generateQuizFn = async () => {
        try {
            setGeneratingQuiz(true);
            const res = await fetchWithAuth("/interview/quiz/generate", {
                method: "POST"
            });
            if (res.success && res.quiz) {
                setQuizData(res.quiz);
            }
        } catch (error) {
            toast.error(error.message || "Failed to generate quiz");
        } finally {
            setGeneratingQuiz(false);
        }
    };

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null));
        }
    }, [quizData]);

    const handleAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);
        } else {
            finishQuiz();
        }
    };

    const calculateScore = () => {
        let correct = 0;
        answers.forEach((answer, index) => {
            if (answer === quizData[index].correctAnswer) {
                correct++;
            }
        });
        return (correct / quizData.length) * 100;
    };

    const finishQuiz = async () => {
        const score = calculateScore();
        try {
            setSavingResult(true);

            const qs = quizData.map((q, i) => ({
                question: q.question,
                answer: q.correctAnswer,
                userAnswer: answers[i],
                isCorrect: q.correctAnswer === answers[i],
                explanation: q.explanation,
            }));

            const res = await fetchWithAuth("/interview/quiz", {
                method: "POST",
                body: JSON.stringify({
                    questions: qs,
                    quizScore: score,
                })
            });

            if (res.success && res.assessment) {
                toast.success("Quiz completed!");
                setResultData(res.assessment);
            }

        } catch (error) {
            toast.error(error.message || "Failed to save quiz results");
        } finally {
            setSavingResult(false);
        }
    };

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        setResultData(null);
        generateQuizFn();
    };

    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />;
    }

    // Show results if quiz is completed
    if (resultData) {
        return (
            <div className="mx-2">
                <QuizResult result={resultData} onStartNew={startNewQuiz} />
            </div>
        );
    }

    if (!quizData) {
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Ready to test your knowledge?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This quiz contains 10 questions specific to your industry and
                        skills. Take your time and choose the best answer for each question.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={generateQuizFn} className="w-full">
                        Start Quiz
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const question = quizData[currentQuestion];

    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>
                    Question {currentQuestion + 1} of {quizData.length}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-lg font-medium">{question.question}</p>
                <RadioGroup
                    onValueChange={handleAnswer}
                    value={answers[currentQuestion]}
                    className="space-y-2"
                >
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>

                {showExplanation && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-medium">Explanation:</p>
                        <p className="text-muted-foreground">{question.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                {!showExplanation && (
                    <Button
                        onClick={() => setShowExplanation(true)}
                        variant="outline"
                        disabled={!answers[currentQuestion]}
                    >
                        Show Explanation
                    </Button>
                )}
                <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion] || savingResult}
                    className="ml-auto"
                >
                    {savingResult && (
                        <BarLoader className="mt-4 mr-2" width={"100%"} color="gray" />
                    )}
                    {currentQuestion < quizData.length - 1
                        ? "Next Question"
                        : "Finish Quiz"}
                </Button>
            </CardFooter>
        </Card>
    );
}
