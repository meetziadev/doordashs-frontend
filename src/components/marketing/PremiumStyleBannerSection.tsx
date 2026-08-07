import React from 'react';
import { useNavigate } from 'react-router-dom';
import { premiumStyleBanner } from '@assets/images';

export const PremiumStyleBannerSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full min-h-[460px] md:min-h-[500px] lg:min-h-[550px] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden my-0 select-none"
      style={{ backgroundImage: `url(${premiumStyleBanner})` }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Centered Content Block */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center text-white py-16">

        {/* Uppercase Small Label */}
        <span className="font-sans text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-semibold text-white/90 uppercase tracking-[0.25em] mb-4 md:mb-5">
          LOOK GOOD, FEEL CONFIDENCE
        </span>

        {/* Big Serif Heading */}
        <h2 className="font-serif text-[30px] md:text-[42px] lg:text-[48px] xl:text-[54px] font-normal leading-[110%] tracking-normal mb-5 md:mb-6">
          Premium Style,<br />Delivered to you.
        </h2>

        {/* Paragraph Description */}
        <p className="font-sans text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-white/80 max-w-xl leading-relaxed mb-8 md:mb-10 font-normal">
          Shop the latest fashion trends and get your<br className="hidden sm:inline" /> favourite looks delivered right to your doorstep.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate('/shop')}
          className="bg-white text-black hover:bg-white/90 px-9 py-3.5 rounded-lg text-sm sm:text-base font-semibold transition-all hover:scale-[1.03] active:scale-95 shadow-md cursor-pointer font-sans"
        >
          Shop Collection
        </button>

      </div>
    </section>
  );
};

export default PremiumStyleBannerSection;
