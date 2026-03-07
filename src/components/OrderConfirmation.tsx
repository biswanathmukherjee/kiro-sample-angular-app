import { Link } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';
import './OrderConfirmation.css';

function formatCurrency(value: number): string {
  return '$' + value.toFixed(2);
}

export default function OrderConfirmation() {
  const { lastOrder } = useOrder();

  if (!lastOrder) {
    return (
      <div className="confirmation-container">
        <div className="no-order">
          <p className="empty-message">No order found.</p>
          <Link to="/books" className="browse-btn">Browse Books</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="success-header">
        <div className="success-icon">&#10003;</div>
        <h1 className="page-title">Order Confirmed!</h1>
        <p className="success-message">Thank you for your purchase.</p>
      </div>
      <div className="order-details">
        <div className="detail-row">
          <span className="detail-label">Order ID:</span>
          <span className="detail-value">{lastOrder.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Date:</span>
          <span className="detail-value">{lastOrder.orderDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' })}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Cardholder:</span>
          <span className="detail-value">{lastOrder.cardholderName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Card:</span>
          <span className="detail-value">**** **** **** {lastOrder.cardLastFour}</span>
        </div>
      </div>
      <div className="order-items">
        <h2 className="section-title">Items</h2>
        {lastOrder.items.map(item => (
          <div key={item.book.id} className="order-item">
            <span className="item-name">{item.book.title} x {item.quantity}</span>
            <span className="item-price">{formatCurrency(item.book.price * item.quantity)}</span>
          </div>
        ))}
        <div className="order-total">
          <span>Total:</span>
          <span className="total-amount">{formatCurrency(lastOrder.total)}</span>
        </div>
      </div>
      <Link to="/books" className="continue-btn">Continue Shopping</Link>
    </div>
  );
}
