import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '../../services/cart.service';
import { Book } from '../../models/book.model';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartService: CartService;
  let router: Router;

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
      imports: [CheckoutComponent, ReactiveFormsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty cart message when cart is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-cart')).toBeTruthy();
  });

  it('should display order summary when cart has items', () => {
    cartService.addToCart(mockBook);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.summary-item')).toBeTruthy();
  });

  it('should have form initially invalid', () => {
    expect(component.checkoutForm.invalid).toBeTrue();
  });

  it('should validate cardNumber requires 16 digits', () => {
    const cardNumber = component.checkoutForm.get('cardNumber')!;
    cardNumber.setValue('123');
    expect(cardNumber.invalid).toBeTrue();

    cardNumber.setValue('1234567890123456');
    expect(cardNumber.valid).toBeTrue();
  });

  it('should validate CVV requires 3-4 digits', () => {
    const cvv = component.checkoutForm.get('cvv')!;
    cvv.setValue('12');
    expect(cvv.invalid).toBeTrue();

    cvv.setValue('123');
    expect(cvv.valid).toBeTrue();

    cvv.setValue('1234');
    expect(cvv.valid).toBeTrue();
  });

  it('should validate expiryDate format MM/YY', () => {
    const expiryDate = component.checkoutForm.get('expiryDate')!;
    expiryDate.setValue('13/25');
    expect(expiryDate.invalid).toBeTrue();

    expiryDate.setValue('12/25');
    expect(expiryDate.valid).toBeTrue();
  });

  it('should disable submit button when form is invalid', () => {
    cartService.addToCart(mockBook);
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector('.submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should navigate to /order-confirmation on valid submit', () => {
    cartService.addToCart(mockBook);
    fixture.detectChanges();

    component.checkoutForm.setValue({
      cardholderName: 'John Doe',
      cardNumber: '1234567890123456',
      expiryDate: '12/25',
      cvv: '123'
    });

    spyOn(router, 'navigate');
    spyOn(cartService, 'clearCart');
    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/order-confirmation']);
  });
});
