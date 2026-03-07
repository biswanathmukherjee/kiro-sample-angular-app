import { describe, it, expect } from 'vitest';
import { getBooks, getBookById, getBooksByCategory, searchBooks, getCategories } from './bookService';

describe('bookService', () => {
  it('should return all books', () => {
    const books = getBooks();
    expect(books.length).toBeGreaterThanOrEqual(8);
  });

  it('should return a book by valid id', () => {
    const book = getBookById(1);
    expect(book).toBeTruthy();
    expect(book!.id).toBe(1);
    expect(book!.title).toBeTruthy();
  });

  it('should return undefined for invalid id', () => {
    const book = getBookById(9999);
    expect(book).toBeUndefined();
  });

  it('should search books by title', () => {
    const books = searchBooks('gatsby');
    expect(books.length).toBeGreaterThanOrEqual(1);
    expect(books[0].title.toLowerCase()).toContain('gatsby');
  });

  it('should search books by author', () => {
    const books = searchBooks('hawking');
    expect(books.length).toBeGreaterThanOrEqual(1);
    expect(books[0].author.toLowerCase()).toContain('hawking');
  });

  it('should return empty array for non-matching search', () => {
    const books = searchBooks('xyznonexistent');
    expect(books.length).toBe(0);
  });

  it('should return books filtered by category', () => {
    const books = getBooksByCategory('Fiction');
    expect(books.length).toBeGreaterThanOrEqual(1);
    books.forEach(book => {
      expect(book.category).toBe('Fiction');
    });
  });

  it('should return unique sorted categories', () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThanOrEqual(3);
    for (let i = 1; i < categories.length; i++) {
      expect(categories[i] >= categories[i - 1]).toBe(true);
    }
    const unique = new Set(categories);
    expect(unique.size).toBe(categories.length);
  });
});
