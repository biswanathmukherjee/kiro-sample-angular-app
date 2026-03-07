import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { OrderProvider, useOrder } from '../contexts/OrderContext';
import OrderConfirmation from './OrderConfirmation';
import { Book } from '../models/book.model';
import { CartItem } from '../models/cart-item.model';
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

const mockCartItems: CartItem[] = [
  { book: mockBook, quantity: 2 }
];

function OrderWithData({ children }: { children: ReactNode }) {
  const { placeOrder } = useOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { placeOrder(mockCartItems, 39.98, 'John Doe', '3456'); }, []);
  return <>{children}</>;
}

function renderOrderConfirmation() {
  return render(
    <MemoryRouter>
      <OrderProvider>
        <OrderConfirmation />
      </OrderProvider>
    </MemoryRouter>
  );
}

function renderOrderConfirmationWithOrder() {
  return render(
    <MemoryRouter>
      <OrderProvider>
        <OrderWithData>
          <OrderConfirmation />
        </OrderWithData>
      </OrderProvider>
    </MemoryRouter>
  );
}

describe('OrderConfirmation', () => {
  it('should create', () => {
    renderOrderConfirmation();
    expect(document.querySelector('.confirmation-container')).toBeTruthy();
  });

  it('should show no-order message when no order exists', () => {
    renderOrderConfirmation();
    expect(screen.getByText('No order found.')).toBeTruthy();
  });

  it('should display order details when order exists', () => {
    renderOrderConfirmationWithOrder();
    expect(screen.getByText('Order Confirmed!')).toBeTruthy();
    expect(screen.getByText(/ORD-/)).toBeTruthy();
    expect(screen.getByText('Continue Shopping')).toBeTruthy();
  });

  it('should show continue shopping link', () => {
    renderOrderConfirmationWithOrder();
    expect(screen.getByText('Continue Shopping')).toBeTruthy();
  });
});
