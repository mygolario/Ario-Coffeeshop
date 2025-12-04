import { Product } from '../types';

// Placeholder images - in production, use actual image assets
const placeholderImage = require('../../assets/icon.png');

export const products: Product[] = [
  {
    id: '1',
    name: 'Caffe Mocha',
    subtitle: 'Deep Foam',
    description: 'A rich and creamy blend of espresso, steamed milk, and chocolate syrup, topped with a layer of deep foam. Perfect for chocolate lovers.',
    price: 4.53,
    rating: 4.8,
    ratingCount: 230,
    image: placeholderImage,
    tags: ['All Coffee', 'Macchiato'],
  },
  {
    id: '2',
    name: 'Cappuccino',
    subtitle: 'Classic Italian',
    description: 'Traditional Italian coffee made with equal parts espresso, steamed milk, and milk foam. A timeless favorite.',
    price: 3.99,
    rating: 4.6,
    ratingCount: 189,
    image: placeholderImage,
    tags: ['All Coffee', 'Latte'],
  },
  {
    id: '3',
    name: 'Americano',
    subtitle: 'Bold & Strong',
    description: 'A strong coffee made by diluting espresso with hot water. Perfect for those who love a bold, robust flavor.',
    price: 3.25,
    rating: 4.7,
    ratingCount: 156,
    image: placeholderImage,
    tags: ['All Coffee', 'Americano'],
  },
  {
    id: '4',
    name: 'Caramel Macchiato',
    subtitle: 'Sweet & Smooth',
    description: 'Espresso with vanilla-flavored syrup, steamed milk, and caramel drizzle. A sweet treat in a cup.',
    price: 4.75,
    rating: 4.9,
    ratingCount: 312,
    image: placeholderImage,
    tags: ['All Coffee', 'Macchiato'],
  },
  {
    id: '5',
    name: 'Vanilla Latte',
    subtitle: 'Creamy Delight',
    description: 'Smooth espresso combined with steamed milk and vanilla syrup. A creamy, comforting beverage.',
    price: 4.20,
    rating: 4.5,
    ratingCount: 201,
    image: placeholderImage,
    tags: ['All Coffee', 'Latte'],
  },
  {
    id: '6',
    name: 'Espresso',
    subtitle: 'Pure Intensity',
    description: 'A concentrated coffee beverage brewed by forcing hot water through finely-ground coffee beans.',
    price: 2.99,
    rating: 4.8,
    ratingCount: 145,
    image: placeholderImage,
    tags: ['All Coffee', 'Americano'],
  },
];

