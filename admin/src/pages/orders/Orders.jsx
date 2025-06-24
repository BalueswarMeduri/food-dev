import React, { useEffect, useState } from 'react'
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/order/all');
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        // handle error
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch('http://localhost:4000/api/order/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setOrders(orders => orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
      }
    } catch (error) {
      // handle error
    }
  };

  // Helper to get status color
  const getStatusColor = (status) => {
    if (status === 'Delivered') return '#3cb371'; // green
    if (status === 'Out for Delivery') return '#ff9800'; // orange
    return '#2196f3'; // blue for Food Processing
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Items</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>{order.amount}</td>
              <td>
                <select 
                  value={order.status} 
                  onChange={e => handleStatusChange(order._id, e.target.value)}
                  style={{ color: getStatusColor(order.status), fontWeight: 600 }}
                >
                  <option value="Food Processing" style={{ color: '#2196f3' }}>Food Processing</option>
                  <option value="Out for Delivery" style={{ color: '#ff9800' }}>Out for Delivery</option>
                  <option value="Delivered" style={{ color: '#3cb371' }}>Delivered</option>
                </select>
              </td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>
                <ul className="order-items-list">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.name} x {item.quantity}</li>
                  ))}
                </ul>
              </td>
              <td>
                {order.address && typeof order.address === 'object'
                  ? Object.values(order.address).join(', ')
                  : String(order.address)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders