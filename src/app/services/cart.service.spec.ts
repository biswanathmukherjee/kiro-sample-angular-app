import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Book } from '../models/book.model';

describe('CartService', () => {
  let service: CartService;

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

  const mockBook2: Book = {
    id: 2,
    title: 'Another Book',
    author: 'Another Author',
    description: 'Another Description',
    price: 29.99,
    coverImage: '',
    isbn: '978-0000000002',
    publishedDate: '2021-01-01',
    category: 'Science',
    rating: 4.0,
    stock: 5
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty cart', (done) => {
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should add a new item to cart', (done) => {
    service.addToCart(mockBook);
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].book.id).toBe(mockBook.id);
      expect(items[0].quantity).toBe(1);
      done();
    });
  });

  it('should increment quantity for duplicate book', (done) => {
    service.addToCart(mockBook);
    service.addToCart(mockBook);
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(2);
      done();
    });
  });

  it('should remove an item from cart', (done) => {
    service.addToCart(mockBook);
    service.addToCart(mockBook2);
    service.removeFromCart(mockBook.id);
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].book.id).toBe(mockBook2.id);
      done();
    });
  });

  it('should update quantity of an item', (done) => {
    service.addToCart(mockBook);
    service.updateQuantity(mockBook.id, 5);
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(5);
      done();
    });
  });

  it('should remove item when quantity is set to 0', (done) => {
    service.addToCart(mockBook);
    service.updateQuantity(mockBook.id, 0);
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should calculate cart total correctly', (done) => {
    service.addToCart(mockBook);
    service.addToCart(mockBook2);
    service.addToCart(mockBook); // mockBook quantity = 2
    service.getCartTotal().subscribe(total => {
      const expected = (mockBook.price * 2) + (mockBook2.price * 1);
      expect(total).toBeCloseTo(expected, 2);
      done();
    });
  });

  it('should return correct cart item count', (done) => {
    service.addToCart(mockBook);
    service.addToCart(mockBook2);
    service.addToCart(mockBook); // mockBook quantity = 2
    service.getCartItemCount().subscribe(count => {
      expect(count).toBe(3);
      done();
    });
  });

  it('should clear the cart', (done) => {
    service.addToCart(mockBook);
    service.addToCart(mockBook2);
    service.clearCart();
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should return a synchronous snapshot of cart items', () => {
    expect(service.getCartItemsSnapshot().length).toBe(0);

    service.addToCart(mockBook);
    service.addToCart(mockBook2);

    const snapshot = service.getCartItemsSnapshot();
    expect(snapshot.length).toBe(2);
    expect(snapshot[0].book.id).toBe(mockBook.id);
    expect(snapshot[1].book.id).toBe(mockBook2.id);
  });
});
