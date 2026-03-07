import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OrderConfirmationComponent } from './order-confirmation.component';
import { OrderService } from '../../services/order.service';
import { Book } from '../../models/book.model';
import { CartItem } from '../../models/cart-item.model';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let orderService: OrderService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmationComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    orderService = TestBed.inject(OrderService);
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no-order message when no order exists', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.no-order')).toBeTruthy();
  });

  it('should display order details when order exists', () => {
    const order = orderService.placeOrder(mockCartItems, 39.98, 'John Doe', '3456');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.order-details')).toBeTruthy();
    expect(compiled.querySelector('.order-item')).toBeTruthy();
    expect(compiled.querySelector('.continue-btn')).toBeTruthy();
    expect(compiled.textContent).toContain(order.id);
  });

  it('should show continue shopping link', () => {
    const order = orderService.placeOrder(mockCartItems, 39.98, 'John Doe', '3456');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const continueBtn = compiled.querySelector('.continue-btn');
    expect(continueBtn).toBeTruthy();
    expect(continueBtn?.textContent).toContain('Continue Shopping');
  });
});
