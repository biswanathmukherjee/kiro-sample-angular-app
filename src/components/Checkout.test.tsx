import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider, useCart } from '../contexts/CartContext';
import { OrderProvider } from '../contexts/OrderContext';
import Checkout from './Checkout';
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

function renderCheckout() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <OrderProvider>
          <Checkout />
        </OrderProvider>
      </CartProvider>
    </MemoryRouter>
  );
}

function renderCheckoutWithItem() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <OrderProvider>
          <CartWithItem>
            <Checkout />
          </CartWithItem>
        </OrderProvider>
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Checkout', () => {
  it('should create', () => {
    renderCheckout();
    expect(screen.getByText('Checkout')).toBeTruthy();
  });

  it('should show empty cart message when cart is empty', () => {
    renderCheckout();
    expect(screen.getByText(/Your cart is empty/)).toBeTruthy();
  });

  it('should display order summary when cart has items', () => {
    renderCheckoutWithItem();
    expect(screen.getByText(/Test Book/)).toBeTruthy();
  });

  it('should have form initially with submit disabled', () => {
    renderCheckoutWithItem();
    const submitBtn = screen.getByText('Place Order') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });

  it('should validate cardNumber requires 16 digits', () => {
    renderCheckoutWithItem();
    const cardNumberInput = screen.getByPlaceholderText('1234567890123456');
    fireEvent.change(cardNumberInput, { target: { value: '123' } });
    fireEvent.blur(cardNumberInput);
    expect(screen.getByText('Enter a valid 16-digit card number.')).toBeTruthy();
  });

  it('should validate CVV requires 3-4 digits', () => {
    renderCheckoutWithItem();
    const cvvInput = screen.getByPlaceholderText('123');
    fireEvent.change(cvvInput, { target: { value: '12' } });
    fireEvent.blur(cvvInput);
    expect(screen.getByText('Enter a valid CVV (3-4 digits).')).toBeTruthy();
  });

  it('should validate expiryDate format MM/YY', () => {
    renderCheckoutWithItem();
    const expiryInput = screen.getByPlaceholderText('MM/YY');
    fireEvent.change(expiryInput, { target: { value: '13/25' } });
    fireEvent.blur(expiryInput);
    expect(screen.getByText('Enter a valid expiry date (MM/YY).')).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    renderCheckoutWithItem();
    const submitBtn = screen.getByText('Place Order') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });
});
