import React from "react";
import {useNavigate} from "react-router-dom";
import {assets_images} from "../assets/assets.js";

const HeaderComponent = () => {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    // navigate('/');
  }

  return (
    <div className={'flex items-center py-2 px-[4%] justify-between'}>
      <img className={'w-[max(10%,80ox)]'} src={assets_images.logo_img} alt={'logo'} />
      <button onClick={logout}
              className={'bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'}
      >Logout</button>
    </div>
  )
}

export default HeaderComponent;