import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  getCartItemsSnapshot(): CartItem[] {
    return this.cartItems.getValue();
  }

  addToCart(book: Book): void {
    const items = this.cartItems.getValue();
    const existingItem = items.find(item => item.book.id === book.id);

    if (existingItem) {
      const updated = items.map(item =>
        item.book.id === book.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      this.cartItems.next(updated);
    } else {
      this.cartItems.next([...items, { book, quantity: 1 }]);
    }
  }

  removeFromCart(bookId: number): void {
    const items = this.cartItems.getValue();
    this.cartItems.next(items.filter(item => item.book.id !== bookId));
  }

  updateQuantity(bookId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(bookId);
      return;
    }
    const items = this.cartItems.getValue();
    const updated = items.map(item =>
      item.book.id === bookId
        ? { ...item, quantity }
        : item
    );
    this.cartItems.next(updated);
  }

  getCartTotal(): Observable<number> {
    return this.cartItems.pipe(
      map(items => items.reduce((total, item) => total + (item.book.price * item.quantity), 0))
    );
  }

  getCartItemCount(): Observable<number> {
    return this.cartItems.pipe(
      map(items => items.reduce((count, item) => count + item.quantity, 0))
    );
  }

  clearCart(): void {
    this.cartItems.next([]);
  }
}
