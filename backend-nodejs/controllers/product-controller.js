import ProductModel from "../models/product-model.js";
import {v2 as cloudinary} from "cloudinary";

// list products
async function getListProducts(req, res) {
  try {
    const {bestseller, contentSearch, categories, subCategories, sortPrice, pageSize, rowsPerPage} = req.query;
    let queryParams = {};
    let sortBy = {};

    if (bestseller) {
      queryParams = {bestseller: true};
    } else {
      let parseCategories = JSON.parse((categories || "[]"));
      if (parseCategories.length > 0) {
        queryParams.category = {$in: parseCategories};
      }

      let parseSubCategories = JSON.parse((subCategories || "[]"));
      if (parseSubCategories.length > 0) {
        queryParams.subCategory = {$in: parseSubCategories};
      }

      if (contentSearch) {
        queryParams.name = {
          $regex: contentSearch,
          $options: "i"
        };
      }
    }
    if (sortPrice !== '') {
      sortBy = {price: ("low-high" === sortPrice ? 1 : -1)};
    }

    console.log(`getListProducts by queryParams = ${JSON.stringify(queryParams)} and sort by = ${JSON.stringify(sortBy)}`);
    const productList = await ProductModel.find(queryParams).sort(sortBy).skip(Number(pageSize)).limit(Number(rowsPerPage));
    return res.json({success: true, products: productList});
  } catch (error) {
    console.error("Can not get product list: ", error);
    return res.json({success: false, message: error.message});
  }
}

async function getSingleProduct(req, res) {
  try {
    const {productId} = req.query;
    const product = await ProductModel.findOne({_id: productId});
    return res.json({success: true, product});
  } catch (error) {
    console.error("Can not get single product: ", error);
    return res.json({success: false, message: error.message});
  }
}

// update product
async function updateProduct(req, res) {
  try {
    const {name, description, gender, category, subCategory, price, currencyCode, sizes, bestseller} = req.body;
    if (Number(price) < 1) {
      return res.json({success: false, message: "Invalid input price"});
    }

    const files = req.files;
    let imagesUrl = await Promise.all(
      files.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
        return result.secure_url;
      })
    );

    const product = new ProductModel({
      name, description, gender, category, subCategory,
      price: Number(price),
      currencyCode,
      sizes: JSON.parse(sizes),
      bestseller: "true" === bestseller,
      images: imagesUrl,
      date: Date.now()
    });
    await product.save();

    console.log("Product added: ", product);
    return res.json({success: true, message: "Product added"});
  } catch (error) {
    console.error("Can not add product: ", error);
    return res.json({success: false, message: error.message});
  }
}

// remove product
async function removeProduct(req, res) {
  try {
    const {productId} = req.body;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (deletedProduct) {
      console.log("Product removed: ", deletedProduct);
      return res.json({success: true, message: "Product removed"});
    } else {
      console.log("Can not remove productId: ", productId);
      return res.json({success: false, message: "Product deletion failed"});
    }
  } catch (error) {
    console.error("Can not remove: ", error);
    return res.json({success: false, message: error.message});
  }
}

export {
  getListProducts,
  getSingleProduct,
  updateProduct,
  removeProduct,
};