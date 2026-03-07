import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import styles from './Cart.module.css';

function formatCurrency(value: number): string {
  return '$' + value.toFixed(2);
}

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className={styles['cart-container']}>
        <h1 className={styles['page-title']}>Shopping Cart</h1>
        <div className={styles['empty-cart']}>
          <p className={styles['empty-message']}>Your cart is empty</p>
          <Link to="/books" className={styles['browse-btn']}>Browse Books</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['cart-container']}>
      <h1 className={styles['page-title']}>Shopping Cart</h1>
      <div className={styles['cart-items']}>
        {cartItems.map(item => (
          <div key={item.book.id} className={styles['cart-item']}>
            <div className={styles['item-info']}>
              <h3 className={styles['item-title']}>{item.book.title}</h3>
              <p className={styles['item-author']}>{item.book.author}</p>
              <p className={styles['item-price']}>{formatCurrency(item.book.price)}</p>
            </div>
            <div className={styles['item-controls']}>
              <div className={styles['quantity-controls']}>
                <button className={styles['qty-btn']} onClick={() => updateQuantity(item.book.id, item.quantity - 1)}>-</button>
                <span className={styles['qty-display']}>{item.quantity}</span>
                <button className={styles['qty-btn']} onClick={() => updateQuantity(item.book.id, item.quantity + 1)}>+</button>
              </div>
              <p className={styles['item-subtotal']}>{formatCurrency(item.book.price * item.quantity)}</p>
              <button className={styles['remove-btn']} onClick={() => removeFromCart(item.book.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles['cart-footer']}>
        <div className={styles['cart-total']}>
          <span>Total:</span>
          <span className={styles['total-amount']}>{formatCurrency(getCartTotal())}</span>
        </div>
        <div className={styles['cart-actions']}>
          <Link to="/books" className={styles['continue-btn']}>Continue Shopping</Link>
          <Link to="/checkout" className={styles['checkout-btn']}>Proceed to Checkout</Link>
          <button className={styles['clear-btn']} onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
}
