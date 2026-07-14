import React from 'react';
import { kidsDressPromo } from '@assets/images';

export const KidsDressBanner: React.FC = () => {
  return (
    <div className="relative w-full rounded-[2rem] bg-[#FDC0CD] overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 md:p-16 lg:p-20 min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
      
      {/* Left Content */}
      <div className="flex-1 flex flex-col items-start text-left z-10 max-w-xl">
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#2D2A26] leading-tight">
          Kids Dress
        </h2>
        <p className="mt-3 text-lg sm:text-xl font-medium text-[#2D2A26] opacity-90 leading-relaxed">
          Get an extra 30% discount
        </p>
        <button
          type="button"
          className="mt-6 bg-[#9C8DF4] text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#8B7CE0] active:scale-95 shadow-sm"
        >
          SHOP NOW
        </button>
      </div>

      {/* Right Content / Image - Absolutely positioned on md+ screens to align with bottom and right borders */}
      <div className="relative mt-8 md:mt-0 w-full md:absolute md:bottom-0 md:right-0 md:h-[95%] md:w-[48%] flex items-end justify-center md:justify-end z-0">
        <img
          src={kidsDressPromo}
          alt="Kids Dress Promo"
          className="h-72 sm:h-96 md:h-full w-auto object-contain object-bottom"
        />
      </div>
    </div>
  );
};

export default KidsDressBanner;
