import { Order } from '../types';

export const mockOrders: Order[] = [];

export const createMockOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
  return {
    ...orderData,
    id: `order_${Date.now()}`,
    createdAt: new Date(),
  };
};

