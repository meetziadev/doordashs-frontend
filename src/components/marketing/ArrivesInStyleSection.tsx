import React from 'react';
import { arrivesInStyle } from '@assets/images';

export const ArrivesInStyleSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8 my-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left Side: Centered Typography Content Block */}
        <div className="w-full text-center flex flex-col items-center justify-center order-2 lg:order-1">
          <h2 className="font-serif text-[28px] md:text-[32px] lg:text-[42px] xl:text-[48px] font-normal text-black leading-[110%] tracking-normal mb-6">
            Fashion That<br />Arrives in Style
          </h2>

          <p className="font-sans text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-gray-500 max-w-md leading-relaxed font-normal">
            Experience effortless shopping with curated collections, premium quality, and fast delivery
          </p>
        </div>

        {/* Right Side: High-Resolution Image */}
        <div className="w-full flex justify-center items-center order-1 lg:order-2 select-none pointer-events-none">
          <div className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 max-w-md lg:max-w-full">
            <img
              src={arrivesInStyle}
              alt="Beautiful premium packaging box and bag designs"
              className="w-full h-auto object-cover transform hover:scale-[1.03] transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArrivesInStyleSection;
