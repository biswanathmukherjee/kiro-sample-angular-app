import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider, useCart } from '../contexts/CartContext';
import Cart from './Cart';
import { Book } from '../models/book.model';
import { useEffect, type ReactNode } from 'react';

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

function CartWithItem({ children }: { children: ReactNode }) {
  const { addToCart } = useCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { addToCart(mockBook); }, []);
  return <>{children}</>;
}

function renderCart() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>
  );
}

function renderCartWithItem() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <CartWithItem>
          <Cart />
        </CartWithItem>
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Cart', () => {
  it('should create', () => {
    renderCart();
    expect(screen.getByText('Shopping Cart')).toBeTruthy();
  });

  it('should show empty cart message when cart is empty', () => {
    renderCart();
    expect(screen.getByText('Your cart is empty')).toBeTruthy();
  });

  it('should display cart items when items exist', () => {
    renderCartWithItem();
    expect(screen.getByText('Test Book')).toBeTruthy();
  });

  it('should show browse books link when cart is empty', () => {
    renderCart();
    expect(screen.getByText('Browse Books')).toBeTruthy();
  });
});
