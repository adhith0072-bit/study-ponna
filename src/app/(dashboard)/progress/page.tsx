"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    BookOpen,
    Brain,
    Calendar,
    Flame,
    Target,
    TrendingUp,
    Trophy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const weeklyData = [
    { day: "Mon", count: 45 },
    { day: "Tue", count: 32 },
    { day: "Wed", count: 28 },
    { day: "Thu", count: 50 },
    { day: "Fri", count: 18 },
    { day: "Sat", count: 40 },
    { day: "Sun", count: 35 },
];

const recentActivity = [
    { title: "Biology 101 — Cell Structure", action: "Studied flashcards", time: "2 hours ago", mastered: 3 },
    { title: "Organic Chemistry Reactions", action: "Completed quiz", time: "5 hours ago", mastered: 5 },
    { title: "Data Structures & Algorithms", action: "AI Tutor session", time: "1 day ago", mastered: 2 },
    { title: "World History — WWII", action: "Studied flashcards", time: "2 days ago", mastered: 1 },
];

export default function ProgressPage() {
    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Progress</h1>
                    <p className="text-muted-foreground text-sm">
                        Track your learning journey and celebrate your achievements
                    </p>
                </div>

                {/* Top Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        {
                            icon: Flame,
                            label: "Study Streak",
                            value: "7 days",
                            color: "text-orange-400",
                            bg: "bg-orange-500/20",
                        },
                        {
                            icon: BookOpen,
                            label: "Cards Studied",
                            value: "248",
                            color: "text-purple-400",
                            bg: "bg-purple-500/20",
                        },
                        {
                            icon: Trophy,
                            label: "Mastered",
                            value: "67",
                            color: "text-emerald-400",
                            bg: "bg-emerald-500/20",
                        },
                        {
                            icon: Target,
                            label: "Accuracy",
                            value: "84%",
                            color: "text-blue-400",
                            bg: "bg-blue-500/20",
                        },
                    ].map((stat) => (
                        <Card key={stat.label} className="bg-card/50 border-white/5">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Weekly Activity Chart */}
                    <Card className="bg-card/50 border-white/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                    Weekly Activity
                                </h3>
                                <Badge variant="secondary">This Week</Badge>
                            </div>
                            <div className="flex items-end justify-between gap-2 h-40">
                                {weeklyData.map((d) => {
                                    const maxCount = Math.max(...weeklyData.map((w) => w.count));
                                    const height = (d.count / maxCount) * 100;
                                    return (
                                        <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {d.count}
                                            </span>
                                            <motion.div
                                                className="w-full rounded-t-lg bg-gradient-to-t from-primary to-purple-400 min-h-[4px]"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                            />
                                            <span className="text-xs text-muted-foreground">
                                                {d.day}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mastery Overview */}
                    <Card className="bg-card/50 border-white/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-primary" />
                                    Mastery Overview
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { level: "Mastered", count: 67, total: 150, color: "bg-mastery-mastered", textColor: "text-mastery-mastered" },
                                    { level: "Familiar", count: 35, total: 150, color: "bg-mastery-familiar", textColor: "text-mastery-familiar" },
                                    { level: "Learning", count: 28, total: 150, color: "bg-mastery-learning", textColor: "text-mastery-learning" },
                                    { level: "Unfamiliar", count: 20, total: 150, color: "bg-mastery-unfamiliar", textColor: "text-mastery-unfamiliar" },
                                ].map((m) => (
                                    <div key={m.level}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className={`text-sm font-medium ${m.textColor}`}>{m.level}</span>
                                            <span className="text-sm text-muted-foreground">{m.count} items</span>
                                        </div>
                                        <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full ${m.color}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(m.count / m.total) * 100}%` }}
                                                transition={{ duration: 0.6 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mastery Pie (simple) */}
                            <div className="flex items-center justify-center mt-6">
                                <div className="relative w-32 h-32">
                                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="12" strokeDasharray={`${(67 / 150) * 251.3} 251.3`} strokeLinecap="round" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="12" strokeDasharray={`${(35 / 150) * 251.3} 251.3`} strokeDashoffset={`-${(67 / 150) * 251.3}`} strokeLinecap="round" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="12" strokeDasharray={`${(28 / 150) * 251.3} 251.3`} strokeDashoffset={`-${((67 + 35) / 150) * 251.3}`} strokeLinecap="round" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="12" strokeDasharray={`${(20 / 150) * 251.3} 251.3`} strokeDashoffset={`-${((67 + 35 + 28) / 150) * 251.3}`} strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold">45%</span>
                                        <span className="text-xs text-muted-foreground">Mastered</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-card/50 border-white/5 mt-6">
                    <CardContent className="p-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-6">
                            <Calendar className="w-5 h-5 text-primary" />
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{activity.title}</p>
                                            <p className="text-xs text-muted-foreground">{activity.action} · {activity.time}</p>
                                        </div>
                                    </div>
                                    <Badge variant="mastered" className="text-xs">
                                        +{activity.mastered} mastered
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
