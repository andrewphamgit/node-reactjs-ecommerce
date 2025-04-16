import express from "express";
import clientAuth from "../middleware/client-auth.js";
import adminAuth from "../middleware/admin-auth.js";
import {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controllers/order-controller.js";

const orderRouter = express.Router();

// admin
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/update-status', adminAuth, updateStatus);

// payment features
orderRouter.post('/place', clientAuth, placeOrder);
orderRouter.post('/place-stripe', clientAuth, placeOrderStripe);

// verify payment
orderRouter.post('/verify-stripe', clientAuth, verifyStripe);

// user
orderRouter.post('/user-orders', clientAuth, userOrders);

export default orderRouter;