import React, { memo, useState } from 'react';
import { Mail } from 'lucide-react';

const PublicFooter: React.FC = memo(() => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed successfully with: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-white flex flex-col font-sans">

      {/* 1. Subscribe Banner Section */}
      <div className="w-full py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

          {/* Left Text */}
          <div className="flex flex-col text-left">
            <h3 className="font-serif text-[28px] md:text-[32px] font-normal text-black leading-tight">
              Stay In Style
            </h3>
            <p className="font-sans text-[13px] md:text-[14px] text-gray-500 max-w-md mt-2 leading-relaxed font-normal">
              Subscribe to receive exclusive offers, new arrivals, and fashion inspiration.
            </p>
          </div>

          {/* Right Input and Button Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex items-center w-full max-w-[460px] border border-gray-200 rounded-lg overflow-hidden focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all bg-gray-50/30"
          >
            <div className="pl-3.5 text-gray-400 select-none flex items-center justify-center">
              <Mail className="w-4 h-4 stroke-[1.5]" />
            </div>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-3 outline-none text-sm text-black placeholder-gray-400 bg-transparent font-normal"
            />
            <button
              type="submit"
              className="bg-black text-white hover:bg-black/90 px-6 py-3 text-sm font-semibold transition-all cursor-pointer font-sans"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>

      {/* 2. Footer Links Section */}
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-8 md:gap-x-12">

          {/* Column 1: Left space reserved for Logo in future */}
          <div className="hidden lg:block lg:col-span-1">
            {/* Empty space for future logo */}
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col">
            <h4 className="font-sans text-[14px] font-bold text-black uppercase tracking-wider mb-5">
              Shop
            </h4>
            <ul className="flex flex-col gap-3">
              {['Men', 'Women', 'Kids', 'New Arrivals', 'Collections', 'Sale'].map((link) => (
                <li key={link}>
                  <a
                    href={`/shop?filter=${link.toLowerCase()}`}
                    className="font-sans text-[13px] md:text-[14px] text-gray-600 hover:text-black transition-colors duration-150 font-normal"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="flex flex-col">
            <h4 className="font-sans text-[14px] font-bold text-black uppercase tracking-wider mb-5">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-3">
              {['Contact Us', 'Shipping Information', 'Returns & Exchange', 'Order Tracking', 'FAQ"S'].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="font-sans text-[13px] md:text-[14px] text-gray-600 hover:text-black transition-colors duration-150 font-normal"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: About */}
          <div className="flex flex-col">
            <h4 className="font-sans text-[14px] font-bold text-black uppercase tracking-wider mb-5">
              About
            </h4>
            <ul className="flex flex-col gap-3">
              {['Our Story', 'Sustainability', 'Careers', 'Blog'].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="font-sans text-[13px] md:text-[14px] text-gray-600 hover:text-black transition-colors duration-150 font-normal"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Follow Us */}
          <div className="flex flex-col">
            <h4 className="font-sans text-[14px] font-bold text-black uppercase tracking-wider mb-5">
              Follow Us
            </h4>
            <ul className="flex flex-col gap-3">
              {['Instagram', 'Facebook', 'Youtube', 'TikTok', 'Pinterest'].map((link) => (
                <li key={link}>
                  <a
                    href={`https://${link.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[13px] md:text-[14px] text-gray-600 hover:text-black transition-colors duration-150 font-normal"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </footer>
  );
});

export default PublicFooter;

