import React from 'react';

export interface HistoryOrderRow {
  id: string;
  date: string;
  deliveredDate: string;
  price: string;
}

export interface HistoryOrderCardProps {
  orders: HistoryOrderRow[];
}

export const HistoryOrderCard: React.FC<HistoryOrderCardProps> = ({ orders }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-[12px] p-5 w-full divide-y divide-gray-100 font-arial text-left">
      {orders.map((order, idx) => (
        <div
          key={idx}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4 first:pt-0 last:pb-0 items-center text-sm"
        >
          <div className="font-bold text-gray-900">{order.id}</div>
          <div className="text-gray-500">{order.date}</div>
          <div className="text-gray-500">
            Delivered on <span className="text-green-600 font-semibold">{order.deliveredDate}</span>
          </div>
          <div className="text-green-600 font-bold">Delivered</div>
          <div className="text-gray-950 font-bold text-right md:text-left">{order.price}</div>
        </div>
      ))}
    </div>
  );
};

export default HistoryOrderCard;
