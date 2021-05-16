//import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );
};


export default App;
