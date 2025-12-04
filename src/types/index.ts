export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  image: any; // require() or URI string
  tags: string[];
}

export interface CartItem {
  productId: string;
  size: 'S' | 'M' | 'L';
  quantity: number;
}

export interface Order {
  id: string;
  items: Array<CartItem & { product: Product }>;
  total: number;
  status: 'preparing' | 'on_the_way' | 'delivered';
  deliveryAddress?: string;
  createdAt: Date;
}

export type Size = 'S' | 'M' | 'L';

