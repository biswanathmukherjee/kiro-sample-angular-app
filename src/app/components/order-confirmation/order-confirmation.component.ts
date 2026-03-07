import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="confirmation-container">
      @if (order$ | async; as order) {
        <div class="success-header">
          <div class="success-icon">&#10003;</div>
          <h1 class="page-title">Order Confirmed!</h1>
          <p class="success-message">Thank you for your purchase.</p>
        </div>

        <div class="order-details">
          <div class="detail-row">
            <span class="detail-label">Order ID:</span>
            <span class="detail-value">{{ order.id }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">{{ order.orderDate | date:'medium' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Cardholder:</span>
            <span class="detail-value">{{ order.cardholderName }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Card:</span>
            <span class="detail-value">**** **** **** {{ order.cardLastFour }}</span>
          </div>
        </div>

        <div class="order-items">
          <h2 class="section-title">Items</h2>
          @for (item of order.items; track item.book.id) {
            <div class="order-item">
              <span class="item-name">{{ item.book.title }} x {{ item.quantity }}</span>
              <span class="item-price">{{ item.book.price * item.quantity | currency }}</span>
            </div>
          }
          <div class="order-total">
            <span>Total:</span>
            <span class="total-amount">{{ order.total | currency }}</span>
          </div>
        </div>

        <a routerLink="/books" class="continue-btn">Continue Shopping</a>
      } @else {
        <div class="no-order">
          <p class="empty-message">No order found.</p>
          <a routerLink="/books" class="browse-btn">Browse Books</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .confirmation-container {
      max-width: 700px;
      margin: 0 auto;
      padding: 1rem;
    }

    .success-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .success-icon {
      width: 60px;
      height: 60px;
      background: #27ae60;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin: 0 auto 1rem auto;
    }

    .page-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text, #2c3e50);
      margin: 0 0 0.5rem 0;
    }

    .success-message {
      color: #777;
      font-size: 1rem;
      margin: 0;
    }

    .order-details {
      background: var(--card-bg, #fff);
      border-radius: 10px;
      padding: 1.25rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      margin-bottom: 1.5rem;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border, #e0e0e0);
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      font-weight: 600;
      color: var(--text, #2c3e50);
    }

    .detail-value {
      color: #555;
    }

    .section-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text, #2c3e50);
      margin: 0 0 1rem 0;
    }

    .order-items {
      background: var(--card-bg, #fff);
      border-radius: 10px;
      padding: 1.25rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      margin-bottom: 2rem;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border, #e0e0e0);
    }

    .item-name {
      color: var(--text, #2c3e50);
    }

    .item-price {
      font-weight: 600;
      color: var(--text, #2c3e50);
    }

    .order-total {
      display: flex;
      justify-content: space-between;
      padding-top: 1rem;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text, #2c3e50);
    }

    .total-amount {
      color: var(--primary, #2c3e50);
    }

    .continue-btn {
      display: block;
      text-align: center;
      padding: 0.8rem 2rem;
      background: var(--primary, #2c3e50);
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      transition: background 0.2s;
    }

    .continue-btn:hover {
      background: var(--primary-hover, #1a252f);
    }

    .no-order {
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
  `]
})
export class OrderConfirmationComponent {
  order$: Observable<Order | null>;

  constructor(private orderService: OrderService) {
    this.order$ = this.orderService.getLastOrder();
  }
}
