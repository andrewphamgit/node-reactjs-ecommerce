
class PageCommonUtil {
  static buildKeyCart(productId, size) {
    return `${productId}_${size}`;
  }
}

export default PageCommonUtil;