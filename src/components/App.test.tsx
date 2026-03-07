import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/books']}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('should create the app', () => {
    renderApp();
    expect(screen.getByText('Angular Bookstore')).toBeTruthy();
  });

  it('should render the header component', () => {
    renderApp();
    expect(screen.getByRole('navigation')).toBeTruthy();
  });

  it('should render the main content area', () => {
    const { container } = renderApp();
    expect(container.querySelector('.main-content')).toBeTruthy();
  });

  it('should render the book list on /books route', () => {
    renderApp();
    expect(screen.getByText('Browse Books')).toBeTruthy();
  });
});
