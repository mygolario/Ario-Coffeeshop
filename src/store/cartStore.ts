import { create } from 'zustand';
import { CartItem, Product, Size } from '../types';
import { products } from '../data/products';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: Size) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  getSubtotal: () => number;
  getTotal: () => number;
  clearCart: () => void;
  getItem: (productId: string, size: Size) => CartItem | undefined;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product, size) => {
    const existingItem = get().items.find(
      item => item.productId === product.id && item.size === size
    );
    
    if (existingItem) {
      set(state => ({
        items: state.items.map(item =>
          item.productId === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
    } else {
      set(state => ({
        items: [...state.items, { productId: product.id, size, quantity: 1 }],
      }));
    }
  },
  
  removeItem: (productId, size) => {
    set(state => ({
      items: state.items.filter(
        item => !(item.productId === productId && item.size === size)
      ),
    }));
  },
  
  updateQuantity: (productId, size, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size);
      return;
    }
    
    set(state => ({
      items: state.items.map(item =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
    }));
  },
  
  getSubtotal: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return total;
      return total + product.price * item.quantity;
    }, 0);
  },
  
  getTotal: () => {
    const subtotal = get().getSubtotal();
    const deliveryFee = 1.0; // Mock delivery fee
    return subtotal + deliveryFee;
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getItem: (productId, size) => {
    return get().items.find(
      item => item.productId === productId && item.size === size
    );
  },
}));
