import { useParams, Link } from 'react-router-dom';
import { Book } from '../models/book.model';
import { getBookById } from '../services/bookService';
import { useCart } from '../contexts/CartContext';
import styles from './BookDetail.module.css';

const bookColors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#34495e', '#f1c40f'];

function formatCurrency(value: number): string {
  return '$' + value.toFixed(2);
}

function getBookColor(book: Book): string {
  return bookColors[book.id % bookColors.length];
}

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const book = getBookById(Number(id));
  const { addToCart } = useCart();

  if (!book) {
    return (
      <div className={styles['not-found']}>
        <h2>Book not found</h2>
        <Link to="/books" className={styles['back-link']}>Browse all books</Link>
      </div>
    );
  }

  return (
    <div className={styles['book-detail']}>
      <Link to="/books" className={styles['back-link']}>&larr; Back to Books</Link>
      <div className={styles['detail-layout']}>
        <div className={styles['cover-section']}>
          <div className={styles['cover-placeholder']} style={{ backgroundColor: getBookColor(book) }}>
            <span className={styles['cover-letter']}>{book.title.charAt(0)}</span>
          </div>
        </div>
        <div className={styles['info-section']}>
          <h1 className={styles['book-title']}>{book.title}</h1>
          <p className={styles['book-author']}>by {book.author}</p>
          <div className={styles['book-rating']}>{book.rating} &#9733;</div>
          <p className={styles['book-price']}>{formatCurrency(book.price)}</p>
          <span className={`${styles['stock-badge']} ${book.stock > 0 ? styles['in-stock'] : styles['out-of-stock']}`}>
            {book.stock > 0 ? `In Stock (${book.stock})` : 'Out of Stock'}
          </span>
          <p className={styles['book-description']}>{book.description}</p>
          <div className={styles['book-details-grid']}>
            <div className={styles['detail-item']}>
              <span className={styles['detail-label']}>ISBN</span>
              <span className={styles['detail-value']}>{book.isbn}</span>
            </div>
            <div className={styles['detail-item']}>
              <span className={styles['detail-label']}>Published</span>
              <span className={styles['detail-value']}>{book.publishedDate}</span>
            </div>
            <div className={styles['detail-item']}>
              <span className={styles['detail-label']}>Category</span>
              <span className={styles['detail-value']}>{book.category}</span>
            </div>
          </div>
          <button
            className={styles['add-to-cart-btn']}
            onClick={() => addToCart(book)}
            disabled={book.stock === 0}
          >
            {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
