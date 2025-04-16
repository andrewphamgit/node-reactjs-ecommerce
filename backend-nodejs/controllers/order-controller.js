import OrderModel from "../models/order-model.js";
import UserModel from "../models/user-model.js";
import Stripe from "stripe";

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing orders using COD method
async function placeOrder(req, res) {
  try {
    const {userId, items, amount, address} = req.body;

    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      currencyCode: "VND",
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    });
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, {cartData: {}});

    return res.json({success: true, message: "Order Placed"});
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
}

// placing orders using Stripe method
async function placeOrderStripe(req, res) {
  try {
    const {userId, items, amount, address} = req.body;
    const {origin} = req.headers;

    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      currencyCode: "VND",
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now()
    });
    await newOrder.save();

    const line_items = items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 10,
        },
        quantity: item.quantity,
      }
    });

    const deliveryCharge = 10;
    line_items.push({
      price_data: {
        currency: "VND",
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 10,
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    return res.json({success: true, message: "Order Placed", session_url: session.url});
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
}

// verify stripe
async function verifyStripe(req, res){
  try {
    const {orderId, success, userId} = req.body;
    if (success === true) {
      await OrderModel.findByIdAndUpdate(orderId, {payment: true});
      await UserModel.findByIdAndUpdate(userId, {cartData: {}});
      return res.json({success: true, message: "Order Placed"});
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      return res.json({success: false});
    }
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
}

//placing orders using Razorpay method
function placeOrderRazorpay(req, res) {

}

// all orders data for Admin panel
async function allOrders(req, res) {
  try {
    const orders = await OrderModel.find({});
    return res.json({success: true, orders});
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
}

// all orders data for Admin panel
async function userOrders(req, res) {
  try {
    const {userId} = req.body;

    const orders = await OrderModel.find({userId});

    return res.json({success: true, orders});
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
}

async function updateStatus(req, res)  {
  try {
    const {orderId, status} = req.body;

    await OrderModel.findByIdAndUpdate(orderId, {status});
    return res.json({success: true, message: "Status Updated"});
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
}

export {
  placeOrder, placeOrderStripe, verifyStripe, placeOrderRazorpay,
  allOrders, userOrders, updateStatus,
}