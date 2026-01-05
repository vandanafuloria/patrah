import React from 'react';
import headerPhone from './assets/header_phone.png';
import headerLap from './assets/header_lap.png';

const ShopifyHeader = ({ brandName = "Your Brand" }) => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      <picture className="w-full block">
        <source media="(min-width: 769px)" srcSet={headerLap} />
        <img 
          src={headerPhone} 
          alt={brandName}
          className="w-full h-auto block object-contain"
        />
      </picture>
    </header>
  );
};

export default ShopifyHeader;

