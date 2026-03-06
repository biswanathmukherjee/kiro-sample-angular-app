import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { Book } from '../models/book.model';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all books', (done) => {
    service.getBooks().subscribe(books => {
      expect(books.length).toBeGreaterThanOrEqual(8);
      done();
    });
  });

  it('should return a book by valid id', (done) => {
    service.getBookById(1).subscribe(book => {
      expect(book).toBeTruthy();
      expect(book!.id).toBe(1);
      expect(book!.title).toBeTruthy();
      done();
    });
  });

  it('should return undefined for invalid id', (done) => {
    service.getBookById(9999).subscribe(book => {
      expect(book).toBeUndefined();
      done();
    });
  });

  it('should search books by title', (done) => {
    service.searchBooks('gatsby').subscribe(books => {
      expect(books.length).toBeGreaterThanOrEqual(1);
      expect(books[0].title.toLowerCase()).toContain('gatsby');
      done();
    });
  });

  it('should search books by author', (done) => {
    service.searchBooks('hawking').subscribe(books => {
      expect(books.length).toBeGreaterThanOrEqual(1);
      expect(books[0].author.toLowerCase()).toContain('hawking');
      done();
    });
  });

  it('should return empty array for non-matching search', (done) => {
    service.searchBooks('xyznonexistent').subscribe(books => {
      expect(books.length).toBe(0);
      done();
    });
  });

  it('should return books filtered by category', (done) => {
    service.getBooksByCategory('Fiction').subscribe(books => {
      expect(books.length).toBeGreaterThanOrEqual(1);
      books.forEach(book => {
        expect(book.category).toBe('Fiction');
      });
      done();
    });
  });

  it('should return unique sorted categories', (done) => {
    service.getCategories().subscribe(categories => {
      expect(categories.length).toBeGreaterThanOrEqual(3);
      for (let i = 1; i < categories.length; i++) {
        expect(categories[i] >= categories[i - 1]).toBeTrue();
      }
      // Check uniqueness
      const unique = new Set(categories);
      expect(unique.size).toBe(categories.length);
      done();
    });
  });
});
