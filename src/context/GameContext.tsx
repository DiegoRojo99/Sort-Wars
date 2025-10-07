import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, Team, Round, Answer } from '../types/game';
import { mockQuestions } from '../utils/questions';
import { calculatePoints } from '../utils/scoring';

interface GameContextType {
  gameState: GameState;
  startGame: (team1Name: string, team2Name: string) => void;
  submitAnswer: (answers: Answer[]) => void;
  nextRound: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGameState: GameState = {
  teams: [],
  currentQuestionIndex: 0,
  currentTeamIndex: 0,
  rounds: [],
  gamePhase: 'setup',
  currentRound: 1,
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = (team1Name: string, team2Name: string) => {
    const teams: Team[] = [
      { id: '1', name: team1Name, score: 0 },
      { id: '2', name: team2Name, score: 0 },
    ];

    setGameState({
      ...initialGameState,
      teams,
      gamePhase: 'playing',
    });
  };

  const submitAnswer = (answers: Answer[]) => {
    const currentQuestion = mockQuestions[gameState.currentQuestionIndex];
    const currentTeam = gameState.teams[gameState.currentTeamIndex];
    
    // Find previous correct positions for this question
    const previousRounds = gameState.rounds.filter(
      r => r.questionId === currentQuestion.id
    );
    const previousCorrectPositions = previousRounds.length > 0
      ? previousRounds[previousRounds.length - 1].correctPositions
      : [];

    // Calculate points
    const { points, correctPositions } = calculatePoints(
      answers,
      previousCorrectPositions
    );

    // Create new round
    const newRound: Round = {
      id: `round-${Date.now()}`,
      questionId: currentQuestion.id,
      teamId: currentTeam.id,
      attempts: [answers],
      correctPositions,
      pointsEarned: points,
      isRebound: gameState.rounds.filter(r => r.questionId === currentQuestion.id).length > 0,
    };

    // Update team score
    const updatedTeams = gameState.teams.map(team =>
      team.id === currentTeam.id
        ? { ...team, score: team.score + points }
        : team
    );

    setGameState({
      ...gameState,
      teams: updatedTeams,
      rounds: [...gameState.rounds, newRound],
    });
  };

  const nextRound = () => {
    const roundsForCurrentQuestion = gameState.rounds.filter(
      r => r.questionId === mockQuestions[gameState.currentQuestionIndex].id
    );

    // Check if we completed 3 rounds for current question (A -> B -> A)
    if (roundsForCurrentQuestion.length >= 3) {
      // Move to next question
      const nextQuestionIndex = gameState.currentQuestionIndex + 1;
      
      if (nextQuestionIndex >= mockQuestions.length) {
        // Game finished
        setGameState({
          ...gameState,
          gamePhase: 'finished',
        });
      } else {
        // Next question, reset to team A
        setGameState({
          ...gameState,
          currentQuestionIndex: nextQuestionIndex,
          currentTeamIndex: 0,
          currentRound: 1,
        });
      }
    } else {
      // Switch teams or continue round sequence
      const nextTeamIndex = roundsForCurrentQuestion.length === 1 ? 1 : 0;
      const nextRoundNumber = roundsForCurrentQuestion.length + 1;
      
      setGameState({
        ...gameState,
        currentTeamIndex: nextTeamIndex,
        currentRound: nextRoundNumber,
      });
    }
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        submitAnswer,
        nextRound,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
