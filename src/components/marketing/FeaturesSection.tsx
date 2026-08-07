import React from 'react';
import {
  FreeShippingIcon,
  PremiumQualityIcon,
  EasyReturnsIcon,
  SecurePaymentsIcon
} from '@assets/icons';

// Generic reusable feature item component
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="flex items-start gap-4 group transition-all duration-300 hover:translate-y-[-2px]">
      {/* Icon container with hover animation and subtle styling */}
      <div className="flex-shrink-0 text-black p-1 transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>
      <div className="flex flex-col justify-start">
        <h3 className="font-sans text-[16px] font-semibold text-black tracking-wide">
          {title}
        </h3>
        <p className="font-sans text-[13px] sm:text-[14px] text-gray-500 mt-1.5 leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-10 md:py-14 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 sm:gap-x-12 lg:gap-x-8">
        
          <FeatureItem
            icon={<PremiumQualityIcon />}
            title="Premium Quality"
            subtitle="Finest fabrics and trusted quality you can rely on."
          />
          <FeatureItem
            icon={<EasyReturnsIcon />}
            title="Easy Returns"
            subtitle="Hassle-free returns within 7 days of delivery."
          />
          <FeatureItem
            icon={<SecurePaymentsIcon />}
            title="Secure Payments"
            subtitle="100% secure payment with multiple option."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
