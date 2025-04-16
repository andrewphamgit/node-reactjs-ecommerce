import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../contexts/shop.context.jsx";
import TitleComponent from "./title.component.jsx";
import ProductItemComponent from "./product-item.component.jsx";
import ProductService from "../services/product.service.js";
import {toast} from "react-toastify";

const RelatedProductsComponent = ({category}) => {

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const buildParams = {
      categories: JSON.stringify([category]),
      pageSize: 0,
      rowsPerPage: 5,
    };
    ProductService.getList(buildParams).then(res => {
      if (res?.success) {
        setRelatedProducts(res.products);
      } else {
        toast.error(res?.message);
      }
    }).catch(error => {
      toast.error(error.message);
      console.log(error);
    });
  }, [category]);

  return (
    <div className={'my-24'}>
      <div className={'text-center text-3xl py-2'}>
        <TitleComponent text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className={'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'}>
        {relatedProducts.map((item, index) => <ProductItemComponent key={index+'_related_'+item.id} product={item} />)}
      </div>
    </div>
  )
}

export default RelatedProductsComponent;
