import React from 'react';
import { useNavigate } from 'react-router-dom';
import { collectionWomen, collectionMen } from '@assets/images';

// Generic Collection Card Component
interface CollectionCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="flex flex-col sm:flex-row w-full bg-white/40 border border-black/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">

      {/* Left side: Image */}
      <div className="w-full sm:w-[42%] h-64 sm:h-auto select-none pointer-events-none flex-shrink-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
        />
      </div>

      {/* Right side: Text details */}
      <div className="flex flex-col justify-center p-6 sm:p-8 w-full sm:w-[58%]">
        <h3 className="font-serif text-[20px] font-semibold text-black tracking-wide mb-3">
          {title}
        </h3>

        <p className="font-sans text-[13px] sm:text-[14px] text-gray-700 leading-relaxed mb-6 font-normal">
          {description}
        </p>

        <div className="flex justify-start">
          <button
            onClick={onButtonClick}
            className="bg-black text-white hover:bg-black/90 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-sm font-sans"
          >
            {buttonText}
          </button>
        </div>
      </div>

    </div>
  );
};

export const CompleteWardrobeSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 my-4 transition-all duration-300"
      style={{ backgroundColor: '#DBDAD8' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Centered Heading Wrapper */}
        <div className="w-full text-center flex flex-col items-center justify-center mb-12">
          <span className="font-serif text-[14px] md:text-[16px] text-black/80 font-normal">
            Everything You Need To
          </span>

          <h2 className="font-serif text-[28px] md:text-[32px] lg:text-[42px] xl:text-[48px] font-normal text-black leading-[110%] tracking-normal mt-3 mb-4">
            Complete Your Wardrobe
          </h2>

          <p className="font-serif text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-black/80 max-w-xl leading-relaxed mt-2">
            Discover timeless fashion designed for every style and every occasion.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <CollectionCard
            imageSrc={collectionWomen}
            imageAlt="Woman model in elegant black blazer"
            title="Women's Collection"
            description="Explore elegant dresses, tops, jeans, and every day essentials crafted for modern womens."
            buttonText="Shop Women"
            onButtonClick={() => navigate('/shop?category=women')}
          />
          <CollectionCard
            imageSrc={collectionMen}
            imageAlt="Man model in premium black coach jacket"
            title="Men's Collection"
            description="Upgrade your wardrobe with premium shirts, jackets, trousers, denim and everyday classic."
            buttonText="Shop Men"
            onButtonClick={() => navigate('/shop?category=men')}
          />
        </div>

      </div>
    </section>
  );
};

export default CompleteWardrobeSection;
