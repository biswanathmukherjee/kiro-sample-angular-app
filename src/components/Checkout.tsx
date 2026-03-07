import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import './Checkout.css';

function formatCurrency(value: number): string {
  return '$' + value.toFixed(2);
}

export default function Checkout() {
  const { cartItems, getCartTotal, getCartItemsSnapshot, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [touched, setTouched] = useState({
    cardholderName: false,
    cardNumber: false,
    expiryDate: false,
    cvv: false,
  });

  const validations = {
    cardholderName: formData.cardholderName.trim().length > 0,
    cardNumber: /^\d{16}$/.test(formData.cardNumber),
    expiryDate: /^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate),
    cvv: /^\d{3,4}$/.test(formData.cvv),
  };

  const isFormValid = Object.values(validations).every(Boolean);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleBlur = (field: keyof typeof touched) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const cardLastFour = formData.cardNumber.slice(-4);
      const items = getCartItemsSnapshot();
      const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
      placeOrder(items, total, formData.cardholderName, cardLastFour);
      navigate('/order-confirmation');
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h1 className="page-title">Checkout</h1>
        <div className="empty-cart">
          <p className="empty-message">Your cart is empty. Add some books before checking out.</p>
          <Link to="/books" className="browse-btn">Browse Books</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-content">
        <div className="order-summary">
          <h2 className="section-title">Order Summary</h2>
          {cartItems.map(item => (
            <div key={item.book.id} className="summary-item">
              <span className="summary-item-name">{item.book.title} x {item.quantity}</span>
              <span className="summary-item-price">{formatCurrency(item.book.price * item.quantity)}</span>
            </div>
          ))}
          <div className="summary-total">
            <span>Total:</span>
            <span className="total-amount">{formatCurrency(getCartTotal())}</span>
          </div>
        </div>
        <div className="payment-form">
          <h2 className="section-title">Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input id="cardholderName" type="text" value={formData.cardholderName} onChange={handleChange('cardholderName')} onBlur={handleBlur('cardholderName')} placeholder="John Doe" />
              {!validations.cardholderName && touched.cardholderName && <span className="error">Cardholder name is required.</span>}
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input id="cardNumber" type="text" value={formData.cardNumber} onChange={handleChange('cardNumber')} onBlur={handleBlur('cardNumber')} placeholder="1234567890123456" />
              {!validations.cardNumber && touched.cardNumber && <span className="error">Enter a valid 16-digit card number.</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input id="expiryDate" type="text" value={formData.expiryDate} onChange={handleChange('expiryDate')} onBlur={handleBlur('expiryDate')} placeholder="MM/YY" />
                {!validations.expiryDate && touched.expiryDate && <span className="error">Enter a valid expiry date (MM/YY).</span>}
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input id="cvv" type="text" value={formData.cvv} onChange={handleChange('cvv')} onBlur={handleBlur('cvv')} placeholder="123" />
                {!validations.cvv && touched.cvv && <span className="error">Enter a valid CVV (3-4 digits).</span>}
              </div>
            </div>
            <button type="submit" className="submit-btn" disabled={!isFormValid}>Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}
