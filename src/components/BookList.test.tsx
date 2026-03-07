import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import BookList from './BookList';

function renderBookList() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <BookList />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('BookList', () => {
  it('should create', () => {
    renderBookList();
    expect(screen.getByText('Browse Books')).toBeTruthy();
  });

  it('should display book cards', () => {
    renderBookList();
    const addButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
    expect(addButtons.length).toBeGreaterThanOrEqual(8);
  });

  it('should filter books by search query', () => {
    renderBookList();
    const searchInput = screen.getByPlaceholderText('Search by title or author...');
    fireEvent.change(searchInput, { target: { value: 'gatsby' } });
    const addButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
    expect(addButtons.length).toBe(1);
  });

  it('should filter books by category', () => {
    renderBookList();
    const fictionBtn = screen.getByText('Fiction');
    fireEvent.click(fictionBtn);
    const addButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
    expect(addButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('should show all books when category filter is cleared', () => {
    renderBookList();
    fireEvent.click(screen.getByText('Fiction'));
    fireEvent.click(screen.getByText('All'));
    const addButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
    expect(addButtons.length).toBeGreaterThanOrEqual(8);
  });
});
