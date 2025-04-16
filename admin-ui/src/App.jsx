import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import './App.css';

import HeaderComponent from "./components/header-component.jsx";
import SidebarComponent from "./components/sidebar-component.jsx";
import AddPage from "./pages/add-page.jsx";
import OrdersPage from "./pages/orders-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import ProductListPage from "./pages/products/product-list-page.jsx";
import {useDispatch, useSelector} from "react-redux";
import {updateToken} from "./slices/profile-data.slice.js";

function App() {
  const tokenWeb = localStorage.getItem('token');

  const { token } = useSelector((state) => state.ProfileDataSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenWeb && tokenWeb !== 'null') {
      dispatch(updateToken(tokenWeb));
    }
  }, [tokenWeb]);

  return (
    <div className={'bg-gray-50 min-h-screen'}>
      <ToastContainer />

      { !token
        ? <LoginPage />
        : <>
          <HeaderComponent />
          <hr />

          <div className={'flex w-full'}>
            <SidebarComponent />

            <div className={'w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'}>
              <Routes>
                <Route path={'/add'} element={<AddPage />} />
                <Route path={'/list'} element={<ProductListPage />} />
                <Route path={'/orders'} element={<OrdersPage />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
