import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="checkout-container">
      <h1 class="page-title">Checkout</h1>

      @if ((cartItems$ | async)?.length) {
        <div class="checkout-content">
          <div class="order-summary">
            <h2 class="section-title">Order Summary</h2>
            @for (item of (cartItems$ | async); track item.book.id) {
              <div class="summary-item">
                <span class="summary-item-name">{{ item.book.title }} x {{ item.quantity }}</span>
                <span class="summary-item-price">{{ item.book.price * item.quantity | currency }}</span>
              </div>
            }
            <div class="summary-total">
              <span>Total:</span>
              <span class="total-amount">{{ cartTotal$ | async | currency }}</span>
            </div>
          </div>

          <div class="payment-form">
            <h2 class="section-title">Payment Details</h2>
            <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="cardholderName">Cardholder Name</label>
                <input id="cardholderName" type="text" formControlName="cardholderName" placeholder="John Doe">
                @if (checkoutForm.get('cardholderName')?.invalid && checkoutForm.get('cardholderName')?.touched) {
                  <span class="error">Cardholder name is required.</span>
                }
              </div>

              <div class="form-group">
                <label for="cardNumber">Card Number</label>
                <input id="cardNumber" type="text" formControlName="cardNumber" placeholder="1234567890123456">
                @if (checkoutForm.get('cardNumber')?.invalid && checkoutForm.get('cardNumber')?.touched) {
                  <span class="error">Enter a valid 16-digit card number.</span>
                }
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="expiryDate">Expiry Date</label>
                  <input id="expiryDate" type="text" formControlName="expiryDate" placeholder="MM/YY">
                  @if (checkoutForm.get('expiryDate')?.invalid && checkoutForm.get('expiryDate')?.touched) {
                    <span class="error">Enter a valid expiry date (MM/YY).</span>
                  }
                </div>

                <div class="form-group">
                  <label for="cvv">CVV</label>
                  <input id="cvv" type="text" formControlName="cvv" placeholder="123">
                  @if (checkoutForm.get('cvv')?.invalid && checkoutForm.get('cvv')?.touched) {
                    <span class="error">Enter a valid CVV (3-4 digits).</span>
                  }
                </div>
              </div>

              <button type="submit" class="submit-btn" [disabled]="checkoutForm.invalid">Place Order</button>
            </form>
          </div>
        </div>
      } @else {
        <div class="empty-cart">
          <p class="empty-message">Your cart is empty. Add some books before checking out.</p>
          <a routerLink="/books" class="browse-btn">Browse Books</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .checkout-container {
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

    .checkout-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .section-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text, #2c3e50);
      margin: 0 0 1rem 0;
    }

    .order-summary {
      background: var(--card-bg, #fff);
      border-radius: 10px;
      padding: 1.25rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border, #e0e0e0);
    }

    .summary-item-name {
      color: var(--text, #2c3e50);
    }

    .summary-item-price {
      font-weight: 600;
      color: var(--text, #2c3e50);
    }

    .summary-total {
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

    .payment-form {
      background: var(--card-bg, #fff);
      border-radius: 10px;
      padding: 1.25rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      color: var(--text, #2c3e50);
      margin-bottom: 0.35rem;
      font-size: 0.9rem;
    }

    .form-group input {
      width: 100%;
      padding: 0.65rem 0.75rem;
      border: 2px solid var(--border, #e0e0e0);
      border-radius: 8px;
      font-size: 0.95rem;
      color: var(--text, #2c3e50);
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: var(--primary, #2c3e50);
    }

    .form-row {
      display: flex;
      gap: 1rem;
    }

    .form-row .form-group {
      flex: 1;
    }

    .error {
      color: var(--accent, #e74c3c);
      font-size: 0.8rem;
      margin-top: 0.25rem;
      display: block;
    }

    .submit-btn {
      width: 100%;
      padding: 0.8rem;
      background: var(--primary, #2c3e50);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 0.5rem;
    }

    .submit-btn:hover:not(:disabled) {
      background: var(--primary-hover, #1a252f);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
  `]
})
export class CheckoutComponent {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.cartItems$ = this.cartService.getCartItems();
    this.cartTotal$ = this.cartService.getCartTotal();
    this.checkoutForm = this.fb.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const { cardholderName, cardNumber } = this.checkoutForm.value;
      const cardLastFour = cardNumber.slice(-4);

      this.cartService.getCartItems().subscribe(cartItems => {
        const total = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
        this.orderService.placeOrder(cartItems, total, cardholderName, cardLastFour);
        this.cartService.clearCart();
        this.router.navigate(['/order-confirmation']);
      }).unsubscribe();
    }
  }
}
