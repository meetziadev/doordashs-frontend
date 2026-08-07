import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from '@assets/icons';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CartItem from '@/components/cart/CartItem';
import OrderSummary from '@/components/cart/OrderSummary';
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation
} from '@services/cartService';
import { useGetBrandsQuery } from '@services/brandService';
import { mapCartItemsToView } from '@utils/cartUtils';
import { CartPageSkeleton } from '@/components/Skeletons';
import { getApiErrorMessage } from '@utils/authUtils';
import { useToastContext } from '@components/Toast';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { error: showError } = useToastContext();
  const [promoCode, setPromoCode] = useState('');

  const { data, isLoading, isError } = useGetCartQuery();
  const { data: brands = [] } = useGetBrandsQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const items = mapCartItemsToView(data?.items ?? [], brands);
  const subtotal = data?.cart.subtotal ?? 0;
  const deliveryFee = data?.cart.deliveryFee ?? 0;
  const total = data?.cart.totalAmount ?? 0;

  const updateQuantity = async (id: string, delta: number) => {
    const item = items.find((cartItem) => cartItem.id === id);
    if (!item) return;

    const nextQuantity = item.quantity + delta;
    if (nextQuantity <= 0) {
      await handleRemove(id);
      return;
    }

    try {
      await updateCartItem({ id, body: { quantity: nextQuantity } }).unwrap();
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to update quantity'));
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeCartItem(id).unwrap();
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to remove item'));
    }
  };

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    { label: 'Cart' }
  ];

  if (isLoading) {
    return <CartPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="max-w-[1400px] mx-auto p-6 space-y-4">
        <p className="text-gray-500">Unable to load cart. Please log in and try again.</p>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-12 bg-white font-arial">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="font-serif text-[26px] md:text-[36px] font-regular text-black text-left">
        Your cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-3 w-full">
        <div className="flex-1 w-full space-y-6 bg-white">
          {items.length === 0 ? (
            <div className="py-12 text-center text-gray-500 space-y-4">
              <p>Your cart is empty.</p>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                brand={item.brand}
                size={item.size}
                color={item.color}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                onQuantityChange={updateQuantity}
                onRemove={handleRemove}
                isLast={index === items.length - 1}
              />
            ))
          )}
        </div>

        <OrderSummary
          subtotal={subtotal}
          discount={0}
          deliveryFee={deliveryFee}
          total={total}
          promoCode={promoCode}
          onPromoCodeChange={setPromoCode}
          onApplyPromoCode={() => showError('Promo codes are not available yet')}
          onCheckout={() => navigate('/admin/checkout')}
          checkoutDisabled={items.length === 0}
        />
      </div>

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
