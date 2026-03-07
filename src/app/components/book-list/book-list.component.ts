import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="book-list-container">
      <h1 class="page-title">Browse Books</h1>

      <div class="filters">
        <input
          type="text"
          class="search-input"
          placeholder="Search by title or author..."
          [(ngModel)]="searchQuery"
          (ngModel)="onSearch()"
          (input)="onSearch()"
        />
        <div class="category-chips">
          <button
            class="chip"
            [class.active]="selectedCategory === ''"
            (click)="filterByCategory('')"
          >All</button>
          @for (category of categories; track category) {
            <button
              class="chip"
              [class.active]="selectedCategory === category"
              (click)="filterByCategory(category)"
            >{{ category }}</button>
          }
        </div>
      </div>

      <div class="book-grid">
        @for (book of filteredBooks; track book.id) {
          <div class="book-card">
            <a [routerLink]="['/books', book.id]" class="book-cover">
              <div class="cover-placeholder" [style.background-color]="getBookColor(book)">
                <span class="cover-letter">{{ book.title.charAt(0) }}</span>
              </div>
            </a>
            <div class="book-info">
              <a [routerLink]="['/books', book.id]" class="book-title">{{ book.title }}</a>
              <p class="book-author">{{ book.author }}</p>
              <div class="book-meta">
                <span class="book-price">{{ book.price | currency }}</span>
                <span class="book-rating">{{ book.rating }} &#9733;</span>
              </div>
              <button class="add-to-cart-btn" (click)="addToCart(book)">Add to Cart</button>
            </div>
          </div>
        }
      </div>

      @if (filteredBooks.length === 0) {
        <p class="no-results">No books found matching your criteria.</p>
      }
    </div>
  `,
  styles: [`
    .book-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }

    .page-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text, #2c3e50);
      margin-bottom: 1.5rem;
    }

    .filters {
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid var(--border, #ddd);
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .search-input:focus {
      border-color: var(--primary, #2c3e50);
    }

    .category-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .chip {
      padding: 0.4rem 1rem;
      border: 2px solid var(--border, #ddd);
      border-radius: 20px;
      background: var(--card-bg, #fff);
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text, #2c3e50);
      transition: all 0.2s;
    }

    .chip:hover {
      border-color: var(--primary, #2c3e50);
    }

    .chip.active {
      background: var(--primary, #2c3e50);
      color: #fff;
      border-color: var(--primary, #2c3e50);
    }

    .book-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .book-card {
      background: var(--card-bg, #fff);
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .book-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .book-cover {
      display: block;
      text-decoration: none;
    }

    .cover-placeholder {
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cover-letter {
      font-size: 4rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.8);
    }

    .book-info {
      padding: 1rem;
    }

    .book-title {
      display: block;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text, #2c3e50);
      text-decoration: none;
      margin-bottom: 0.3rem;
      line-height: 1.3;
    }

    .book-title:hover {
      color: var(--primary, #2c3e50);
      text-decoration: underline;
    }

    .book-author {
      font-size: 0.85rem;
      color: #777;
      margin: 0 0 0.75rem 0;
    }

    .book-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .book-price {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--primary, #2c3e50);
    }

    .book-rating {
      font-size: 0.9rem;
      color: #f39c12;
      font-weight: 600;
    }

    .add-to-cart-btn {
      width: 100%;
      padding: 0.6rem;
      background: var(--primary, #2c3e50);
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .add-to-cart-btn:hover {
      background: var(--primary-hover, #1a252f);
    }

    .no-results {
      text-align: center;
      color: #777;
      font-size: 1.1rem;
      padding: 3rem 0;
    }

    @media (max-width: 600px) {
      .book-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 1rem;
      }
    }
  `]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  categories: string[] = [];
  searchQuery = '';
  selectedCategory = '';

  private bookColors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#34495e', '#f1c40f'];

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
    });
    this.bookService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  addToCart(book: Book): void {
    this.cartService.addToCart(book);
  }

  getBookColor(book: Book): string {
    return this.bookColors[book.id % this.bookColors.length];
  }

  private applyFilters(): void {
    let result = this.books;

    if (this.selectedCategory) {
      result = result.filter(book => book.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }

    this.filteredBooks = result;
  }
}
