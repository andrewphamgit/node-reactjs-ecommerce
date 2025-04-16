import express from "express";
import {addToCart, getListOfUser, updateCart} from "../controllers/cart-controller.js";
import clientAuth from "../middleware/client-auth.js";

const cartRouter = express.Router();

cartRouter.get('/get-list-of-user', clientAuth, getListOfUser);
cartRouter.post('/add', clientAuth, addToCart);
cartRouter.post('/update', clientAuth, updateCart);

export default cartRouter;