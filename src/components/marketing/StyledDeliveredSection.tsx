import React from 'react';
import { styledDelivered } from '@assets/images';

export const StyledDeliveredSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8 my-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left Side: High-Resolution Image */}
        <div className="w-full flex justify-center items-center select-none pointer-events-none">
          <div className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 max-w-lg lg:max-w-full">
            <img
              src={styledDelivered}
              alt="Texora styled clothing collection display"
              className="w-full h-auto object-cover transform hover:scale-[1.03] transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Side: Elegant Typography Content Block */}
        <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
          <h2 className="font-serif text-[28px] md:text-[32px] lg:text-[42px] xl:text-[48px] font-normal text-black leading-[110%] tracking-normal">
            Styled Delivered.<br />
            Confidence at your<br />
            door.
          </h2>
        </div>

      </div>
    </section>
  );
};

export default StyledDeliveredSection;
