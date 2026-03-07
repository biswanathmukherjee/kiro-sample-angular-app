import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Header.css';

export default function Header() {
  const { getCartItemCount } = useCart();
  const count = getCartItemCount();

  return (
    <nav className="header">
      <Link to="/books" className="logo">React Bookstore</Link>
      <div className="nav-links">
        <Link to="/books" className="nav-link">Books</Link>
        <Link to="/cart" className="nav-link cart-link">
          Cart
          {count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
      </div>
    </nav>
  );
}
