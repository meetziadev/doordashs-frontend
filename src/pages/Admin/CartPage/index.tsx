import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from '@assets/icons';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import CartItem from '@/components/UI/CartItem';
import OrderSummary from '@/components/UI/OrderSummary';

interface CartItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('doordash_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: 'cart-1',
        name: 'Gradient Graphic T-shirt',
        size: 'Large',
        color: 'White',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300&h=400&fit=crop',
        quantity: 1
      },
      {
        id: 'cart-2',
        name: 'Checkered Shirt',
        size: 'Medium',
        color: 'Red',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=300&h=400&fit=crop',
        quantity: 1
      },
      {
        id: 'cart-3',
        name: 'Skinny Fit Jeans',
        size: 'Large',
        color: 'Blue',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=300&h=400&fit=crop',
        quantity: 1
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('doordash_cart', JSON.stringify(items));
  }, [items]);

  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Pricing calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.2); // 20% discount
  const deliveryFee = subtotal > 0 ? 2500 : 0;
  const total = subtotal - discount + deliveryFee;

  const formatPrice = (value: number) => {
    return `Rs ${value.toLocaleString('en-US')}`;
  };

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    { label: 'Cart' }
  ];

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-12 bg-white font-arial">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="font-serif text-[26px] md:text-[36px] font-regular text-black text-left">
        Your cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-3 w-full">
        {/* Left Column: Cart Items List */}
        <div className="flex-1 w-full space-y-6 bg-white">
          {items.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            items.map((item, index) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                size={item.size}
                color={item.color}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                onQuantityChange={updateQuantity}
                onRemove={removeItem}
                isLast={index === items.length - 1}
              />
            ))
          )}
        </div>

        {/* Right Column: Order Summary Card */}
        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          deliveryFee={deliveryFee}
          total={total}
          promoCode={promoCode}
          onPromoCodeChange={setPromoCode}
          onApplyPromoCode={() => console.log('Promo code applied')}
          onCheckout={() => navigate('/admin/checkout')}
          checkoutDisabled={items.length === 0}
        />
      </div>

      {/* Newsletter Signup Banner Section */}
      <div className="bg-black rounded-[20px] p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 mt-16 text-left">
        <h2 className="font-sans text-[20px] md:text-[40px] font-extrabold text-white max-w-xl tracking-wide leading-tight uppercase">
          Stay upto date about our latest offers
        </h2>

        <div className="flex flex-col gap-4 w-full sm:w-[350px] shrink-0">
          <div className="relative w-full">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white rounded-full py-3.5 pl-11 pr-4 text-sm text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <button
            type="button"
            className="w-full bg-white hover:bg-gray-100 text-gray-950 rounded-full py-3.5 text-center font-bold text-sm transition-all active:scale-98 cursor-pointer"
          >
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
