import React from 'react';
import {assets_images} from "../assets/assets.js";

const OurPolicyComponent = () => {
  return (
    <div className={'flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sx sm:text-sm md:text-base text-gray-700'}>
      <div>
        <img src={assets_images.policy_icon} className={'w-12 m-auto mb-5'} />
        <div className={'font-semibold'}>Easy Exchange Policy</div>
        <p className={'text-gray-400'}>We offer hassle free exchange policy</p>
      </div>

      <div>
        <img src={assets_images.quality_icon} className={'w-12 m-auto mb-5'} />
        <div className={'font-semibold'}>Days Return Policy</div>
        <p className={'text-gray-400'}>We provide 7 days free return policy</p>
      </div>

      <div>
        <img src={assets_images.support_icon} className={'w-12 m-auto mb-5'} />
        <div className={'font-semibold'}>Best Customer Support</div>
        <p className={'text-gray-400'}>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicyComponent;
