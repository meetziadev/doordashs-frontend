import React from 'react';
import type { Address } from '@/types/profile';

interface CheckoutFormProps {
  addresses: Address[];
  selectedAddressId: string;
  onAddressChange: (addressId: string) => void;
  onAddAddress?: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  addresses,
  selectedAddressId,
  onAddressChange,
  onAddAddress
}) => {
  return (
    <div className="flex-1 w-full space-y-10 text-left font-arial">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">1. Shipping Address</h2>
        <p className="text-sm text-gray-500 mt-2">
          Select a saved address for delivery. You can manage addresses from your profile.
        </p>

        <div className="space-y-4 mt-5">
          {addresses.length ? (
            addresses.map((address) => {
              const isSelected = selectedAddressId === address.id;
              return (
                <button
                  key={address.id}
                  type="button"
                  onClick={() => onAddressChange(address.id)}
                  className={`w-full p-5 border rounded-[16px] flex items-start gap-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-black ring-1 ring-black bg-gray-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="mt-1 flex items-center justify-center h-5 w-5 rounded-full border-2 border-black flex-shrink-0">
                    {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-black" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-950 text-base">
                      {address.label}
                      {address.is_default ? (
                        <span className="ml-2 text-xs font-bold uppercase text-gray-500">Default</span>
                      ) : null}
                    </p>
                    <p className="text-sm text-gray-500 mt-1.5 font-medium">
                      {address.full_address}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {[address.street, address.area, address.city, address.province, address.country]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                    {address.postal_code ? (
                      <p className="text-sm text-gray-500 mt-1">Postal Code: {address.postal_code}</p>
                    ) : null}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="rounded-[16px] border border-dashed border-gray-300 p-6 text-sm text-gray-500">
              No saved addresses found. Add one from your profile before checkout.
            </div>
          )}

          {onAddAddress ? (
            <button
              type="button"
              onClick={onAddAddress}
              className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Manage addresses in profile
            </button>
          ) : null}
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">2. Delivery Method</h2>
        <div className="mt-5">
          <div className="w-full sm:w-[280px] p-5 border rounded-[16px] border-black ring-1 ring-black bg-gray-50 flex items-start gap-4 text-left">
            <div className="mt-1 flex items-center justify-center h-5 w-5 rounded-full border-2 border-black flex-shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-black" />
            </div>
            <div>
              <p className="font-semibold text-gray-950 text-base">Standard Delivery</p>
              <p className="text-sm text-gray-400 mt-1.5 font-medium">3-5 Days</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">3. Payment Method</h2>
        <div className="mt-5">
          <div className="w-full sm:w-[280px] p-5 border rounded-[16px] border-black ring-1 ring-black bg-gray-50 flex items-center gap-4 text-left">
            <div className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-black flex-shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-black" />
            </div>
            <p className="font-semibold text-gray-950 text-base">Cash on Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
