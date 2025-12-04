import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '../components/AppText';
import { Tag } from '../components/Tag';
import { ProductCard } from '../components/ProductCard';
import { IconButton } from '../components/IconButton';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { colors, spacing } from '../theme';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Product } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const categories = ['All Coffee', 'Macchiato', 'Latte', 'Americano'];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const addItem = useCartStore(state => state.addItem);
  const [selectedCategory, setSelectedCategory] = useState('All Coffee');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Coffee' || product.tags.includes(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 'M'); // Default to Medium size
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.locationRow}>
          <AppText size="sm" color={colors.textSecondary}>
            Location
          </AppText>
          <View style={styles.locationContainer}>
            <AppText size="base" variant="semiBold">
              Bilzen, Tanjungbalai
            </AppText>
            <Ionicons name="chevron-down" size={16} color={colors.textPrimary} />
          </View>
        </View>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search coffee"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <IconButton
            icon="options"
            onPress={() => {}}
            backgroundColor={colors.primary}
            color={colors.white}
            size={20}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Promo Banner */}
        <View style={styles.promoCard}>
          <View style={styles.promoBadge}>
            <AppText size="xs" variant="bold" color={colors.danger}>
              Promo
            </AppText>
          </View>
          <View style={styles.promoContent}>
            <AppText size="2xl" variant="bold" color={colors.white}>
              Buy one get one FREE
            </AppText>
          </View>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map(category => (
            <Tag
              key={category}
              label={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productsContainer}>
          <FlatList
            data={filteredProducts}
            numColumns={2}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => handleProductPress(item)}
                onAddToCart={() => handleAddToCart(item)}
              />
            )}
            contentContainerStyle={styles.productsList}
          />
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
    backgroundColor: colors.darkGray,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  locationRow: {
    marginBottom: spacing.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  promoCard: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: 20,
    padding: spacing.lg,
    minHeight: 120,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  promoBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  promoContent: {
    marginTop: spacing.xl,
  },
  categoryContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  categoryContent: {
    paddingHorizontal: spacing.lg,
  },
  productsContainer: {
    paddingHorizontal: spacing.sm,
  },
  productsList: {
    paddingBottom: spacing.xl,
  },
});

