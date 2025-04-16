import React from 'react';
import HeroComponent from "../../components/hero.component.jsx";
import LatestCollectionComponent from "../../components/latest-collection.component.jsx";
import BestSellerComponent from "../../components/best-seller.component.jsx";
import OurPolicyComponent from "../../components/our-policy.component.jsx";
import NewsletterBoxComponent from "../../components/newsletter-box.component.jsx";

const HomePage = () => {

  return (
    <div>
      <HeroComponent />
      <LatestCollectionComponent />
      <BestSellerComponent />
      <OurPolicyComponent />
      <NewsletterBoxComponent />
    </div>
  )
}

export default HomePage;