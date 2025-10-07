import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Round, Team } from '../types/game';

interface RoundSummaryProps {
  round: Round;
  team: Team;
}

export function RoundSummary({ round, team }: RoundSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.teamName}>{team.name}</Text>
        {round.isRebound && (
          <View style={styles.reboundBadge}>
            <Text style={styles.reboundText}>REBOUND</Text>
          </View>
        )}
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Correct Positions</Text>
          <Text style={styles.statValue}>{round.correctPositions.length}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Points Earned</Text>
          <Text style={styles.statValue}>{round.pointsEarned}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reboundBadge: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  reboundText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
});
