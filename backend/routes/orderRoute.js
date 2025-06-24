import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.get("/all", getAllOrders);
orderRouter.put("/status", updateOrderStatus);

export default orderRouter;
