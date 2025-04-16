import axiosClient from "../common/axios-client.js";

class OrderService {

  static placeOrder(orderData) {
    return axiosClient.post(`/order/place`, orderData);
  }

  static placeOrderStripe(orderData) {
    return axiosClient.post(`/order/place-stripe`, orderData);
  }

  static verifyStripePayment(success, orderId) {
    return axiosClient.post(`/order/verify-stripe`, {success, orderId});
  }

  static userOrders() {
    return axiosClient.post(`/order/user-orders`);
  }

}

export default OrderService;