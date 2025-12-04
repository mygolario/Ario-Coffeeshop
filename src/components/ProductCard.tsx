import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from './AppText';
import { IconButton } from './IconButton';
import { Product } from '../types';
import { colors, spacing } from '../theme';
import { Ionicons } from '@expo/vector-icons';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.image} resizeMode="cover" />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={colors.warning} />
          <AppText size="xs" variant="medium" color={colors.textPrimary} style={styles.ratingText}>
            {product.rating}
          </AppText>
        </View>
      </View>
      
      <View style={styles.content}>
        <AppText size="base" variant="semiBold" numberOfLines={1}>
          {product.name}
        </AppText>
        <AppText size="sm" color={colors.textSecondary} numberOfLines={1} style={styles.subtitle}>
          {product.subtitle}
        </AppText>
        <View style={styles.footer}>
          <AppText size="lg" variant="bold" color={colors.primary}>
            $ {product.price.toFixed(2)}
          </AppText>
          <TouchableOpacity
            style={styles.addButton}
            onPress={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: spacing.md,
    marginHorizontal: spacing.sm,
    width: '45%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightGray,
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    marginLeft: 2,
  },
  content: {
    padding: spacing.md,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

