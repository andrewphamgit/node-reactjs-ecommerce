import React from 'react';
import {assets_images} from "../assets/assets.js";

const FooterComponent = () => {

  return (<>
    <div className={'flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'}>
      <div>
        <img src={assets_images.logo_img} className={'mb-5 w-32'} alt={''} />
        <p className={'w-full md:w-2/3 text-gray-600'}>
          Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.
        </p>
      </div>

      <div>
        <p className={'text-xl font-medium mb-5'}>COMPANY</p>
        <ul className={'flex flex-col gap-1 text-gray-600'}>
          <li>Home</li>
          <li>About</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>

      <div>
        <p className={'text-xl font-medium mb-5'}>GET IN TOUCH</p>
        <ul className={'flex flex-col gap-1 text-gray-600'}>
          <li>+84866668888</li>
          <li>contact@foreveryou.com</li>
        </ul>
      </div>
    </div>

    <div>
      <hr/>
      <p className={'py-5 text-sm text-center'}>Copyright 2025@ forever.com - All Right Reserved.</p>
    </div>
  </>)
}

export default FooterComponent;
