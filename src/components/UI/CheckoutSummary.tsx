import React from 'react';

interface CartItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  onPlaceOrder?: () => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  items,
  subtotal,
  discount,
  deliveryFee,
  total,
  onPlaceOrder
}) => {
  const formatPrice = (value: number) => {
    return `Rs ${value.toLocaleString('en-US')}`;
  };

  return (
    <div className="w-full lg:w-[380px] xl:w-[440px] border border-gray-200 rounded-[20px] p-6 space-y-6 bg-white shrink-0 text-left font-arial">
      <h2 className="text-[20px] font-bold text-gray-950">
        Order Summary
      </h2>

      {/* Items list */}
      <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            {/* Image container */}
            <div className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] rounded-2xl overflow-hidden bg-[#F0EEED] relative flex-shrink-0 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Middle metadata */}
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <h4 className="font-sans text-sm sm:text-base font-semibold text-black leading-tight">
                  {item.name}
                </h4>
                <div className="mt-1 text-xs text-gray-500 font-normal space-y-0.5">
                  <p>Size: <span className="text-gray-900">{item.size}</span></p>
                  <p>Color: <span className="text-gray-900">{item.color}</span></p>
                  <p>Qty: <span className="text-gray-900">{item.quantity}</span></p>
                </div>
              </div>
            </div>

            {/* Price right aligned */}
            <span className="text-sm sm:text-base font-semibold text-gray-900 self-end mb-1">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing list */}
      <div className="space-y-4 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm sm:text-base font-medium">
          <span className="text-gray-500 font-normal">Sub Total</span>
          <span className="text-gray-900 font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base font-medium">
          <span className="text-gray-500 font-normal">Discount</span>
          <span className="text-gray-900 font-semibold">{formatPrice(discount)}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base font-medium">
          <span className="text-gray-500 font-normal">Delivery Free</span>
          <span className="text-gray-900 font-semibold">{formatPrice(deliveryFee)}</span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between text-base sm:text-lg font-bold text-gray-950">
          <span className="text-gray-900 font-semibold">Total</span>
          <span className="text-gray-950 font-extrabold">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Place Order CTA */}
      <button
        type="button"
        onClick={onPlaceOrder}
        className="w-full bg-black hover:bg-zinc-800 text-white rounded-full py-3.5 text-center font-bold text-sm sm:text-base transition-all active:scale-98 cursor-pointer shadow-sm mt-2"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutSummary;
