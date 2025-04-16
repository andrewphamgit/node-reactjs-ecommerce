import React from 'react';
import TitleComponent from "../components/title.component.jsx";
import {assets_images} from "../assets/assets.js";
import NewsletterBoxComponent from "../components/newsletter-box.component.jsx";

const AboutPage = () => {

  return (<>
    <div className={'text-2xl text-center pt-8 border-t'}>
      <TitleComponent text1={'ABOUT'} text2={'US'} />
    </div>
    <div className={'my-10 flex flex-col md:flex-row gap-16'}>
      <img className={'w-full md:max-w-[450px]'} src={assets_images.about_me_img} alt={''}/>
      <div className={'flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'}>
        <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online</p>
        <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online</p>
        <b className={'text-gray-800'}>Our Mission</b>
        <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online</p>
      </div>
    </div>

    <div className={'text-4xl py-4'}>
      <TitleComponent text1={'WHY'} text2={'CHOOSE US'} />
    </div>
    <div className={'flex flex-col md:flex-row text-sm mb-20'}>
      <div className={'border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'}>
        <b>Quality Assurance</b>
        <p className={'text-gray-600'}>We meticulously select and vet each product to ensure it meets our stringent</p>
      </div>
      <div className={'border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'}>
        <b>Convenience:</b>
        <p className={'text-gray-600'}>We meticulously select and vet each product to ensure it meets our stringent</p>
      </div>
      <div className={'border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'}>
        <b>Exceptional Customer Service:</b>
        <p className={'text-gray-600'}>We meticulously select and vet each product to ensure it meets our stringent</p>
      </div>
    </div>

    <NewsletterBoxComponent />
  </>)
}

export default AboutPage;
