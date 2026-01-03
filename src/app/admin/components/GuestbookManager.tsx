'use client';

import React, { useState } from 'react';
import { deleteGuestbookEntry } from '@/app/actions/admin';
import { GuestbookDto } from '@/dtos/GuestbookDto';
import { FaTrash } from 'react-icons/fa';

export default function GuestbookManager({ initialEntries }: { initialEntries: GuestbookDto[] }) {
  const [entries, setEntries] = useState<GuestbookDto[]>(initialEntries);

  const handleDelete = async (id: string) => {
    if (confirm('정말로 이 방명록을 삭제하시겠습니까?')) {
        const res = await deleteGuestbookEntry(id);
        if (res.success) {
            setEntries(prev => prev.filter(item => item.id !== id));
        } else {
            alert('방명록 삭제에 실패했습니다.');
        }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#25252b] rounded-xl overflow-hidden border border-neutral-800">
        <thead className="bg-[#2a2a30] border-b border-neutral-800 text-gray-400">
          <tr>
            <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider">날짜</th>
            <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider">닉네임</th>
            <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider">내용</th>
            <th className="py-4 px-6 text-center text-xs font-semibold uppercase tracking-wider">OS</th>
            <th className="py-4 px-6 text-center text-xs font-semibold uppercase tracking-wider">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {entries.map((entry: GuestbookDto) => (
            <tr key={entry.id} className="hover:bg-black/20 transition-colors group">
              <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap" suppressHydrationWarning>
                {new Date(entry.createdAt).toLocaleString()}
              </td>
              <td className="py-4 px-6 text-sm text-foreground whitespace-nowrap font-medium">
                {entry.nickname}
              </td>
              <td className="py-4 px-6 text-sm text-gray-300 max-w-xs truncate" title={entry.content}>
                {entry.content}
              </td>
              <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap text-center">
                {entry.osName || '-'}
              </td>
              <td className="py-4 px-6 text-sm text-center">
                <button 
                    onClick={() => handleDelete(entry.id)}
                    className="text-gray-500 hover:text-red-400 p-2 rounded-full hover:bg-neutral-800 transition-all duration-200"
                    aria-label="삭제"
                >
                    <FaTrash size={14} />
                </button>
              </td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500 font-light">등록된 방명록이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
