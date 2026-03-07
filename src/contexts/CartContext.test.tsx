import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { Book } from '../models/book.model';
import { type ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
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

const mockBook2: Book = {
  id: 2,
  title: 'Another Book',
  author: 'Another Author',
  description: 'Another Description',
  price: 29.99,
  coverImage: '',
  isbn: '978-0000000002',
  publishedDate: '2021-01-01',
  category: 'Science',
  rating: 4.0,
  stock: 5
};

describe('CartContext', () => {
  it('should start with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems.length).toBe(0);
  });

  it('should add a new item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addToCart(mockBook); });
    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].book.id).toBe(mockBook.id);
    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it('should increment quantity for duplicate book', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addToCart(mockBook); });
    act(() => { result.current.addToCart(mockBook); });
    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('should remove an item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addToCart(mockBook); });
    act(() => { result.current.addToCart(mockBook2); });
    act(() => { result.current.removeFromCart(mockBook.id); });
    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].book.id).toBe(mockBook2.id);
  });

  it('should update quantity of an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addToCart(mockBook); });
    act(() => { result.current.updateQuantity(mockBook.id, 5); });
    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].quantity).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addToCart(mockBook); });
    act(() => { result.current.updateQuantity(mockBook.id, 0); });
    expect(result.current.cartItems.length).toBe(0);
  });

  it('should calculate cart total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addToCart(mockBook); });
    act(() => { result.current.addToCart(mockBook2); });
    act(() => { result.current.addToCart(mockBook); }); // mockBook qty = 2
    const expected = (mockBook.price * 2) + (mockBook2.price * 1);
    expect(result.current.getCartTotal()).toBeCloseTo(expected, 2);
  });

  it('should return correct cart item count', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addToCart(mockBook); });
    act(() => { result.current.addToCart(mockBook2); });
    act(() => { result.current.addToCart(mockBook); }); // mockBook qty = 2
    expect(result.current.getCartItemCount()).toBe(3);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addToCart(mockBook); });
    act(() => { result.current.addToCart(mockBook2); });
    act(() => { result.current.clearCart(); });
    expect(result.current.cartItems.length).toBe(0);
  });

  it('should return a synchronous snapshot of cart items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.getCartItemsSnapshot().length).toBe(0);
    act(() => { result.current.addToCart(mockBook); });
    act(() => { result.current.addToCart(mockBook2); });
    const snapshot = result.current.getCartItemsSnapshot();
    expect(snapshot.length).toBe(2);
    expect(snapshot[0].book.id).toBe(mockBook.id);
    expect(snapshot[1].book.id).toBe(mockBook2.id);
  });
});
