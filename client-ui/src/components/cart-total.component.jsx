import React from 'react';
import TitleComponent from "./title.component.jsx";

const CartTotalComponent = ({subtotal}) => {

  const deliveryFee = 10000; // VND

  return (
    <div className={'w-full'}>
      <div className={'text-2xl'}>
        <TitleComponent text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className={'flex flex-col gap-2 mt-2 text-sm'}>
        <div className={'flex justify-between'}>
          <p>Subtotal</p>
          <p>{subtotal} VND</p>
        </div>

        <hr />

        <div className={'flex justify-between'}>
          <p>Shipping Fee</p>
          <p>{deliveryFee} VND</p>
        </div>

        <hr />

        <div className={'flex justify-between'}>
          <p>Total</p>
          <p>{subtotal + deliveryFee} VND</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotalComponent;
