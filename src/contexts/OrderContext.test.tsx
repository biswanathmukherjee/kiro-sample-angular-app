import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { OrderProvider, useOrder } from './OrderContext';
import { Book } from '../models/book.model';
import { CartItem } from '../models/cart-item.model';
import { type ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <OrderProvider>{children}</OrderProvider>
);

const mockBook: Book = {
  id: 1,
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test Description',
  price: 19.99,
  coverImage: '',
  isbn: '978-0000000001',
  publishedDate: '2020-01-01',
  category: 'Fiction',
  rating: 4.5,
  stock: 10
};

const mockCartItems: CartItem[] = [
  { book: mockBook, quantity: 2 }
];

describe('OrderContext', () => {
  it('should return null initially from lastOrder', () => {
    const { result } = renderHook(() => useOrder(), { wrapper });
    expect(result.current.lastOrder).toBeNull();
  });

  it('should create and store an order via placeOrder', () => {
    const { result } = renderHook(() => useOrder(), { wrapper });
    let order: ReturnType<typeof result.current.placeOrder>;
    act(() => { order = result.current.placeOrder(mockCartItems, 39.98, 'John Doe', '3456'); });
    expect(order!.id).toMatch(/^ORD-/);
    expect(order!.items).toEqual(mockCartItems);
    expect(order!.total).toBe(39.98);
    expect(order!.cardholderName).toBe('John Doe');
    expect(order!.cardLastFour).toBe('3456');
  });

  it('should return the placed order from lastOrder', () => {
    const { result } = renderHook(() => useOrder(), { wrapper });
    let order: ReturnType<typeof result.current.placeOrder>;
    act(() => { order = result.current.placeOrder(mockCartItems, 39.98, 'John Doe', '3456'); });
    expect(result.current.lastOrder).toBeTruthy();
    expect(result.current.lastOrder!.id).toBe(order!.id);
  });

  it('should reset to null after clearOrder', () => {
    const { result } = renderHook(() => useOrder(), { wrapper });
    act(() => { result.current.placeOrder(mockCartItems, 39.98, 'John Doe', '3456'); });
    act(() => { result.current.clearOrder(); });
    expect(result.current.lastOrder).toBeNull();
  });
});
