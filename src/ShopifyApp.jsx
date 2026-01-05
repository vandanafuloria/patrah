import React from 'react';
import ShopifyProductPage from './ShopifyProductPage';

// This is a simple wrapper App for the Shopify Product Page
// To use this, update your main.jsx to import ShopifyApp instead of App
function ShopifyApp() {
  return (
    <div className="w-full min-h-screen">
      <ShopifyProductPage />
    </div>
  );
}

export default ShopifyApp;

