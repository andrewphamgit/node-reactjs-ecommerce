import React from 'react';
import TitleComponent from "../../components/title.component.jsx";
import {assets_images} from "../../assets/assets.js";
import CartTotalComponent from "../../components/cart-total.component.jsx";
import {Link} from "react-router-dom";
import {ROUTES} from "../../contants/routes.contant.js";
import CartService from "../../services/cart.service.js";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {setTriggerGetCart} from "../../slices/profile-data.slice.js";
import CartUtil from "../../utils/cart.util.js";

export const CartPage = () => {

  const { token, cartUser } = useSelector((state) => state.ProfileDataSlice);

  const dispatch = useDispatch();

  function onChangeQuantity(event, productId, selectedSize) {
    const value = event.target.value;
    if (value === '' || value === '0') {
      return;
    }

    setTimeout(() => {
      updateQuantityOfCart(productId, selectedSize, Number(value));
    }, 500);
  }

  function updateQuantityOfCart(productId, size, newQuantity) {
    if (token) {
      try {
        CartService.update(productId, size, newQuantity).then(res => dispatch(setTriggerGetCart(true)));;
      } catch (error) {
        console.log("error: ", error);
        toast.error(error.message);
      }
    } else {
      // const keyCart = PageCommonUtil.buildKeyCart(productId, size);
      // setCartItems(prevCartItems => {
      //   let newCartItems = { ...prevCartItems };
      //   if (newQuantity > 0) {
      //     newCartItems[keyCart].quantity = newQuantity;
      //   } else {
      //     // remove items
      //     delete newCartItems[keyCart];
      //   }
      //   return newCartItems;
      // });
    }
  }

  return (
    <div className={'border-t pt-14'}>
      <div className={'text-2xl mb-3'}>
        <TitleComponent text1={'YOU'} text2={'CART'} />
      </div>
      <div>
        {Object.values(cartUser).map((item, index) => {
          return (<div key={index+'_cart_'+item.id} className={'py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'}>
            <div className={'flex items-start gap-6'}>
              <img className={'w-16 sm:w-20'} src={item.image} alt={''} />
              <div>
                <p className={'text-xs sm:text-lg font-medium'}>{item.name}</p>
                <div className={'flex items-center gap-5 mt-2'}>
                  <p>{item.price} {item.currencyCode}</p>
                  <p className={'px-2 sm:px-3 sm:py-1 border bg-slate-50'}>{item.size}</p>
                </div>
              </div>
            </div>

            <input onChange={(e) => onChangeQuantity(e, item.id, item.size)} className={'border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'} type={'number'} min={1} defaultValue={item.quantity} />
            <img onClick={() => updateQuantityOfCart(item.id, item.size, 0)} className={'w-4 mr-4 sm:w-5 cursor-pointer'} src={assets_images.bin_icon} alt={''} />
          </div>)
        })}
      </div>

      {/* TOTALS CART  */}
      <div className={'flex justify-end my-20'}>
        <div className={'w-full sm:w-[450px]'}>
          <CartTotalComponent subtotal={CartUtil.getAmountCart(cartUser)} />
          <div className={'w-full text-end my-10'}>
            <Link to={ROUTES.PLACE_ORDER_PAGE} className={'bg-black text-white text-sm px-8 py-4'}>PROCEED TO CHECKOUT</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage;