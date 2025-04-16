import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import CONNECT_MONGODB from "./config/mongodb.js";
import CONNECT_CLOUDINARY from "./config/cloudinary.js";
import userRouter from "./routes/user-route.js";
import productRouter from './routes/product-router.js';
import cartRouter from "./routes/cart-router.js";
import orderRouter from "./routes/order-route.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// config server
CONNECT_MONGODB();
CONNECT_CLOUDINARY();

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log('Server started on PORT: ' + port));

