"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Bell,
    CreditCard,
    Crown,
    LogOut,
    Moon,
    Palette,
    Shield,
    Sparkles,
    Sun,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
    const [isDark, setIsDark] = React.useState(true);

    return (
        <div className="p-6 lg:p-8 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-muted-foreground text-sm">
                        Manage your account and preferences
                    </p>
                </div>

                {/* Profile Section */}
                <Card className="bg-card/50 border-white/5 mb-6">
                    <CardContent className="p-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-6">
                            <User className="w-5 h-5 text-primary" />
                            Profile
                        </h3>
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                S
                            </div>
                            <div>
                                <p className="font-semibold text-lg">Student User</p>
                                <p className="text-sm text-muted-foreground">student@university.edu</p>
                                <Badge variant="secondary" className="mt-2">Free Plan</Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Name</label>
                                <Input defaultValue="Student User" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <Input defaultValue="student@university.edu" disabled />
                            </div>
                        </div>
                        <Button variant="glow" size="sm" className="mt-4">
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>

                {/* Subscription */}
                <Card className="bg-card/50 border-white/5 mb-6 border-l-4 border-l-primary">
                    <CardContent className="p-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-4">
                            <Crown className="w-5 h-5 text-amber-400" />
                            Subscription
                        </h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm mb-1">You&apos;re on the <strong>Free Plan</strong></p>
                                <p className="text-xs text-muted-foreground">
                                    Upgrade to Pro for unlimited study sets, AI tutoring, podcasts, and more.
                                </p>
                            </div>
                            <Button variant="glow" size="sm" className="gap-1.5">
                                <Sparkles className="w-4 h-4" />
                                Upgrade to Pro — $9.99/mo
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card className="bg-card/50 border-white/5 mb-6">
                    <CardContent className="p-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-6">
                            <Palette className="w-5 h-5 text-primary" />
                            Appearance
                        </h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {isDark ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
                                <div>
                                    <p className="text-sm font-medium">Theme</p>
                                    <p className="text-xs text-muted-foreground">{isDark ? "Dark Mode" : "Light Mode"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDark(!isDark)}
                                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${isDark ? "bg-primary" : "bg-white/20"
                                    }`}
                            >
                                <div
                                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${isDark ? "translate-x-5.5" : "translate-x-0.5"
                                        }`}
                                />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="bg-card/50 border-white/5 mb-6">
                    <CardContent className="p-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-6">
                            <Bell className="w-5 h-5 text-primary" />
                            Notifications
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: "Study reminders", desc: "Get reminded to review your cards", enabled: true },
                                { label: "Progress updates", desc: "Weekly progress summaries", enabled: true },
                                { label: "New features", desc: "Be the first to know about updates", enabled: false },
                            ].map((n) => (
                                <div key={n.label} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">{n.label}</p>
                                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                                    </div>
                                    <div
                                        className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${n.enabled ? "bg-primary" : "bg-white/10"
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${n.enabled ? "translate-x-5.5" : "translate-x-0.5"
                                                }`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="bg-card/50 border-white/5 border-l-4 border-l-red-500">
                    <CardContent className="p-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-4 text-red-400">
                            <Shield className="w-5 h-5" />
                            Account Actions
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" size="sm" className="gap-1.5">
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </Button>
                            <Button variant="destructive" size="sm">
                                Delete Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
