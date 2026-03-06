import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set against the backdrop of the Roaring Twenties.',
      price: 12.99,
      coverImage: '',
      isbn: '978-0743273565',
      publishedDate: '1925-04-10',
      category: 'Fiction',
      rating: 4.5,
      stock: 15
    },
    {
      id: 2,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      description: 'A landmark volume in science writing by one of the great minds of our time, exploring the nature of time, the Big Bang, black holes, and more.',
      price: 18.95,
      coverImage: '',
      isbn: '978-0553380163',
      publishedDate: '1988-09-01',
      category: 'Science',
      rating: 4.7,
      stock: 8
    },
    {
      id: 3,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: 'A handbook of agile software craftsmanship that teaches developers how to write code that is easy to read, understand, and maintain.',
      price: 39.99,
      coverImage: '',
      isbn: '978-0132350884',
      publishedDate: '2008-08-01',
      category: 'Technology',
      rating: 4.6,
      stock: 20
    },
    {
      id: 4,
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      description: 'A groundbreaking narrative of humanity\'s creation and evolution that explores how biology and history have defined what it means to be human.',
      price: 16.99,
      coverImage: '',
      isbn: '978-0062316097',
      publishedDate: '2015-02-10',
      category: 'History',
      rating: 4.8,
      stock: 12
    },
    {
      id: 5,
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'An easy and proven way to build good habits and break bad ones. Discover how tiny changes in behavior can lead to remarkable results.',
      price: 14.99,
      coverImage: '',
      isbn: '978-0735211292',
      publishedDate: '2018-10-16',
      category: 'Self-Help',
      rating: 4.9,
      stock: 25
    },
    {
      id: 6,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. A gripping tale of racial injustice and the loss of innocence.',
      price: 11.49,
      coverImage: '',
      isbn: '978-0061120084',
      publishedDate: '1960-07-11',
      category: 'Fiction',
      rating: 4.8,
      stock: 18
    },
    {
      id: 7,
      title: 'The Pragmatic Programmer',
      author: 'David Thomas & Andrew Hunt',
      description: 'Your journey to mastery. Filled with practical advice and timeless wisdom for programmers at all levels.',
      price: 44.99,
      coverImage: '',
      isbn: '978-0135957059',
      publishedDate: '2019-09-23',
      category: 'Technology',
      rating: 4.7,
      stock: 10
    },
    {
      id: 8,
      title: 'Cosmos',
      author: 'Carl Sagan',
      description: 'Cosmos retraces the fourteen billion years of cosmic evolution that have transformed matter into consciousness, exploring how science and civilization grew up together.',
      price: 15.99,
      coverImage: '',
      isbn: '978-0345539434',
      publishedDate: '1980-10-12',
      category: 'Science',
      rating: 4.6,
      stock: 7
    },
    {
      id: 9,
      title: 'The Art of War',
      author: 'Sun Tzu',
      description: 'An ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work is composed of 13 chapters on the art of warfare.',
      price: 8.99,
      coverImage: '',
      isbn: '978-1599869773',
      publishedDate: '0500-01-01',
      category: 'History',
      rating: 4.3,
      stock: 30
    },
    {
      id: 10,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      description: 'In this international bestseller, Daniel Kahneman explains the two systems that drive the way we think: fast intuitive thinking and slow deliberate thinking.',
      price: 16.49,
      coverImage: '',
      isbn: '978-0374533557',
      publishedDate: '2011-10-25',
      category: 'Self-Help',
      rating: 4.5,
      stock: 0
    }
  ];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBookById(id: number): Observable<Book | undefined> {
    return of(this.books.find(book => book.id === id));
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    return of(this.books.filter(book => book.category === category));
  }

  searchBooks(query: string): Observable<Book[]> {
    const lowerQuery = query.toLowerCase();
    return of(this.books.filter(book =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery)
    ));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.books.map(book => book.category))];
    return of(categories.sort());
  }
}
