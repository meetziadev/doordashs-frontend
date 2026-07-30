import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StylesConfig } from 'react-select';
import { Calendar } from '@assets/icons';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import ProfileHeaderCard from '@/components/UI/ProfileHeaderCard';
import ProfileFormGroup from '@/components/UI/ProfileFormGroup';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useUpdateProfileMutation
} from '@services/authService';
import {
  useCreateAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation
} from '@services/addressService';
import { userLogout } from '@redux/slices/authSlice';
import { clearAccessTokenCookie } from '@utils/cookieUtils';
import { getApiErrorMessage } from '@utils/authUtils';
import { useToastContext } from '@components/Toast';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
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
    padding: '0 16px'
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

const buildFullAddress = (address: {
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}) =>
  [address.street, address.city, address.province, address.country, address.postalCode]
    .filter(Boolean)
    .join(', ');

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const personalInfoRef = useRef<HTMLDivElement>(null);
  const { error: showError, success: showSuccess } = useToastContext();

  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
  const { data: addresses = [], isLoading: isAddressesLoading } = useGetAddressesQuery();

  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [createAddress, { isLoading: isCreatingAddress }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: isUpdatingAddress }] = useUpdateAddressMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [addressId, setAddressId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!profile) return;

    setPersonalInfo({
      fullName: profile.full_name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      dob: profile.date_of_birth || '',
      gender: profile.gender || ''
    });
  }, [profile]);

  useEffect(() => {
    if (!addresses.length) {
      setAddressId(null);
      return;
    }

    const defaultAddress = addresses.find((address) => address.is_default) || addresses[0];
    setAddressId(defaultAddress.id);
    setShippingAddress({
      country: defaultAddress.country || '',
      city: defaultAddress.city || '',
      province: defaultAddress.province || '',
      street: defaultAddress.street || '',
      postalCode: defaultAddress.postal_code || ''
    });
  }, [addresses]);

  const handlePersonalInfoChange = (field: keyof typeof personalInfo, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingAddressChange = (field: keyof typeof shippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordsChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        full_name: personalInfo.fullName.trim(),
        date_of_birth: personalInfo.dob || null,
        gender: (personalInfo.gender as 'male' | 'female' | 'other') || null
      }).unwrap();
      showSuccess('Profile updated successfully');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to update profile'));
    }
  };

  const handleSaveAddress = async () => {
    const payload = {
      label: 'Home',
      full_address: buildFullAddress(shippingAddress),
      street: shippingAddress.street.trim(),
      city: shippingAddress.city.trim(),
      province: shippingAddress.province.trim(),
      country: shippingAddress.country.trim(),
      postal_code: shippingAddress.postalCode.trim(),
      is_default: true
    };

    try {
      if (addressId) {
        await updateAddress({ id: addressId, body: payload }).unwrap();
      } else {
        await createAddress(payload).unwrap();
      }
      showSuccess('Shipping address saved successfully');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to save shipping address'));
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      showError('New passwords do not match');
      return;
    }

    try {
      await changePassword({
        current_password: passwords.currentPassword,
        new_password: passwords.newPassword
      }).unwrap();

      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showSuccess('Password updated successfully');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to update password'));
    }
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

  const scrollToPersonalInfo = () => {
    personalInfoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    { label: 'Profile' }
  ];

  const defaultInputClass =
    'w-full border border-gray-200 bg-white rounded-[8px] px-4 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]';
  const readOnlyInputClass =
    'w-full border border-gray-200 bg-gray-100 rounded-[8px] px-4 py-3 text-gray-600 cursor-not-allowed text-[15px]';
  const iconInputClass =
    'w-full border border-gray-200 bg-white rounded-[8px] pl-4 pr-12 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]';

  const isLoading = isProfileLoading || isAddressesLoading;
  const isSavingAddress = isCreatingAddress || isUpdatingAddress;

  if (isLoading) {
    return (
      <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-6 bg-white font-arial">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-8 bg-white font-arial">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-left space-y-2">
        <h1 className="font-serif text-[26px] md:text-[36px] font-regular text-black">Profile</h1>
        <p className="text-sm sm:text-base text-gray-900 font-medium">
          Manage your personal information, address and security setting.
        </p>
      </div>

      <div className="space-y-6 mt-6">
        <ProfileHeaderCard
          name={personalInfo.fullName || '—'}
          email={personalInfo.email || '—'}
          phone={personalInfo.phone || '—'}
          onEdit={scrollToPersonalInfo}
        />

        <div ref={personalInfoRef} id="personal-info">
          <ProfileFormGroup title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormInput
                label="Full Name"
                name="fullName"
                placeholder="Full Name"
                value={personalInfo.fullName}
                inputClassName={defaultInputClass}
                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
              />
              <FormInput
                label="Email Address"
                name="emailAddress"
                type="email"
                placeholder="Email Address"
                value={personalInfo.email}
                readOnly
                inputClassName={readOnlyInputClass}
              />
              <FormInput
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                value={personalInfo.phone}
                readOnly
                inputClassName={readOnlyInputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Date of Birth"
                name="dob"
                type="date"
                value={personalInfo.dob}
                inputClassName={iconInputClass}
                onChange={(e) => handlePersonalInfoChange('dob', e.target.value)}
                rightIcon={<Calendar size={18} />}
              />

              <FormSelect
                label="Gender"
                name="gender"
                placeholder="Gender"
                options={genderOptions}
                value={genderOptions.find((opt) => opt.value === personalInfo.gender) || null}
                onChange={(e: any) =>
                  handlePersonalInfoChange('gender', e?.target?.value?.value || '')
                }
                stylesOverride={customSelectStyles}
              />
            </div>

            <p className="text-xs text-gray-500">
              Email and phone are locked after verification and cannot be changed here.
            </p>

            <div className="flex justify-end w-full">
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={isUpdatingProfile}
                className="bg-black hover:bg-zinc-800 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-60"
              >
                {isUpdatingProfile ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </ProfileFormGroup>
        </div>

        <ProfileFormGroup title="Shipping Address">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormInput
              label="Country"
              name="country"
              placeholder="Country"
              value={shippingAddress.country}
              inputClassName={defaultInputClass}
              onChange={(e) => handleShippingAddressChange('country', e.target.value)}
            />
            <FormInput
              label="City"
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              inputClassName={defaultInputClass}
              onChange={(e) => handleShippingAddressChange('city', e.target.value)}
            />
            <FormInput
              label="Province"
              name="province"
              placeholder="Province"
              value={shippingAddress.province}
              inputClassName={defaultInputClass}
              onChange={(e) => handleShippingAddressChange('province', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Street"
              name="street"
              placeholder="Street"
              value={shippingAddress.street}
              inputClassName={defaultInputClass}
              onChange={(e) => handleShippingAddressChange('street', e.target.value)}
            />
            <FormInput
              label="Postal Code"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              inputClassName={defaultInputClass}
              onChange={(e) => handleShippingAddressChange('postalCode', e.target.value)}
            />
          </div>

          <div className="flex justify-end w-full">
            <button
              type="button"
              onClick={handleSaveAddress}
              disabled={isSavingAddress}
              className="bg-black hover:bg-zinc-800 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-60"
            >
              {isSavingAddress ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </ProfileFormGroup>

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
              onClick={handleChangePassword}
              disabled={isChangingPassword}
              className="bg-black hover:bg-zinc-800 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-60"
            >
              {isChangingPassword ? 'Updating...' : 'Update Password'}
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
