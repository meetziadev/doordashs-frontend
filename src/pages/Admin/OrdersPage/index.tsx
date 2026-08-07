import React, { useMemo, useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Tabs, { TabItem } from '@/components/common/Tabs';
import HistoryOrderCard from '@/components/orders/HistoryOrderCard';
import ActiveOrderCardLoader from './ActiveOrderCardLoader';
import { OrdersPageSkeleton } from '@/components/Skeletons';
import { useGetActiveOrdersQuery, useGetOrderHistoryQuery } from '@services/orderService';
import { mapHistoryOrderToRow } from '@utils/orderUtils';

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-12 border border-dashed border-gray-300 rounded-[12px] bg-gray-50">
    <p className="text-gray-500 font-medium text-sm">{message}</p>
  </div>
);

export const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const {
    data: activeData,
    isLoading: isActiveLoading,
    isError: isActiveError
  } = useGetActiveOrdersQuery({ page: 1, limit: 10 });
  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isError: isHistoryError
  } = useGetOrderHistoryQuery({ page: 1, limit: 20 });

  const activeOrders = activeData?.items ?? [];
  const historyOrders = historyData?.items ?? [];

  const deliveredOrders = useMemo(
    () => historyOrders.filter((order) => order.status === 'delivered'),
    [historyOrders]
  );
  const cancelledOrders = useMemo(
    () => historyOrders.filter((order) => order.status === 'cancelled'),
    [historyOrders]
  );

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    { label: 'Orders' }
  ];

  const isLoading = isActiveLoading || isHistoryLoading;
  const isError = isActiveError || isHistoryError;

  const renderActiveOrders = (highlightFirst = false) => {
    if (activeOrders.length === 0) {
      return <EmptyState message="No active orders found." />;
    }

    return (
      <div className="space-y-5">
        {activeOrders.map((order, index) => (
          <ActiveOrderCardLoader
            key={order.id}
            orderId={order.id}
            isHighlighted={highlightFirst && index === 0}
          />
        ))}
      </div>
    );
  };

  const renderHistoryOrders = (orders: typeof historyOrders, emptyMessage: string) => {
    if (orders.length === 0) {
      return <EmptyState message={emptyMessage} />;
    }

    return <HistoryOrderCard orders={orders.map(mapHistoryOrderToRow)} />;
  };

  const renderAllOrders = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-serif text-lg md:text-xl font-bold text-gray-900 text-left">
          Current Orders
        </h2>
        {renderActiveOrders(true)}
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-lg md:text-xl font-bold text-gray-900 text-left">
          Previous Orders
        </h2>
        {renderHistoryOrders(historyOrders, 'No previous orders found.')}
      </div>
    </div>
  );

  const orderTabs: TabItem[] = [
    { id: 'all', label: 'All Orders', content: renderAllOrders() },
    { id: 'current', label: 'Current Orders', content: renderActiveOrders(true) },
    {
      id: 'previous',
      label: 'Previous Orders',
      content: renderHistoryOrders(deliveredOrders, 'No delivered orders found.')
    },
    {
      id: 'cancelled',
      label: 'Cancelled Orders',
      content: renderHistoryOrders(cancelledOrders, 'No cancelled orders found.')
    }
  ];

  if (isLoading) {
    return <OrdersPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="max-w-[1400px] mx-auto p-6">
        <p className="text-gray-500">Unable to load orders. Please log in and try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-8 bg-white font-arial">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-left space-y-2">
        <h1 className="font-serif text-[26px] md:text-[36px] font-regular text-black">
          My Orders
        </h1>
      </div>

      <div className="mt-6">
        <Tabs tabs={orderTabs} activeTabId={activeTab} onChange={setActiveTab} variant="pills" />
      </div>
    </div>
  );
};

export default OrdersPage;
