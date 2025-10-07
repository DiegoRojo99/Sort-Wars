import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  GameSetup: undefined;
  Game: undefined;
  Results: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚔️ Sort Wars</Text>
      <Text style={styles.subtitle}>
        Battle to sort answers correctly!
      </Text>
      <Text style={styles.description}>
        Two teams compete to sort six answers in the correct order.
        Earn points for every new correct position across three rounds (A → B → A).
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('GameSetup')}
      >
        <Text style={styles.startButtonText}>Start New Game</Text>
      </TouchableOpacity>
      <View style={styles.rules}>
        <Text style={styles.rulesTitle}>How to Play:</Text>
        <Text style={styles.ruleItem}>• Each question has 6 answers to sort</Text>
        <Text style={styles.ruleItem}>• 3 rounds per question: Team A → Team B → Team A</Text>
        <Text style={styles.ruleItem}>• Points only for NEW correct positions</Text>
        <Text style={styles.ruleItem}>• Highest score wins!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rules: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ruleItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});
