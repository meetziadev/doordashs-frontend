import React from 'react';
import FormInput from '../Form/FormInput';

interface CheckoutFormState {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  deliveryMethod: string;
  paymentMethod: string;
}

interface CheckoutFormProps {
  form: CheckoutFormState;
  onChange: (field: keyof CheckoutFormState, value: string) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ form, onChange }) => {
  return (
    <div className="flex-1 w-full space-y-10 text-left font-arial">
      {/* 1. Contact Information */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          1. Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <FormInput
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          <FormInput
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
      </div>

      {/* 2. Shipping Address */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          2. Shipping Address
        </h2>
        <div className="space-y-5 mt-5">
          <FormInput
            name="address"
            placeholder="Street Address"
            value={form.address}
            onChange={(e) => onChange('address', e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormInput
              name="city"
              placeholder="City"
              value={form.city}
              onChange={(e) => onChange('city', e.target.value)}
            />
            <FormInput
              name="province"
              placeholder="Province"
              value={form.province}
              onChange={(e) => onChange('province', e.target.value)}
            />
            <FormInput
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={(e) => onChange('postalCode', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 3. Delivery Method */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          3. Delivery Method
        </h2>
        <div className="mt-5">
          <button
            type="button"
            onClick={() => onChange('deliveryMethod', 'standard')}
            className={`w-full sm:w-[280px] p-5 border rounded-[16px] flex items-start gap-4 text-left transition-all cursor-pointer ${
              form.deliveryMethod === 'standard'
                ? 'border-black ring-1 ring-black bg-gray-50'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {/* Custom styled Radio Dot */}
            <div className="mt-1 flex items-center justify-center h-5 w-5 rounded-full border-2 border-black flex-shrink-0">
              {form.deliveryMethod === 'standard' && (
                <div className="h-2.5 w-2.5 rounded-full bg-black" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-950 text-base">Standard Delivery</p>
              <p className="text-sm text-gray-400 mt-1.5 font-medium">3-5 Days</p>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Payment Method */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          4. Payment Method
        </h2>
        <div className="mt-5">
          <button
            type="button"
            onClick={() => onChange('paymentMethod', 'card')}
            className={`w-full sm:w-[280px] p-5 border rounded-[16px] flex items-center gap-4 text-left transition-all cursor-pointer ${
              form.paymentMethod === 'card'
                ? 'border-black ring-1 ring-black bg-gray-50'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {/* Custom styled Radio Dot */}
            <div className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-black flex-shrink-0">
              {form.paymentMethod === 'card' && (
                <div className="h-2.5 w-2.5 rounded-full bg-black" />
              )}
            </div>
            <p className="font-semibold text-gray-950 text-base">Credit / Debit Card</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
