import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameProvider } from './src/context/GameContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { GameSetupScreen } from './src/screens/GameSetupScreen';
import { GameScreen } from './src/screens/GameScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';

type RootStackParamList = {
  Home: undefined;
  GameSetup: undefined;
  Game: undefined;
  Results: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GameSetup" component={GameSetupScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </GameProvider>
  );
}
