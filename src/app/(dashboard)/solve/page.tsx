"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Camera,
    Upload,
    Sparkles,
    Type,
    Image as ImageIcon,
    ArrowRight,
    Loader2,
    Copy,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SolvePage() {
    const [mode, setMode] = useState<"text" | "image">("text");
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [solution, setSolution] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleSolve = async () => {
        if (!question.trim()) return;
        setIsLoading(true);
        setSolution(null);

        // Simulate AI response
        setTimeout(() => {
            setSolution(`## Step-by-Step Solution

**Problem:** ${question}

### Step 1: Identify the key concept
First, let's identify what this problem is asking us to find.

### Step 2: Set up the approach
We need to apply the relevant formula or concept to solve this.

### Step 3: Calculate
Applying the formula:
- First, we substitute the known values
- Then, we simplify the expression
- Finally, we compute the result

### Step 4: Verify the answer
We can double-check our work by plugging the answer back into the original equation.

### Final Answer
The solution demonstrates a clear understanding of the underlying concepts. Keep practicing! 💪

---
*Tip: Understanding WHY this approach works is more important than memorizing the steps.*`);
            setIsLoading(false);
        }, 2000);
    };

    const handleCopy = () => {
        if (solution) {
            navigator.clipboard.writeText(solution);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                        Homework Solver
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Upload a photo or type your question — get step-by-step solutions instantly
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex items-center gap-2 mb-6">
                    <button
                        onClick={() => setMode("text")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${mode === "text"
                                ? "bg-primary/10 text-primary border border-primary/30"
                                : "bg-white/5 text-muted-foreground hover:bg-white/10"
                            }`}
                    >
                        <Type className="w-4 h-4" />
                        Type Question
                    </button>
                    <button
                        onClick={() => setMode("image")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${mode === "image"
                                ? "bg-primary/10 text-primary border border-primary/30"
                                : "bg-white/5 text-muted-foreground hover:bg-white/10"
                            }`}
                    >
                        <Camera className="w-4 h-4" />
                        Upload Image
                    </button>
                </div>

                {/* Input Area */}
                <Card className="bg-card/50 border-white/5 mb-6">
                    <CardContent className="p-6">
                        {mode === "text" ? (
                            <div className="space-y-4">
                                <Textarea
                                    placeholder="Type or paste your homework question here...&#10;&#10;Example: 'Find the derivative of f(x) = 3x² + 2x - 5'"
                                    className="min-h-[160px] text-base"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                                <Button
                                    variant="glow"
                                    className="w-full sm:w-auto gap-2"
                                    onClick={handleSolve}
                                    disabled={isLoading || !question.trim()}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Solving...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            Solve This
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <p className="text-sm font-medium mb-1">
                                        Drag & drop an image of your problem
                                    </p>
                                    <p className="text-xs text-muted-foreground mb-4">
                                        or click to take a photo / browse files
                                    </p>
                                    <Button variant="outline" size="sm">
                                        <Camera className="w-4 h-4 mr-2" />
                                        Choose Image
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Solution */}
                {solution && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="bg-card/50 border-white/5 border-l-4 border-l-primary">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        <h3 className="font-semibold">AI Solution</h3>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={handleCopy}>
                                        {copied ? (
                                            <>
                                                <CheckCircle className="w-4 h-4 mr-1 text-emerald-400" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 mr-1" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <div
                                    className="prose prose-invert prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: solution
                                            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
                                            .replace(/^### (.*$)/gm, '<h3 class="text-base font-semibold mt-4 mb-2">$1</h3>')
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
                                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                            .replace(/---/g, '<hr class="border-white/10 my-4" />')
                                            .replace(/\n\n/g, '<br/>')
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Usage indicator */}
                <div className="mt-6 text-center">
                    <Badge variant="secondary" className="text-xs">
                        Free: 2/3 solves remaining today · <span className="text-primary cursor-pointer">Upgrade for unlimited</span>
                    </Badge>
                </div>
            </motion.div>
        </div>
    );
}
