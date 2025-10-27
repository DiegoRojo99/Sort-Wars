import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGame } from '../context/GameContext';
import { mockQuestions } from '../utils/questions';
import { SortBoard } from '../components/SortBoard';
import { TeamScore } from '../components/TeamScore';
import { Answer } from '../types/game';

type RootStackParamList = {
  Home: undefined;
  GameSetup: undefined;
  Game: undefined;
  Results: undefined;
};

type GameScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
};

export function GameScreen({ navigation }: GameScreenProps) {
  const { gameState, submitAnswer, nextTurnOrRound } = useGame();
  const [showResults, setShowResults] = useState(false);

  if (gameState.gamePhase === 'finished') {
    navigation.replace('Results');
    return null;
  }

  const currentQuestion = mockQuestions[gameState.currentQuestionIndex];
  const currentTeam = gameState.teams[gameState.currentTeamIndex];
  
  // Get correct positions from previous rounds for this question
  const previousRounds = gameState.rounds.filter(
    r => r.questionId === currentQuestion.id
  );
  const correctPositions = previousRounds.length > 0
    ? previousRounds[previousRounds.length - 1].correctPositions
    : [];

  const handleSubmit = (answers: Answer[]) => {
    submitAnswer(answers);
    setShowResults(true);
  };

  const handleNext = () => {
    setShowResults(false);
    nextTurnOrRound();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          Question {gameState.currentQuestionIndex + 1} of {mockQuestions.length}
        </Text>
        <Text style={styles.roundInfo}>
          Round {gameState.currentRound} of 3
        </Text>
      </View>

      <View style={styles.scoresContainer}>
        {gameState.teams.map((team, index) => (
          <TeamScore
            key={team.id}
            team={team}
            isActive={index === gameState.currentTeamIndex}
          />
        ))}
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.currentTeam}>{currentTeam.name}'s Turn</Text>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
      </View>

      {!showResults ? (
        <SortBoard
          answers={currentQuestion.answers}
          onSubmit={handleSubmit}
        />
      ) : (
        <View style={styles.resultsContainer}>
          <SortBoard
            answers={currentQuestion.answers}
            correctPositions={correctPositions}
            showResults
          />
          <View style={styles.resultsInfo}>
            <Text style={styles.resultsText}>
              Correct Positions: {correctPositions.length} / 6
            </Text>
            <Text style={styles.resultsText}>
              Points Earned: {gameState.rounds[gameState.rounds.length - 1]?.pointsEarned || 0}
            </Text>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {/* Show 'Next Turn' or 'Next Round' depending on progress */}
              {(() => {
                const roundsForCurrentQuestion = gameState.rounds.filter(
                  r => r.questionId === currentQuestion.id
                );
                const turnsTaken = roundsForCurrentQuestion.length;
                const lastAttempt = turnsTaken > 0 ? roundsForCurrentQuestion[turnsTaken - 1].attempts[0] : null;
                const allCorrect = lastAttempt ? require('../utils/scoring').isAllCorrect(lastAttempt) : false;
                if (allCorrect || turnsTaken >= 3) {
                  return 'Next Round';
                } else {
                  return 'Next Turn';
                }
              })()}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 16,
    alignItems: 'center',
  },
  questionNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roundInfo: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
  },
  questionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  currentTeam: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsInfo: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 4,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
