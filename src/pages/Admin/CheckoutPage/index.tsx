import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import CheckoutForm from '@/components/UI/CheckoutForm';
import CheckoutSummary from '@/components/UI/CheckoutSummary';
import CheckoutSuccess from '@/components/UI/CheckoutSuccess';

interface CartItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    deliveryMethod: 'standard',
    paymentMethod: 'card'
  });

  // Sync cart items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('doordash_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Pricing calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.2); // 20% discount
  const deliveryFee = subtotal > 0 ? 2500 : 0;
  const total = subtotal - discount + deliveryFee;

  const handlePlaceOrder = () => {
    // Clear cart state
    localStorage.removeItem('doordash_cart');
    setIsSuccess(true);
  };

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    { label: 'Cart', url: '/admin/cart' },
    { label: 'Checkout' }
  ];

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-12 bg-white font-arial">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="font-serif text-[26px] md:text-[36px] font-regular text-black text-left">
        Checkout
      </h1>

      {isSuccess ? (
        <CheckoutSuccess />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-3 w-full">
          {/* Left Column: Form Details */}
          <CheckoutForm form={form} onChange={handleFormChange} />

          {/* Right Column: Order Summary Card */}
          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
