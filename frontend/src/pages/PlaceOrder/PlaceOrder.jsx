import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlaceOrder = () => {
  const { getTotalCartAmount , token, food_list, cartItems, url, setCartItems} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName : "",
    lastname: "",
    email : "",
    street:" ",
    city : "",
    state : "",
    zipcode : "",
    country: "",
    phone : "",
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}))
  }

  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
        if(cartItems[item._id] > 0){
          let itemInfo = { ...item };
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
    })
    // Prepare order data
    const orderData = {
      userId: token, // assuming token is userId, adjust if needed
      items: orderItems,
      amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2),
      address: data
    };
    try {
      const response = await fetch(`${url}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify(orderData)
      });
      const result = await response.json();
      if(result.success){
        toast.success("Order placed successfully!");
        setCartItems({}); // Clear cart in frontend
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      toast.error("Error placing order. Please try again.");
    }
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required  name = "firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
            <input required  name="lastname" onChange={onChangeHandler} value={data.lastname} type="text" placeholder="Last Name" />
          </div>
          <input required  name = "email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
          <input required  name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
          <div className="multi-fields">
            <input required  name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
            <input required  name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input required  name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Pin code" />
            <input required  name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
          </div>
          <input  required name="phone" onChange={onChangeHandler} value={data.phone} type="number" placeholder="Phone" />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                  <div className="cart-total-details">
                    <p>subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                      <b>Total</b>
                      <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()+2}</b>
                  </div>
              </div>
               <button type="submit" >PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
