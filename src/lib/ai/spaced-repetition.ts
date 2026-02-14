/**
 * SM-2 Spaced Repetition Algorithm
 * Based on the SuperMemo SM-2 algorithm for optimal review scheduling.
 */

export type MasteryLevel = "UNFAMILIAR" | "LEARNING" | "FAMILIAR" | "MASTERED";

export interface ReviewResult {
    interval: number; // days until next review
    newEaseFactor: number;
    newRepetitions: number;
    masteryLevel: MasteryLevel;
}

/**
 * Calculate the next review interval using SM-2 algorithm.
 *
 * @param easeFactor - Current ease factor (starts at 2.5, min 1.3)
 * @param repetitions - Number of consecutive successful reviews
 * @param rating - Quality rating 0-5 (0=complete blackout, 5=perfect recall)
 * @returns Next review interval in days, updated ease factor, and mastery level
 */
export function calculateNextReview(
    easeFactor: number,
    repetitions: number,
    rating: number
): ReviewResult {
    // Failed recall (rating < 3) — reset to beginning
    if (rating < 3) {
        return {
            interval: 1,
            newEaseFactor: Math.max(1.3, easeFactor - 0.2),
            newRepetitions: 0,
            masteryLevel: getMasteryLevel(0),
        };
    }

    // Successful recall
    let interval: number;
    if (repetitions === 0) {
        interval = 1;
    } else if (repetitions === 1) {
        interval = 6;
    } else {
        interval = Math.round(easeFactor * (repetitions - 1) * 6);
    }

    const newEaseFactor = Math.max(
        1.3,
        easeFactor + 0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)
    );

    const newRepetitions = repetitions + 1;

    return {
        interval,
        newEaseFactor,
        newRepetitions,
        masteryLevel: getMasteryLevel(newRepetitions),
    };
}

/**
 * Determine mastery level based on consecutive correct responses.
 */
export function getMasteryLevel(consecutiveCorrect: number): MasteryLevel {
    if (consecutiveCorrect === 0) return "UNFAMILIAR";
    if (consecutiveCorrect <= 1) return "LEARNING";
    if (consecutiveCorrect <= 3) return "FAMILIAR";
    return "MASTERED";
}

/**
 * Map user UI action to SM-2 rating.
 */
export function actionToRating(action: string): number {
    switch (action) {
        case "still_learning":
            return 1; // Failed
        case "getting_there":
            return 3; // Barely correct
        case "almost":
            return 4; // Good
        case "mastered":
            return 5; // Perfect
        default:
            return 3;
    }
}

/**
 * Calculate the next review date from now.
 */
export function getNextReviewDate(intervalDays: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + intervalDays);
    return date;
}
