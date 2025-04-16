import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import OrderService from "../services/order.service.js";
import {setCartUser} from "../slices/profile-data.slice.js";
import {ROUTES} from "../contants/routes.contant.js";
import {toast} from "react-toastify";
import {useEffect} from "react";

const VerifyPaymentPage = () => {

  const { token } = useSelector((state) => state.ProfileDataSlice);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams, setSetParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    verifyPaymentFetch();
  }, []);

  function verifyPaymentFetch() {
    if (!token) {
      return null;
    }

    try {
      OrderService.verifyStripePayment(success, orderId).then(res => {
        if (res.success) {
          dispatch(setCartUser({}));
          navigate(ROUTES.ORDERS_PAGE);
        } else {
          navigate(ROUTES.CART_PAGE);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div>

    </div>
  )
}

export default VerifyPaymentPage;