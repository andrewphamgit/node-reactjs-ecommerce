import React, {useEffect, useState} from 'react';
import TitleComponent from "./title.component.jsx";
import ProductItemComponent from "./product-item.component.jsx";
import ProductService from "../services/product.service.js";
import {toast} from "react-toastify";

const LatestCollectionComponent = () => {

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    fetchLatestCollection();
  }, []);

  function fetchLatestCollection() {
    ProductService.getList({pageSize: 0, rowsPerPage: 5}).then(res => {
      if (res?.success) {
        setLatestProducts(res.products);
      } else {
        toast.error(res?.message);
      }
    }).catch(error => {
      toast.error(error.message);
      console.log(error);
    });
  }

  return (
    <div className={'my-10'}>
      <div className={'text-center py-8 text-3xl'}>
        <TitleComponent text1={'LATEST'} text2={'COLLECTION'} />
        <p className={'w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'}>
          These are the most popular products this season.
        </p>
      </div>

      {/* Rendering Products */}
      <div className={'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'}>
        {latestProducts.map((product, index) => <ProductItemComponent key={index+'-'+product.id} product={product} />)}
      </div>
    </div>
  )
}

export default LatestCollectionComponent;