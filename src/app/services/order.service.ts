import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private lastOrder = new BehaviorSubject<Order | null>(null);

  placeOrder(items: CartItem[], total: number, cardholderName: string, cardLastFour: string): Order {
    const order: Order = {
      id: this.generateOrderId(),
      items,
      total,
      cardholderName,
      cardLastFour,
      orderDate: new Date()
    };
    this.lastOrder.next(order);
    return order;
  }

  getLastOrder(): Observable<Order | null> {
    return this.lastOrder.asObservable();
  }

  clearOrder(): void {
    this.lastOrder.next(null);
  }

  private generateOrderId(): string {
    return 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
