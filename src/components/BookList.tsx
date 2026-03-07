import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../models/book.model';
import { getBooks, getCategories } from '../services/bookService';
import { useCart } from '../contexts/CartContext';
import styles from './BookList.module.css';

const bookColors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#34495e', '#f1c40f'];

function formatCurrency(value: number): string {
  return '$' + value.toFixed(2);
}

function getBookColor(book: Book): string {
  return bookColors[book.id % bookColors.length];
}

export default function BookList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();

  const books = useMemo(() => getBooks(), []);
  const categories = useMemo(() => getCategories(), []);

  const filteredBooks = useMemo(() => {
    let result = books;
    if (selectedCategory) {
      result = result.filter(book => book.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }
    return result;
  }, [books, searchQuery, selectedCategory]);

  return (
    <div className={styles['book-list-container']}>
      <h1 className={styles['page-title']}>Browse Books</h1>
      <div className={styles.filters}>
        <input
          type="text"
          className={styles['search-input']}
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={styles['category-chips']}>
          <button
            className={`${styles.chip} ${selectedCategory === '' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('')}
          >All</button>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.chip} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >{category}</button>
          ))}
        </div>
      </div>
      <div className={styles['book-grid']}>
        {filteredBooks.map(book => (
          <div key={book.id} className={styles['book-card']}>
            <Link to={`/books/${book.id}`} className={styles['book-cover']}>
              <div className={styles['cover-placeholder']} style={{ backgroundColor: getBookColor(book) }}>
                <span className={styles['cover-letter']}>{book.title.charAt(0)}</span>
              </div>
            </Link>
            <div className={styles['book-info']}>
              <Link to={`/books/${book.id}`} className={styles['book-title']}>{book.title}</Link>
              <p className={styles['book-author']}>{book.author}</p>
              <div className={styles['book-meta']}>
                <span className={styles['book-price']}>{formatCurrency(book.price)}</span>
                <span className={styles['book-rating']}>{book.rating} &#9733;</span>
              </div>
              <button className={styles['add-to-cart-btn']} onClick={() => addToCart(book)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      {filteredBooks.length === 0 && (
        <p className={styles['no-results']}>No books found matching your criteria.</p>
      )}
    </div>
  );
}
