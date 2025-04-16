import axiosClient from "../common/axios-client.js";

class ProductService {

  static getList(params) {
    return axiosClient.get('/product/list', {
      params: params
    });
  }

  static getBestsellerList(pageSize, rowsPerPage) {
    return axiosClient.get('/product/list', {
      params: {bestseller: true, pageSize, rowsPerPage}
    });
  }

  static getProduct(productId) {
    return axiosClient.get('/product/single', {
      params: {productId}
    });
  }

}

export default ProductService;