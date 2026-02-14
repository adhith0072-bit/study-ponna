"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Youtube,
    Globe,
    Mic,
    Type,
    Camera,
    Upload,
    Sparkles,
    Check,
    ArrowRight,
    ArrowLeft,
    Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface CreateStudySetModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const sourceTypes = [
    { id: "PDF", label: "PDF Document", icon: FileText, color: "from-red-500 to-orange-500" },
    { id: "YOUTUBE", label: "YouTube Video", icon: Youtube, color: "from-red-500 to-red-600" },
    { id: "LINK", label: "Website URL", icon: Globe, color: "from-blue-500 to-cyan-500" },
    { id: "AUDIO", label: "Audio File", icon: Mic, color: "from-green-500 to-emerald-500" },
    { id: "TEXT", label: "Paste Text", icon: Type, color: "from-purple-500 to-violet-500" },
    { id: "IMAGE", label: "Image / Photo", icon: Camera, color: "from-amber-500 to-orange-500" },
];

export function CreateStudySetModal({ open, onOpenChange }: CreateStudySetModalProps) {
    const [step, setStep] = useState(1);
    const [sourceType, setSourceType] = useState("");
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [pastedText, setPastedText] = useState("");
    const [flashcardCount, setFlashcardCount] = useState(20);
    const [quizTypes, setQuizTypes] = useState({
        mcq: true,
        fillBlank: true,
        written: false,
        trueFalse: true,
    });
    const [isPublic, setIsPublic] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationSteps, setGenerationSteps] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const resetForm = () => {
        setStep(1);
        setSourceType("");
        setTitle("");
        setSubject("");
        setYoutubeUrl("");
        setWebsiteUrl("");
        setPastedText("");
        setFlashcardCount(20);
        setIsGenerating(false);
        setFile(null);
        setGenerationSteps([]);
    };

    const router = useRouter();

    const handleGenerate = async () => {
        if (!title) {
            toast.error("Please enter a title");
            return;
        }

        setStep(4);
        setIsGenerating(true);
        setGenerationSteps(["Initializing..."]);

        try {
            const formData = new FormData();
            formData.append("sourceType", sourceType);
            formData.append("title", title);
            formData.append("subject", subject);
            formData.append("flashcardCount", flashcardCount.toString());

            if (file) {
                formData.append("file", file);
            }
            if (youtubeUrl) {
                formData.append("url", youtubeUrl);
            }
            if (websiteUrl) {
                formData.append("url", websiteUrl);
            }
            if (pastedText) {
                formData.append("text", pastedText);
            }

            // Simulate progress while request is pending
            const progressInterval = setInterval(() => {
                setGenerationSteps((prev) => {
                    const steps = [
                        "Parsing content...",
                        "Extracting key concepts...",
                        "Generating flashcards...",
                        "Creating quiz questions...",
                        "Finalizing study set...",
                    ];
                    const nextStep = steps[prev.length % steps.length];
                    return [...prev, nextStep];
                });
            }, 2000);

            const response = await fetch("/api/study-sets", {
                method: "POST",
                body: formData,
            });

            clearInterval(progressInterval);

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Failed to generate study set");
            }

            const data = await response.json();

            setGenerationSteps((prev) => [...prev, "Done! Redirecting..."]);

            setTimeout(() => {
                onOpenChange(false);
                resetForm();
                router.push(`/study-sets/${data.studySet.id}`);
                router.refresh();
            }, 1000);

        } catch (error) {
            console.error(error);
            toast.error("Failed to generate study set. Please try again.");
            setStep(3); // Go back to config step
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                onOpenChange(v);
                if (!v) resetForm();
            }}
        >
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Create Study Set
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1 && "Choose your content source"}
                        {step === 2 && "Upload or paste your content"}
                        {step === 3 && "Configure your study set"}
                        {step === 4 && "Generating your study materials..."}
                    </DialogDescription>
                </DialogHeader>

                {/* Progress indicators */}
                {step < 4 && (
                    <div className="flex items-center gap-2 mb-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-2 flex-1">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${s < step
                                        ? "bg-primary text-white"
                                        : s === step
                                            ? "bg-primary/20 text-primary border-2 border-primary"
                                            : "bg-white/5 text-muted-foreground"
                                        }`}
                                >
                                    {s < step ? <Check className="w-4 h-4" /> : s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`flex-1 h-0.5 rounded-full ${s < step ? "bg-primary" : "bg-white/10"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {/* Step 1: Choose Source */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                        >
                            {sourceTypes.map((source) => (
                                <button
                                    key={source.id}
                                    onClick={() => {
                                        setSourceType(source.id);
                                        setStep(2);
                                    }}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.02] ${sourceType === source.id
                                        ? "border-primary bg-primary/10"
                                        : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                                        }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${source.color} flex items-center justify-center text-white`}
                                    >
                                        <source.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-medium">{source.label}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* Step 2: Upload/Input */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            {sourceType === "PDF" && (
                                <div
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${file ? "border-primary bg-primary/5" : "border-white/20 hover:border-primary/50"
                                        }`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                    />
                                    {file ? (
                                        <>
                                            <FileText className="w-10 h-10 mx-auto mb-3 text-primary" />
                                            <p className="text-sm font-medium mb-1 text-primary">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                                            <p className="text-sm font-medium mb-1">
                                                Click to upload PDF
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                max 50MB
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}

                            {sourceType === "YOUTUBE" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">YouTube URL</label>
                                    <Input
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        value={youtubeUrl}
                                        onChange={(e) => setYoutubeUrl(e.target.value)}
                                    />
                                </div>
                            )}

                            {sourceType === "LINK" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Website URL</label>
                                    <Input
                                        placeholder="https://example.com/article"
                                        value={websiteUrl}
                                        onChange={(e) => setWebsiteUrl(e.target.value)}
                                    />
                                </div>
                            )}

                            {sourceType === "AUDIO" && (
                                <div
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${file ? "border-primary bg-primary/5" : "border-white/20 hover:border-primary/50"
                                        }`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                    />
                                    {file ? (
                                        <>
                                            <Mic className="w-10 h-10 mx-auto mb-3 text-primary" />
                                            <p className="text-sm font-medium mb-1 text-primary">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                                            <p className="text-sm font-medium mb-1">
                                                Upload audio file
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                MP3, WAV, M4A (max 25MB)
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}

                            {sourceType === "TEXT" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Paste your content</label>
                                    <Textarea
                                        placeholder="Paste your study material, lecture notes, or any text content here..."
                                        className="min-h-[200px]"
                                        value={pastedText}
                                        onChange={(e) => setPastedText(e.target.value)}
                                    />
                                </div>
                            )}

                            {sourceType === "IMAGE" && (
                                <div
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${file ? "border-primary bg-primary/5" : "border-white/20 hover:border-primary/50"
                                        }`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                    />
                                    {file ? (
                                        <>
                                            <Camera className="w-10 h-10 mx-auto mb-3 text-primary" />
                                            <p className="text-sm font-medium mb-1 text-primary">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Camera className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                                            <p className="text-sm font-medium mb-1">
                                                Upload image or photo
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                JPG, PNG, WEBP (max 10MB)
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" onClick={() => setStep(1)}>
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back
                                </Button>
                                <Button
                                    variant="glow"
                                    className="flex-1"
                                    onClick={() => setStep(3)}
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Configure */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    placeholder="e.g., Biology 101 — Cell Structure"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subject</label>
                                <div className="flex flex-wrap gap-2">
                                    {["Biology", "Chemistry", "Physics", "Math", "History", "CS", "Languages", "Other"].map(
                                        (s) => (
                                            <button
                                                key={s}
                                                onClick={() => setSubject(s)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${subject === s
                                                    ? "bg-primary/20 text-primary border border-primary/30"
                                                    : "bg-white/5 text-muted-foreground border border-transparent hover:bg-white/10"
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Flashcard count: {flashcardCount}
                                </label>
                                <input
                                    type="range"
                                    min={5}
                                    max={50}
                                    value={flashcardCount}
                                    onChange={(e) => setFlashcardCount(Number(e.target.value))}
                                    className="w-full accent-primary"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>5</span>
                                    <span>50</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Quiz types</label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { key: "mcq", label: "Multiple Choice" },
                                        { key: "fillBlank", label: "Fill in Blank" },
                                        { key: "written", label: "Written" },
                                        { key: "trueFalse", label: "True/False" },
                                    ].map((qt) => (
                                        <button
                                            key={qt.key}
                                            onClick={() =>
                                                setQuizTypes((prev) => ({
                                                    ...prev,
                                                    [qt.key]: !prev[qt.key as keyof typeof prev],
                                                }))
                                            }
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${quizTypes[qt.key as keyof typeof quizTypes]
                                                ? "bg-primary/20 text-primary border border-primary/30"
                                                : "bg-white/5 text-muted-foreground border border-transparent hover:bg-white/10"
                                                }`}
                                        >
                                            {quizTypes[qt.key as keyof typeof quizTypes] && (
                                                <Check className="w-3 h-3 inline mr-1" />
                                            )}
                                            {qt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Make public</label>
                                <button
                                    onClick={() => setIsPublic(!isPublic)}
                                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${isPublic ? "bg-primary" : "bg-white/10"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${isPublic ? "translate-x-5.5" : "translate-x-0.5"
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" onClick={() => setStep(2)}>
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back
                                </Button>
                                <Button
                                    variant="glow"
                                    className="flex-1"
                                    onClick={handleGenerate}
                                >
                                    <Sparkles className="w-4 h-4 mr-1" />
                                    Generate Study Set
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Generating */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-8"
                        >
                            <div className="text-center mb-8">
                                {isGenerating ? (
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
                                        <Sparkles className="w-8 h-8 text-white" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-white" />
                                    </div>
                                )}
                                <h3 className="text-lg font-bold mb-1">
                                    {isGenerating
                                        ? "Creating your study set..."
                                        : "Study set ready!"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {isGenerating
                                        ? "Our AI is working its magic"
                                        : "Redirecting to your new study set..."}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {generationSteps.map((gStep, index) => (
                                    <motion.div
                                        key={gStep}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-sm">{gStep}</span>
                                    </motion.div>
                                ))}
                                {isGenerating && (
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                                        <span className="text-sm text-muted-foreground">
                                            Processing...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
