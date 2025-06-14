import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

export default function App(): React.JSX.Element {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}

