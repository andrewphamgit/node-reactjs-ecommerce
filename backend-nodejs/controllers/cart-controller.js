import UserModel from "../models/user-model.js";
import ProductModel from "../models/product-model.js";

async function getListOfUser(req, res) {
  try {
    const {userId} = req.body;

    const userInfo = await UserModel.findById(userId);
    let cartData = userInfo.cartData;
    return res.json({success: true, cartData});
  } catch (error) {
    console.error("Can not get product list of user: ", error);
    return res.json({success: false, message: error.message});
  }
}

function buildKeyCart(productId, size) {
  return `${productId}_${size}`;
}

async function addToCart(req, res) {
  try {
    const {userId, productId, size} = req.body;
    const keyCart = buildKeyCart(productId, size);

    const userInfo = await UserModel.findById(userId);
    let cartData = userInfo.cartData;

    if (cartData[keyCart]) {
      cartData[keyCart].quantity += 1;
    } else {
      const productInfo = await ProductModel.findById(productId);
      cartData[keyCart] = {
        id: productInfo.id,
        quantity: 1,
        name: productInfo.name,
        size: size,
        price: productInfo.price,
        currencyCode: productInfo.currencyCode,
        image: productInfo.images[0],
      }
    }

    console.log('cartData: ', cartData);
    await UserModel.findByIdAndUpdate(userId, {cartData});

    return res.json({success: true, message: "Added to cart"});
  } catch (error) {
    console.error("Can not add product to cart: ", error);
    return res.json({success: false, message: error.message});
  }
}

async function updateCart(req, res) {
  try {
    const {userId, productId, size, quantity} = req.body;
    const keyCart = buildKeyCart(productId, size);

    const userInfo = await UserModel.findById(userId);
    let newCartData = userInfo.cartData;

    if (quantity > 0) {
      newCartData[keyCart].quantity = quantity;
    } else {
      // remove items
      delete newCartData[keyCart];
    }

    console.log('newCartData: ', newCartData);
    await UserModel.findByIdAndUpdate(userId, {cartData: newCartData});

    return res.json({success: true, message: "Cart Updated"});
  } catch (error) {
    console.error("Can not update product to cart: ", error);
    return res.json({success: false, message: error.message});
  }
}

export {
  getListOfUser,
  addToCart,
  updateCart,
}