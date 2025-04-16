import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ShopContextProvider from "./contexts/shop.context.jsx";
import {Provider} from "react-redux";
import store from "./store.js";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </Provider>,
)
