import React from 'react';
import footerPhone from './assets/footer_phone.png';
import footerLap from './assets/footer_lap.png';

const ShopifyFooter = ({ brandName = "Your Brand" }) => {
  return (
    <footer className="w-full mt-16 bg-white">
      <picture className="w-full block">
        <source media="(min-width: 769px)" srcSet={footerLap} />
        <img 
          src={footerPhone} 
          alt={`${brandName} Footer`}
          className="w-full h-auto block object-contain"
        />
      </picture>
    </footer>
  );
};

export default ShopifyFooter;

