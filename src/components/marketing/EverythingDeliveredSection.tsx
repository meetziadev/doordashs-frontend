import React from 'react';
import { everythingDelivered } from '@assets/images';

export const EverythingDeliveredSection: React.FC = () => {
  return (
    <section
      className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 my-4 transition-all duration-300"
      style={{ backgroundColor: '#DBDAD8' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left Side: Centered Content Block */}
        <div className="w-full text-center flex flex-col items-center justify-center order-2 lg:order-1">
          <h2 className="font-serif text-[28px] md:text-[32px] lg:text-[42px] xl:text-[48px] font-normal text-black leading-[110%] tracking-normal mb-4">
            Everything you need,<br />delivered.
          </h2>

          <h4 className="font-sans text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-semibold text-black uppercase tracking-wider mb-6">
            Your favourite style, at your door
          </h4>

          <p className="font-sans text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-normal text-black/80 max-w-md leading-relaxed">
            Discover the latest trends and timeless pieces from your favourite local brands, delivered right to your door steps.
          </p>
        </div>

        {/* Right Side: High-Resolution Image */}
        <div className="w-full flex justify-center items-center order-1 lg:order-2 select-none pointer-events-none">
          <div className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 max-w-lg lg:max-w-full">
            <img
              src={everythingDelivered}
              alt="Texora sourcing fashion items and display"
              className="w-full h-auto object-cover transform hover:scale-[1.03] transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default EverythingDeliveredSection;
