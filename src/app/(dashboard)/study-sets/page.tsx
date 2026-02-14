"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    BookOpen,
    Brain,
    FileText,
    Plus,
    Search,
    Sparkles,
    Filter,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/lib/store";
import { CreateStudySetModal } from "@/components/study-sets/CreateStudySetModal";

const subjects = [
    "All",
    "Biology",
    "Chemistry",
    "Physics",
    "Math",
    "History",
    "CS",
    "Languages",
    "Psychology",
];

// Demo data for UI preview
const demoStudySets = [
    {
        id: "demo-1",
        title: "Biology 101 — Cell Structure",
        subject: "Biology",
        description: "Complete guide to cell organelles, functions, and processes",
        sourceType: "PDF",
        tags: ["biology", "cells", "exam-prep"],
        flashcardCount: 24,
        quizCount: 15,
        noteCount: 1,
        progress: 72,
        mastery: { mastered: 12, familiar: 6, learning: 4, unfamiliar: 2 },
        createdAt: "2024-01-15",
        isPublic: true,
    },
    {
        id: "demo-2",
        title: "Organic Chemistry Reactions",
        subject: "Chemistry",
        description: "Key organic chemistry reactions and mechanisms",
        sourceType: "TEXT",
        tags: ["chemistry", "organic", "reactions"],
        flashcardCount: 35,
        quizCount: 20,
        noteCount: 1,
        progress: 45,
        mastery: { mastered: 8, familiar: 7, learning: 12, unfamiliar: 8 },
        createdAt: "2024-01-12",
        isPublic: false,
    },
    {
        id: "demo-3",
        title: "Data Structures & Algorithms",
        subject: "CS",
        description: "Trees, graphs, sorting algorithms, and Big-O complexity",
        sourceType: "YOUTUBE",
        tags: ["cs", "algorithms", "coding"],
        flashcardCount: 40,
        quizCount: 25,
        noteCount: 2,
        progress: 88,
        mastery: { mastered: 30, familiar: 5, learning: 3, unfamiliar: 2 },
        createdAt: "2024-01-10",
        isPublic: true,
    },
    {
        id: "demo-4",
        title: "World History — WWII Key Events",
        subject: "History",
        description: "Major battles, leaders, and turning points of World War II",
        sourceType: "PDF",
        tags: ["history", "wwii", "wars"],
        flashcardCount: 30,
        quizCount: 18,
        noteCount: 1,
        progress: 20,
        mastery: { mastered: 3, familiar: 3, learning: 8, unfamiliar: 16 },
        createdAt: "2024-01-08",
        isPublic: false,
    },
    {
        id: "demo-5",
        title: "Calculus II — Integration Techniques",
        subject: "Math",
        description: "Integration by parts, partial fractions, and trigonometric substitutions",
        sourceType: "TEXT",
        tags: ["math", "calculus", "integration"],
        flashcardCount: 20,
        quizCount: 12,
        noteCount: 1,
        progress: 60,
        mastery: { mastered: 8, familiar: 4, learning: 5, unfamiliar: 3 },
        createdAt: "2024-01-05",
        isPublic: true,
    },
    {
        id: "demo-6",
        title: "Spanish Vocabulary — Travel",
        subject: "Languages",
        description: "Essential Spanish phrases and vocabulary for traveling",
        sourceType: "MANUAL",
        tags: ["spanish", "language", "travel"],
        flashcardCount: 50,
        quizCount: 30,
        noteCount: 1,
        progress: 35,
        mastery: { mastered: 10, familiar: 7, learning: 15, unfamiliar: 18 },
        createdAt: "2024-01-03",
        isPublic: true,
    },
];

const sourceIcons: Record<string, string> = {
    PDF: "📄",
    TEXT: "📝",
    YOUTUBE: "🎬",
    AUDIO: "🎙️",
    IMAGE: "📷",
    LINK: "🔗",
    MANUAL: "✏️",
};

export default function StudySetsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSubject, setActiveSubject] = useState("All");
    const [activeTab, setActiveTab] = useState<"my" | "public" | "recent">("my");
    const { isCreateModalOpen, setCreateModalOpen } = useAppStore();

    const filteredSets = demoStudySets.filter((set) => {
        const matchesSearch =
            set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            set.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject =
            activeSubject === "All" || set.subject === activeSubject;
        return matchesSearch && matchesSubject;
    });

    return (
        <>
            <div className="p-6 lg:p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Study Sets</h1>
                        <p className="text-muted-foreground text-sm">
                            Create, browse, and master your study materials
                        </p>
                    </div>
                    <Button
                        variant="glow"
                        className="gap-2"
                        onClick={() => setCreateModalOpen(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Create Study Set
                    </Button>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search study sets..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {["my", "public", "recent"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as typeof activeTab)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${activeTab === tab
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                                    }`}
                            >
                                {tab === "my" ? "My Sets" : tab === "public" ? "Public" : "Recent"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Subject Filter Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {subjects.map((subject) => (
                        <button
                            key={subject}
                            onClick={() => setActiveSubject(subject)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${activeSubject === subject
                                    ? "bg-primary/20 text-primary border border-primary/30"
                                    : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-transparent"
                                }`}
                        >
                            {subject}
                        </button>
                    ))}
                </div>

                {/* Study Set Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSets.map((set, index) => (
                        <motion.div
                            key={set.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link href={`/study-sets/${set.id}`}>
                                <Card className="group h-full bg-card/50 border-white/5 hover:border-primary/20 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                    <CardContent className="p-6">
                                        {/* Source badge + public indicator */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">{sourceIcons[set.sourceType]}</span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {set.subject}
                                                </Badge>
                                            </div>
                                            {set.isPublic && (
                                                <Badge variant="outline" className="text-xs">
                                                    Public
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                            {set.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                                            {set.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="w-3.5 h-3.5" />
                                                {set.flashcardCount} cards
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Brain className="w-3.5 h-3.5" />
                                                {set.quizCount} questions
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FileText className="w-3.5 h-3.5" />
                                                {set.noteCount} notes
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="flex items-center gap-3">
                                            <Progress value={set.progress} className="flex-1 h-2" />
                                            <span className="text-xs font-medium text-primary">
                                                {set.progress}%
                                            </span>
                                        </div>

                                        {/* Mastery mini indicators */}
                                        <div className="flex items-center gap-2 mt-3">
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-mastery-mastered" />
                                                <span className="text-xs text-muted-foreground">{set.mastery.mastered}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-mastery-familiar" />
                                                <span className="text-xs text-muted-foreground">{set.mastery.familiar}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-mastery-learning" />
                                                <span className="text-xs text-muted-foreground">{set.mastery.learning}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-mastery-unfamiliar" />
                                                <span className="text-xs text-muted-foreground">{set.mastery.unfamiliar}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredSets.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No study sets found</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Try a different search or create a new study set
                        </p>
                        <Button variant="glow" onClick={() => setCreateModalOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Study Set
                        </Button>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <CreateStudySetModal
                open={isCreateModalOpen}
                onOpenChange={setCreateModalOpen}
            />
        </>
    );
}
