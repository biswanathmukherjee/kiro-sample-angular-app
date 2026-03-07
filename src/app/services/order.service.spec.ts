import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { CartItem } from '../models/cart-item.model';
import { Book } from '../models/book.model';

describe('OrderService', () => {
  let service: OrderService;

  const mockBook: Book = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    description: 'Test Description',
    price: 19.99,
    coverImage: '',
    isbn: '978-0000000001',
    publishedDate: '2020-01-01',
    category: 'Fiction',
    rating: 4.5,
    stock: 10
  };

  const mockCartItems: CartItem[] = [
    { book: mockBook, quantity: 2 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null initially from getLastOrder', (done) => {
    service.getLastOrder().subscribe(order => {
      expect(order).toBeNull();
      done();
    });
  });

  it('should create and store an order via placeOrder', () => {
    const order = service.placeOrder(mockCartItems, 39.98, 'John Doe', '3456');
    expect(order.id).toMatch(/^ORD-/);
    expect(order.items).toEqual(mockCartItems);
    expect(order.total).toBe(39.98);
    expect(order.cardholderName).toBe('John Doe');
    expect(order.cardLastFour).toBe('3456');
  });

  it('should return the placed order from getLastOrder', (done) => {
    const order = service.placeOrder(mockCartItems, 39.98, 'John Doe', '3456');
    service.getLastOrder().subscribe(lastOrder => {
      expect(lastOrder).toBeTruthy();
      expect(lastOrder!.id).toBe(order.id);
      done();
    });
  });

  it('should reset to null after clearOrder', (done) => {
    service.placeOrder(mockCartItems, 39.98, 'John Doe', '3456');
    service.clearOrder();
    service.getLastOrder().subscribe(order => {
      expect(order).toBeNull();
      done();
    });
  });
});
