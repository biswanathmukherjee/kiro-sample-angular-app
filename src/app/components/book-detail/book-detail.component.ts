import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (book) {
      <div class="book-detail">
        <a routerLink="/books" class="back-link">&larr; Back to Books</a>
        <div class="detail-layout">
          <div class="cover-section">
            <div class="cover-placeholder" [style.background-color]="getBookColor(book)">
              <span class="cover-letter">{{ book.title.charAt(0) }}</span>
            </div>
          </div>
          <div class="info-section">
            <h1 class="book-title">{{ book.title }}</h1>
            <p class="book-author">by {{ book.author }}</p>
            <div class="book-rating">{{ book.rating }} &#9733;</div>
            <p class="book-price">{{ book.price | currency }}</p>
            <span class="stock-badge" [class.in-stock]="book.stock > 0" [class.out-of-stock]="book.stock === 0">
              {{ book.stock > 0 ? 'In Stock (' + book.stock + ')' : 'Out of Stock' }}
            </span>
            <p class="book-description">{{ book.description }}</p>
            <div class="book-details-grid">
              <div class="detail-item">
                <span class="detail-label">ISBN</span>
                <span class="detail-value">{{ book.isbn }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Published</span>
                <span class="detail-value">{{ book.publishedDate }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Category</span>
                <span class="detail-value">{{ book.category }}</span>
              </div>
            </div>
            <button
              class="add-to-cart-btn"
              (click)="addToCart()"
              [disabled]="book.stock === 0"
            >
              {{ book.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
            </button>
          </div>
        </div>
      </div>
    } @else {
      <div class="not-found">
        <h2>Book not found</h2>
        <a routerLink="/books" class="back-link">Browse all books</a>
      </div>
    }
  `,
  styles: [`
    .book-detail {
      max-width: 900px;
      margin: 0 auto;
      padding: 1rem;
    }

    .back-link {
      display: inline-block;
      color: var(--primary, #2c3e50);
      text-decoration: none;
      font-weight: 500;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }

    .back-link:hover {
      text-decoration: underline;
    }

    .detail-layout {
      display: flex;
      gap: 2.5rem;
    }

    .cover-section {
      flex-shrink: 0;
    }

    .cover-placeholder {
      width: 280px;
      height: 380px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .cover-letter {
      font-size: 6rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.8);
    }

    .info-section {
      flex: 1;
    }

    .book-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text, #2c3e50);
      margin: 0 0 0.3rem 0;
    }

    .book-author {
      font-size: 1.1rem;
      color: #777;
      margin: 0 0 0.75rem 0;
    }

    .book-rating {
      font-size: 1.1rem;
      color: #f39c12;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .book-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary, #2c3e50);
      margin: 0 0 0.75rem 0;
    }

    .stock-badge {
      display: inline-block;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .stock-badge.in-stock {
      background: #d4edda;
      color: #155724;
    }

    .stock-badge.out-of-stock {
      background: #f8d7da;
      color: #721c24;
    }

    .book-description {
      font-size: 1rem;
      line-height: 1.7;
      color: #555;
      margin: 1rem 0;
    }

    .book-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
      padding: 1rem;
      background: var(--bg, #f8f9fa);
      border-radius: 8px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
    }

    .detail-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      color: #999;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .detail-value {
      font-size: 0.95rem;
      color: var(--text, #2c3e50);
      font-weight: 500;
    }

    .add-to-cart-btn {
      padding: 0.75rem 2rem;
      background: var(--primary, #2c3e50);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .add-to-cart-btn:hover:not(:disabled) {
      background: var(--primary-hover, #1a252f);
    }

    .add-to-cart-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .not-found {
      text-align: center;
      padding: 4rem 1rem;
    }

    .not-found h2 {
      color: var(--text, #2c3e50);
      margin-bottom: 1rem;
    }

    @media (max-width: 700px) {
      .detail-layout {
        flex-direction: column;
        align-items: center;
      }

      .cover-placeholder {
        width: 200px;
        height: 280px;
      }

      .cover-letter {
        font-size: 4rem;
      }
    }
  `]
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;

  private bookColors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#34495e', '#f1c40f'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe(book => {
      this.book = book;
    });
  }

  addToCart(): void {
    if (this.book) {
      this.cartService.addToCart(this.book);
    }
  }

  getBookColor(book: Book): string {
    return this.bookColors[book.id % this.bookColors.length];
  }
}
