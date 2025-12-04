import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import { IconButton } from '../components/IconButton';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';
import { createMockOrder } from '../data/orders';
import { colors, spacing } from '../theme';
import { CartItem } from '../types';

export const OrderScreen: React.FC = () => {
  const navigation = useNavigation();
  const { items, updateQuantity, removeItem, getSubtotal, getTotal, clearCart } = useCartStore();
  const [deliveryType, setDeliveryType] = useState<'Deliver' | 'Pick Up'>('Deliver');

  const cartItemsWithProducts = items.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product !== undefined);

  const subtotal = getSubtotal();
  const total = getTotal();
  const deliveryFee = 1.0;
  const oldDeliveryFee = 2.0;

  const handleOrder = () => {
    if (cartItemsWithProducts.length === 0) return;
    
    const order = createMockOrder({
      items: cartItemsWithProducts.map(item => ({
        ...item,
        product: item.product!,
      })),
      total,
      status: 'preparing',
      deliveryAddress: deliveryType === 'Deliver' ? 'Jl. Kpg Sutoyo' : undefined,
    });
    
    clearCart();
    // Navigate to Orders tab
    (navigation as any).navigate('Main', { screen: 'Orders' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <AppText size="2xl" variant="bold">
          Order
        </AppText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Delivery Type Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, deliveryType === 'Deliver' && styles.toggleButtonActive]}
            onPress={() => setDeliveryType('Deliver')}
          >
            <AppText
              size="base"
              variant="medium"
              color={deliveryType === 'Deliver' ? colors.white : colors.textPrimary}
            >
              Deliver
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, deliveryType === 'Pick Up' && styles.toggleButtonActive]}
            onPress={() => setDeliveryType('Pick Up')}
          >
            <AppText
              size="base"
              variant="medium"
              color={deliveryType === 'Pick Up' ? colors.white : colors.textPrimary}
            >
              Pick Up
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Delivery Address Card */}
        {deliveryType === 'Deliver' && (
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Ionicons name="location" size={20} color={colors.primary} />
              <View style={styles.addressContent}>
                <AppText size="base" variant="semiBold">
                  Delivery Address
                </AppText>
                <AppText size="sm" color={colors.textSecondary}>
                  Jl. Kpg Sutoyo
                </AppText>
              </View>
            </View>
            <View style={styles.addressActions}>
              <TouchableOpacity>
                <AppText size="sm" color={colors.primary}>
                  Edit Address
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity>
                <AppText size="sm" color={colors.primary}>
                  Add Note
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Cart Items */}
        <View style={styles.section}>
          <AppText size="lg" variant="semiBold" style={styles.sectionTitle}>
            Your Order
          </AppText>
          {cartItemsWithProducts.length === 0 ? (
            <View style={styles.emptyCart}>
              <AppText size="base" color={colors.textSecondary}>
                Your cart is empty
              </AppText>
            </View>
          ) : (
            cartItemsWithProducts.map((item) => {
              const product = item.product!;
              return (
                <View key={`${item.productId}-${item.size}`} style={styles.cartItem}>
                  <Image source={product.image} style={styles.cartItemImage} />
                  <View style={styles.cartItemContent}>
                    <AppText size="base" variant="semiBold">
                      {product.name}
                    </AppText>
                    <AppText size="sm" color={colors.textSecondary}>
                      {product.subtitle} • {item.size}
                    </AppText>
                    <View style={styles.cartItemFooter}>
                      <AppText size="base" variant="bold" color={colors.primary}>
                        $ {(product.price * item.quantity).toFixed(2)}
                      </AppText>
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        >
                          <Ionicons name="remove" size={16} color={colors.primary} />
                        </TouchableOpacity>
                        <AppText size="base" variant="medium" style={styles.quantityText}>
                          {item.quantity}
                        </AppText>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        >
                          <Ionicons name="add" size={16} color={colors.primary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Discount Section */}
        {cartItemsWithProducts.length > 0 && (
          <View style={styles.discountCard}>
            <Ionicons name="pricetag" size={20} color={colors.success} />
            <AppText size="base" variant="medium" style={styles.discountText}>
              1 Discount is Applied
            </AppText>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
        )}

        {/* Payment Summary */}
        {cartItemsWithProducts.length > 0 && (
          <View style={styles.section}>
            <AppText size="lg" variant="semiBold" style={styles.sectionTitle}>
              Payment Summary
            </AppText>
            <View style={styles.summaryRow}>
              <AppText size="base" color={colors.textSecondary}>
                Price
              </AppText>
              <AppText size="base" variant="medium">
                $ {subtotal.toFixed(2)}
              </AppText>
            </View>
            <View style={styles.summaryRow}>
              <AppText size="base" color={colors.textSecondary}>
                Delivery Fee
              </AppText>
              <View style={styles.deliveryFeeRow}>
                <AppText
                  size="base"
                  color={colors.textSecondary}
                  style={styles.strikethrough}
                >
                  $ {oldDeliveryFee.toFixed(2)}
                </AppText>
                <AppText size="base" variant="medium" style={styles.newPrice}>
                  $ {deliveryFee.toFixed(2)}
                </AppText>
              </View>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <AppText size="lg" variant="bold">
                Total
              </AppText>
              <AppText size="lg" variant="bold" color={colors.primary}>
                $ {total.toFixed(2)}
              </AppText>
            </View>
          </View>
        )}

        {/* Payment Method */}
        {cartItemsWithProducts.length > 0 && (
          <View style={styles.paymentCard}>
            <Ionicons name="wallet" size={24} color={colors.primary} />
            <View style={styles.paymentContent}>
              <AppText size="base" variant="semiBold">
                Cash
              </AppText>
              <AppText size="sm" color={colors.textSecondary}>
                $ 5.53
              </AppText>
            </View>
            <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
          </View>
        )}
      </ScrollView>

      {/* Order Button */}
      {cartItemsWithProducts.length > 0 && (
        <View style={styles.bottomBar}>
          <AppButton title="Order" onPress={handleOrder} />
        </View>
      )}
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
    padding: spacing.lg,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 4,
    marginBottom: spacing.lg,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: 12,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  addressContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  emptyCart: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  cartItemContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  cartItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    minWidth: 24,
    textAlign: 'center',
  },
  discountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  discountText: {
    flex: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  deliveryFeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  newPrice: {
    color: colors.primary,
  },
  totalRow: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  paymentContent: {
    flex: 1,
  },
  bottomBar: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

