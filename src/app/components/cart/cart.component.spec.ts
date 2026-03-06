import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { Book } from '../../models/book.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    cartService = TestBed.inject(CartService);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty cart message when cart is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-cart')).toBeTruthy();
    expect(compiled.querySelector('.empty-message')?.textContent).toContain('Your cart is empty');
  });

  it('should display cart items when items exist', () => {
    cartService.addToCart(mockBook);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-cart')).toBeFalsy();
    expect(compiled.querySelector('.cart-item')).toBeTruthy();
    expect(compiled.querySelector('.item-title')?.textContent).toContain('Test Book');
  });

  it('should show browse books link when cart is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const browseLink = compiled.querySelector('.browse-btn');
    expect(browseLink).toBeTruthy();
    expect(browseLink?.textContent).toContain('Browse Books');
  });
});
