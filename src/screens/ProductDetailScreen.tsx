import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import { IconButton } from '../components/IconButton';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { colors, spacing } from '../theme';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Size } from '../types';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { productId } = route.params;
  const addItem = useCartStore(state => state.addItem);
  
  const product = products.find(p => p.id === productId);
  const [selectedSize, setSelectedSize] = useState<Size>('M');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <View style={styles.container}>
        <AppText>Product not found</AppText>
      </View>
    );
  }

  const handleBuyNow = () => {
    addItem(product, selectedSize);
    navigation.navigate('Main', { screen: 'Cart' });
  };

  const sizes: Size[] = ['S', 'M', 'L'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <IconButton
            icon="arrow-back"
            onPress={() => navigation.goBack()}
            color={colors.white}
          />
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            onPress={() => setIsFavorite(!isFavorite)}
            color={isFavorite ? colors.danger : colors.white}
          />
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.image} resizeMode="cover" />
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <AppText size="2xl" variant="bold">
                {product.name}
              </AppText>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={20} color={colors.warning} />
                <AppText size="base" variant="medium" style={styles.rating}>
                  {product.rating} ({product.ratingCount})
                </AppText>
              </View>
            </View>
            <View style={styles.colorDots}>
              {[1, 2, 3].map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.colorDot,
                    index === 0 && styles.colorDotActive,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <AppText size="lg" variant="semiBold" style={styles.sectionTitle}>
              Description
            </AppText>
            <AppText size="base" color={colors.textSecondary} style={styles.description}>
              {product.description}
            </AppText>
            <TouchableOpacity>
              <AppText size="base" color={colors.primary} style={styles.readMore}>
                Read More
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Size Selection */}
          <View style={styles.section}>
            <AppText size="lg" variant="semiBold" style={styles.sectionTitle}>
              Size
            </AppText>
            <View style={styles.sizeContainer}>
              {sizes.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <View
                    style={[
                      styles.sizeDot,
                      selectedSize === size && styles.sizeDotSelected,
                    ]}
                  />
                  <AppText
                    size="base"
                    variant="medium"
                    color={selectedSize === size ? colors.primary : colors.textPrimary}
                  >
                    {size}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <AppText size="sm" color={colors.textSecondary}>
            Price
          </AppText>
          <AppText size="2xl" variant="bold" color={colors.primary}>
            $ {product.price.toFixed(2)}
          </AppText>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title="Buy Now" onPress={handleBuyNow} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.lightGray,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  titleContainer: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  rating: {
    marginLeft: spacing.xs,
  },
  colorDots: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
  },
  colorDotActive: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  description: {
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  readMore: {
    marginTop: spacing.xs,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sizeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sizeButtonSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
  },
  sizeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textPrimary,
    marginRight: spacing.xs,
  },
  sizeDotSelected: {
    backgroundColor: colors.primary,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  buttonContainer: {
    flex: 2,
  },
});

