"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Brain,
    Headphones,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Sparkles,
    TrendingUp,
    X,
    Zap,
    Camera,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

const navItems = [
    {
        label: "Study Sets",
        href: "/study-sets",
        icon: BookOpen,
    },
    {
        label: "Solve",
        href: "/solve",
        icon: Camera,
    },
    {
        label: "Progress",
        href: "/progress",
        icon: TrendingUp,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { setCreateModalOpen } = useAppStore();

    return (
        <div className="min-h-screen bg-background flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-card/30 backdrop-blur-xl fixed inset-y-0 left-0 z-40">
                {/* Logo */}
                <div className="p-6 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold">
                            Study<span className="gradient-text">Forge</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary/10 text-primary shadow-sm"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Create Button */}
                <div className="p-4 border-t border-white/5">
                    <Button
                        variant="glow"
                        className="w-full gap-2"
                        onClick={() => setCreateModalOpen(true)}
                    >
                        <Sparkles className="w-4 h-4" />
                        Create Study Set
                    </Button>
                </div>

                {/* User */}
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white text-sm font-bold">
                            S
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Student</p>
                            <p className="text-xs text-muted-foreground truncate">Free Plan</p>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Top Bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold">Study Ponna</span>
                    </Link>
                    <Button
                        size="sm"
                        variant="glow"
                        onClick={() => setCreateModalOpen(true)}
                    >
                        <Sparkles className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.aside
                            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-white/5"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-white/5">
                                <Link href="/" className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
                                        <Zap className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-bold">Study Ponna</span>
                                </Link>
                                <button onClick={() => setSidebarOpen(false)}>
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="p-4 space-y-1">
                                {navItems.map((item) => {
                                    const isActive = pathname.startsWith(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-muted-foreground hover:bg-white/5"
                                            )}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                <div className="pt-16 lg:pt-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
