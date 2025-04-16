import React from 'react';
import {Link} from "react-router-dom";

const ProductItemComponent = ({product}) => {

  return (
    <Link to={`/product/${product._id}`} className={'text-gray-700 cursor-pointer'}>
      <div className={'overflow-hidden'}>
        <img src={product.images[0]} className={'hover:scale-110 transition ease-in-out h-[250px]'} alt={""} />
      </div>
      <p className={'pt-3 pb-1 text-sm'}>{product.name}</p>
      <p className={'text-sm font-medium'}>{product.price} {product.currencyCode}</p>
    </Link>
  )
}

export default ProductItemComponent;
