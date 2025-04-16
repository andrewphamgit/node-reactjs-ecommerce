import axiosClient from "../common/axios-client.js";

class OrderService {

  static list() {
    return axiosClient.get(`/order/list`);
  }

  static updateStatus(orderId, status) {
    return axiosClient.post(`/order/update-status`, {orderId, status});
  }

}

export default OrderService;