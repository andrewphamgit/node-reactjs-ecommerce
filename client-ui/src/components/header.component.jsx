import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {assets_images} from "../assets/assets.js";
import {ShopContext} from "../contexts/shop.context.jsx";
import {ROUTES} from "../contants/routes.contant.js";
import CartService from "../services/cart.service.js";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {handleLogout, setCartUser} from "../slices/profile-data.slice.js";

const HeaderComponent = () => {

  const {filterSearchContext, setFilterSearchContext} = useContext(ShopContext);

  const { token, cartUser, triggerGetCart } = useSelector((state) => state.ProfileDataSlice);

  const isAuthenticated = null !== token;

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visibleMenuSide, setVisibleMenuSide] = useState(false);

  useEffect(() => {
    if (isAuthenticated && triggerGetCart) {
      getCartListOfUser();
    }
  }, [triggerGetCart]);

  useEffect(() => {
    setVisibleSearch(ROUTES.COLLECTION_PAGE === location.pathname);
  }, [location.pathname]);

  function getCartListOfUser() {
    try {
      CartService.getCartListOfUser().then(res => {
        dispatch(setCartUser(res.cartData));
      });
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message);
    }
  }

  function getCountTotalCart() {
    let totalItems = 0;
    for (const keyCart in cartUser) {
      totalItems += cartUser[keyCart].quantity;
    }
    return totalItems;
  }

  function logout() {
    localStorage.removeItem('token');
    dispatch(handleLogout());
    navigate(ROUTES.LOGIN_PAGE);
  }

  return (
    <div className={'flex items-center justify-between py-5 font-medium'}>
      <Link to={'/'} ><img src={assets_images.logo_img} className={"w-36"} alt={"logo"} /></Link>
      <ul className={'hidden sm:flex gap-5 text-sm text-gray-700 hidden'}>
        <NavLink to={'/'} className={'flex flex-col items-center gap-1'}>
          <p>HOME</p>
          <hr className={'w-2/4 broder-none h-[1.5px] bg-gray-700 hidden'} />
        </NavLink>
        <NavLink to={'/collection'} className={'flex flex-col items-center gap-1'}>
          <p>COLLECTION</p>
          <hr className={'w-2/4 broder-none h-[1.5px] bg-gray-700 hidden'} />
        </NavLink>
        <NavLink to={'/about'} className={'flex flex-col items-center gap-1'}>
          <p>ABOUT</p>
          <hr className={'w-2/4 broder-none h-[1.5px] bg-gray-700 hidden'} />
        </NavLink>
        <NavLink to={'/contact'} className={'flex flex-col items-center gap-1'}>
          <p>CONTACT</p>
          <hr className={'w-2/4 broder-none h-[1.5px] bg-gray-700 hidden'} />
        </NavLink>
      </ul>

      <div className={'flex items-center gap-6'}>
        {visibleSearch &&
          <img onClick={() => setFilterSearchContext({...filterSearchContext, showSearch: true})}
               src={assets_images.search_icon}
               className={'w-5 cursor-pointer'} alt={"search"}
          />}
        <div className={'group relative'}>
          <img onClick={() => isAuthenticated ? null : navigate(ROUTES.LOGIN_PAGE)} className={'w-5 cursor-pointer'} src={assets_images.profile_icon} alt={'profile'} />
          {isAuthenticated &&
            <div className={'group-hover:block hidden absolute dropdown-menu right-0 pt-4'}>
              <div className={'flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'}>
                <p className={'cursor-pointer hover:text-black'}>My Profile</p>
                <p onClick={() => navigate(ROUTES.ORDERS_PAGE)} className={'cursor-pointer hover:text-black'}>Orders</p>
                {isAuthenticated && <p className={'cursor-pointer hover:text-black'} onClick={logout}>Logout</p>}
              </div>
            </div>
          }
        </div>

        <NavLink to={'/cart'} className={'relative'}>
          <img src={assets_images.cart_icon} className={'w-5 min-5'} alt={'cart'} />
          <p className={'absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'}>
            {getCountTotalCart()}
          </p>
        </NavLink>

        <img alt={'menu'} src={assets_images.menu_icon} className={'w-6 cursor-pointer sm:hidden'} onClick={() => setVisibleMenuSide(true)} />
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visibleMenuSide ? 'w-full' : 'w-0'}`}>
        <div className={'flex flex-col text-gray-600'}>
          <div onClick={() => setVisibleMenuSide(false)} className={'flex items-center gap-4 p-3'}>
            <img src={assets_images.back_icon} className={'h-4'} alt={'dropdown'} />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisibleMenuSide(false)} to={'/'} className={'py-2 pl-6 border'}>HOME</NavLink>
          <NavLink onClick={() => setVisibleMenuSide(false)} to={'/collection'} className={'py-2 pl-6 border'}>COLLECTION</NavLink>
          <NavLink onClick={() => setVisibleMenuSide(false)} to={'/about'} className={'py-2 pl-6 border'}>ABOUT</NavLink>
          <NavLink onClick={() => setVisibleMenuSide(false)} to={'/contact'} className={'py-2 pl-6 border'}>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent;
