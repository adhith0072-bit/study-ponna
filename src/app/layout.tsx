import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Study Ponna — AI-Powered Study Platform",
  description:
    "Transform any content into interactive study sets. AI-powered flashcards, quizzes, tutoring, and more. Trusted by 1M+ students.",
  keywords: [
    "study",
    "AI",
    "flashcards",
    "quiz",
    "tutor",
    "education",
    "learning",
  ],
};

import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
