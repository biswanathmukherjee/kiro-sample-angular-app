import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CartItem } from '../models/cart-item.model';
import { Order } from '../models/order.model';

interface OrderContextType {
  lastOrder: Order | null;
  placeOrder: (items: CartItem[], total: number, cardholderName: string, cardLastFour: string) => Order;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateOrderId(): string {
  return 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const placeOrder = useCallback((items: CartItem[], total: number, cardholderName: string, cardLastFour: string): Order => {
    const order: Order = {
      id: generateOrderId(),
      items,
      total,
      cardholderName,
      cardLastFour,
      orderDate: new Date()
    };
    setLastOrder(order);
    return order;
  }, []);

  const clearOrder = useCallback(() => {
    setLastOrder(null);
  }, []);

  return (
    <OrderContext.Provider value={{ lastOrder, placeOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextType {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
