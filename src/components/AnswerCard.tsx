import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Answer } from '../types/game';

interface AnswerCardProps {
  answer: Answer;
  position: number;
  isCorrect?: boolean;
  onPress?: () => void;
}

export function AnswerCard({ answer, position, isCorrect, onPress }: AnswerCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isCorrect === true && styles.correct,
        isCorrect === false && styles.incorrect,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.positionBadge}>
        <Text style={styles.positionText}>{position + 1}</Text>
      </View>
      <Text style={styles.answerText}>{answer.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  correct: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
    borderWidth: 2,
  },
  incorrect: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
    borderWidth: 2,
  },
  positionBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  positionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
});
