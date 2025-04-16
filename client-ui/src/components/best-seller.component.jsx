import React, {useEffect, useState} from 'react';
import TitleComponent from "./title.component.jsx";
import ProductItemComponent from "./product-item.component.jsx";
import ProductService from "../services/product.service.js";
import {toast} from "react-toastify";

const BestSellerComponent = () => {

  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    ProductService.getBestsellerList(0, 5, true).then(res => {
      if (res?.success) {
        setBestSellers(res.products);
      } else {
        toast.error(res?.message);
      }
    }).catch(error => {
      toast.error(error.message);
      console.log(error);
    });
  }, []);

  return (
    <div className={'my-10'}>
      <div className={'text-center text-3xl py-8'}>
        <TitleComponent text1={'BEST'} text2={'SELLERS'} />
        <p className={'w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'}>
          These are the most best sellers of products.
        </p>
      </div>

      {/* Rendering Products */}
      <div className={'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'}>
        {bestSellers.map((product, index) => <ProductItemComponent key={index+'-'+product.id} product={product} />)}
      </div>
    </div>
  )
}

export default BestSellerComponent;
