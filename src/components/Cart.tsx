import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

function formatCurrency(value: number): string {
  return '$' + value.toFixed(2);
}

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1 className="page-title">Shopping Cart</h1>
        <div className="empty-cart">
          <p className="empty-message">Your cart is empty</p>
          <Link to="/books" className="browse-btn">Browse Books</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.book.id} className="cart-item">
            <div className="item-info">
              <h3 className="item-title">{item.book.title}</h3>
              <p className="item-author">{item.book.author}</p>
              <p className="item-price">{formatCurrency(item.book.price)}</p>
            </div>
            <div className="item-controls">
              <div className="quantity-controls">
                <button className="qty-btn" onClick={() => updateQuantity(item.book.id, item.quantity - 1)}>-</button>
                <span className="qty-display">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item.book.id, item.quantity + 1)}>+</button>
              </div>
              <p className="item-subtotal">{formatCurrency(item.book.price * item.quantity)}</p>
              <button className="remove-btn" onClick={() => removeFromCart(item.book.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span>Total:</span>
          <span className="total-amount">{formatCurrency(getCartTotal())}</span>
        </div>
        <div className="cart-actions">
          <Link to="/books" className="continue-btn">Continue Shopping</Link>
          <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
          <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
}
