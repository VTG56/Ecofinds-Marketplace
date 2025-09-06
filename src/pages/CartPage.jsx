import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { getCart, removeFromCart } from '../services/productService';
import Navbar from '../components/Navbar';
import Button from '../components/Button'; // Assuming you have this component
import '../styles/pages/cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const cartUnsubscribe = getCart(
          user.uid,
          (items) => {
            setCartItems(items);
            setLoading(false);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
        return () => cartUnsubscribe();
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleRemoveItem = async (itemId) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      await removeFromCart(currentUser.uid, itemId);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item from cart');
    }
  };

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page or trigger a payment flow
    alert('Checkout functionality is not yet implemented.');
  };

  const handleContinueShopping = () => {
    navigate('/home');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  if (loading) {
    return (
      <div className="cart">
        <Navbar />
        <div className="loading-container"><p>Loading cart...</p></div>
      </div>
    );
  }

  return (
    <div className="cart">
      <Navbar />
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Button variant="primary" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.image || "https://via.placeholder.com/100"} 
                    alt={item.title}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-category">{item.category}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                  </div>
                  <div className="item-price">${(item.price * (item.quantity || 1)).toFixed(2)}</div>
                  <div className="item-actions">
                    <Button variant="outline" onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button variant="primary" onClick={handleCheckout} fullWidth>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;