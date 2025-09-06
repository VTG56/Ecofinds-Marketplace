import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { getPurchaseHistory } from '../../src/services/productService';
import Navbar from '../components/Navbar';
import "../styles/components/history.css"

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up an observer on the auth object to get the current user
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        // If user is logged in, fetch their purchase history
        const unsubscribeHistory = getPurchaseHistory(
          user.uid,
          (fetchedOrders) => {
            setOrders(fetchedOrders);
            setLoading(false);
          },
          (err) => {
            console.error(err);
            setError('Failed to load purchase history.');
            setLoading(false);
          }
        );
        // Return the cleanup function for the history listener
        return () => unsubscribeHistory();
      } else {
        // If no user is logged in, navigate to the login page
        navigate('/login');
      }
    });

    // Return the cleanup function for the auth observer
    return () => unsubscribeAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10">
          <p>Loading purchase history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10 text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Purchase History</h1>

        {orders.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700">No Purchases Yet</h3>
            <p className="text-gray-500 mt-2">Looks like you haven't bought anything. Let's change that!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Order ID: {order.id.substring(0, 8)}...
                    </h2>
                    <p className="text-sm text-gray-500">
                      Purchased on: {' '}
                      {/* Firestore timestamp needs to be converted to a JS Date */}
                      {order.createdAt?.toDate().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <span className="text-sm text-gray-500">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Items in this order:</h4>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item.productId} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          {item.title} (x{item.quantity})
                        </span>
                        <span className="text-gray-800 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;