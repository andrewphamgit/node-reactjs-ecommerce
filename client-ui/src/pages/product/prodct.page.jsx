import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {assets_images} from "../../assets/assets.js";
import RelatedProductsComponent from "../../components/related-products.component.jsx";
import ProductService from "../../services/product.service.js";
import {toast} from "react-toastify";
import CartService from "../../services/cart.service.js";
import {useDispatch, useSelector} from "react-redux";
import {setTriggerGetCart} from "../../slices/profile-data.slice.js";

export const ProductPage = () => {

  const {productId} = useParams();

  const { token } = useSelector((state) => state.ProfileDataSlice);

  const dispatch = useDispatch();

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
     fetchProductData();
  }, []);

  function fetchProductData() {
    ProductService.getProduct(productId).then(res => {
      if (res?.success) {
        setProductData(res.product);
        setSelectedImage(res.product.images[0]);
      } else {
        toast.error(res?.message);
      }
    }).catch(error => {
      toast.error(error.message);
      console.log(error);
    });
  }

  function addToCartFunc(product, selectedSize) {
    if (!selectedSize) {
      toast.error('Please, select product size');
      return;
    }

    if (token) {
      try {
        CartService.add(product._id, selectedSize).then(res => dispatch(setTriggerGetCart(true)));
      } catch (error) {
        console.log("error: ", error);
        toast.error(error.message);
      }
    } else {
      // const keyCart = PageCommonUtil.buildKeyCart(product.id, selectedSize);
      // setCartItems(prevCartItems => {
      //   let quantity = (prevCartItems[keyCart] ? prevCartItems[keyCart].quantity : 0) + 1;
      //   return {
      //     ...prevCartItems,
      //     [keyCart]: {
      //       id: product.id,
      //       quantity,
      //       name: product.name,
      //       size: selectedSize,
      //       price: product.price,
      //       currencyCode: product.currencyCode,
      //       images: product.images,
      //     }
      //   };
      // });
    }
  }

  if (null === productData) {
    return <div className={'opacity-0'}></div>;
  }
  return (
    <div className={'border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'}>
      <div className={'flex gap-12 sm:gap-12 flex-col sm:flex-row'}>
        {/* Product Images */}
        <div className={'flex-1 flex flex-col-reverse gap-3 sm:flex-row'}>
          <div className={'flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'}>
            {productData.images.map(((img, index) => {
              return (
                <img src={img} key={index+'_img_'+productData.id} alt={''}
                     className={'w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'}
                     onClick={() => setSelectedImage(img)}
                />
              )
            }))}
          </div>
          <div className={'w-full sm:w-[80%]'}>
            <img src={selectedImage} className={'w-full h-auto'} alt={''} />
          </div>
        </div>

        {/* Product Info */}
        <div className={'flex-1'}>
          <h1 className={'font-medium text-2xl mt-2'}>{productData.name}</h1>
          <div className={'flex items-center gap-1 mt-2'}>
            <img src={assets_images.star_icon} className={'w-3 5'} alt={''} />
            <img src={assets_images.star_icon} className={'w-3 5'} alt={''} />
            <img src={assets_images.star_icon} className={'w-3 5'} alt={''} />
            <img src={assets_images.star_icon} className={'w-3 5'} alt={''} />
            <img src={assets_images.star_icon} className={'w-3 5'} alt={''} />
            <p className={'pl-2'}>(123)</p>
          </div>
          <p className={'mt-5 text-3xl font-medium'}>{productData.price} {productData.currencyCode}</p>
          <p className={'mt-5 text-gray-500 md:w-4/5'}>{productData.description}</p>

          <div className={'flex flex-col gap-4 my-8'}>
            <p>Select Size</p>
            <div className={'flex gap-2'}>
              {productData.sizes.map((size, index) => {
                return (
                  <button key={index+'_size_'+productData.id}
                          className={`border py-2 px-4 bg-gray-100 ${size === selectedSize ? 'border-orange-500' : ''}`}
                          onClick={() => setSelectedSize(size)}
                  >{size}</button>
                )
              })}
            </div>
          </div>

          <button onClick={() => addToCartFunc(productData, selectedSize)} className={'bg-black text-white px-8 py-3 text-sm active:bg-gray-700'}>ADD TO CART</button>
          <hr className={'mt-8 sm:w-4/5'} />

          <div className={'text-sm text-gray-500 mt-5 flex flex-col gap-1'}>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className={'mt-20'}>
        <div className={'flex'}>
          <b className={'border px-5 py-3 text-sm'}>Description</b>
          <b className={'border px-5 py-3 text-sm'}>Reviews (122)</b>
        </div>
        <div className={'flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'}>
          <p>Make a statement in this stunning dress. The flowing silhouette and flattering neckline create a feminine and sophisticated look. Crafted from high-quality fabric, it drapes beautifully and feels luxurious against the skin. Perfect for special occasions or a night out.</p>
          <p>Stay warm and on-trend with this stylish jacket. The sleek design and modern details elevate any outfit. Made from durable materials, it offers protection from the elements while keeping you looking effortlessly cool. A versatile piece that will take you from day to night.</p>
        </div>
      </div>

      {/* Display relate products */}
      <RelatedProductsComponent category={productData.category} />

    </div>
  )
}

export default ProductPage;