import React from 'react';
import TitleComponent from "../components/title.component.jsx";
import {assets_images} from "../assets/assets.js";
import NewsletterBoxComponent from "../components/newsletter-box.component.jsx";

const ContactPage = () => {

  return (<>
    <div className={'text-center text-2xl pt-10 border-t'}>
      <TitleComponent text1={'CONTACT'} text2={'US'} />
    </div>

    <div className={'my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'}>
      <img className={'w-full md:max-w-[480px]'} src={assets_images.about_me_img} alt={''} />
      <div className={'flex flex-col justify-center items-start gap-6'}>
        <p className={'text-xl text-gray-600'}>Our Store</p>
        <p className={'text-gray-500'}>60A, Truong Son, phuong 2, quan Tan Binh</p>
        <p className={'text-gray-500'}>Tel: 0123456789 <br/> Email: admin@gmail.com</p>
        <p className={'text-xl text-gray-600'}>Careers at Forever</p>
        <button className={'border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'}>Explore Jobs</button>
      </div>
    </div>

    <NewsletterBoxComponent />
  </>)
}

export default ContactPage;