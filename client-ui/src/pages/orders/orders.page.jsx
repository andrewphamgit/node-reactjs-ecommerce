import React, {useEffect, useState} from 'react';
import TitleComponent from "../../components/title.component.jsx";
import OrderService from "../../services/order.service.js";
import {toast} from "react-toastify";

const OrdersPage = () => {

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    OrderService.userOrders().then(res => {
      if (res.success) {
        let allOrders = [];
        res.orders.forEach(order => {
          order.items.forEach(item => {
            allOrders.push({
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });
        setUserOrders(allOrders.reverse());
      } else {
        toast.error(res.message);
      }
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div className={'border-t pt-16'}>
      <div className={'text-2xl'}>
        <TitleComponent text1={'MY'} text2={'ORDER'} />
      </div>

      <div>
        {userOrders.map((item, index) => {
          return (<div key={index+'_order_'+item.id} className={'py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'}>
            <div className={'flex items-start gap-6 text-sm'}>
              <img className={'w-16 sm:w-20'} src={item.images[0]} alt={''} />
              <div>
                <p className={'sm:text-base font-medium'}>{item.name}</p>
                <div className={'flex items-center gap-3 mt-2 text-base text-gray-700'}>
                  <p>Quantity: {1}</p>
                  <p>Size: {'M'}</p>
                </div>
                <p className={'mt-2'}>Date: <span className={'text-gray-400'}>{'25, Jul, 2025'}</span></p>
              </div>
            </div>

            <div className={'md:w-1/2 flex justify-between'}>
              <div className={'flex items-center gap-2'}>
                <p className={'min-w-2 h-2 rounded-full bg-green-500'} />
                <p className={'text-sm md:text-base'}>Ready to ship</p>
              </div>
              <button className={'border px-4 py-2 text-sm font-medium rounded-sm'}>Track Order</button>
            </div>
          </div>)
        })}
      </div>
    </div>
  )
}

export default OrdersPage;