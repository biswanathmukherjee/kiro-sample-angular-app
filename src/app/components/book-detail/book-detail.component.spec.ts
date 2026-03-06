import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { BookDetailComponent } from './book-detail.component';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display book details', () => {
    expect(component.book).toBeTruthy();
    expect(component.book!.id).toBe(1);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.book-title')?.textContent).toBeTruthy();
  });

  it('should display back to books link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.back-link')?.textContent).toContain('Back to Books');
  });

  it('should show add to cart button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('.add-to-cart-btn');
    expect(btn).toBeTruthy();
  });
});
