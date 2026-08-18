import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/components/product/ProductCard';
import { productOfTheDay as fallbackImage } from '@assets/images';

type Props = {
  product?: Product;
  isLoading?: boolean;
};

const CountdownBox: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const formattedValue = value.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center justify-center border border-[#2D2A26] w-[70px] h-[75px] sm:w-[85px] sm:h-[90px] text-[#2D2A26] bg-transparent select-none">
      <span className="text-lg sm:text-xl font-bold font-sans tracking-tight leading-none">
        {formattedValue}
      </span>
      <span className="text-[10px] sm:text-xs font-semibold mt-1 opacity-90">{label}</span>
    </div>
  );
};

export const ProductOfTheDay: React.FC<Props> = ({ product, isLoading }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 12,
    minutes: 29,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                days = 0;
                hours = 12;
                minutes = 29;
                seconds = 59;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleShopNow = () => {
    if (product?.slug) {
      navigate(`/product/${product.slug}`);
    }
  };

  const image = product?.image || fallbackImage;
  const title = product?.name || 'Product of the day';
  const description = product
    ? `Today's featured pick — ${product.name}. Grab it before it's gone!`
    : "Today's featured product is waiting for you. Grab it before it's gone!";

  return (
    <div className="relative w-full rounded-[2rem] bg-[#FDC0CD] overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 md:p-16 lg:p-20 min-h-[350px] sm:min-h-[400px] md:min-h-[450px]">
      <div className="flex-1 flex flex-col items-start text-left z-10 max-w-xl">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#2D2A26]">
          SALE UPTO 60%
        </span>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-[#2D2A26] leading-tight">
          Product of the day
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-700/90 leading-relaxed font-medium max-w-md">
          {isLoading ? 'Loading featured product...' : description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          <CountdownBox value={timeLeft.days} label="Days" />
          <CountdownBox value={timeLeft.hours} label="Hours" />
          <CountdownBox value={timeLeft.minutes} label="Minutes" />
          <CountdownBox value={timeLeft.seconds} label="Seconds" />
        </div>

        <button
          type="button"
          onClick={handleShopNow}
          disabled={!product?.slug}
          className="mt-8 group flex items-center justify-center gap-6 border border-[#2D2A26] bg-transparent px-8 py-3 text-xs sm:text-sm font-bold tracking-widest text-[#2D2A26] uppercase transition-all duration-300 hover:bg-[#2D2A26] hover:text-[#FDC0CD] active:scale-95 cursor-pointer disabled:opacity-50"
        >
          SHOP NOW
          <span className="flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
            <span className="h-[2px] w-8 bg-[#2D2A26] group-hover:bg-[#FDC0CD] transition-colors duration-300" />
            <span className="text-lg leading-none">&#8594;</span>
          </span>
        </button>
      </div>

      <div
        onClick={handleShopNow}
        className="relative mt-8 md:mt-0 w-full md:absolute md:bottom-0 md:right-0 md:h-[95%] md:w-[48%] flex items-end justify-center md:justify-end z-0 cursor-pointer"
      >
        <img
          src={image}
          alt={title}
          className="h-72 sm:h-96 md:h-full w-auto object-contain object-bottom"
        />
      </div>

      <div className="absolute top-6 right-6 grid grid-cols-5 gap-1.5 opacity-20 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-[#2D2A26]" />
        ))}
      </div>
    </div>
  );
};

export default ProductOfTheDay;
