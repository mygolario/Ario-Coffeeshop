import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import { colors, spacing } from '../theme';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/icon.png')} // Placeholder - use actual coffee image
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <AppText
              size="4xl"
              variant="bold"
              color={colors.white}
              style={styles.title}
            >
              Fall in Love with Coffee in Blissful Delight!
            </AppText>
            <AppText
              size="lg"
              color={colors.white}
              style={styles.subtitle}
            >
              Welcome to our cozy coffee corner, where every cup is a delightful experience for you.
            </AppText>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Get Started"
              onPress={onComplete}
              variant="primary"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.xl,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 28,
  },
  buttonContainer: {
    paddingBottom: spacing.xl,
  },
});

