import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `
    <nav class="header">
      <a routerLink="/books" class="logo">Angular Bookstore</a>
      <div class="nav-links">
        <a routerLink="/books" class="nav-link">Books</a>
        <a routerLink="/cart" class="nav-link cart-link">
          Cart
          @if (cartItemCount$ | async; as count) {
            <span class="cart-badge">{{ count }}</span>
          }
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 60px;
      background-color: var(--primary, #2c3e50);
      color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .logo {
      font-size: 1.4rem;
      font-weight: 700;
      color: #fff;
      text-decoration: none;
      letter-spacing: -0.02em;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.2s;
    }

    .nav-link:hover {
      color: #fff;
    }

    .cart-link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .cart-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: 10px;
      background-color: var(--accent, #e74c3c);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      line-height: 1;
    }
  `]
})
export class HeaderComponent {
  cartItemCount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItemCount$ = this.cartService.getCartItemCount();
  }
}
