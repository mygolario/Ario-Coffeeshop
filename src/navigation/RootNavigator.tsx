import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { BottomTabs } from './BottomTabs';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  ProductDetail: { productId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboarded ? (
        <Stack.Screen name="Onboarding">
          {() => <OnboardingScreen onComplete={() => setIsOnboarded(true)} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ presentation: 'card' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

