import express from "express";
import multerUpload from "../middleware/multer.js";
import adminAuth from "../middleware/admin-auth.js";

import {
  getListProducts,
  getSingleProduct,
  updateProduct,
  removeProduct,
} from '../controllers/product-controller.js';

const productRouter = express.Router();

productRouter.post('/update', adminAuth, multerUpload.array('uploadedImages', 10), updateProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.get('/list', getListProducts);
productRouter.get('/single', getSingleProduct);

export default productRouter;