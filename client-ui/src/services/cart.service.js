import axiosClient from "../common/axios-client.js";

class CartService {
  static getCartListOfUser() {
    return axiosClient.get(`/cart/get-list-of-user`);
  }
  static add(productId, size) {
    return axiosClient.post(`/cart/add`, {productId, size});
  }
  static update(productId, size, quantity) {
    return axiosClient.post(`/cart/update`, {productId, size, quantity});
  }
}

export default CartService;