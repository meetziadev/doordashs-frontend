import React from 'react';
import { Check, ClipboardList, Calendar, Truck } from '@assets/icons';

type Props = {
  orderNumber?: string;
  orderDate?: string;
  estimatedDelivery?: string;
};

export const CheckoutSuccess: React.FC<Props> = ({
  orderNumber = '—',
  orderDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }),
  estimatedDelivery = '3-5 business days'
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 font-arial w-full mt-8">
      <div className="flex items-center justify-center w-32 h-32 rounded-full border-[8px] border-[#22C55E] relative flex-shrink-0">
        <Check size={64} className="text-[#22C55E] stroke-[6]" />
      </div>

      <h2 className="font-sans text-[28px] sm:text-[40px] font-medium text-black mt-8">
        Order Placed Successfully
      </h2>

      <p className="text-sm sm:text-[20px] text-gray-800 font-medium max-w-xl mt-4 leading-relaxed">
        Thank you for shopping with us. Your order has been received and is being processed.
      </p>

      <div className="border border-gray-200 rounded-[20px] p-6 mt-12 bg-white max-w-4xl w-full mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-0 md:divide-x divide-gray-200">
        <div className="flex items-start gap-4 px-6 py-2 flex-1 justify-center md:justify-start">
          <ClipboardList size={32} className="text-gray-900" />
          <div className="text-left">
            <p className="text-[15px] font-bold text-black">Order Number</p>
            <p className="text-[15px] text-gray-500 font-medium mt-3">{orderNumber}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 px-6 py-2 flex-1 justify-center md:justify-start">
          <Calendar size={32} className="text-gray-900" />
          <div className="text-left">
            <p className="text-[15px] font-bold text-black">Order Date</p>
            <p className="text-[15px] text-gray-500 font-medium mt-3">{orderDate}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 px-6 py-2 flex-1 justify-center md:justify-start">
          <Truck size={32} className="text-gray-900" />
          <div className="text-left">
            <p className="text-[15px] font-bold text-black">Estimated Delivery</p>
            <p className="text-[15px] text-gray-500 font-medium mt-3">{estimatedDelivery}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
