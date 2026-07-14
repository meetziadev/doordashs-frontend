import React, { useState } from 'react';
import { Star, Check, ChevronDown, ChevronRight, SlidersHorizontal, MoreHorizontal } from '@assets/icons';
import Tabs from '@/components/UI/Tabs';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import ProductGallery from '@/components/UI/ProductGallery';
import ReviewCard from '@/components/UI/ReviewCard';
import QuantitySelector from '@/components/UI/QuantitySelector';

export const ProductDetailPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');

  const images = [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&h=800&fit=crop'
  ];

  const colors = [
    { name: 'Olive', value: '#4E5340' },
    { name: 'Teal', value: '#2C4A42' },
    { name: 'Navy', value: '#2E3349' }
  ];

  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) {
        return (
          <Star
            key={i}
            className="h-4.5 w-4.5 fill-[#FBBF24] stroke-[#FBBF24]"
          />
        );
      } else if (rating > i && rating < starValue) {
        return (
          <div key={i} className="relative h-4.5 w-4.5">
            <Star className="absolute top-0 left-0 h-4.5 w-4.5 fill-[#E5E7EB] stroke-[#E5E7EB]" />
            <div className="absolute top-0 left-0 h-4.5 overflow-hidden" style={{ width: '50%' }}>
              <Star className="h-4.5 w-4.5 fill-[#FBBF24] stroke-[#FBBF24]" />
            </div>
          </div>
        );
      } else {
        return (
          <Star
            key={i}
            className="h-4.5 w-4.5 fill-[#E5E7EB] stroke-[#E5E7EB]"
          />
        );
      }
    });
  };

  const productDetailsContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 text-[#2D2A26]">
      {/* Description */}
      <div className="space-y-4">
        <h3 className="text-[14px] font-extrabold font-sans tracking-wide">Description</h3>
        <p className="text-[12px] text-gray-500 leading-relaxed font-normal">
          The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users.
        </p>
        <p className="text-[12px] text-gray-500 leading-relaxed font-normal">
          Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.
        </p>
      </div>

      {/* Shipping Info */}
      <div className="space-y-4">
        <h3 className="text-[14px] font-extrabold font-sans tracking-wide">Shipping Information</h3>
        <div className="mt-3">
          <div className="py-2 flex justify-start gap-4 text-[12px] font-normal">
            <span className="font-semibold text-gray-900">Courier:</span>
            <span className="text-gray-500">2 - 4 days, free shipping</span>
          </div>
          <div className="py-2 flex justify-start gap-4 text-[12px] font-normal">
            <span className="font-semibold text-gray-900">Local Shipping:</span>
            <span className="text-gray-500">up to one week</span>
          </div>
          <div className="py-2 flex justify-start gap-4 text-[12px] font-normal">
            <span className="font-semibold text-gray-900">UPS Ground Shipping:</span>
            <span className="text-gray-500">4 - 6 days</span>
          </div>
          <div className="py-2 flex justify-start gap-4 text-[12px] font-normal">
            <span className="font-semibold text-gray-900">Unishop Global Export:</span>
            <span className="text-gray-500">3 - 4 days</span>
          </div>
        </div>
      </div>
    </div>
  );

  const reviewRatingContent = (
    <div className="space-y-8">
      {/* Header filter row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-[24px] font-normal text-black font-serif">All Reviews</h3>
          <span className="text-sm text-gray-500 font-semibold">(451)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0EEED] text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Filter reviews"
          >
            <SlidersHorizontal size={18} />
          </button>
          <div className="relative">
            <select
              className="appearance-none bg-[#F0EEED] hover:bg-gray-200 transition-colors rounded-full py-2.5 pl-5 pr-10 text-sm font-semibold text-gray-900 focus:outline-none cursor-pointer"
              defaultValue="Latest"
            >
              <option>Latest</option>
              <option>Top Rated</option>
              <option>Oldest</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          <button
            type="button"
            className="bg-black hover:bg-zinc-800 text-white rounded-full py-2.5 px-6 text-sm font-semibold transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Review cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReviewCard
          rating={4.5}
          author="Samantha D."
          comment='"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It&apos;s become my favorite go-to shirt."'
          isVerified={true}
        />
        <ReviewCard
          rating={4.0}
          author="Alex M."
          comment='"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I&apos;m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."'
          isVerified={true}
        />
      </div>
    </div>
  );

  const tabs = [
    { id: 'details', label: 'Product Details', content: productDetailsContent },
    { id: 'reviews', label: 'Review & Rating', content: reviewRatingContent }
  ];

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    { label: 'Shop', url: '/admin/shop' },
    { label: 'Men', url: '/admin/men' },
    { label: 'T-shirts' }
  ];

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-12 bg-white font-arial">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Main product presentation */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-stretch">

        {/* Left Column - Images */}
        <ProductGallery
          images={images}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />

        {/* Right Column - Product details */}
        <div className="flex-1 flex flex-col items-start text-left justify-between py-2 lg:max-w-[50%] xl:max-w-[45%] w-full">
          <div className="w-full">
            <h1 className="font-serif text-[18px] sm:text-[24px] md:text-[30px] xl:text-[36px] font-bold text-gray-950 leading-tight">
              One Life Graphic T-shirt
            </h1>

            {/* Rating Row */}
            <div className="mt-3 flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {renderStars(4.5)}
              </div>
              <span className="ml-2 text-sm font-normal text-gray-900">
                4.5/5
              </span>
            </div>

            {/* Price row */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[18px] sm:text-[24px] md:text-[30px] xl:text-[36px] font-semibold text-gray-950">
                Rs 3,000
              </span>
              <span className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-400 font-normal line-through">
                Rs 3,500
              </span>
              <span className="bg-[#FFF0F2] text-[#FF5A70] px-3.5 py-1 rounded-full text-xs font-bold font-sans">
                -40%
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-xs md:text-[16px] text-gray-500 leading-relaxed font-normal pb-6 border-b border-gray-200 w-full">
              This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
            </p>

            {/* Select Colors */}
            <div className="mt-6 pb-6 border-b border-gray-200 w-full">
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                Select Colors
              </h3>
              <div className="flex gap-3 mt-3">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedColor(i)}
                    className="w-8 h-8 rounded-full border border-gray-300 relative flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
                    style={{ backgroundColor: color.value }}
                    aria-label={`Select ${color.name}`}
                  >
                    {selectedColor === i && (
                      <Check size={14} className="text-white stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Size */}
            <div className="mt-6 pb-6 border-b border-gray-200 w-full">
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                Choose Size
              </h3>
              <div className="flex flex-wrap gap-3 mt-3">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer active:scale-95 ${isSelected
                        ? 'bg-black text-white'
                        : 'bg-[#F0EEED] text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quantity and CTA Add to Cart */}
          <div className="flex items-center gap-4 mt-8 w-full">
            {/* Quantity Selector */}
            <QuantitySelector
              quantity={quantity}
              onIncrement={() => setQuantity((q) => q + 1)}
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-36 px-5 py-2.5 text-base"
            />

            {/* Add To Cart */}
            <button
              type="button"
              className="bg-black hover:bg-zinc-800 text-white rounded-full py-3 px-12 text-sm sm:text-base font-normal transition-all active:scale-98 flex-1 cursor-pointer shadow-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs segment */}
      <Tabs
        tabs={tabs}
        activeTabId={activeTab}
        onChange={(id) => setActiveTab(id)}
        className="mt-16 xl:mt-24 2xl:mt-32"
      />
    </div>
  );
};

export default ProductDetailPage;
