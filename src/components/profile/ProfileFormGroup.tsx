import React from 'react';

export interface ProfileFormGroupProps {
  title: string;
  children: React.ReactNode;
}

export const ProfileFormGroup: React.FC<ProfileFormGroupProps> = ({ title, children }) => {
  return (
    <div className="space-y-4 text-left w-full font-arial">
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      <div className="border border-gray-200 bg-[#F9FAFB] rounded-[12px] p-6 space-y-6">
        {children}
      </div>
    </div>
  );
};

export default ProfileFormGroup;
