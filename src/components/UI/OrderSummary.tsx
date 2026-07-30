import React from 'react';
import { Tag, ArrowRight } from '@assets/icons';

export interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
  onApplyPromoCode?: () => void;
  onCheckout?: () => void;
  checkoutDisabled?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discount,
  deliveryFee,
  total,
  promoCode,
  onPromoCodeChange,
  onApplyPromoCode,
  onCheckout,
  checkoutDisabled = false
}) => {
  const formatPrice = (value: number) => {
    return `Rs ${value.toLocaleString('en-US')}`;
  };

  return (
    <div className="w-full lg:w-[380px] xl:w-[440px] p-2 space-y-6 bg-white shrink-0 text-left font-sans">
      <h2 className="text-[24px] font-regular text-black">
        Order Summary
      </h2>

      <div className="space-y-4 font-sans">
        <div className="flex justify-between text-sm sm:text-base text-gray-500 font-medium">
          <span>Subtotal</span>
          <span className="text-gray-950 font-regular">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm sm:text-base text-gray-500 font-medium">
            <span>Discount</span>
            <span className="text-[#FF5A70] font-regular">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm sm:text-base text-gray-500 font-medium">
          <span>Delivery Fee</span>
          <span className="text-gray-950 font-regular">{formatPrice(deliveryFee)}</span>
        </div>
        <div className="border-t border-gray-300 pt-4 flex justify-between text-base sm:text-lg font-regular text-gray-950">
          <span>Total</span>
          <span className="text-lg sm:text-xl font-regular">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Promo code inputs */}
      <div className="flex gap-3 items-center w-full">
        <div className="relative flex-1">
          <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Add promo code"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            className="w-full bg-[#F0EEED] rounded-full py-3.5 pl-11 pr-4 text-sm text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <button
          type="button"
          onClick={onApplyPromoCode}
          className="bg-black hover:bg-zinc-800 text-white rounded-full py-3.5 px-6 text-sm font-regular transition-all active:scale-95 cursor-pointer"
        >
          Apply
        </button>
      </div>

      {/* Checkout CTA */}
      <button
        type="button"
        onClick={onCheckout}
        disabled={checkoutDisabled}
        className={`w-full text-white rounded-full py-4 text-center font-regular text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm ${
          checkoutDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-black hover:bg-zinc-800 active:scale-98 cursor-pointer'
        }`}
      >
        Go to Checkout
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default OrderSummary;
