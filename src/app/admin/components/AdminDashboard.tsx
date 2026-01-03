'use client';

import React, { useState } from 'react';
import InquiryList from './InquiryList';
import GuestbookManager from './GuestbookManager';
import PortfolioManager from './PortfolioManager';
import { InquiryDto } from '@/dtos/InquiryDto';
import { GuestbookDto } from '@/dtos/GuestbookDto';

type Tab = 'INQUIRIES' | 'GUESTBOOK' | 'PORTFOLIO';

interface AdminDashboardProps {
  initialInquiries: InquiryDto[];
  initialGuestbookEntries: GuestbookDto[];
}

export default function AdminDashboard({ 
  initialInquiries, 
  initialGuestbookEntries 
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('INQUIRIES');

  return (
    <div>
      <div className="flex border-b border-gray-800 mb-8">
        <button
          onClick={() => setActiveTab('PORTFOLIO')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'PORTFOLIO' 
              ? 'text-foreground' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Contents
          {activeTab === 'PORTFOLIO' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('GUESTBOOK')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'GUESTBOOK' 
              ? 'text-foreground' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Guestbook
          {activeTab === 'GUESTBOOK' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('INQUIRIES')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'INQUIRIES' 
              ? 'text-foreground' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Inquiries(Contact)
          {activeTab === 'INQUIRIES' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div>
        {activeTab === 'PORTFOLIO' && (
          <section className="animate-fade-in space-y-6">
             <div className="flex justify-between items-end px-2">
              <h2 className="text-2xl font-light text-white tracking-tight">
                Contents <span className="text-gray-500 text-sm ml-2 font-normal align-middle">Management</span>
              </h2>
            </div>
            <PortfolioManager />
          </section>
        )}

        {activeTab === 'INQUIRIES' && (
          <section className="animate-fade-in space-y-6">
            <div className="flex justify-between items-end px-2">
              <h2 className="text-2xl font-light text-white tracking-tight">
                Inquiries <span className="text-foreground text-sm ml-2 font-bold bg-foreground/10 px-2 py-0.5 rounded-full align-middle">{initialInquiries.length}</span>
              </h2>
            </div>
            <InquiryList initialInquiries={initialInquiries} />
          </section>
        )}

        {activeTab === 'GUESTBOOK' && (
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
