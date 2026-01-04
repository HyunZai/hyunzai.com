'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import InquiryList from './InquiryList';
import GuestbookManager from './GuestbookManager';
import PortfolioManager from './PortfolioManager';
import { InquiryDto } from '@/dtos/InquiryDto';
import { GuestbookDto } from '@/dtos/GuestbookDto';

type Tab = 'inquiry' | 'guestbook' | 'portfolio';

interface AdminDashboardProps {
  initialInquiries: InquiryDto[];
  initialGuestbookEntries: GuestbookDto[];
}

export default function AdminDashboard({ 
  initialInquiries, 
  initialGuestbookEntries 
}: AdminDashboardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTab = searchParams.get('tab');
  const activeTab: Tab = (currentTab && ['inquiry', 'guestbook', 'portfolio'].includes(currentTab)) 
    ? (currentTab as Tab) 
    : 'portfolio';

  const handleTabChange = (tab: Tab) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div className="flex border-b border-gray-800 mb-8">
        <button
          onClick={() => handleTabChange('portfolio')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'portfolio' 
              ? 'text-foreground' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Contents
          {activeTab === 'portfolio' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground" />
          )}
        </button>
        <button
          onClick={() => handleTabChange('guestbook')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'guestbook' 
              ? 'text-foreground' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Guestbook
          {activeTab === 'guestbook' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground" />
          )}
        </button>
        <button
          onClick={() => handleTabChange('inquiry')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'inquiry' 
              ? 'text-foreground' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Inquiries(Contact)
          {activeTab === 'inquiry' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div>
        {activeTab === 'portfolio' && (
          <section className="animate-fade-in space-y-6">
             <div className="flex justify-between items-end px-2">
              <h2 className="text-2xl font-light text-white tracking-tight">
                Contents <span className="text-gray-500 text-sm ml-2 font-normal align-middle">Management</span>
              </h2>
            </div>
            <PortfolioManager />
          </section>
        )}

        {activeTab === 'inquiry' && (
          <section className="animate-fade-in space-y-6">
            <div className="flex justify-between items-end px-2">
              <h2 className="text-2xl font-light text-white tracking-tight">
                Inquiries <span className="text-foreground text-sm ml-2 font-bold bg-foreground/10 px-2 py-0.5 rounded-full align-middle">{initialInquiries.length}</span>
              </h2>
            </div>
            <InquiryList initialInquiries={initialInquiries} />
          </section>
        )}

        {activeTab === 'guestbook' && (
          <section className="animate-fade-in space-y-6">
             <div className="flex justify-between items-end px-2">
              <h2 className="text-2xl font-light text-white tracking-tight">
                Guestbook <span className="text-foreground text-sm ml-2 font-bold bg-foreground/10 px-2 py-0.5 rounded-full align-middle">{initialGuestbookEntries.length}</span>
              </h2>
            </div>
            <GuestbookManager initialEntries={initialGuestbookEntries} />
          </section>
        )}
      </div>
    </div>
  );
}
