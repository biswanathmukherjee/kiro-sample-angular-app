import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cart-container">
      <h1 class="page-title">Shopping Cart</h1>

      @if ((cartItems$ | async)?.length) {
        <div class="cart-items">
          @for (item of (cartItems$ | async); track item.book.id) {
            <div class="cart-item">
              <div class="item-info">
                <h3 class="item-title">{{ item.book.title }}</h3>
                <p class="item-author">{{ item.book.author }}</p>
                <p class="item-price">{{ item.book.price | currency }}</p>
              </div>
              <div class="item-controls">
                <div class="quantity-controls">
                  <button class="qty-btn" (click)="updateQuantity(item.book.id, item.quantity - 1)">-</button>
                  <span class="qty-display">{{ item.quantity }}</span>
                  <button class="qty-btn" (click)="updateQuantity(item.book.id, item.quantity + 1)">+</button>
                </div>
                <p class="item-subtotal">{{ item.book.price * item.quantity | currency }}</p>
                <button class="remove-btn" (click)="removeFromCart(item.book.id)">Remove</button>
              </div>
            </div>
          }
        </div>

        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span class="total-amount">{{ cartTotal$ | async | currency }}</span>
          </div>
          <div class="cart-actions">
            <a routerLink="/books" class="continue-btn">Continue Shopping</a>
            <button class="clear-btn" (click)="clearCart()">Clear Cart</button>
          </div>
        </div>
      } @else {
        <div class="empty-cart">
          <p class="empty-message">Your cart is empty</p>
          <a routerLink="/books" class="browse-btn">Browse Books</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }

    .page-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text, #2c3e50);
      margin-bottom: 1.5rem;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem;
      background: var(--card-bg, #fff);
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .item-info {
      flex: 1;
    }

    .item-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text, #2c3e50);
      margin: 0 0 0.25rem 0;
    }

    .item-author {
      font-size: 0.85rem;
      color: #777;
      margin: 0 0 0.25rem 0;
    }

    .item-price {
      font-size: 0.9rem;
      color: #999;
      margin: 0;
    }

    .item-controls {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .qty-btn {
      width: 32px;
      height: 32px;
      border: 2px solid var(--border, #ddd);
      border-radius: 6px;
      background: var(--card-bg, #fff);
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      color: var(--text, #2c3e50);
    }

    .qty-btn:hover {
      border-color: var(--primary, #2c3e50);
      background: var(--primary, #2c3e50);
      color: #fff;
    }

    .qty-display {
      min-width: 2rem;
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
    }

    .item-subtotal {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text, #2c3e50);
      min-width: 80px;
      text-align: right;
      margin: 0;
    }

    .remove-btn {
      padding: 0.4rem 0.8rem;
      background: none;
      border: 1px solid #e74c3c;
      color: #e74c3c;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .remove-btn:hover {
      background: #e74c3c;
      color: #fff;
    }

    .cart-footer {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 2px solid var(--border, #eee);
    }

    .cart-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text, #2c3e50);
      margin-bottom: 1.5rem;
    }

    .total-amount {
      font-size: 1.5rem;
      color: var(--primary, #2c3e50);
    }

    .cart-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .continue-btn {
      padding: 0.7rem 1.5rem;
      background: var(--primary, #2c3e50);
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: background 0.2s;
    }

    .continue-btn:hover {
      background: var(--primary-hover, #1a252f);
    }

    .clear-btn {
      padding: 0.7rem 1.5rem;
      background: none;
      border: 2px solid #e74c3c;
      color: #e74c3c;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .clear-btn:hover {
      background: #e74c3c;
      color: #fff;
    }

    .empty-cart {
      text-align: center;
      padding: 4rem 1rem;
    }

    .empty-message {
      font-size: 1.3rem;
      color: #999;
      margin-bottom: 1.5rem;
    }

    .browse-btn {
      display: inline-block;
      padding: 0.75rem 2rem;
      background: var(--primary, #2c3e50);
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      transition: background 0.2s;
    }

    .browse-btn:hover {
      background: var(--primary-hover, #1a252f);
    }

    @media (max-width: 600px) {
      .cart-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .item-controls {
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
    this.cartTotal$ = this.cartService.getCartTotal();
  }

  updateQuantity(bookId: number, quantity: number): void {
    this.cartService.updateQuantity(bookId, quantity);
  }

  removeFromCart(bookId: number): void {
    this.cartService.removeFromCart(bookId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
