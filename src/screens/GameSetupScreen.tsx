import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGame } from '../context/GameContext';

type RootStackParamList = {
  Home: undefined;
  GameSetup: undefined;
  Game: undefined;
  Results: undefined;
};

type GameSetupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GameSetup'>;
};

export function GameSetupScreen({ navigation }: GameSetupScreenProps) {
  const [team1Name, setTeam1Name] = useState('Team A');
  const [team2Name, setTeam2Name] = useState('Team B');
  const { startGame } = useGame();

  const handleStartGame = () => {
    if (team1Name.trim() && team2Name.trim()) {
      startGame(team1Name.trim(), team2Name.trim());
      navigation.navigate('Game');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Setup Game</Text>
      <Text style={styles.subtitle}>Enter team names to begin</Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Team 1 Name</Text>
          <TextInput
            style={styles.input}
            value={team1Name}
            onChangeText={setTeam1Name}
            placeholder="Enter team 1 name"
            maxLength={20}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Team 2 Name</Text>
          <TextInput
            style={styles.input}
            value={team2Name}
            onChangeText={setTeam2Name}
            placeholder="Enter team 2 name"
            maxLength={20}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.startButton,
            (!team1Name.trim() || !team2Name.trim()) && styles.startButtonDisabled
          ]}
          onPress={handleStartGame}
          disabled={!team1Name.trim() || !team2Name.trim()}
        >
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  startButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  startButtonDisabled: {
    backgroundColor: '#adb5bd',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  backButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});
