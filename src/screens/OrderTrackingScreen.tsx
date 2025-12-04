import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '../components/AppText';
import { IconButton } from '../components/IconButton';
import { colors, spacing } from '../theme';

export const OrderTrackingScreen: React.FC = () => {
  // Mock order data
  const orderStatus = 'on_the_way';
  const timeLeft = '10 minutes';
  const courierName = 'Brooklyn Simmons';

  const steps = [
    { id: 1, label: 'Order Placed', completed: true },
    { id: 2, label: 'Preparing', completed: true },
    { id: 3, label: 'On the Way', completed: orderStatus === 'on_the_way', active: orderStatus === 'on_the_way' },
    { id: 4, label: 'Delivered', completed: false },
  ];

  const currentStep = steps.findIndex(step => step.active || (!step.completed && !step.active)) || 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <AppText size="2xl" variant="bold">
          Order Tracking
        </AppText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Map Area */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            {/* Mock route line */}
            <View style={styles.routeLine} />
            
            {/* Start point */}
            <View style={[styles.marker, styles.startMarker]}>
              <View style={styles.markerDot} />
            </View>
            
            {/* End point */}
            <View style={[styles.marker, styles.endMarker]}>
              <View style={styles.markerSquare} />
            </View>

            {/* Map controls */}
            <View style={styles.mapControls}>
              <IconButton
                icon="arrow-back"
                onPress={() => {}}
                backgroundColor={colors.white}
                color={colors.textPrimary}
              />
              <IconButton
                icon="locate"
                onPress={() => {}}
                backgroundColor={colors.white}
                color={colors.textPrimary}
              />
            </View>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <AppText size="lg" variant="bold">
              {timeLeft} left
            </AppText>
            <AppText size="base" color={colors.textSecondary}>
              Delivered your order
            </AppText>
          </View>

          {/* Progress Steps */}
          <View style={styles.progressSteps}>
            {steps.map((step, index) => (
              <View key={step.id} style={styles.stepContainer}>
                <View style={styles.stepLineContainer}>
                  {index > 0 && (
                    <View
                      style={[
                        styles.stepLine,
                        step.completed && styles.stepLineCompleted,
                      ]}
                    />
                  )}
                  <View
                    style={[
                      styles.stepCircle,
                      step.completed && styles.stepCircleCompleted,
                      step.active && styles.stepCircleActive,
                    ]}
                  >
                    {step.completed && (
                      <Ionicons name="checkmark" size={16} color={colors.white} />
                    )}
                  </View>
                </View>
                <AppText
                  size="sm"
                  color={step.completed || step.active ? colors.textPrimary : colors.textSecondary}
                  style={styles.stepLabel}
                >
                  {step.label}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Courier Section */}
        <View style={styles.courierCard}>
          <View style={styles.courierInfo}>
            <View style={styles.courierAvatar}>
              <Ionicons name="person" size={24} color={colors.primary} />
            </View>
            <View style={styles.courierDetails}>
              <AppText size="base" variant="semiBold">
                {courierName}
              </AppText>
              <AppText size="sm" color={colors.textSecondary}>
                Your courier
              </AppText>
            </View>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    margin: spacing.lg,
    borderRadius: 20,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.lightGray,
    position: 'relative',
  },
  routeLine: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: '60%',
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    transform: [{ rotate: '25deg' }],
  },
  marker: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startMarker: {
    top: '25%',
    left: '15%',
  },
  endMarker: {
    bottom: '20%',
    right: '20%',
  },
  markerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.white,
  },
  markerSquare: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  mapControls: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: 20,
    padding: spacing.lg,
  },
  progressHeader: {
    marginBottom: spacing.lg,
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepLineContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stepLine: {
    position: 'absolute',
    top: 20,
    left: '50%',
    width: '100%',
    height: 2,
    backgroundColor: colors.border,
  },
  stepLineCompleted: {
    backgroundColor: colors.primary,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stepCircleCompleted: {
    backgroundColor: colors.primary,
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.secondary,
  },
  stepLabel: {
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  courierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: 20,
    padding: spacing.lg,
  },
  courierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  courierAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  courierDetails: {
    flex: 1,
  },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

