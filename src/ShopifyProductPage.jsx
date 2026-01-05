import React, { useState, useEffect } from 'react';
import ShopifyHeader from './ShopifyHeader';
import ShopifyFooter from './ShopifyFooter';

// ============================================
// EDIT THESE VALUES TO CUSTOMIZE YOUR PRODUCT
// ============================================

// Import your product images here
import productImagePhone from './assets/product_phone.png';
import productImageLaptop from './assets/product_lap.png';

// Brand Name - Change this to your brand
const BRAND_NAME = "Meera Fab";

// Product Image - Use the imported images above
// For phone view: Use product_phone.png
// For laptop view: Use product_lap.png
const PRODUCT_IMAGE_MOBILE = productImagePhone; // Phone view image
const PRODUCT_IMAGE_DESKTOP = productImageLaptop; // Laptop view image

// Product Details - Edit these easily
const PRODUCT_NAME = "Women Printed Straight Kurta with Palazzo & Dupatta MF-258";
const PRODUCT_PRICE = 8541;
const PRODUCT_ORIGINAL_PRICE = 8990;
const PRODUCT_DISCOUNT = 5;
const PRODUCT_SKU = "MF-258";
const PRODUCT_DESCRIPTION = "Women Kurta With Palazzo & Dupattta With Handwork on Yoke.";
const PRODUCT_COLORS = [
  { name: "Color 1", value: "#4A5568" }, // Blue/Brown pattern
  { name: "Color 2", value: "#48BB78" }, // Green/Blue pattern
];
const PRODUCT_SIZES = ["M", "L", "XL", "XXL"];

// ============================================
// END OF EDITABLE SECTION
// ============================================

const ShopifyProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAISummaryExpanded, setIsAISummaryExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalImageIndex, setSelectedModalImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('product');
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [brandReviewsToShow, setBrandReviewsToShow] = useState(3);
  const [isBrandAISummaryExpanded, setIsBrandAISummaryExpanded] = useState(false);
  const [reviewLikes, setReviewLikes] = useState({});
  const [reviewReplies, setReviewReplies] = useState({});
  const [productSortBy, setProductSortBy] = useState('most-recent');
  const [brandSortBy, setBrandSortBy] = useState('most-recent');
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  // Instagram reels URLs
  const instagramReels = [
    'https://www.instagram.com/reel/DRoTRrjkdQA/?igsh=cWg4MTQ5b2g0bmNr',
    'https://www.instagram.com/reel/DRgg6_yERoB/?igsh=MWYwZDIwcjQ4NXo2MA==',
    'https://www.instagram.com/reel/DRb6OymkeWA/?igsh=cnRoeDFmMGVoZ2k5',
    'https://www.instagram.com/reel/DRXCPAcEb-N/?igsh=MW81c3B2MXJtdzR1Zg==',
    'https://www.instagram.com/reel/DRMB0mLESBi/?igsh=enI2cTlsZzZjNWsw',
    'https://www.instagram.com/reel/DQvaoCciJxN/?igsh=ZWs4a3Bma3plZW9l'
  ];

  // Create Instagram embed HTML using blockquote format
  const createInstagramEmbed = (url) => {
    const cleanUrl = url.split('?')[0];
    return `<blockquote class="instagram-media" data-instgrm-permalink="${cleanUrl}" data-instgrm-version="14" style="max-width: 100%; width: 100%;"></blockquote>`;
  };

  // Load Instagram embed script
  useEffect(() => {
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Reinitialize Instagram embeds when media tab is active or modal opens
  useEffect(() => {
    if (activeTab === 'media' || showInstagramModal) {
      const processEmbeds = () => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        } else {
          let retries = 0;
          const retryInterval = setInterval(() => {
            retries++;
            if (window.instgrm && window.instgrm.Embeds) {
              window.instgrm.Embeds.process();
              clearInterval(retryInterval);
            } else if (retries >= 10) {
              clearInterval(retryInterval);
            }
          }, 200);
        }
      };
      
      const timer = setTimeout(processEmbeds, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab, showInstagramModal]);
  
  // Product images - using the same images for thumbnails
  // You can add more images here if needed
  const productImages = [
    PRODUCT_IMAGE_DESKTOP,
    PRODUCT_IMAGE_MOBILE,
    // Add more images here if needed
    // productImage2,
    // productImage3,
  ];

  // Customer review images - using product images
  const customerReviewImages = [
    PRODUCT_IMAGE_DESKTOP,
    PRODUCT_IMAGE_MOBILE,
    PRODUCT_IMAGE_DESKTOP,
    PRODUCT_IMAGE_MOBILE,
    PRODUCT_IMAGE_DESKTOP,
    PRODUCT_IMAGE_MOBILE,
    PRODUCT_IMAGE_DESKTOP,
    PRODUCT_IMAGE_MOBILE,
  ];

  // Product Reviews data
  const reviews = [
    { id: 1, name: 'Anonymous', date: '1/15/2025', rating: 4, title: 'Beautiful kurta with perfect fit', text: 'The kurta fits perfectly and looks elegant. The fabric quality is excellent and it\'s very comfortable to wear all day.' },
    { id: 2, name: 'Gurpreet Kaur', date: '1/10/2025', rating: 2, title: 'Great quality and design', text: 'The kurta has a beautiful design and the fabric feels premium. However, the sizing runs a bit small, so consider ordering one size up.' },
    { id: 3, name: 'Shailanauman', date: '1/09/2025', rating: 0, title: 'Not satisfied with the fit', text: 'The kurta didn\'t fit as expected. The fabric quality is good but the sizing chart needs to be more accurate.' },
    { id: 4, name: 'Priya Sharma', date: '1/05/2025', rating: 5, title: 'Absolutely love it!', text: 'This kurta is absolutely stunning! The handwork on the yoke is exquisite and the fabric quality is top-notch. Perfect fit and very comfortable.' },
    { id: 5, name: 'Ananya Patel', date: '12/30/2024', rating: 4, title: 'Good quality product', text: 'The kurta is well-made with good fabric quality. The design is elegant and it fits well. Would recommend to others.' },
    { id: 6, name: 'Meera Singh', date: '12/25/2024', rating: 5, title: 'Excellent purchase', text: 'One of the best kurtas I\'ve bought online. The quality exceeds expectations and the design is beautiful. Very happy with my purchase!' },
    { id: 7, name: 'Kavya Reddy', date: '12/20/2024', rating: 3, title: 'Decent product', text: 'The kurta is okay but could be better. The fabric is good but the fit is slightly loose. Overall decent for the price.' },
    { id: 8, name: 'Riya Agarwal', date: '12/15/2024', rating: 5, title: 'Perfect for occasions', text: 'This kurta is perfect for weddings and special occasions. The design is elegant and the handwork is beautifully done. Highly recommended!' },
  ];

  // Brand Reviews data
  const brandReviews = [
    { id: 'b1', name: 'Sneha Verma', date: '1/12/2025', rating: 5, title: 'Love this brand!', text: 'Meera Fab has become my go-to brand for ethnic wear. The quality is consistently excellent and the designs are always on trend. Customer service is also very responsive.' },
    { id: 'b2', name: 'Divya Nair', date: '1/08/2025', rating: 4, title: 'Reliable brand', text: 'I\'ve ordered multiple times from Meera Fab and have never been disappointed. The products match the images and the quality is good. Shipping is also fast.' },
    { id: 'b3', name: 'Pooja Mehta', date: '1/05/2025', rating: 5, title: 'Best ethnic wear brand', text: 'Meera Fab offers the best quality ethnic wear at reasonable prices. The fabric quality is premium and the designs are unique. Highly recommend this brand!' },
    { id: 'b4', name: 'Neha Kapoor', date: '12/30/2024', rating: 4, title: 'Great shopping experience', text: 'Shopping with Meera Fab is always a pleasure. The website is easy to navigate, products are well-described, and delivery is prompt. Quality is consistent across all products.' },
    { id: 'b5', name: 'Aarti Desai', date: '12/25/2024', rating: 5, title: 'Trustworthy brand', text: 'Meera Fab is a trustworthy brand that delivers on its promises. The products are exactly as shown and the quality is excellent. I always recommend this brand to my friends.' },
    { id: 'b6', name: 'Swati Iyer', date: '12/20/2024', rating: 4, title: 'Good value for money', text: 'Meera Fab offers good value for money. The quality is better than many other brands at similar price points. The designs are modern and the fabric feels premium.' },
    { id: 'b7', name: 'Radhika Joshi', date: '12/15/2024', rating: 5, title: 'Excellent brand overall', text: 'Meera Fab has exceeded my expectations every time. The attention to detail, quality of materials, and customer service are all top-notch. This is my favorite ethnic wear brand!' },
    { id: 'b8', name: 'Kriti Malhotra', date: '12/10/2024', rating: 4, title: 'Satisfied customer', text: 'I\'ve been shopping with Meera Fab for over a year now and have always been satisfied. The brand maintains high quality standards and offers trendy designs.' },
  ];

  // Handle like functionality
  const handleLike = (reviewId, type = 'product') => {
    const key = `${type}-${reviewId}`;
    setReviewLikes(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));
  };

  // Handle reply functionality
  const handleReply = (reviewId, type = 'product') => {
    const key = `${type}-${reviewId}`;
    setReviewReplies(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Convert date to "X days ago" format
  const getDaysAgo = (dateString) => {
    const [month, day, year] = dateString.split('/').map(Number);
    const reviewDate = new Date(year, month - 1, day);
    const today = new Date();
    const diffTime = today - reviewDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return '1 month ago';
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
  };

  const increaseQuantity = () => setQuantity(qty => qty + 1);
  const decreaseQuantity = () => setQuantity(qty => qty > 1 ? qty - 1 : 1);

  // Handle image click to open modal
  const handleImageClick = (index) => {
    setSelectedModalImageIndex(index);
    setIsModalOpen(true);
  };

  // Handle modal navigation
  const handlePrevious = () => {
    setSelectedModalImageIndex((prev) => 
      prev === 0 ? customerReviewImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedModalImageIndex((prev) => 
      prev === customerReviewImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowLeft') {
        setSelectedModalImageIndex((prev) => 
          prev === 0 ? customerReviewImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedModalImageIndex((prev) => 
          prev === customerReviewImages.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, customerReviewImages.length]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ShopifyHeader brandName={BRAND_NAME} />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images Section - Shopify Style: Thumbnails on Left, Main Image on Right */}
            <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-start">
              {/* Thumbnail Images - Horizontal Scroll (Mobile) */}
              {productImages.length > 1 && (
                <div className="md:hidden flex gap-3 overflow-x-auto pb-2 w-full order-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      className={`w-20 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden cursor-pointer transition-all bg-white p-0 ${
                        selectedImage === index 
                          ? 'border-gray-800 shadow-lg' 
                          : 'border-transparent shadow-sm'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${PRODUCT_NAME} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Thumbnail Images - Left Side (Desktop) */}
              {productImages.length > 1 && (
                <div className="hidden md:flex flex-col gap-4 w-24">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      className={`w-24 h-24 border-2 rounded-lg overflow-hidden cursor-pointer transition-all bg-white p-0 ${
                        selectedImage === index 
                          ? 'border-gray-800 shadow-lg' 
                          : 'border-transparent shadow-sm hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${PRODUCT_NAME} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Main Image - Right Side */}
              <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-md flex items-center justify-center order-1 md:order-none">
                <picture className="w-full block">
                  <source media="(max-width: 768px)" srcSet={PRODUCT_IMAGE_MOBILE} />
                  <img 
                    src={productImages[selectedImage] || PRODUCT_IMAGE_DESKTOP} 
                    alt={PRODUCT_NAME}
                    className="w-full h-auto block object-contain"
                  />
                </picture>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col gap-4">
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-serif font-normal text-gray-900 leading-tight">
                {PRODUCT_NAME}
              </h1>
              
              {/* Rating and Features Section */}
              <div className="mb-4">
                {/* Top Row - Rating, Reviews, Sold */}
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  {/* Star Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {/* Show only 1 star on mobile, full 4.5 stars on desktop */}
                      <div className="md:hidden">
                        <svg className="w-5 h-5" style={{ color: '#620000' }} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="hidden md:flex items-center gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" style={{ color: '#620000' }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <div className="relative w-5 h-5">
                          <svg className="w-5 h-5 text-gray-300 absolute" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <div className="absolute overflow-hidden" style={{ width: '50%', color: '#620000' }}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-base font-semibold text-gray-800">4.5</span>
                  </div>
                  
                  {/* Divider */}
                  <div className="w-px h-4 bg-gray-300"></div>
                  
                  {/* Reviews Count */}
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                    <span className="text-sm text-gray-700">124 reviews</span>
                  </div>
                  
                  {/* Divider */}
                  <div className="w-px h-4 bg-gray-300"></div>
                  
                  {/* Sold Count */}
                  <div className="px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(98, 0, 0, 0.15)' }}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" style={{ color: '#620000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-sm font-medium" style={{ color: '#620000' }}>SOLD 235</span>
                    </div>
                  </div>
                </div>
                
                {/* Feature Tags - Only 3 keywords */}
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#620000' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-normal text-white">Fit</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#620000' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-normal text-white">Premium</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#620000' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-normal text-white">Elegant</span>
                  </div>
                </div>
              </div>
              
              {/* Pricing Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg md:text-xl text-gray-500 line-through">
                    Rs. {PRODUCT_ORIGINAL_PRICE.toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg md:text-xl font-semibold text-gray-900">
                    Rs. {PRODUCT_PRICE.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-medium text-red-600">
                    Save {PRODUCT_DISCOUNT}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Tax included. Shipping calculated at checkout.
                </p>
              </div>

              {/* Promotional Offers */}
              <div className="flex flex-col gap-2 py-3">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="text-sm text-gray-700">Additional 5% discount above Rs 25,000</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="text-sm text-gray-700">Additional 10% Discount Above Rs 40,000</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="text-sm text-gray-700">Additional 15% Discount Above Rs 60,000</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-sm text-gray-700">All Products are Ready to Ship and are shipped in 24-48 Hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">Free International Shipping Above Rs 20,000</span>
                </div>
              </div>

              {/* Size Chart */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">SIZE CHART</span>
                </div>
                <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Size Chart</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button className="w-full py-3 px-6 bg-white border-2 border-black text-black rounded font-semibold text-sm uppercase hover:bg-gray-50 transition-colors">
                  ADD TO CART
                </button>
                <button className="w-full py-3 px-6 bg-[#620000] text-white rounded font-semibold text-sm uppercase hover:bg-[#4a0000] transition-colors">
                  BUY IT NOW
                </button>
              </div>

              {/* Collapsible Shipping Information */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setIsShippingOpen(!isShippingOpen)}
                  className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  <span>SHIPPING INFORMATION</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${isShippingOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isShippingOpen && (
                  <div className="pb-4 text-sm text-gray-600">
                    <p>All products are ready to ship and are shipped within 24-48 hours. Free international shipping available for orders above Rs 20,000.</p>
                  </div>
                )}
              </div>

              {/* Collapsible Description */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  <span>DESCRIPTION</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${isDescriptionOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDescriptionOpen && (
                  <div className="pb-4 text-sm text-gray-600">
                    <p>{PRODUCT_DESCRIPTION}</p>
                  </div>
                )}
              </div>

              {/* Social Sharing */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482c0 .39.045.765.127 1.124C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span>Tweet</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.487.535 6.624 0 11.99-5.367 11.99-11.987C23.97 5.39 18.592.026 12.017.026L12.017 0z"/>
                  </svg>
                  <span>Pin it</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Reviews Section - WOM Style */}
      <div id="reviews-section" className="bg-white w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-800">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Side - Rating Breakdown */}
            <div className="lg:col-span-1 mt-[100px] mb-[100px] lg:mb-[200px]">
              <div className="relative lg:sticky lg:top-[245px]" style={{ maxHeight: 'calc(-300px + 100vh)' }}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  {/* Rating Score Card */}
                  <div className="text-center mb-6">
                    <div 
                      className="w-32 h-32 rounded-full flex items-center justify-center mb-4 relative mx-auto"
                      style={{
                        background: `conic-gradient(from 225deg, #620000 0%, #c4957a 65%, rgba(98, 0, 0, 0.18) 65%)`,
                        boxShadow: `0 18px 35px rgba(98, 0, 0, 0.18)`
                      }}
                    >
                      <div 
                        className="absolute inset-2 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(145deg, #ffffff 0%, #f5ebe4 100%)',
                          boxShadow: 'inset 0 1px 4px rgba(255, 255, 255, 0.6)'
                        }}
                      >
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-semibold" style={{ color: '#8B6F5E' }}>4.8</span>
                          <span className="text-lg font-medium" style={{ color: '#A6897A' }}>/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, index) => (
                        <svg key={index} className="w-5 h-5" style={{ color: '#620000' }} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Based on <strong>147</strong> verified reviews
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border" style={{ backgroundColor: 'rgba(98, 0, 0, 0.1)', color: '#620000', borderColor: 'rgba(98, 0, 0, 0.3)' }}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>93% would buy again</span>
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="space-y-3 mb-6">
                    {[
                      { stars: 5, percent: 75 },
                      { stars: 4, percent: 17 },
                      { stars: 3, percent: 5 },
                      { stars: 2, percent: 2 },
                      { stars: 1, percent: 1 },
                    ].map((item) => (
                      <div key={item.stars} className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-1 text-xs text-gray-600 w-8 flex-shrink-0">
                          <svg className="w-3 h-3" style={{ color: '#620000' }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{item.stars}</span>
                        </div>
                        <div className="flex-1 min-w-0 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-300"
                            style={{ 
                              width: `${item.percent}%`,
                              minWidth: '2px',
                              backgroundColor: '#620000'
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-8 flex-shrink-0 text-right">{item.percent}%</span>
                      </div>
                    ))}
                  </div>

                  {/* Rating Highlights */}
                  <div className="space-y-3">
                    {[
                      { icon: '✓', label: 'Would recommend', value: '93%' },
                      { icon: '✨', label: 'Love the perfect fit', value: '9/10' },
                      { icon: '💧', label: 'Say fabric quality is excellent', value: '92%' },
                    ].map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-lg" style={{ color: '#620000' }}>
                          {stat.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Reviews */}
            <div className="lg:col-span-2">
              {/* Tab Headers */}
              <div className="flex flex-wrap mb-6 bg-gray-100 rounded-lg p-1 gap-1">
                <button 
                  className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'product' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'hover:text-gray-900'
                  }`}
                  style={{ color: activeTab === 'product' ? undefined : '#620000' }}
                  onClick={() => setActiveTab('product')}
                >
                  Product Reviews
                </button>
                <button 
                  className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'brand' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'hover:text-gray-900'
                  }`}
                  style={{ color: activeTab === 'brand' ? undefined : '#620000' }}
                  onClick={() => setActiveTab('brand')}
                >
                  Brand Reviews
                </button>
                <button 
                  className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'media' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'hover:text-gray-900'
                  }`}
                  style={{ color: activeTab === 'media' ? undefined : '#620000' }}
                  onClick={() => setActiveTab('media')}
                >
                  Media
                </button>
              </div>

              {/* Product Tab Content - AI Insight & Customer Photos */}
              {activeTab === 'product' && (
                <div className="mb-8">
                  {/* AI Insight Section */}
                  <div className="mb-12 bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">AI INSIGHT</h3>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(98, 0, 0, 0.1)', color: '#620000' }}>Verified reviews</button>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Customers say</h4>
                    
                    <p className="text-gray-700 leading-relaxed mb-2 text-base">
                      {isAISummaryExpanded ? (
                        <>
                          Customers love how this kurta fits perfectly and flatters all body types. The premium fabric quality and elegant design make it ideal for various occasions. The kurta drapes beautifully and maintains its shape throughout the day, making it perfect for both casual and formal events. Many customers appreciate the attention to detail in the handwork on the yoke and the way the fabric feels against the skin.
                          <button onClick={() => setIsAISummaryExpanded(false)} className="underline ml-1 cursor-pointer" style={{ color: '#620000' }}>Read less</button>
                        </>
                      ) : (
                        <>
                          Customers love how this kurta fits perfectly and flatters all body types. The premium fabric quality and elegant design make it ideal for various occasions.
                          <button onClick={() => setIsAISummaryExpanded(true)} className="underline ml-1 cursor-pointer" style={{ color: '#620000' }}>Read more</button>
                        </>
                      )}
                    </p>
                    
                    <p className="text-xs text-gray-500 mb-4">Updated in near real-time as new feedback arrives.</p>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 mb-4"></div>
                    
                    {/* Frequently Mentioned */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">CUSTOMERS FREQUENTLY MENTION</p>
                      <div className="flex flex-wrap gap-2">
                        {['Perfect Fit', 'Premium Quality Fabric', 'Elegant Design', 'Comfortable Wear', 'Flattering Silhouette'].map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#620000' }}></span>
                            <span className="text-sm font-semibold" style={{ color: '#620000' }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Customer Photos Section */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">CUSTOMER PHOTOS</h3>
                        <p className="text-sm text-gray-600">Real results from the community</p>
                      </div>
                      <span className="text-sm text-gray-500">{customerReviewImages.length} uploads</span>
                    </div>
                    
                    {/* Photo Gallery */}
                    <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
                      {customerReviewImages.map((image, i) => (
                        <div 
                          key={i} 
                          className="shrink-0 w-32 h-32 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => handleImageClick(i)}
                        >
                          <img 
                            src={image} 
                            alt={`Customer review ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sort & Filter Dropdown */}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-[17px] md:text-sm font-medium text-gray-700">Sort & Filter:</span>
                    <div className="relative">
                      <select
                        value={productSortBy}
                        onChange={(e) => setProductSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-[17px] md:text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      >
                        <option value="most-recent">Most Recent</option>
                        <option value="highest-rated">Highest Rated</option>
                        <option value="lowest-rated">Lowest Rated</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Review Cards */}
                  <div className="space-y-0">
                    {reviews
                      .slice(0, reviewsToShow)
                      .map((review, index) => {
                      const likeKey = `product-${review.id}`;
                      const replyKey = `product-${review.id}`;
                      return (
                        <React.Fragment key={review.id}>
                          {index > 0 && <div className="border-t border-gray-400"></div>}
                          <div className="bg-white py-6 w-full">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <div className="flex items-center gap-1 mb-1">
                                  {[...Array(5)].map((_, i) => (
                                    <svg 
                                      key={i} 
                                      className={`w-4 h-4 ${i < review.rating ? '' : 'text-gray-300'}`}
                                      style={i < review.rating ? { color: '#620000' } : {}}
                                      fill="currentColor" 
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <p className="text-sm text-gray-500">{review.name}</p>
                              </div>
                              <span className="text-xs text-gray-400">{getDaysAgo(review.date)}</span>
                            </div>
                            <h3 className="font-medium text-gray-700 mb-2">{review.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.text}</p>
                            
                            {/* Like and Reply Buttons */}
                            <div className="flex items-center gap-4 mt-4">
                              <button 
                                onClick={() => handleLike(review.id, 'product')}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-4M7 10H3m4 0v5a2 2 0 002 2h4.5" />
                                </svg>
                                <span>Helpful ({reviewLikes[likeKey] || 0})</span>
                              </button>
                              <button 
                                onClick={() => handleReply(review.id, 'product')}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>
                                <span>Reply</span>
                              </button>
                            </div>

                            {/* Reply Form */}
                            {reviewReplies[replyKey] && (
                              <div className="mt-4 pl-4 border-l-2 border-gray-200">
                                <textarea 
                                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                  placeholder="Write a reply..."
                                  rows="3"
                                />
                                <div className="flex gap-2 mt-2">
                                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                                    Post Reply
                                  </button>
                                  <button 
                                    onClick={() => handleReply(review.id, 'product')}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* View More Reviews Button */}
                  {reviewsToShow < reviews.length && (
                    <div className="mt-6 text-center">
                      <button 
                        onClick={() => setReviewsToShow(reviews.length)}
                        className="bg-transparent border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium text-sm md:text-base hover:border-gray-400 transition-colors"
                      >
                        View More Reviews
                      </button>
                    </div>
                  )}

                  {/* Write Review Button */}
                  <div className="mt-8 text-center">
                    <button className="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm md:text-base hover:bg-gray-800 transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>
              )}

              {/* Brand Tab Content */}
              {activeTab === 'brand' && (
                <div className="mb-8">
                  {/* Brand AI Insight Section */}
                  <div className="mb-12 bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">AI INSIGHT</h3>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(98, 0, 0, 0.1)', color: '#620000' }}>Verified reviews</button>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Customers say about the brand</h4>
                    
                    <p className="text-gray-700 leading-relaxed mb-2 text-base">
                      {isBrandAISummaryExpanded ? (
                        <>
                          Customers love the brand for its consistent quality and excellent customer service. The brand is known for premium fabrics, elegant designs, and comfortable fits that flatter all body types. Many customers appreciate the brand's attention to detail and commitment to customer satisfaction. The brand has built a strong reputation for delivering stylish and well-made ethnic wear that stands the test of time. Customers frequently mention the brand's reliability, value for money, and trustworthy service.
                          <button onClick={() => setIsBrandAISummaryExpanded(false)} className="underline ml-1 cursor-pointer" style={{ color: '#620000' }}>Read less</button>
                        </>
                      ) : (
                        <>
                          Customers love the brand for its consistent quality and excellent customer service. The brand is known for premium fabrics, elegant designs, and comfortable fits that flatter all body types.
                          <button onClick={() => setIsBrandAISummaryExpanded(true)} className="underline ml-1 cursor-pointer" style={{ color: '#620000' }}>Read more</button>
                        </>
                      )}
                    </p>
                    
                    <p className="text-xs text-gray-500 mb-4">Updated in near real-time as new feedback arrives.</p>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 mb-4"></div>
                    
                    {/* Brand Keywords */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">BRAND FREQUENTLY MENTIONED</p>
                      <div className="flex flex-wrap gap-2">
                        {['Premium Quality', 'Excellent Customer Service', 'Reliable Brand', 'Elegant Designs', 'Comfortable Fit', 'Great Value'].map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#620000' }}></span>
                            <span className="text-sm font-semibold" style={{ color: '#620000' }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sort & Filter Dropdown */}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-[17px] md:text-sm font-medium text-gray-700">Sort & Filter:</span>
                    <div className="relative">
                      <select
                        value={brandSortBy}
                        onChange={(e) => setBrandSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-[17px] md:text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      >
                        <option value="most-recent">Most Recent</option>
                        <option value="highest-rated">Highest Rated</option>
                        <option value="lowest-rated">Lowest Rated</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Brand Review Cards */}
                  <div className="space-y-0">
                    {brandReviews
                      .slice(0, brandReviewsToShow)
                      .map((review, index) => {
                      const likeKey = `brand-${review.id}`;
                      const replyKey = `brand-${review.id}`;
                      return (
                        <React.Fragment key={review.id}>
                          {index > 0 && <div className="border-t border-gray-400"></div>}
                          <div className="bg-white py-6 w-full">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <div className="flex items-center gap-1 mb-1">
                                  {[...Array(5)].map((_, i) => (
                                    <svg 
                                      key={i} 
                                      className={`w-4 h-4 ${i < review.rating ? '' : 'text-gray-300'}`}
                                      style={i < review.rating ? { color: '#620000' } : {}}
                                      fill="currentColor" 
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <p className="text-sm text-gray-500">{review.name}</p>
                              </div>
                              <span className="text-xs text-gray-400">{getDaysAgo(review.date)}</span>
                            </div>
                            <h3 className="font-medium text-gray-700 mb-2">{review.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.text}</p>
                            
                            {/* Like and Reply Buttons */}
                            <div className="flex items-center gap-4 mt-4">
                              <button 
                                onClick={() => handleLike(review.id, 'brand')}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-4M7 10H3m4 0v5a2 2 0 002 2h4.5" />
                                </svg>
                                <span>Helpful ({reviewLikes[likeKey] || 0})</span>
                              </button>
                              <button 
                                onClick={() => handleReply(review.id, 'brand')}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>
                                <span>Reply</span>
                              </button>
                            </div>

                            {/* Reply Form */}
                            {reviewReplies[replyKey] && (
                              <div className="mt-4 pl-4 border-l-2 border-gray-200">
                                <textarea 
                                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                  placeholder="Write a reply..."
                                  rows="3"
                                />
                                <div className="flex gap-2 mt-2">
                                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                                    Post Reply
                                  </button>
                                  <button 
                                    onClick={() => handleReply(review.id, 'brand')}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* View More Brand Reviews Button */}
                  {brandReviewsToShow < brandReviews.length && (
                    <div className="mt-6 text-center">
                      <button 
                        onClick={() => setBrandReviewsToShow(brandReviews.length)}
                        className="bg-transparent border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium text-sm md:text-base hover:border-gray-400 transition-colors"
                      >
                        View More Reviews
                      </button>
                    </div>
                  )}

                  {/* Write Review Button */}
                  <div className="mt-8 text-center">
                    <button className="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm md:text-base hover:bg-gray-800 transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>
              )}

              {/* Media Tab Content */}
              {activeTab === 'media' && (
                <div className="mb-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Instagram Reels</h3>
                    <p className="text-sm text-gray-600">Check out our latest Instagram posts and reels</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instagramReels.map((url, index) => (
                      <div
                        key={`media-reel-${index}`}
                        className="w-full max-w-full overflow-hidden box-border"
                      >
                        <div 
                          className="w-full max-w-full box-border"
                          dangerouslySetInnerHTML={{ __html: createInstagramEmbed(url) }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Instagram Button */}
      <button 
        className="fixed bottom-0 right-0 left-0 md:bottom-5 md:right-5 md:left-auto w-full md:w-auto md:rounded-full rounded-none flex items-center justify-center gap-2.5 px-5 py-3 md:px-5 md:py-3 text-sm md:text-sm font-semibold text-white cursor-pointer shadow-lg z-[1000] transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          boxShadow: '0 4px 15px rgba(188, 24, 136, 0.4)'
        }}
        onClick={() => setShowInstagramModal(true)}
        aria-label="See Our Instagram"
      >
        <svg className="w-6 h-6 md:w-6 md:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
        </svg>
        <span className="whitespace-nowrap">See Our Instagram</span>
      </button>

      {/* Instagram Modal */}
      {showInstagramModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-[10000] p-4 overflow-y-auto"
          onClick={() => setShowInstagramModal(false)}
        >
          <div 
            className="relative w-full md:w-2/5 max-w-4xl h-full md:h-[90vh] bg-gray-50 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 bg-black bg-opacity-60 border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 z-[10001] hover:bg-opacity-80"
              onClick={() => setShowInstagramModal(false)}
              aria-label="Close Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="h-full flex flex-col overflow-hidden">
              <div className="text-center border-b border-gray-200 flex-shrink-0 py-4 px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 m-0">Our Instagram</h2>
                <p className="text-base text-gray-600 m-0">Check out our latest posts and reels</p>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-4">
                <div className="max-w-2xl mx-auto w-full">
                  {instagramReels.map((url, index) => (
                    <div
                      key={`insta-reel-${index}`}
                      className="w-full max-w-full overflow-hidden box-border mb-4 last:mb-0"
                    >
                      <div 
                        className="w-full max-w-full box-border"
                        dangerouslySetInnerHTML={{ __html: createInstagramEmbed(url) }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* You May Also Like Section */}
      <section className="bg-white w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <picture className="w-full h-full block">
                    <source media="(max-width: 768px)" srcSet={PRODUCT_IMAGE_MOBILE} />
                    <img 
                      src={PRODUCT_IMAGE_DESKTOP} 
                      alt={`${PRODUCT_NAME} - Similar Product ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{PRODUCT_NAME}</h3>
                  {/* Rating Badge - Pill Style with Orange Star */}
                  <div className="inline-flex items-center gap-1.5 md:gap-2 bg-gray-50 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full mb-2 w-fit">
                    <span className="text-xs md:text-sm font-bold text-gray-900">4.6</span>
                    <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0L10.06 5.51L16 6.18L12 10.15L12.94 16L8 13.18L3.06 16L4 10.15L0 6.18L5.94 5.51L8 0Z" fill="#FF9500"/>
                    </svg>
                    <div className="w-px h-3 md:h-4" style={{ backgroundColor: '#620000' }}></div>
                    <span className="text-xs md:text-sm font-bold text-gray-900">203</span>
                    <span className="text-xs md:text-sm font-bold text-gray-900">Reviews</span>
                  </div>
                  <p className="text-base font-bold text-gray-900">₹{PRODUCT_PRICE.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ShopifyFooter brandName={BRAND_NAME} />
      
      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close modal"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2 md:p-3"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2 md:p-3"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={customerReviewImages[selectedModalImageIndex]}
              alt={`Customer review ${selectedModalImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-sm md:text-base">
              {selectedModalImageIndex + 1} / {customerReviewImages.length}
            </div>
          </div>
        </div>
      )}
      
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#20BA5A] transition-colors z-50"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default ShopifyProductPage;

