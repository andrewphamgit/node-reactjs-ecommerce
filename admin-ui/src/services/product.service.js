import axiosClient from "../common/axios-client.js";

class ProductService {

  static update(updateParams) {
    return axiosClient.post(`/product/update`, updateParams, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static remove(productId) {
    return axiosClient.post(`/product/remove`, productId);
  }

  static list() {
    return axiosClient.get('/product/list');
  }

}

export default ProductService;