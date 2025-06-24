import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';


const strip = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing the user order form the frontend;

const placeOrder = async(req, res)=>{
    try {
        const newOrder = new orderModel({
            userId : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData : {}});
        res.json({
            success: true,
            message: "Order placed successfully."
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error in placing order."
        })
    }
}

// Get all orders for admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
}

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Order status updated.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to update order status.' });
    }
};

export {placeOrder, getAllOrders, updateOrderStatus}