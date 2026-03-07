import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import BookDetail from './BookDetail';

function renderBookDetail(id: string = '1') {
  return render(
    <MemoryRouter initialEntries={[`/books/${id}`]}>
      <CartProvider>
        <Routes>
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );
}

describe('BookDetail', () => {
  it('should create', () => {
    renderBookDetail();
    expect(screen.getByText(/Back to Books/)).toBeTruthy();
  });

  it('should load and display book details', () => {
    renderBookDetail('1');
    expect(screen.getByText('The Great Gatsby')).toBeTruthy();
  });

  it('should display back to books link', () => {
    renderBookDetail();
    expect(screen.getByText(/Back to Books/)).toBeTruthy();
  });

  it('should show add to cart button', () => {
    renderBookDetail();
    expect(screen.getByText('Add to Cart')).toBeTruthy();
  });
});
