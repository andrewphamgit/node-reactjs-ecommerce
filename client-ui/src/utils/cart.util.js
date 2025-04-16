class CartUtil {

  static getAmountCart(cartUser) {
    let sumPrice = 0;
    if (cartUser) {
      Object.values(cartUser).forEach((item) => {
        sumPrice += item.price;
      });
    }
    return sumPrice;
  }

}

export default CartUtil;