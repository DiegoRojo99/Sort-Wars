export interface Answer {
  id: string;
  text: string;
  correctPosition: number;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Team {
  id: string;
  name: string;
  score: number;
}

export interface Round {
  id: string;
  questionId: string;
  teamId: string;
  attempts: Answer[][];
  correctPositions: number[];
  pointsEarned: number;
  isRebound: boolean;
}

export interface GameState {
  teams: Team[];
  currentQuestionIndex: number;
  currentTeamIndex: number;
  rounds: Round[];
  gamePhase: 'setup' | 'playing' | 'finished';
  currentRound: number;
}
