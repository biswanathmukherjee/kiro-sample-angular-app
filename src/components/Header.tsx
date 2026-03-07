import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { getCartItemCount } = useCart();
  const count = getCartItemCount();

  return (
    <nav className={styles.header}>
      <Link to="/books" className={styles.logo}>React Bookstore</Link>
      <div className={styles['nav-links']}>
        <Link to="/books" className={styles['nav-link']}>Books</Link>
        <Link to="/cart" className={`${styles['nav-link']} ${styles['cart-link']}`}>
          Cart
          {count > 0 && <span className={styles['cart-badge']}>{count}</span>}
        </Link>
      </div>
    </nav>
  );
}
