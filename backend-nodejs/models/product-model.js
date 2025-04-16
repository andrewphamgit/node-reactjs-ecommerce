import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  gender: {type: String, required: true},
  category: {type: String, required: true},
  subCategory: {type: String, required: true},
  price: {type: Number, required: true},
  currencyCode: {type: String, required: false, default: "VND"},
  sizes: {type: Array, required: true},
  bestseller: {type: Boolean},
  images: {type: Array, required: true},
  date: {type: Number, required: true},
});

const ProductModel = mongoose.models.products || mongoose.model("products", productSchema);

export default ProductModel;