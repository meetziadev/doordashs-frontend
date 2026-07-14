import React from 'react';
import { classNames } from '@utils/helpers';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTabId, onChange, className }) => {
  return (
    <div className={classNames('w-full', className)}>
      <div className="border-b border-gray-200">
        <nav className="flex justify-around sm:justify-center sm:gap-16 -mb-px" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={classNames(
                  'w-1/2 sm:w-auto pb-4 px-1 text-center font-medium text-base sm:text-lg border-b-2 transition-all duration-200 focus:outline-none cursor-pointer',
                  isActive
                    ? 'border-black text-gray-950 font-bold'
                    : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="mt-8">
        {tabs.find((tab) => tab.id === activeTabId)?.content}
      </div>
    </div>
  );
};

export default Tabs;
