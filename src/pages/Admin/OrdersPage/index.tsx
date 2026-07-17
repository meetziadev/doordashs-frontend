import React, { useState } from 'react';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Tabs, { TabItem } from '@/components/UI/Tabs';
import ActiveOrderCard, { ActiveOrderItem } from '@/components/UI/ActiveOrderCard';
import HistoryOrderCard, { HistoryOrderRow } from '@/components/UI/HistoryOrderCard';
import { courageGraphicTshirt, verticalStripedShirt, fadedSkinnyJeans } from '@assets/images';

export const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    { label: 'Orders' }
  ];

  // Mock Active Items
  const activeItems: ActiveOrderItem[] = [
    {
      name: 'Gradient Graphic T-shirt',
      size: 'Large',
      color: 'White',
      qty: 1,
      image: courageGraphicTshirt
    },
    {
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      qty: 1,
      image: verticalStripedShirt
    },
    {
      name: 'Skinny Fit Jeans',
      size: 'Large',
      color: 'Blue',
      qty: 1,
      image: fadedSkinnyJeans
    }
  ];

  // Mock History Rows
  const historyOrders: HistoryOrderRow[] = [
    {
      id: '#ZARA-784112',
      date: '28 June, 2026',
      deliveredDate: '28 June, 2026',
      price: 'Rs 6,000'
    },
    {
      id: '#ZARA-784112',
      date: '28 June, 2026',
      deliveredDate: '28 June, 2026',
      price: 'Rs 6,000'
    }
  ];

  const renderAllOrders = () => (
    <div className="space-y-8">
      {/* Current Orders Section */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg md:text-xl font-bold text-gray-900 text-left">
          Current Orders
        </h2>
        <div className="space-y-5">
          <ActiveOrderCard
            id="#ZARA-785412"
            date="10 JULY, 2026"
            deliveryDate="15 - 18 July, 2026"
            status="Confirmed"
            items={activeItems}
            totalPrice="Rs 10,000"
            isHighlighted={true}
          />
          <ActiveOrderCard
            id="#ZARA-785412"
            date="10 JULY, 2026"
            deliveryDate="15 - 18 July, 2026"
            status="Processing"
            items={activeItems}
            totalPrice="Rs 10,000"
            isHighlighted={false}
          />
        </div>
      </div>

      {/* Previous Orders Section */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg md:text-xl font-bold text-gray-900 text-left">
          Previous Orders
        </h2>
        <HistoryOrderCard orders={historyOrders} />
      </div>
    </div>
  );

  const renderCurrentOrders = () => (
    <div className="space-y-5">
      <ActiveOrderCard
        id="#ZARA-785412"
        date="10 JULY, 2026"
        deliveryDate="15 - 18 July, 2026"
        status="Confirmed"
        items={activeItems}
        totalPrice="Rs 10,000"
        isHighlighted={true}
      />
      <ActiveOrderCard
        id="#ZARA-785412"
        date="10 JULY, 2026"
        deliveryDate="15 - 18 July, 2026"
        status="Processing"
        items={activeItems}
        totalPrice="Rs 10,000"
        isHighlighted={false}
      />
    </div>
  );

  const renderPreviousOrders = () => (
    <div className="space-y-4">
      <HistoryOrderCard orders={historyOrders} />
    </div>
  );

  const renderCancelledOrders = () => (
    <div className="text-center py-12 border border-dashed border-gray-300 rounded-[12px] bg-gray-50">
      <p className="text-gray-500 font-medium text-sm">No cancelled orders found.</p>
    </div>
  );

  const orderTabs: TabItem[] = [
    { id: 'all', label: 'All Orders', content: renderAllOrders() },
    { id: 'current', label: 'Current Orders', content: renderCurrentOrders() },
    { id: 'previous', label: 'Previous Orders', content: renderPreviousOrders() },
    { id: 'cancelled', label: 'Cancelled Orders', content: renderCancelledOrders() }
  ];

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-8 bg-white font-arial">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header section */}
      <div className="text-left space-y-2">
        <h1 className="font-serif text-[26px] md:text-[36px] font-regular text-black">
          My Orders
        </h1>
      </div>

      {/* Order Tabs */}
      <div className="mt-6">
        <Tabs
          tabs={orderTabs}
          activeTabId={activeTab}
          onChange={setActiveTab}
          variant="pills"
        />
      </div>
    </div>
  );
};

export default OrdersPage;
