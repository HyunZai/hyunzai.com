'use client';

import React, { useState } from 'react';
import { deleteInquiry, toggleInquiryStatus } from '@/app/actions/admin';
import { InquiryDto } from '@/dtos/InquiryDto';
import { FaTrash } from 'react-icons/fa';

export default function InquiryList({ initialInquiries }: { initialInquiries: InquiryDto[] }) {
  const [inquiries, setInquiries] = useState<InquiryDto[]>(initialInquiries);


  const handleDelete = async (id: number) => {
    if (confirm('정말로 이 문의를 삭제하시겠습니까?')) {
        const res = await deleteInquiry(id);
        if (res.success) {
            setInquiries(prev => prev.filter(item => item.id !== id));
        } else {
            alert('문의 삭제에 실패했습니다.');
        }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    // Optimistic Update
    setInquiries(prev => prev.map(item => 
      item.id === id ? { ...item, isResponded: !currentStatus } : item
    ));

    const res = await toggleInquiryStatus(id, !currentStatus);
    
    if (!res.success) {
      // Revert if failed
      alert('상태 변경에 실패했습니다.');
      setInquiries(prev => prev.map(item => 
        item.id === id ? { ...item, isResponded: currentStatus } : item
      ));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#25252b] rounded-xl overflow-hidden border border-neutral-800">
        <thead className="bg-[#2a2a30] border-b border-neutral-800 text-gray-400">
          <tr>
            <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider">날짜</th>
            <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider">이름</th>
            <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider">이메일</th>
            <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider">내용</th>
            <th className="py-4 px-6 text-center text-xs font-semibold uppercase tracking-wider">답변여부</th>
            <th className="py-4 px-6 text-center text-xs font-semibold uppercase tracking-wider">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {inquiries.map((inquiry: InquiryDto) => (
            <tr key={inquiry.id} className="hover:bg-black/20 transition-colors group">
              <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap" suppressHydrationWarning>
                {new Date(inquiry.createdAt).toLocaleString()}
              </td>
              <td className="py-4 px-6 text-sm text-gray-200 whitespace-nowrap font-medium">{inquiry.name}</td>
              <td className="py-4 px-6 text-sm text-foreground whitespace-nowrap">
                <a href={`mailto:${inquiry.email}`} className="hover:underline opacity-80 hover:opacity-100 transition-opacity">{inquiry.email}</a>
              </td>
              <td className="py-4 px-6 text-sm text-gray-400 max-w-xs truncate" title={inquiry.message}>
                {inquiry.message}
              </td>
              <td className="py-4 px-6 text-center">
                <div 
                  onClick={() => handleToggleStatus(inquiry.id, inquiry.isResponded)}
                  className={`
                    w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out mx-auto flex items-center relative
                    ${inquiry.isResponded ? 'bg-foreground/20 border border-foreground' : 'bg-neutral-800 border border-neutral-700'}
                  `}
                >
                  <div 
                    className={`
                      w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ease-in-out absolute
                      ${inquiry.isResponded ? 'translate-x-[17px] bg-foreground' : 'translate-x-0.3 bg-gray-500'}
                    `}
                  />
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-center">
                <button 
                  onClick={() => handleDelete(inquiry.id)}
                  className="text-gray-500 hover:text-red-400 p-2 rounded-full hover:bg-neutral-800 transition-all duration-200"
                  aria-label="삭제"
                >
                  <FaTrash size={14} />
                </button>
              </td>
            </tr>
          ))}
          {inquiries.length === 0 && (
            <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500 font-light">
                  문의 내역이 없습니다.
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
