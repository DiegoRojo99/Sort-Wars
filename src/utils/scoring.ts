import { Answer } from '../types/game';

/**
 * Calculate points earned for a new attempt
 * Points are only awarded for newly correct positions
 */
export function calculatePoints(
  currentAttempt: Answer[],
  previousCorrectPositions: number[]
): { points: number; correctPositions: number[] } {
  const correctPositions: number[] = [];
  
  currentAttempt.forEach((answer, index) => {
    if (answer.correctPosition === index) {
      correctPositions.push(index);
    }
  });

  // Only count positions that weren't correct before
  const newCorrectPositions = correctPositions.filter(
    pos => !previousCorrectPositions.includes(pos)
  );

  return {
    points: newCorrectPositions.length,
    correctPositions: [...previousCorrectPositions, ...newCorrectPositions]
  };
}

/**
 * Check if all answers are in correct positions
 */
export function isAllCorrect(attempt: Answer[]): boolean {
  return attempt.every((answer, index) => answer.correctPosition === index);
}
