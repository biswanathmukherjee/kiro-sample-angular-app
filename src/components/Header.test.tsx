import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import Header from './Header';

function renderHeader() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Header />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Header', () => {
  it('should create', () => {
    renderHeader();
    expect(screen.getByRole('navigation')).toBeTruthy();
  });

  it('should display Angular Bookstore text', () => {
    renderHeader();
    expect(screen.getByText('Angular Bookstore')).toBeTruthy();
  });

  it('should have navigation links', () => {
    renderHeader();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });
});
