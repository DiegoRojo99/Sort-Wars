# 🧠 Sort Wars

**Sort Wars** is a fast-paced, team-based trivia-inspired game built with **React Native**.  
Two teams battle to put **six answers** in the correct order, earning points for **new correct guesses** over **three rounds (A → B → A)**.

---

## 🎮 Gameplay

- Each round, one team tries to sort six answers in the correct order.
- Teams earn **points for every new correct position** they discover.
- After each attempt:
  - The opposing team gets a **rebound** chance to place missed answers.
  - Play continues in a **3-round sequence (A → B → A)**.
- The team with the highest score after all questions wins!

---

## ✨ Features

- 🔢 Sort six answers per question  
- 🔁 Three-round system with rebounds (A → B → A)  
- 🧮 Points only for newly correct guesses  
- 👥 Two-team gameplay  
- ⚡ Smooth transitions and animations  
- 📱 Built using **React Native (Expo)** + **TypeScript**

---

## 🧱 Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **React Navigation** for game flow
- **Context API** for game state

---

## 📁 Project Structure

```
/src
  /components     # Reusable UI components
    - AnswerCard.tsx
    - SortBoard.tsx
    - TeamScore.tsx
    - RoundSummary.tsx
  /screens        # Main app screens
    - HomeScreen.tsx
    - GameSetupScreen.tsx
    - GameScreen.tsx
    - ResultsScreen.tsx
  /context        # State management
    - GameContext.tsx
  /utils          # Helper functions and data
    - scoring.ts
    - questions.ts
  /types          # TypeScript type definitions
    - game.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DiegoRojo99/Sort-Wars.git
cd Sort-Wars
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - Scan the QR code with the Expo Go app (iOS/Android)
   - Or press `w` to run in web browser
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

---

## 🎯 How to Play

1. **Setup**: Enter names for Team A and Team B
2. **Round 1**: Team A sorts the answers
3. **Round 2**: Team B gets their turn
4. **Round 3**: Team A gets a final chance
5. **Scoring**: Points awarded for each new correct position
6. **Winner**: Team with the highest total score wins!

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
