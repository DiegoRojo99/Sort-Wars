import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Answer } from '../types/game';
import { AnswerCard } from './AnswerCard';

interface SortBoardProps {
  answers: Answer[];
  correctPositions?: number[];
  onSubmit?: (sortedAnswers: Answer[]) => void;
  showResults?: boolean;
}

export function SortBoard({ answers, correctPositions = [], onSubmit, showResults }: SortBoardProps) {
  const [sortedAnswers, setSortedAnswers] = useState<Answer[]>(
    // Shuffle answers initially
    [...answers].sort(() => Math.random() - 0.5)
  );

  const moveAnswer = (fromIndex: number, toIndex: number) => {
    const newAnswers = [...sortedAnswers];
    const [removed] = newAnswers.splice(fromIndex, 1);
    newAnswers.splice(toIndex, 0, removed);
    setSortedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(sortedAnswers);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>Tap arrows to reorder answers</Text>
      <ScrollView style={styles.answersContainer}>
        {sortedAnswers.map((answer, index) => (
          <View key={answer.id} style={styles.answerRow}>
            <View style={styles.controls}>
              {index > 0 && (
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => moveAnswer(index, index - 1)}
                >
                  <Text style={styles.arrow}>▲</Text>
                </TouchableOpacity>
              )}
              {index < sortedAnswers.length - 1 && (
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => moveAnswer(index, index + 1)}
                >
                  <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.cardContainer}>
              <AnswerCard
                answer={answer}
                position={index}
                isCorrect={
                  showResults
                    ? correctPositions.includes(index)
                    : undefined
                }
              />
            </View>
          </View>
        ))}
      </ScrollView>
      {onSubmit && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Answer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  answersContainer: {
    flex: 1,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  controls: {
    marginRight: 8,
    justifyContent: 'center',
  },
  arrowButton: {
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 4,
    marginVertical: 2,
  },
  arrow: {
    color: '#fff',
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
