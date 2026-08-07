import React from 'react';

export interface HistoryOrderRow {
  id: string;
  date: string;
  deliveredDate: string;
  price: string;
  status?: string;
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
            {order.status === 'cancelled' ? (
              <span className="text-red-600 font-semibold">Cancelled</span>
            ) : order.status === 'delivered' ? (
              <>
                Delivered on{' '}
                <span className="text-green-600 font-semibold">{order.deliveredDate}</span>
              </>
            ) : (
              <span className="text-gray-600 font-semibold capitalize">{order.deliveredDate}</span>
            )}
          </div>
          <div
            className={
              order.status === 'cancelled'
                ? 'text-red-600 font-bold'
                : order.status === 'delivered'
                  ? 'text-green-600 font-bold'
                  : 'text-blue-600 font-bold capitalize'
            }
          >
            {order.status === 'cancelled'
              ? 'Cancelled'
              : order.status === 'delivered'
                ? 'Delivered'
                : order.status?.replace(/_/g, ' ') || 'Completed'}
          </div>
          <div className="text-gray-950 font-bold text-right md:text-left">{order.price}</div>
        </div>
      ))}
    </div>
  );
};

export default HistoryOrderCard;
