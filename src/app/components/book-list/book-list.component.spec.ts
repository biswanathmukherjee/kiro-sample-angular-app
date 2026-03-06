import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display book cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.book-card');
    expect(cards.length).toBeGreaterThanOrEqual(8);
  });

  it('should filter books by search query', () => {
    component.searchQuery = 'gatsby';
    component.onSearch();
    fixture.detectChanges();
    expect(component.filteredBooks.length).toBe(1);
    expect(component.filteredBooks[0].title.toLowerCase()).toContain('gatsby');
  });

  it('should filter books by category', () => {
    component.filterByCategory('Fiction');
    fixture.detectChanges();
    expect(component.filteredBooks.length).toBeGreaterThanOrEqual(1);
    component.filteredBooks.forEach(book => {
      expect(book.category).toBe('Fiction');
    });
  });

  it('should show all books when category filter is cleared', () => {
    component.filterByCategory('Fiction');
    component.filterByCategory('');
    fixture.detectChanges();
    expect(component.filteredBooks.length).toBe(component.books.length);
  });
});
