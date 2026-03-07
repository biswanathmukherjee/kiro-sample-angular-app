import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Book } from '../models/book.model';
import { CartItem } from '../models/cart-item.model';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  clearCart: () => void;
  getCartItemsSnapshot: () => CartItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((book: Book) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.book.id === book.id);
      if (existingItem) {
        return items.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...items, { book, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((bookId: number) => {
    setCartItems(items => items.filter(item => item.book.id !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(items => items.filter(item => item.book.id !== bookId));
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.book.id === bookId
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  }, [cartItems]);

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartItemsSnapshot = useCallback(() => {
    return cartItems;
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartItemCount,
      clearCart,
      getCartItemsSnapshot,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
