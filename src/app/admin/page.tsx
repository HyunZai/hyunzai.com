import React from 'react';
import { getInquiries, getGuestbookEntries } from '@/app/actions/admin';
import AdminDashboard from './components/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [inquiries, guestbookEntries] = await Promise.all([
    getInquiries(),
    getGuestbookEntries(),
  ]);

  return (
    <div className="min-h-screen bg-[#1C1C22] text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-light mb-8 pb-4">
          Admin <span className="text-[#03C3FF] font-bold">Dashboard</span>
        </h1>
        
        <AdminDashboard 
          initialInquiries={inquiries} 
          initialGuestbookEntries={guestbookEntries} 
        />
      </div>
    </div>
  );
}
