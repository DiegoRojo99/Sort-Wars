import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGame } from '../context/GameContext';
import { RoundSummary } from '../components/RoundSummary';

type RootStackParamList = {
  Home: undefined;
  GameSetup: undefined;
  Game: undefined;
  Results: undefined;
};

type ResultsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Results'>;
};

export function ResultsScreen({ navigation }: ResultsScreenProps) {
  const { gameState, resetGame } = useGame();

  const winner = gameState.teams.reduce((prev, current) =>
    current.score > prev.score ? current : prev
  );

  const isTie = gameState.teams.every(team => team.score === winner.score);

  const handlePlayAgain = () => {
    resetGame();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Game Over!</Text>
        {isTie ? (
          <Text style={styles.winnerText}>It's a Tie! 🤝</Text>
        ) : (
          <Text style={styles.winnerText}>🏆 {winner.name} Wins! 🏆</Text>
        )}
      </View>

      <View style={styles.scoresContainer}>
        {gameState.teams.map(team => (
          <View
            key={team.id}
            style={[
              styles.teamScore,
              team.id === winner.id && !isTie && styles.winnerScore,
            ]}
          >
            <Text style={styles.teamName}>{team.name}</Text>
            <Text style={styles.score}>{team.score}</Text>
            <Text style={styles.scoreLabel}>points</Text>
          </View>
        ))}
      </View>

      <Text style={styles.summaryTitle}>Round Summary</Text>
      <ScrollView style={styles.summaryContainer}>
        {gameState.rounds.map((round, index) => {
          const team = gameState.teams.find(t => t.id === round.teamId);
          return team ? (
            <RoundSummary key={round.id} round={round} team={team} />
          ) : null;
        })}
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.playAgainButton}
          onPress={handlePlayAgain}
        >
          <Text style={styles.playAgainText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            resetGame();
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
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
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  winnerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  teamScore: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    minWidth: 150,
  },
  winnerScore: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
    borderWidth: 2,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007bff',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  summaryContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  actions: {
    padding: 16,
    backgroundColor: '#fff',
  },
  playAgainButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  playAgainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    padding: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});
