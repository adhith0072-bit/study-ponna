"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  FileText,
  Headphones,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Star,
  Upload,
  Zap,
  Check,
  ArrowRight,
  GraduationCap,
  Users,
  Trophy,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Flashcards",
    description:
      "Generate smart flashcards from any content. Our AI creates perfect questions that maximize retention.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Adaptive Quizzes",
    description:
      "MCQ, fill-in-the-blank, written & true/false. AI-graded with explanations and spaced repetition.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI Tutor",
    description:
      "Chat with an AI tutor that understands your material. Socratic method meets infinite patience.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Homework Solver",
    description:
      "Upload a photo or type your question. Get step-by-step solutions with clear explanations.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Study Podcasts",
    description:
      "Transform your notes into engaging podcast episodes. Learn on-the-go with AI-generated audio.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Paper Grader",
    description:
      "Get instant feedback on essays and papers. AI grading with detailed rubric breakdowns.",
    color: "from-violet-500 to-purple-500",
  },
];

const sources = [
  { icon: "📄", label: "PDFs" },
  { icon: "🎬", label: "YouTube" },
  { icon: "🔗", label: "Websites" },
  { icon: "🎙️", label: "Audio" },
  { icon: "📝", label: "Text" },
  { icon: "📷", label: "Images" },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Medical Student",
    text: "Study Ponna turned my 200-page pathology notes into perfect flashcards in minutes. My exam scores jumped 15%!",
    avatar: "SK",
    rating: 5,
  },
  {
    name: "James L.",
    role: "CS Major",
    text: "The AI tutor actually understands my algorithms textbook. It's like having a TA available 24/7.",
    avatar: "JL",
    rating: 5,
  },
  {
    name: "Maya R.",
    role: "Law Student",
    text: "I upload case studies and get instant flashcards + quizzes. This app saved my bar exam prep.",
    avatar: "MR",
    rating: 5,
  },
];

const stats = [
  { value: "1M+", label: "Students" },
  { value: "50M+", label: "Flashcards Created" },
  { value: "95%", label: "Pass Rate" },
  { value: "4.9★", label: "App Rating" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-coral/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[100px] animate-glow-pulse" style={{ animationDelay: "3s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Study<span className="gradient-text">Forge</span>{" "}
              <span className="text-xs font-medium text-muted-foreground">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="glow" size="sm">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 grid-pattern">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Trusted by 1M+ students worldwide
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
              variants={fadeInUp}
            >
              Study Smarter with{" "}
              <span className="gradient-text">AI-Powered</span> Learning
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              variants={fadeInUp}
            >
              Upload anything — PDFs, YouTube videos, slides, audio — and instantly
              get AI-generated flashcards, quizzes, notes, tutoring, and more.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              variants={fadeInUp}
            >
              <Link href="/register">
                <Button variant="glow" size="xl" className="group">
                  Start Studying Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="xl">
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            {/* Source type pills */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3"
              variants={fadeInUp}
            >
              <span className="text-sm text-muted-foreground mr-2">Works with:</span>
              {sources.map((source) => (
                <div
                  key={source.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-default"
                >
                  <span>{source.icon}</span>
                  <span>{source.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual — Floating Cards Preview */}
          <motion.div
            className="relative mt-20 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl shadow-primary/5 p-8 overflow-hidden">
              {/* Mock dashboard preview */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="col-span-2 rounded-xl bg-white/5 p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Biology 101 — Cell Structure</h3>
                      <p className="text-xs text-muted-foreground">24 flashcards · 15 quiz questions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[72%] bg-gradient-to-r from-primary to-emerald-500 rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-emerald-400">72%</span>
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 p-6 border border-white/5 flex flex-col items-center justify-center gap-2">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-emerald-400" />
                  </div>
                  <span className="text-xs font-medium text-emerald-400">12 Mastered</span>
                </div>
              </div>

              {/* Mock flashcard */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/10 p-6 border border-primary/20">
                  <p className="text-xs text-primary mb-2 font-medium">FLASHCARD</p>
                  <p className="font-semibold text-sm">What is the powerhouse of the cell?</p>
                  <div className="mt-4 flex gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-xs">Learning</span>
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/10 p-6 border border-emerald-500/20">
                  <p className="text-xs text-emerald-400 mb-2 font-medium">AI TUTOR</p>
                  <p className="text-sm text-muted-foreground">Great question! The mitochondria is often called the &quot;powerhouse&quot; because it produces ATP...</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400">
                    <Sparkles className="w-3 h-3" />
                    <span>AI-powered explanation</span>
                  </div>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Powerful Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Ace Your Exams</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Six powerful AI tools that transform how you study. From content to mastery in minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full bg-card/50 hover:bg-card/80 border-white/5 hover:border-white/15 transition-all duration-500">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              Simple & Fast
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three Steps to <span className="gradient-text">Better Grades</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Content",
                description: "Drop a PDF, paste a YouTube link, or type your notes. We accept any study material.",
                icon: <Upload className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "AI Generates Materials",
                description: "Our AI creates flashcards, quizzes, notes, and podcast summaries in seconds.",
                icon: <Sparkles className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Study & Master",
                description: "Use spaced repetition, AI tutoring, and adaptive quizzes to master every concept.",
                icon: <GraduationCap className="w-6 h-6" />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/10 border border-primary/20 mb-6">
                    <span className="text-primary">{item.icon}</span>
                  </div>
                  <div className="text-xs font-bold text-primary mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-muted-foreground/30">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              Student Reviews
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Students Everywhere</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-white/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white text-sm font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              💰 Simple Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start Free, <span className="gradient-text">Upgrade Anytime</span>
            </h2>
            <p className="text-muted-foreground">
              No credit card required. Get started in 30 seconds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 border-white/5">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-2">Free</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "3 Study Sets",
                      "10 Flashcards per set",
                      "5 AI Tutor messages/day",
                      "3 Solve uses/day",
                      "Public sharing",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <Button variant="outline" className="w-full" size="lg">
                      Get Started Free
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 border-primary/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-400" />
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">Pro</h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      Most Popular
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Unlimited Study Sets",
                      "50+ Flashcards per set",
                      "Unlimited AI Tutor",
                      "Unlimited Solver",
                      "Podcast generation",
                      "Paper grader",
                      "YouTube import",
                      "Audio transcription",
                      "Priority AI processing",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <Button variant="glow" className="w-full" size="lg">
                      Start Pro Trial
                      <Sparkles className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Study Game?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join over 1 million students who are studying smarter, not harder.
              Get started in under 30 seconds.
            </p>
            <Link href="/register">
              <Button variant="glow" size="xl" className="group">
                Create Your First Study Set
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">
                Study Ponna <span className="text-muted-foreground font-normal">AI</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Study Ponna. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
