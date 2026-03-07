import { useParams, Link } from 'react-router-dom';
import { Book } from '../models/book.model';
import { getBookById } from '../services/bookService';
import { useCart } from '../contexts/CartContext';
import './BookDetail.css';

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
      <div className="not-found">
        <h2>Book not found</h2>
        <Link to="/books" className="back-link">Browse all books</Link>
      </div>
    );
  }

  return (
    <div className="book-detail">
      <Link to="/books" className="back-link">&larr; Back to Books</Link>
      <div className="detail-layout">
        <div className="cover-section">
          <div className="cover-placeholder" style={{ backgroundColor: getBookColor(book) }}>
            <span className="cover-letter">{book.title.charAt(0)}</span>
          </div>
        </div>
        <div className="info-section">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">by {book.author}</p>
          <div className="book-rating">{book.rating} &#9733;</div>
          <p className="book-price">{formatCurrency(book.price)}</p>
          <span className={`stock-badge ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {book.stock > 0 ? `In Stock (${book.stock})` : 'Out of Stock'}
          </span>
          <p className="book-description">{book.description}</p>
          <div className="book-details-grid">
            <div className="detail-item">
              <span className="detail-label">ISBN</span>
              <span className="detail-value">{book.isbn}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Published</span>
              <span className="detail-value">{book.publishedDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Category</span>
              <span className="detail-value">{book.category}</span>
            </div>
          </div>
          <button
            className="add-to-cart-btn"
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
