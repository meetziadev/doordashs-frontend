import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CheckoutForm from '@/components/cart/CheckoutForm';
import CheckoutSummary from '@/components/cart/CheckoutSummary';
import CheckoutSuccess from '@/components/cart/CheckoutSuccess';
import { useGetCartQuery, useCheckoutMutation } from '@services/cartService';
import { useGetAddressesQuery } from '@services/addressService';
import { useGetBrandsQuery } from '@services/brandService';
import { mapCartItemsToView } from '@utils/cartUtils';
import { CheckoutPageSkeleton } from '@/components/Skeletons';
import { getApiErrorMessage } from '@utils/authUtils';
import { useToastContext } from '@components/Toast';
import type { CheckoutResult } from '@/types/cart';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { error: showError, success: showSuccess } = useToastContext();

  const { data: cartData, isLoading: isCartLoading, isError: isCartError } = useGetCartQuery();
  const { data: addresses = [], isLoading: isAddressesLoading } = useGetAddressesQuery();
  const { data: brands = [] } = useGetBrandsQuery();
  const [checkout, { isLoading: isPlacingOrder }] = useCheckoutMutation();

  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [orderResult, setOrderResult] = useState<CheckoutResult | null>(null);

  useEffect(() => {
    if (!addresses.length) return;
    const defaultAddress = addresses.find((address) => address.is_default) || addresses[0];
    setSelectedAddressId(defaultAddress.id);
  }, [addresses]);

  const items = mapCartItemsToView(cartData?.items ?? [], brands);
  const subtotal = cartData?.cart.subtotal ?? 0;
  const deliveryFee = cartData?.cart.deliveryFee ?? 0;
  const total = cartData?.cart.totalAmount ?? 0;

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      showError('Please select a shipping address');
      return;
    }

    if (!items.length) {
      showError('Your cart is empty');
      return;
    }

    try {
      const result = await checkout({
        addressId: selectedAddressId,
        paymentMethod: 'cash_on_delivery'
      }).unwrap();

      setOrderResult(result);
      showSuccess('Order placed successfully');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to place order'));
    }
  };

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    { label: 'Cart', url: '/admin/cart' },
    { label: 'Checkout' }
  ];

  if (isCartLoading || isAddressesLoading) {
    return <CheckoutPageSkeleton />;
  }

  if (isCartError) {
    return (
      <div className="max-w-[1400px] mx-auto p-6 space-y-4">
        <p className="text-gray-500">Unable to load checkout. Please log in and try again.</p>
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
        Checkout
      </h1>

      {orderResult ? (
        <CheckoutSuccess orderNumber={orderResult.orderNumber || orderResult.orderId} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-3 w-full">
          <CheckoutForm
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onAddressChange={setSelectedAddressId}
            onAddAddress={() => navigate('/admin/profile')}
          />

          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            discount={0}
            deliveryFee={deliveryFee}
            total={total}
            onPlaceOrder={handlePlaceOrder}
            isSubmitting={isPlacingOrder}
            disabled={!items.length || !selectedAddressId}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
