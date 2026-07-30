import React from 'react';
import { loginBg } from '@assets/images';

type Props = {
  headerLink: React.ReactNode;
  children: React.ReactNode;
};

const AuthShell: React.FC<Props> = ({ headerLink, children }) => (
  <div className="min-h-screen w-full flex bg-white font-sans text-left font-arial">
    <div className="hidden lg:flex lg:w-[38%] bg-[#F4F9FF] items-center justify-center p-12 select-none h-screen fixed left-0 top-0">
      <img
        src={loginBg}
        alt="Authentication Security Illustration"
        className="max-w-[85%] max-h-[85%] object-contain"
      />
    </div>

    <div className="w-full lg:w-[62%] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 min-h-screen bg-white overflow-y-auto ml-auto">
      <div className="flex justify-end text-sm sm:text-[15px] font-medium text-gray-500">
        {headerLink}
      </div>

      <div className="max-w-[420px] w-full mx-auto my-auto py-8">{children}</div>
      <div />
    </div>
  </div>
);

export default AuthShell;
