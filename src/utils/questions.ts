import { Question } from '../types/game';

/**
 * Mock questions data for the game
 * Each question has 6 answers to be sorted
 */
export const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'Sort these planets by distance from the Sun (closest to farthest)',
    answers: [
      { id: 'a1', text: 'Mercury', correctPosition: 0 },
      { id: 'a2', text: 'Venus', correctPosition: 1 },
      { id: 'a3', text: 'Earth', correctPosition: 2 },
      { id: 'a4', text: 'Mars', correctPosition: 3 },
      { id: 'a5', text: 'Jupiter', correctPosition: 4 },
      { id: 'a6', text: 'Saturn', correctPosition: 5 },
    ]
  },
  {
    id: '2',
    text: 'Sort these movies by release year (oldest to newest)',
    answers: [
      { id: 'b1', text: 'The Godfather (1972)', correctPosition: 0 },
      { id: 'b2', text: 'Star Wars (1977)', correctPosition: 1 },
      { id: 'b3', text: 'E.T. (1982)', correctPosition: 2 },
      { id: 'b4', text: 'Jurassic Park (1993)', correctPosition: 3 },
      { id: 'b5', text: 'The Matrix (1999)', correctPosition: 4 },
      { id: 'b6', text: 'Avatar (2009)', correctPosition: 5 },
    ]
  },
  {
    id: '3',
    text: 'Sort these countries by population (smallest to largest)',
    answers: [
      { id: 'c1', text: 'Iceland', correctPosition: 0 },
      { id: 'c2', text: 'Norway', correctPosition: 1 },
      { id: 'c3', text: 'Australia', correctPosition: 2 },
      { id: 'c4', text: 'Canada', correctPosition: 3 },
      { id: 'c5', text: 'Japan', correctPosition: 4 },
      { id: 'c6', text: 'United States', correctPosition: 5 },
    ]
  },
];
