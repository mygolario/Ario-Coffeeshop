import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useSoraFonts } from './src/theme/typography';
import { RootNavigator } from './src/navigation/RootNavigator';
import { View, ActivityIndicator } from 'react-native';
import { colors } from './src/theme';

export default function App() {
  const fontsLoaded = useSoraFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

