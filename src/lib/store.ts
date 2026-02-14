import { create } from "zustand";

// Types
export interface StudySet {
    id: string;
    title: string;
    subject?: string;
    description?: string;
    sourceType: string;
    isPublic: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    flashcardCount: number;
    quizCount: number;
    noteCount: number;
    progress?: {
        score: number;
        mastered: number;
        familiar: number;
        learning: number;
        unfamiliar: number;
    };
}

export interface Flashcard {
    id: string;
    front: string;
    back: string;
    mastery: "UNFAMILIAR" | "LEARNING" | "FAMILIAR" | "MASTERED";
    position: number;
}

export interface QuizQuestion {
    id: string;
    type: "MULTIPLE_CHOICE" | "FILL_IN_BLANK" | "WRITTEN" | "TRUE_FALSE";
    question: string;
    options: string[];
    answer: string;
    explanation?: string;
    mastery: "UNFAMILIAR" | "LEARNING" | "FAMILIAR" | "MASTERED";
}

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

// App Store
interface AppState {
    // Theme
    isDarkMode: boolean;
    toggleDarkMode: () => void;

    // Study Sets
    studySets: StudySet[];
    setStudySets: (sets: StudySet[]) => void;
    activeStudySet: StudySet | null;
    setActiveStudySet: (set: StudySet | null) => void;

    // Flashcards
    flashcards: Flashcard[];
    setFlashcards: (cards: Flashcard[]) => void;
    currentCardIndex: number;
    setCurrentCardIndex: (index: number) => void;

    // Quiz
    quizQuestions: QuizQuestion[];
    setQuizQuestions: (questions: QuizQuestion[]) => void;

    // Tutor Chat
    tutorMessages: ChatMessage[];
    addTutorMessage: (message: ChatMessage) => void;
    clearTutorMessages: () => void;

    // Upload/Create Modal
    isCreateModalOpen: boolean;
    setCreateModalOpen: (open: boolean) => void;

    // Loading states
    isGenerating: boolean;
    setIsGenerating: (loading: boolean) => void;
    generationProgress: string[];
    addGenerationStep: (step: string) => void;
    clearGenerationProgress: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Theme
    isDarkMode: true,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

    // Study Sets
    studySets: [],
    setStudySets: (sets) => set({ studySets: sets }),
    activeStudySet: null,
    setActiveStudySet: (studySet) => set({ activeStudySet: studySet }),

    // Flashcards
    flashcards: [],
    setFlashcards: (cards) => set({ flashcards: cards }),
    currentCardIndex: 0,
    setCurrentCardIndex: (index) => set({ currentCardIndex: index }),

    // Quiz
    quizQuestions: [],
    setQuizQuestions: (questions) => set({ quizQuestions: questions }),

    // Tutor Chat
    tutorMessages: [],
    addTutorMessage: (message) =>
        set((state) => ({ tutorMessages: [...state.tutorMessages, message] })),
    clearTutorMessages: () => set({ tutorMessages: [] }),

    // Upload/Create Modal
    isCreateModalOpen: false,
    setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),

    // Loading states
    isGenerating: false,
    setIsGenerating: (loading) => set({ isGenerating: loading }),
    generationProgress: [],
    addGenerationStep: (step) =>
        set((state) => ({ generationProgress: [...state.generationProgress, step] })),
    clearGenerationProgress: () => set({ generationProgress: [] }),
}));
