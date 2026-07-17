import React from 'react';
import { useNavigate } from 'react-router-dom';
import { bannerOne, bannerTwo } from '@assets/images';
import { FeaturesSection, EverythingDeliveredSection, StyledDeliveredSection, PremiumStyleBannerSection, ArrivesInStyleSection, CompleteWardrobeSection } from '@components/index';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white flex flex-col justify-start overflow-x-hidden">

      {/* Full-width Banner Background Wrapper */}
      <div
        className="w-full relative overflow-visible transition-all duration-300"
        style={{ backgroundColor: '#DBDAD8' }}
      >

        {/* Top Right Auth Buttons (Aligned relative to the container) */}
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="absolute top-6 right-4 sm:right-6 flex items-center gap-3 z-30">
            <button
              onClick={() => navigate('/login')}
              className="bg-black text-white hover:bg-gray-900 px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="border border-black text-black hover:bg-black/5 px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* 3-Column Grid inside the container */}
        <div className="max-w-8xl 2xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1.5fr_1.2fr] gap-4 items-center h-auto min-h-[460px] md:h-[500px] lg:h-[550px] overflow-visible">

          {/* Left Column: bannerOne (Boy Image) - sits on bottom, 75% of container height */}
          <div className="hidden md:flex justify-start items-end h-full select-none pointer-events-none">
            <img
              src={bannerOne}
              alt="Fashion boy model"
              className="h-full w-auto object-contain object-bottom filter drop-shadow-lg"
            />
          </div>

          {/* Center Column: Content Block */}
          <div className="w-full text-center flex flex-col items-center justify-center py-0 lg:py-12 h-full z-20">
            <span className="font-serif text-[14px] mt-6 md:mt-0 md:text-[16px] lg:text-[18px] font-normal text-black">
              New Season, New Style
            </span>

            <h1 className="font-serif text-[30px] lg:text-[42px] font-normal text-black uppercase tracking-normal leading-[100%] mt-6 md:mt-2 mb-6 md:mb-2">
              FASHION THAT<br />DEFINES YOU
            </h1>

            <p className="font-serif text-[12px] md:text-[14px] lg:text-[16px] font-normal text-black/80 max-w-sm leading-relaxed mb-8 md:mb-4">
              Explore our latest collection crafted<br />for comfort, style and confidence
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 md:px-0">
              <button
                onClick={() => navigate('/shop')}
                className="w-full lg:w-auto bg-black text-white hover:bg-black/90 px-10 py-2.5 lg:py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-sm font-sans"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="w-full sm:w-auto border border-black text-black hover:bg-black/5 px-10 py-2.5 lg:py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all hover:scale-[1.02] active:scale-95 font-sans"
              >
                Explore Collection
              </button>
            </div>
          </div>

          {/* Right Column: bannerTwo (Clothing Rack Image) - sits on bottom with a translation to overflow below */}
          <div className="hidden md:flex justify-end items-end h-full select-none pointer-events-none overflow-visible">
            <img
              src={bannerTwo}
              alt="Clothing rack"
              className="h-full w-full object-contain object-bottom translate-y-4 filter drop-shadow-sm"
            />
          </div>

        </div>

      </div>

      {/* Spacing below the banner to clear the overflowing clothing rack wheels */}
      {/* <div className="w-full h-12 md:h-16 bg-white"></div> */}

      {/* Trust & Features Info Section */}
      <FeaturesSection />

      {/* Everything You Need Delivered Section */}
      <EverythingDeliveredSection />

      {/* Styled Delivered Section */}
      <StyledDeliveredSection />

      {/* Premium Style Background Banner Section */}
      <PremiumStyleBannerSection />

      {/* Fashion That Arrives in Style Section */}
      <ArrivesInStyleSection />

      {/* Complete Your Wardrobe Category Section */}
      <CompleteWardrobeSection />
    </div>
  );
};

export default HomePage;
