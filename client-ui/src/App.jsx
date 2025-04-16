import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import HeaderComponent from "./components/header.component.jsx";
import FooterComponent from "./components/footer.component.jsx";

import HomePage from './pages/home/home.page.jsx';
import CollectionPage from "./pages/collection/collection.page.jsx";
import AboutPage from "./pages/about.page.jsx";
import ContactPage from "./pages/contact.page.jsx";
import ProductPage from "./pages/product/prodct.page.jsx";
import CartPage from "./pages/cart/cart.page.jsx";
import LoginPage from "./pages/login.page.jsx";
import PlaceOrderPage from "./pages/place-order/place-order.page.jsx";
import OrdersPage from "./pages/orders/orders.page.jsx";
import SearchBarComponent from "./components/search-bar.component.jsx";
import {ROUTES} from "./contants/routes.contant.js";
import {useDispatch} from "react-redux";
import {updateToken} from "./slices/profile-data.slice.js";

const App = () => {

  const dispatch = useDispatch();
  const tokenWeb = localStorage.getItem('token');

  useEffect(() => {
    if (tokenWeb && tokenWeb !== 'null') {
      dispatch(updateToken(tokenWeb));
    }
  }, [tokenWeb]);

  return (
    <div className='px-4 sm:px-[5vw] md:px[-7vw] lg:px-[9vw]'>
      <ToastContainer />

      <HeaderComponent />
      <SearchBarComponent />

      <Routes>
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.COLLECTION_PAGE} element={<CollectionPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL_PAGE} element={<ProductPage />} />
        <Route path={ROUTES.CART_PAGE} element={<CartPage />} />
        <Route path={ROUTES.PLACE_ORDER_PAGE} element={<PlaceOrderPage />} />
        <Route path={ROUTES.ORDERS_PAGE} element={<OrdersPage />} />
        <Route path={ROUTES.ABOUT_PAGE} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT_PAGE} element={<ContactPage />} />
        <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage fromLogin={true} />} />
        <Route path={ROUTES.SIGN_UP_PAGE} element={<LoginPage fromLogin={false} />} />
        <Route path={ROUTES.VERIFY_PAYMENT_PAGE} element={<LoginPage fromLogin={false} />} />
      </Routes>

      <FooterComponent />
    </div>
  )
}

export default App;