import React from 'react';
import { classNames } from '@utils/helpers';

export interface ActiveOrderItem {
  name: string;
  size: string;
  color: string;
  qty: number;
  image: string;
}

export interface ActiveOrderCardProps {
  id: string;
  date: string;
  deliveryDate: string;
  status: string;
  items: ActiveOrderItem[];
  totalPrice: string;
  isHighlighted?: boolean;
}

export const ActiveOrderCard: React.FC<ActiveOrderCardProps> = ({
  id,
  date,
  deliveryDate,
  status,
  items,
  totalPrice,
  isHighlighted = false
}) => {
  const isConfirmed = status.toLowerCase() === 'confirmed';

  return (
    <div className="bg-white rounded-[12px] border border-gray-200 overflow-hidden text-left font-arial transition-all w-full">
      {/* Header Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white border-b border-gray-200">
        <div>
          <p className="text-xs font-bold text-gray-900">Order ID</p>
          <p className="text-xs text-gray-500 mt-1">{id}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">Order Date</p>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">Estimated Delivery</p>
          <p className="text-xs text-green-600 font-semibold mt-1">{deliveryDate}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">Status</p>
          <p
            className={classNames(
              'text-xs font-semibold mt-1',
              isConfirmed ? 'text-green-600' : 'text-blue-600'
            )}
          >
            {status}
          </p>
        </div>
      </div>

      {/* Items List Row */}
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100 p-5 gap-6 lg:gap-0">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 lg:pr-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 bg-gray-50 object-contain rounded-md border border-gray-100 shrink-0"
              />
              <div>
                <h4 className="text-[13px] font-bold text-gray-900 leading-tight">{item.name}</h4>
                <p className="text-[11px] text-gray-500 mt-1">Size: <span className="text-gray-700">{item.size}</span></p>
                <p className="text-[11px] text-gray-500">Color: <span className="text-gray-700">{item.color}</span></p>
                <p className="text-[11px] text-gray-500">Qty: <span className="text-gray-700">{item.qty}</span></p>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary Block (on far right) */}
        <div className="lg:pl-6 shrink-0 flex items-center justify-center lg:justify-start">
          <div className="bg-[#F3F4F6] rounded-[8px] p-4 text-left w-full sm:w-[160px]">
            <p className="text-[11px] font-bold text-gray-900">Total</p>
            <p className="text-[15px] font-bold text-black mt-1">{totalPrice}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{items.reduce((acc, curr) => acc + curr.qty, 0)} items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrderCard;
