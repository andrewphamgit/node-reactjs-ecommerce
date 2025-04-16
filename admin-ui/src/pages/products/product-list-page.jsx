import React, {useEffect, useState} from "react";
import ProductService from "../../services/product.service.js";
import {toast} from "react-toastify";

const ProductListPage = () => {

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  function fetchProductList() {
    ProductService.list().then(res => {
      if (res.success) {
        setProductList(res.products);
      } else {
        toast.error(res.message);
      }
    }).catch(error => {
      toast.error(error.message);
      console.log(error);
    });
  }

  function removeProduct(productId) {
    ProductService.remove(productId).then(res => {
      if (res.success) {
        toast.success(res.message);
        fetchProductList();
      } else {
        toast.error(res.message);
      }
    }).catch(error => {
      console.log(error);
      toast.error(error.message);
    });
  }

  console.log(productList)
  return (
    <div>
      <p className={'mb-2'}>All Products List</p>
      <div className={'flex flex-col gap-2'}>
        {/* Table Title */}
        <div className={'hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'}>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className={'text-center'}>Action</b>
        </div>

        {/* Product List */}
        {productList.map((item, index) => {

          return (<div className={'grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'} key={index+'_'+item.name}>
            <img className={'w-12'} src={item.images[0]} alt={""} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price} VND</p>
            <p onClick={() => removeProduct(item._id)} className={'text-right md:text-center cursor-pointer text-lg'}>X</p>
          </div>)
        })}
      </div>
    </div>
  )
}

export default ProductListPage;