"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    BookOpen,
    Brain,
    FileText,
    Headphones,
    MessageSquare,
    Share2,
    Sparkles,
    ArrowLeft,
    BarChart3,
    Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}

// Demo flashcards
const demoFlashcards = [
    { id: "1", front: "What is the powerhouse of the cell?", back: "The mitochondria — it produces ATP through cellular respiration, providing energy for cellular processes.", mastery: "MASTERED" },
    { id: "2", front: "What is the function of the cell membrane?", back: "The cell membrane controls what enters and exits the cell, maintaining homeostasis through selective permeability.", mastery: "FAMILIAR" },
    { id: "3", front: "What is DNA?", back: "DNA (Deoxyribonucleic acid) is a molecule that carries genetic instructions for development, functioning, growth, and reproduction.", mastery: "LEARNING" },
    { id: "4", front: "What is osmosis?", back: "Osmosis is the movement of water molecules through a semipermeable membrane from an area of low solute concentration to high solute concentration.", mastery: "UNFAMILIAR" },
    { id: "5", front: "What is photosynthesis?", back: "Photosynthesis is the process by which plants convert light energy, water, and CO₂ into glucose and oxygen using chlorophyll.", mastery: "MASTERED" },
];

// Demo quiz questions
const demoQuiz = [
    { id: "q1", type: "MULTIPLE_CHOICE", question: "Which organelle is responsible for producing ATP?", options: ["A. Nucleus", "B. Mitochondria", "C. Ribosome", "D. Golgi apparatus"], answer: "B", explanation: "The mitochondria is known as the powerhouse of the cell because it produces ATP." },
    { id: "q2", type: "TRUE_FALSE", question: "The cell wall is found in animal cells.", options: ["True", "False"], answer: "False", explanation: "Cell walls are found in plant cells, fungi, and bacteria, but not in animal cells." },
    { id: "q3", type: "FILL_IN_BLANK", question: "The process by which cells divide to produce two identical daughter cells is called ___.", options: [], answer: "mitosis", explanation: "Mitosis is a type of cell division that results in two identical daughter cells." },
];

const demoNotes = `## Cell Structure Overview

The cell is the basic unit of life. All living organisms are composed of cells.

### Key Organelles

- **Nucleus**: Contains DNA and controls cell activities
- **Mitochondria**: Produces ATP (energy) through cellular respiration
- **Endoplasmic Reticulum**: Synthesizes proteins (rough ER) and lipids (smooth ER)
- **Golgi Apparatus**: Modifies, packages, and ships proteins
- **Cell Membrane**: Controls what enters/exits the cell

### Key Takeaways

1. All cells come from pre-existing cells
2. The nucleus is the control center of the cell
3. Mitochondria are the powerhouse of the cell
4. Cell membranes are selectively permeable`;

export default function StudySetDetailPage() {
    const mastery = { mastered: 12, familiar: 6, learning: 4, unfamiliar: 2 };
    const total = mastery.mastered + mastery.familiar + mastery.learning + mastery.unfamiliar;

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Back button */}
            <Link
                href="/study-sets"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Study Sets
            </Link>

            {/* Hero Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Biology</Badge>
                            <Badge variant="outline" className="text-xs">📄 PDF</Badge>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            Biology 101 — Cell Structure
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Complete guide to cell organelles, functions, and processes
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-1.5" />
                            Share
                        </Button>
                        <Button variant="outline" size="sm">
                            <Edit3 className="w-4 h-4 mr-1.5" />
                            Edit
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Card className="bg-card/50 border-white/5">
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">24</p>
                                <p className="text-xs text-muted-foreground">Flashcards</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-white/5">
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <Brain className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">15</p>
                                <p className="text-xs text-muted-foreground">Questions</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-white/5">
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">72%</p>
                                <p className="text-xs text-muted-foreground">Mastered</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-white/5">
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">AI</p>
                                <p className="text-xs text-muted-foreground">Generated</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Mastery Distribution */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Mastery Progress</span>
                        <span className="text-sm text-muted-foreground">{total} total items</span>
                    </div>
                    <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                        <div
                            className="bg-mastery-mastered rounded-l-full transition-all duration-500"
                            style={{ width: `${(mastery.mastered / total) * 100}%` }}
                        />
                        <div
                            className="bg-mastery-familiar transition-all duration-500"
                            style={{ width: `${(mastery.familiar / total) * 100}%` }}
                        />
                        <div
                            className="bg-mastery-learning transition-all duration-500"
                            style={{ width: `${(mastery.learning / total) * 100}%` }}
                        />
                        <div
                            className="bg-mastery-unfamiliar rounded-r-full transition-all duration-500"
                            style={{ width: `${(mastery.unfamiliar / total) * 100}%` }}
                        />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-mastery-mastered" /> Mastered ({mastery.mastered})</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-mastery-familiar" /> Familiar ({mastery.familiar})</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-mastery-learning" /> Learning ({mastery.learning})</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-mastery-unfamiliar" /> Unfamiliar ({mastery.unfamiliar})</span>
                    </div>
                </div>
            </motion.div>

            {/* Mode Tabs */}
            <Tabs defaultValue="flashcards" className="w-full">
                <TabsList className="w-full sm:w-auto flex-wrap">
                    <TabsTrigger value="flashcards" className="gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        Flashcards
                    </TabsTrigger>
                    <TabsTrigger value="quiz" className="gap-1.5">
                        <Brain className="w-4 h-4" />
                        Quiz
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="gap-1.5">
                        <FileText className="w-4 h-4" />
                        Notes
                    </TabsTrigger>
                    <TabsTrigger value="tutor" className="gap-1.5">
                        <MessageSquare className="w-4 h-4" />
                        Tutor
                    </TabsTrigger>
                    <TabsTrigger value="podcast" className="gap-1.5">
                        <Headphones className="w-4 h-4" />
                        Podcast
                    </TabsTrigger>
                </TabsList>

                {/* Flashcards Tab */}
                <TabsContent value="flashcards">
                    <FlashcardDeck cards={demoFlashcards} />
                </TabsContent>

                {/* Quiz Tab */}
                <TabsContent value="quiz">
                    <QuizRunner questions={demoQuiz} />
                </TabsContent>

                {/* Notes Tab */}
                <TabsContent value="notes">
                    <Card className="bg-card/50 border-white/5">
                        <CardContent className="p-8 prose prose-invert prose-sm max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(demoNotes) }} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tutor Tab */}
                <TabsContent value="tutor">
                    <TutorChat />
                </TabsContent>

                {/* Podcast Tab */}
                <TabsContent value="podcast">
                    <PodcastPlayer />
                </TabsContent>
            </Tabs>
        </div>
    );
}

// ============ FLASHCARD DECK ============
function FlashcardDeck({ cards }: { cards: typeof demoFlashcards }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [shuffled, setShuffled] = React.useState(false);
    const [displayCards, setDisplayCards] = React.useState(cards);

    const currentCard = displayCards[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => Math.min(prev + 1, displayCards.length - 1));
        }, 150);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }, 150);
    };

    const handleShuffle = () => {
        const shuffledCards = [...displayCards].sort(() => Math.random() - 0.5);
        setDisplayCards(shuffledCards);
        setCurrentIndex(0);
        setIsFlipped(false);
        setShuffled(!shuffled);
    };

    // Keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setIsFlipped((prev) => !prev);
            }
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [displayCards.length]);

    const masteryColor = {
        MASTERED: "text-mastery-mastered",
        FAMILIAR: "text-mastery-familiar",
        LEARNING: "text-mastery-learning",
        UNFAMILIAR: "text-mastery-unfamiliar",
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-6">
                <Progress value={((currentIndex + 1) / displayCards.length) * 100} className="flex-1" />
                <span className="text-sm font-medium text-muted-foreground">
                    {currentIndex + 1} / {displayCards.length}
                </span>
            </div>

            {/* 3D Flashcard */}
            <div
                className="perspective-1000 cursor-pointer mb-6"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="relative w-full aspect-[3/2] preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-card to-card/80 p-8 flex flex-col items-center justify-center shadow-xl">
                        <Badge className={`mb-4 ${masteryColor[currentCard.mastery as keyof typeof masteryColor]}`}>
                            {currentCard.mastery}
                        </Badge>
                        <p className="text-xl font-semibold text-center leading-relaxed">
                            {currentCard.front}
                        </p>
                        <p className="text-xs text-muted-foreground mt-6">Click or press Space to flip</p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-purple-600/5 p-8 flex flex-col items-center justify-center shadow-xl">
                        <p className="text-sm text-primary mb-2 font-medium">ANSWER</p>
                        <p className="text-lg text-center leading-relaxed">
                            {currentCard.back}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    ← Previous
                </Button>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShuffle}
                    >
                        🔀 Shuffle
                    </Button>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentIndex === displayCards.length - 1}
                >
                    Next →
                </Button>
            </div>

            {/* Mastery Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-6">
                {[
                    { label: "Still Learning", color: "bg-mastery-unfamiliar/20 text-mastery-unfamiliar border-mastery-unfamiliar/30" },
                    { label: "Getting There", color: "bg-mastery-learning/20 text-mastery-learning border-mastery-learning/30" },
                    { label: "Almost", color: "bg-mastery-familiar/20 text-mastery-familiar border-mastery-familiar/30" },
                    { label: "Mastered!", color: "bg-mastery-mastered/20 text-mastery-mastered border-mastery-mastered/30" },
                ].map((btn) => (
                    <button
                        key={btn.label}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${btn.color}`}
                        onClick={() => {
                            handleNext();
                        }}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
                Keyboard: Space=flip, ←→=navigate, 1-4=rate mastery
            </p>
        </div>
    );
}

// ============ QUIZ RUNNER ============
function QuizRunner({ questions }: { questions: typeof demoQuiz }) {
    const [currentQ, setCurrentQ] = React.useState(0);
    const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
    const [inputAnswer, setInputAnswer] = React.useState("");
    const [showResult, setShowResult] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [answered, setAnswered] = React.useState(0);

    const question = questions[currentQ];
    const isCorrect = question.type === "FILL_IN_BLANK"
        ? inputAnswer.toLowerCase().trim() === question.answer.toLowerCase()
        : selectedAnswer === question.answer;

    const handleSubmit = () => {
        setShowResult(true);
        setAnswered((prev) => prev + 1);
        if (isCorrect) setScore((prev) => prev + 1);
    };

    const handleNext = () => {
        setShowResult(false);
        setSelectedAnswer(null);
        setInputAnswer("");
        if (currentQ < questions.length - 1) {
            setCurrentQ((prev) => prev + 1);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Progress value={((currentQ + 1) / questions.length) * 100} className="w-32" />
                    <span className="text-sm text-muted-foreground">
                        {currentQ + 1} / {questions.length}
                    </span>
                </div>
                <Badge variant="secondary">Score: {score}/{answered}</Badge>
            </div>

            <Card className="bg-card/50 border-white/5">
                <CardContent className="p-8">
                    <Badge variant="outline" className="mb-4 text-xs">
                        {question.type.replace("_", " ")}
                    </Badge>
                    <h3 className="text-lg font-semibold mb-6">{question.question}</h3>

                    {/* MCQ or True/False */}
                    {(question.type === "MULTIPLE_CHOICE" || question.type === "TRUE_FALSE") && (
                        <div className="space-y-3">
                            {question.options.map((option) => {
                                let optionStyle = "border-white/10 bg-white/5 hover:bg-white/10";
                                if (showResult) {
                                    const isThisCorrect = option.startsWith(question.answer) || option === question.answer;
                                    if (isThisCorrect) {
                                        optionStyle = "border-emerald-500/50 bg-emerald-500/10";
                                    } else if (selectedAnswer === option.charAt(0) || selectedAnswer === option) {
                                        optionStyle = "border-red-500/50 bg-red-500/10";
                                    }
                                } else if (selectedAnswer === option.charAt(0) || selectedAnswer === option) {
                                    optionStyle = "border-primary/50 bg-primary/10";
                                }
                                return (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            if (!showResult) {
                                                const val = question.type === "TRUE_FALSE" ? option : option.charAt(0);
                                                setSelectedAnswer(val);
                                            }
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all cursor-pointer ${optionStyle}`}
                                    >
                                        <span className="text-sm">{option}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Fill in the blank */}
                    {question.type === "FILL_IN_BLANK" && (
                        <div>
                            <input
                                type="text"
                                value={inputAnswer}
                                onChange={(e) => setInputAnswer(e.target.value)}
                                placeholder="Type your answer..."
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                disabled={showResult}
                            />
                        </div>
                    )}

                    {/* Result Explanation */}
                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 p-4 rounded-xl border ${isCorrect
                                ? "bg-emerald-500/10 border-emerald-500/30"
                                : "bg-red-500/10 border-red-500/30"
                                }`}
                        >
                            <p className={`text-sm font-semibold mb-1 ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                                {isCorrect ? "✓ Correct!" : `✗ Incorrect — Answer: ${question.answer}`}
                            </p>
                            <p className="text-xs text-muted-foreground">{question.explanation}</p>
                        </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                        {!showResult ? (
                            <Button
                                variant="glow"
                                className="flex-1"
                                onClick={handleSubmit}
                                disabled={!selectedAnswer && !inputAnswer}
                            >
                                Submit Answer
                            </Button>
                        ) : (
                            <Button
                                variant="glow"
                                className="flex-1"
                                onClick={handleNext}
                            >
                                {currentQ < questions.length - 1 ? "Next Question →" : "See Results"}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// ============ TUTOR CHAT ============
function TutorChat() {
    const [messages, setMessages] = React.useState<ChatMessage[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hi! I'm your AI tutor for Biology 101 — Cell Structure. Ask me anything about cells, organelles, or cellular processes! 🧬",
        },
    ]);
    const [input, setInput] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "Great question! Let me explain that concept using a simple analogy. Think of the cell as a factory — each organelle has a specific job, just like different departments in a factory. The nucleus is like the CEO's office, containing all the instructions (DNA) for running the factory.",
                "That's a really important concept to understand! The mitochondria converts glucose into ATP through a process called cellular respiration. Think of it like a power plant converting fuel into electricity. Without this energy, the cell couldn't perform any of its functions.",
                "Excellent thinking! You're connecting the right dots here. The cell membrane is indeed selectively permeable, meaning it chooses what passes through. Imagine it like a security checkpoint — only authorized molecules can enter or exit.",
            ];
            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: responses[Math.floor(Math.random() * responses.length)],
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 border-white/5">
                <CardContent className="p-0">
                    {/* Chat Messages */}
                    <div className="h-[400px] overflow-y-auto p-6 space-y-4">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${msg.role === "user"
                                        ? "bg-primary text-white rounded-br-md"
                                        : "bg-white/5 border border-white/10 rounded-bl-md"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Suggested Questions */}
                    <div className="px-6 pb-3">
                        <div className="flex flex-wrap gap-2">
                            {["Explain mitochondria", "What is ATP?", "Compare plant & animal cells"].map((q) => (
                                <button
                                    key={q}
                                    onClick={() => setInput(q)}
                                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/5">
                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask your AI tutor..."
                                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <Button variant="glow" size="sm" onClick={handleSend}>
                                Send
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// ============ PODCAST PLAYER ============
function PodcastPlayer() {
    const [isPlaying, setIsPlaying] = React.useState(false);

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 border-white/5">
                <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/25">
                        <Headphones className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Biology 101 — Cell Structure</h3>
                    <p className="text-sm text-muted-foreground mb-6">AI-generated podcast summary • ~5 min</p>

                    {/* Audio controls mock */}
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs text-muted-foreground">0:00</span>
                        <div className="flex-1 h-2 rounded-full bg-white/10 relative overflow-hidden">
                            <div className="h-full w-[30%] bg-gradient-to-r from-primary to-purple-400 rounded-full" />
                        </div>
                        <span className="text-xs text-muted-foreground">5:23</span>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                            ⏮
                        </Button>
                        <Button
                            variant="glow"
                            size="icon"
                            className="rounded-full w-14 h-14"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {isPlaying ? "⏸" : "▶"}
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                            ⏭
                        </Button>
                    </div>

                    <div className="mt-8 text-left">
                        <h4 className="text-sm font-semibold mb-3">Transcript</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Welcome to your study podcast! Today we&apos;re diving into the fascinating world of cell structure.
                            Imagine the cell as a bustling city — every organelle plays a crucial role in keeping things running smoothly.
                            Let&apos;s start with the nucleus, the command center of our cellular city...
                        </p>
                    </div>

                    <div className="mt-6">
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                            🔒 Pro Feature — Upgrade to generate podcasts
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Simple markdown renderer
function renderMarkdown(text: string): string {
    return text
        .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-foreground">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-foreground">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
        .replace(/^- (.*$)/gm, '<li class="ml-4 text-muted-foreground">$1</li>')
        .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 text-muted-foreground">$2</li>')
        .replace(/\n\n/g, '<br/><br/>');
}

