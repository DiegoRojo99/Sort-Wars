import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Team } from '../types/game';

interface TeamScoreProps {
  team: Team;
  isActive?: boolean;
}

export function TeamScore({ team, isActive }: TeamScoreProps) {
  return (
    <View style={[styles.container, isActive && styles.active]}>
      <Text style={styles.teamName}>{team.name}</Text>
      <Text style={styles.score}>{team.score}</Text>
      {isActive && <View style={styles.indicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  active: {
    borderColor: '#007bff',
    borderWidth: 3,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
  },
  indicator: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#28a745',
  },
});
