import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import TitleComponent from "../../components/title.component.jsx";
import CartTotalComponent from "../../components/cart-total.component.jsx";
import {assets_images} from "../../assets/assets.js";
import {ROUTES} from "../../contants/routes.contant.js";
import {useDispatch, useSelector} from "react-redux";
import CartUtil from "../../utils/cart.util.js";
import OrderService from "../../services/order.service.js";
import {setCartUser} from "../../slices/profile-data.slice.js";
import {toast} from "react-toastify";

const PlaceOrderPage = () => {

  const navigate = useNavigate();

  const { cartUser } = useSelector((state) => state.ProfileDataSlice);

  const dispatch = useDispatch();

  const [selectedMethodPay, setSelectedMethodPay] = useState('COD');
  const [formOrder, setFormOrder] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  function onChangeHandler(event) {
    const {name, value} = event.target;

    setFormOrder(prevState => ({...prevState, [name]: value}));
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    try {
     let orderData = {
       address: formOrder,
       items: cartUser,
       amount: CartUtil.getAmountCart(cartUser),
     }

      switch (selectedMethodPay) {
        case "COD":
          OrderService.placeOrder(orderData).then(res => {
            if (res.success) {
              dispatch(setCartUser({}));
              navigate(ROUTES.ORDERS_PAGE);
            } else {
              toast.error(res.message);
            }
          });
          break;
        case "STRIPE":
          OrderService.placeOrderStripe(orderData).then(res => {
            if (res.success) {
              window.location.replace(res.session_url);
            } else {
              toast.error(res.message);
            }
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className={'flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'}>
      {/* Left Side */}
      <div className={'flex flex-col gap-4 w-full sm:max-w-[480px]'}>
        <div className={'text-xl sm:tex-2xl my-3'}>
          <TitleComponent text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className={'flex gap-3'}>
          <input type={"text"} placeholder={'First name'}
                 className={'border border-gray-300 rounded py-1.5 px-3.5 w-full'}
                 name={"firstName"} value={formOrder.firstName}
                 onChange={onChangeHandler}
          />
          <input type={"text"} placeholder={'Last name'}
                 className={'border border-gray-300 rounded py-1.5 px-3.5 w-full'}
                 name={"lastName"} value={formOrder.lastName}
                 onChange={onChangeHandler}
          />
        </div>
        <input type={"email"} placeholder={'Email'}
               className={'border border-gray-300 rounded py-1.5 px-3.5 w-full'}
               name={"email"} value={formOrder.email}
               onChange={onChangeHandler}
        />
        <input type={"text"} placeholder={'Street'}
               className={'border border-gray-300 rounded py-1.5 px-3.5 w-full'}
               name={"street"} value={formOrder.street}
               onChange={onChangeHandler}
        />
        <div className={'flex gap-3'}>
          <input type={"text"} placeholder={'City'}
                 className={'border border-gray-300 rounded py-1.5 px-3.5 w-full'}
                 name={"city"} value={formOrder.city}
                 onChange={onChangeHandler}
          />
          <input type={"text"} placeholder={'State'}
                 className={'border border-gray-300 rounded py-1.5 px-3.5 w-full'}
                 name={"state"} value={formOrder.state}
                 onChange={onChangeHandler}
          />
        </div>
        <div className={'flex gap-3'}>
          <input type={"number"} placeholder={'Zipcode'}
                 className={'border border-gray-300 rounded py-1.5 px-3.5 w-full'}
                 name={"zipcode"} value={formOrder.zipcode}
                 onChange={onChangeHandler}
          />
          <input type={"text"} placeholder={'Country'}
                 className={'border border-gray-300 rounded py-1.5 px-3.5 w-full'}
                 name={"country"} value={formOrder.country}
                 onChange={onChangeHandler}
          />
        </div>
        <input type={"text"} placeholder={'Phone'}
               className={'border border-gray-300 rounded py-1.5 px-3.5 w-full'}
               name={"phone"} value={formOrder.phone}
               onChange={onChangeHandler}
        />
      </div>

      {/* Right Side */}
      <div className={'mt-8'}>
        <div className={'mt-8 min-w-80'}>
          <CartTotalComponent subtotal={CartUtil.getAmountCart(cartUser)} />
        </div>

        <div className={'mt-12'}>
          <TitleComponent text1={'PAYMENT'} text2={'METHOD'} />
          <div className={'flex gap-3 flex-col lg:flex-row'}>
            <div onClick={() => setSelectedMethodPay('STRIPE')} className={'flex items-center gap-3 border p-2 px-3 cursor-pointer'}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${selectedMethodPay === 'STRIPE' ? 'bg-green-400' : ''}`}></p>
              <img className={'h-5 mx-4'} src={assets_images.momo_payment_img} alt={''} />
            </div>
            <div onClick={() => setSelectedMethodPay('SHOPEE')} className={'flex items-center gap-3 border p-2 px-3 cursor-pointer'}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${selectedMethodPay === 'SHOPEE' ? 'bg-green-400' : ''}`}></p>
              <img className={'h-5 mx-4'} src={assets_images.shopee_payment_img} alt={''} />
            </div>
            <div onClick={() => setSelectedMethodPay('COD')} className={'flex items-center gap-3 border p-2 px-3 cursor-pointer'}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${selectedMethodPay === 'COD' ? 'bg-green-400' : ''}`}></p>
              <div className={'text-gray-500 text-sm font-medium mx-4'}>CASH ON DELIVERY</div>
            </div>
          </div>
        </div>

        <div className={'w-full text-end mt-8'}>
          <button className={'bg-black text-white px-16 py-3 text-sm'} >PLACE ORDER</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrderPage;