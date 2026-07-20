import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StylesConfig } from 'react-select';
import { Calendar } from '@assets/icons';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import ProfileHeaderCard from '@/components/UI/ProfileHeaderCard';
import ProfileFormGroup from '@/components/UI/ProfileFormGroup';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import { useLogoutMutation } from '@services/authService';
import { userLogout } from '@redux/slices/authSlice';
import { clearAccessTokenCookie } from '@utils/cookieUtils';
import { getApiErrorMessage } from '@utils/authUtils';
import { useToastContext } from '@components/Toast';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

const countryOptions = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' }
];

const cityOptions = [
  { value: 'delhi', label: 'Delhi' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'newyork', label: 'New York' }
];

const customSelectStyles: StylesConfig<any, boolean> = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? 'black' : '#e5e7eb',
    boxShadow: 'none',
    borderRadius: '8px',
    minHeight: '46px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    '&:hover': {
      borderColor: state.isFocused ? 'black' : '#cbd5e1'
    }
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 16px',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9ca3af',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif'
  }),
  singleValue: (base) => ({
    ...base,
    color: '#030712',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif'
  }),
  input: (base) => ({
    ...base,
    fontFamily: 'Arial, sans-serif'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#9ca3af',
    paddingRight: '12px',
    '&:hover': {
      color: '#111827'
    }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    zIndex: 50,
    fontFamily: 'Arial, sans-serif'
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? 'black' : state.isFocused ? '#f3f4f6' : 'white',
    color: state.isSelected ? 'white' : '#1f2937',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    '&:active': {
      backgroundColor: state.isSelected ? 'black' : '#e5e7eb'
    }
  })
};

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: showError, success: showSuccess } = useToastContext();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: ''
  });

  const [shippingAddress, setShippingAddress] = useState({
    country: '',
    city: '',
    province: '',
    street: '',
    postalCode: ''
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePersonalInfoChange = (field: keyof typeof personalInfo, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingAddressChange = (field: keyof typeof shippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordsChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      showError(getApiErrorMessage(error, 'Logout failed'));
      return;
    }

    clearAccessTokenCookie();
    dispatch(userLogout());
    showSuccess('Logged out successfully');
    navigate('/login');
  };

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    { label: 'Profile' }
  ];

  const defaultInputClass = "w-full border border-gray-200 bg-white rounded-[8px] px-4 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]";
  const iconInputClass = "w-full border border-gray-200 bg-white rounded-[8px] pl-4 pr-12 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]";

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-8 bg-white font-arial">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header text */}
      <div className="text-left space-y-2">
        <h1 className="font-serif text-[26px] md:text-[36px] font-regular text-black">
          Profile
        </h1>
        <p className="text-sm sm:text-base text-gray-900 font-medium">
          Manage your personal information, address and security setting.
        </p>
      </div>

      <div className="space-y-6 mt-6">
        {/* Profile Card Header */}
        <ProfileHeaderCard
          name="Ahmad"
          email="ahmad@gmail.com"
          phone="000-000-000"
          onEdit={() => console.log('Edit profile clicked')}
        />

        {/* 1. Personal Information */}
        <ProfileFormGroup title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormInput
              name="fullName"
              placeholder="Full Name"
              value={personalInfo.fullName}
              inputClassName={defaultInputClass}
              onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
            />
            <FormInput
              name="emailAddress"
              type="email"
              placeholder="Email Address"
              value={personalInfo.email}
              inputClassName={defaultInputClass}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            />
            <FormInput
              name="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              value={personalInfo.phone}
              inputClassName={defaultInputClass}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              name="dob"
              placeholder="Date of Birth"
              value={personalInfo.dob}
              inputClassName={iconInputClass}
              onChange={(e) => handlePersonalInfoChange('dob', e.target.value)}
              rightIcon={<Calendar size={18} />}
            />

            <FormSelect
              name="gender"
              placeholder="Gender"
              options={genderOptions}
              value={genderOptions.find(opt => opt.value === personalInfo.gender) || null}
              onChange={(e: any) => handlePersonalInfoChange('gender', e?.target?.value?.value || '')}
              stylesOverride={customSelectStyles}
            />
          </div>
        </ProfileFormGroup>

        {/* 2. Shipping Address */}
        <ProfileFormGroup title="Shipping Address">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormSelect
              name="country"
              placeholder="Country"
              options={countryOptions}
              value={countryOptions.find(opt => opt.value === shippingAddress.country) || null}
              onChange={(e: any) => handleShippingAddressChange('country', e?.target?.value?.value || '')}
              stylesOverride={customSelectStyles}
            />

            <FormSelect
              name="city"
              placeholder="City"
              options={cityOptions}
              value={cityOptions.find(opt => opt.value === shippingAddress.city) || null}
              onChange={(e: any) => handleShippingAddressChange('city', e?.target?.value?.value || '')}
              stylesOverride={customSelectStyles}
            />

            <FormInput
              name="province"
              placeholder="Province"
              value={shippingAddress.province}
              inputClassName={defaultInputClass}
              onChange={(e) => handleShippingAddressChange('province', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              name="street"
              placeholder="Street"
              value={shippingAddress.street}
              inputClassName={defaultInputClass}
              onChange={(e) => handleShippingAddressChange('street', e.target.value)}
            />
            <FormInput
              name="postalCode"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              inputClassName={defaultInputClass}
              onChange={(e) => handleShippingAddressChange('postalCode', e.target.value)}
            />
          </div>
        </ProfileFormGroup>

        {/* 3. Chnage Password */}
        <ProfileFormGroup title="Change Password">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormInput
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              value={passwords.currentPassword}
              inputClassName={defaultInputClass}
              onChange={(e) => handlePasswordsChange('currentPassword', e.target.value)}
            />
            <FormInput
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={passwords.newPassword}
              inputClassName={defaultInputClass}
              onChange={(e) => handlePasswordsChange('newPassword', e.target.value)}
            />
            <FormInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirmPassword}
              inputClassName={defaultInputClass}
              onChange={(e) => handlePasswordsChange('confirmPassword', e.target.value)}
            />
          </div>

          <div className="flex justify-end w-full mt-4">
            <button
              type="button"
              className="bg-black hover:bg-zinc-800 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              Update Password
            </button>
          </div>
        </ProfileFormGroup>
      </div>

      <div className="flex justify-center pt-4 pb-8">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full max-w-[320px] bg-black hover:bg-zinc-800 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all active:scale-95 cursor-pointer disabled:opacity-60"
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
