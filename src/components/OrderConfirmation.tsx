import { Link } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';
import styles from './OrderConfirmation.module.css';

function formatCurrency(value: number): string {
  return '$' + value.toFixed(2);
}

export default function OrderConfirmation() {
  const { lastOrder } = useOrder();

  if (!lastOrder) {
    return (
      <div className={styles['confirmation-container']}>
        <div className={styles['no-order']}>
          <p className={styles['empty-message']}>No order found.</p>
          <Link to="/books" className={styles['browse-btn']}>Browse Books</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['confirmation-container']}>
      <div className={styles['success-header']}>
        <div className={styles['success-icon']}>&#10003;</div>
        <h1 className={styles['page-title']}>Order Confirmed!</h1>
        <p className={styles['success-message']}>Thank you for your purchase.</p>
      </div>
      <div className={styles['order-details']}>
        <div className={styles['detail-row']}>
          <span className={styles['detail-label']}>Order ID:</span>
          <span className={styles['detail-value']}>{lastOrder.id}</span>
        </div>
        <div className={styles['detail-row']}>
          <span className={styles['detail-label']}>Date:</span>
          <span className={styles['detail-value']}>{lastOrder.orderDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' })}</span>
        </div>
        <div className={styles['detail-row']}>
          <span className={styles['detail-label']}>Cardholder:</span>
          <span className={styles['detail-value']}>{lastOrder.cardholderName}</span>
        </div>
        <div className={styles['detail-row']}>
          <span className={styles['detail-label']}>Card:</span>
          <span className={styles['detail-value']}>**** **** **** {lastOrder.cardLastFour}</span>
        </div>
      </div>
      <div className={styles['order-items']}>
        <h2 className={styles['section-title']}>Items</h2>
        {lastOrder.items.map(item => (
          <div key={item.book.id} className={styles['order-item']}>
            <span className={styles['item-name']}>{item.book.title} x {item.quantity}</span>
            <span className={styles['item-price']}>{formatCurrency(item.book.price * item.quantity)}</span>
          </div>
        ))}
        <div className={styles['order-total']}>
          <span>Total:</span>
          <span className={styles['total-amount']}>{formatCurrency(lastOrder.total)}</span>
        </div>
      </div>
      <Link to="/books" className={styles['continue-btn']}>Continue Shopping</Link>
    </div>
  );
}
