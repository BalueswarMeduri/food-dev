import React, { useEffect, useState, useContext } from 'react';
import './Order.css';
import { StoreContext } from '../../context/StoreContext';
import { jwtDecode } from 'jwt-decode';

const Order = () => {
  const { token, url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  let userId = '';
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (e) {
      userId = '';
    }
  }

  useEffect(() => {
    let interval;
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${url}/api/order/all`, {
          headers: { token }
        });
        const data = await response.json();
        if (data.success) {
          // Filter orders for this user only
          const userOrders = data.orders.filter(order => order.userId === userId);
          setOrders(userOrders);
        }
      } catch (error) {
        // handle error
      }
    };
    if (userId) {
      fetchOrders();
      interval = setInterval(fetchOrders, 5000);
    }
    return () => clearInterval(interval);
  }, [token, url, userId]);

  // Helper to get status color
  const getStatusColor = (status) => {
    if (status === 'Delivered') return '#3cb371'; // green
    if (status === 'Out for Delivery') return '#ff9800'; // orange
    return '#2196f3'; // blue for Food Processing
  };

  return (
    <div className="user-orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="user-orders-list">
          {orders.map(order => (
            <div className="user-order-box" key={order._id}>
              <div className="user-order-header">
                <span>Order ID: {order._id}</span>
                <span>{new Date(order.date).toLocaleString()}</span>
                <span style={{color: getStatusColor(order.status), fontWeight: 600}}>
                  Status: {order.status}
                </span>
              </div>
              <ul className="user-order-items">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order; 