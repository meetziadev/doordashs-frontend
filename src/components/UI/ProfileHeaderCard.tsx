import React from 'react';

export interface ProfileHeaderCardProps {
  name: string;
  email: string;
  phone: string;
  onEdit?: () => void;
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  name,
  email,
  phone,
  onEdit
}) => {
  return (
    <div className="border border-gray-200 bg-[#F9FAFB] rounded-[12px] p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-6 text-left w-full font-arial">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Grey Avatar Circle */}
        <div className="w-20 h-20 rounded-full bg-[#E5E7EB] flex items-center justify-center text-gray-400 overflow-hidden shrink-0">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="font-sans text-xl font-bold text-gray-950">{name}</h2>
          <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">{email}</p>
          <p className="text-sm sm:text-base text-gray-500 font-medium mt-0.5">{phone}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="bg-black hover:bg-zinc-800 text-white px-5 py-2.5 rounded-[6px] text-xs font-bold font-sans cursor-pointer transition-colors shrink-0"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeaderCard;
