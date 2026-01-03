'use client';

import React, { useState } from 'react';
import { FaPlus, FaTrash, FaSave, FaChevronDown, FaCheck, FaBriefcase, FaGraduationCap, FaProjectDiagram, FaEllipsisH } from 'react-icons/fa';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@headlessui/react';

interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  order: number;
}

interface Certification {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  order: number;
}

interface History {
  id: string;
  type: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  order: number;
}

const HISTORY_TYPES = [
  { value: 'work', label: '경력 (Work)', icon: FaBriefcase, color: 'text-blue-400' },
  { value: 'education', label: '학력 (Education)', icon: FaGraduationCap, color: 'text-green-400' },
  { value: 'project', label: '프로젝트 (Project)', icon: FaProjectDiagram, color: 'text-purple-400' },
  { value: 'other', label: '기타 (Other)', icon: FaEllipsisH, color: 'text-gray-400' },
];

export default function PortfolioManager() {
  // Intro State
  const [introData, setIntroData] = useState({
    nameKr: '',
    nameEn: '',
    subtitleKr: '',
    subtitleEn: '',
  });

  // About State
  const [aboutData, setAboutData] = useState({
    profileImage: null as File | null,
    introduction: '',
    githubNickname: '',
  });

  // Dynamic Lists State
  const [awards, setAwards] = useState<Award[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [histories, setHistories] = useState<History[]>([]);

  // Function to add history item with specific type
  const addHistory = (type: string) => {
    const newId = crypto.randomUUID();
    setHistories([...histories, { 
      id: newId, 
      type: type, 
      title: '', 
      startDate: '', 
      endDate: '', 
      description: '', 
      order: histories.filter(h => h.type === type).length + 1 
    }]);
  };

  return (
    <div className="space-y-8 pb-24">
      
      {/* 1. Intro Section Card */}
      <section className="bg-[#1c1c22] rounded-2xl border border-neutral-800 overflow-hidden shadow-xl p-6 md:p-8">
        <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-[#03C3FF] pl-4">Intro 섹션 설정</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="grid grid-cols-2 gap-6 md:col-span-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">한글 이름</label>
                    <input
                    type="text"
                    value={introData.nameKr}
                    onChange={(e) => setIntroData({ ...introData, nameKr: e.target.value })}
                    className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-all focus:ring-1 focus:ring-[#03C3FF]/20"
                    placeholder="예: 김현재"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">영문 이름</label>
                    <input
                    type="text"
                    value={introData.nameEn}
                    onChange={(e) => setIntroData({ ...introData, nameEn: e.target.value })}
                    className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-all focus:ring-1 focus:ring-[#03C3FF]/20"
                    placeholder="예: HyunZai Kim"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">서브 타이틀 (한국어)</label>
                <input
                type="text"
                value={introData.subtitleKr}
                onChange={(e) => setIntroData({ ...introData, subtitleKr: e.target.value })}
                className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-all focus:ring-1 focus:ring-[#03C3FF]/20"
                placeholder="예: 풀스택 개발자"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">서브 타이틀 (영어)</label>
                <input
                type="text"
                value={introData.subtitleEn}
                onChange={(e) => setIntroData({ ...introData, subtitleEn: e.target.value })}
                className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-all focus:ring-1 focus:ring-[#03C3FF]/20"
                placeholder="예: Full Stack Developer"
                />
            </div>
        </div>
      </section>

      {/* 2. About Section Card */}
      <section className="bg-[#1c1c22] rounded-2xl border border-neutral-800 overflow-hidden shadow-xl p-6 md:p-8">
        <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-[#03C3FF] pl-4">About 섹션 설정</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Introduction - Left (2/3) */}
            <div className="md:col-span-2 space-y-4">
                <div className="space-y-2 h-full flex flex-col">
                    <label className="text-sm font-medium text-gray-400">소개글</label>
                    <textarea
                        value={aboutData.introduction}
                        onChange={(e) => setAboutData({ ...aboutData, introduction: e.target.value })}
                        className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-all focus:ring-1 focus:ring-[#03C3FF]/20 resize-none flex-grow min-h-[220px]"
                        placeholder="자기소개를 입력하세요..."
                    />
                </div>
            </div>

            {/* Profile Image - Right (1/3) */}
            <div className="md:col-span-1 space-y-2 flex flex-col items-center justify-center p-4 bg-[#25252b]/50 rounded-xl border border-neutral-800/50">
                <label className="text-sm font-medium text-gray-400 w-full text-center mb-2">프로필 이미지</label>
                <div className="w-40 h-40 bg-[#1c1c22] rounded-full border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center text-gray-500 overflow-hidden relative group hover:border-[#03C3FF]/50 transition-colors">
                {aboutData.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={URL.createObjectURL(aboutData.profileImage)} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl opacity-20">📷</span>
                        <span className="text-xs opacity-50">No Image</span>
                    </div>
                )}
                
                {/* Overlay Upload Button */}
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                    <span className="text-white text-xs font-medium border border-white/30 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors bg-black/50 backdrop-blur-sm">
                        변경
                    </span>
                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setAboutData({ ...aboutData, profileImage: e.target.files[0] });
                            }
                        }}
                        className="hidden"
                        accept="image/*"
                    />
                </label>
                </div>
                <p className="text-[10px] text-center text-gray-500 mt-2">추천: 1:1 비율 (500x500px)</p>
            </div>

            {/* GitHub Nickname - Full Width below */}
            <div className="md:col-span-3 space-y-2">
                <label className="text-sm font-medium text-gray-400">깃허브 닉네임</label>
                <input
                type="text"
                value={aboutData.githubNickname}
                onChange={(e) => setAboutData({ ...aboutData, githubNickname: e.target.value })}
                className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-all focus:ring-1 focus:ring-[#03C3FF]/20"
                placeholder="예: hyunzai"
                />
            </div>
        </div>
      </section>

      {/* 3. Grouped History Section Card */}
      <section className="bg-[#1c1c22] rounded-2xl border border-neutral-800 overflow-hidden shadow-xl p-6 md:p-8">
        <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-[#03C3FF] pl-4">연혁 (History) 설정</h3>
        
        <div className="space-y-10">
            {HISTORY_TYPES.map((typeGroup) => {
                const groupHistories = histories.filter(h => h.type === typeGroup.value);
                
                return (
                    <div key={typeGroup.value} className="space-y-4">
                         <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-2">
                                <typeGroup.icon className={`text-lg ${typeGroup.color}`} />
                                <h4 className="text-lg font-semibold text-gray-200">{typeGroup.label}</h4>
                                <span className="bg-[#25252b] text-xs px-2 py-0.5 rounded-full text-gray-500 font-mono border border-neutral-800">
                                    {groupHistories.length}
                                </span>
                            </div>
                            <button
                                onClick={() => addHistory(typeGroup.value)}
                                className="flex items-center gap-1.5 text-xs bg-[#25252b] hover:bg-[#03C3FF] hover:text-black border border-neutral-800 hover:border-[#03C3FF] text-gray-400 px-3 py-1.5 rounded-full transition-all"
                            >
                                <FaPlus size={10} />
                                <span>추가</span>
                            </button>
                         </div>

                         <div className="grid grid-cols-1 gap-4">
                            {groupHistories.length > 0 ? (
                                groupHistories.map((history) => (
                                    <div key={history.id} className="bg-[#25252b] border border-neutral-800/50 rounded-xl p-6 relative group hover:border-[#03C3FF]/30 transition-all hover:shadow-lg hover:shadow-black/50">
                                        <button
                                            onClick={() => setHistories(histories.filter(h => h.id !== history.id))}
                                            className="absolute top-4 right-4 text-neutral-600 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-2 bg-[#1c1c22] border border-neutral-800 rounded-lg hover:border-red-400/30"
                                            title="삭제"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                                            {/* Type Selection (Hidden but available if needed to move) */}
                                            <div className="space-y-2 relative">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">이동</label>
                                                <Listbox
                                                    value={history.type}
                                                    onChange={(val: string) => {
                                                        const newHistories = [...histories];
                                                        const index = newHistories.findIndex(h => h.id === history.id);
                                                        if(index !== -1) {
                                                            newHistories[index].type = val;
                                                            setHistories(newHistories);
                                                        }
                                                    }}
                                                >
                                                    <div className="relative">
                                                        <ListboxButton className="relative w-full cursor-pointer bg-[#1c1c22] border border-neutral-800 rounded px-3 py-2 text-left text-sm text-gray-300 focus:outline-none focus:border-[#03C3FF] hover:bg-[#32323a] transition-colors">
                                                            <span className="block truncate text-xs">
                                                                {HISTORY_TYPES.find(t => t.value === history.type)?.label}
                                                            </span>
                                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <FaChevronDown className="h-2 w-2 text-gray-500" aria-hidden="true" />
                                                            </span>
                                                        </ListboxButton>
                                                        <Transition
                                                            as={React.Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#25252b] py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs border border-neutral-700">
                                                                {HISTORY_TYPES.map((option) => (
                                                                    <ListboxOption
                                                                        key={option.value}
                                                                        className={({ active }: { active: boolean }) =>
                                                                            `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                                                                active ? 'bg-[#03C3FF]/10 text-[#03C3FF]' : 'text-gray-300'
                                                                            }`
                                                                        }
                                                                        value={option.value}
                                                                    >
                                                                        {({ selected }: { selected: boolean }) => (
                                                                            <>
                                                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                                    {option.label}
                                                                                </span>
                                                                                {selected ? (
                                                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#03C3FF]">
                                                                                        <FaCheck className="h-2 w-2" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </ListboxOption>
                                                                ))}
                                                            </ListboxOptions>
                                                        </Transition>
                                                    </div>
                                                </Listbox>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">제목</label>
                                                <input
                                                    type="text"
                                                    value={history.title}
                                                    onChange={(e) => {
                                                        const newHistories = [...histories];
                                                        const index = newHistories.findIndex(h => h.id === history.id);
                                                        newHistories[index].title = e.target.value;
                                                        setHistories(newHistories);
                                                    }}
                                                    className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF] placeholder-gray-600"
                                                    placeholder="학교명, 회사명, 프로젝트명"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">기간 (시작 ~ 종료)</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={history.startDate}
                                                        onChange={(e) => {
                                                            const newHistories = [...histories];
                                                            const index = newHistories.findIndex(h => h.id === history.id);
                                                            newHistories[index].startDate = e.target.value;
                                                            setHistories(newHistories);
                                                        }}
                                                        className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF] placeholder-gray-600"
                                                        placeholder="시작일 (YYYY.MM)"
                                                    />
                                                    <span className="text-gray-500">~</span>
                                                    <input
                                                        type="text"
                                                        value={history.endDate}
                                                        onChange={(e) => {
                                                            const newHistories = [...histories];
                                                            const index = newHistories.findIndex(h => h.id === history.id);
                                                            newHistories[index].endDate = e.target.value;
                                                            setHistories(newHistories);
                                                        }}
                                                        className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF] placeholder-gray-600"
                                                        placeholder="종료일/Present"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">정렬 순서</label>
                                                <input
                                                    type="number"
                                                    value={history.order}
                                                    onChange={(e) => {
                                                        const newHistories = [...histories];
                                                        const index = newHistories.findIndex(h => h.id === history.id);
                                                        newHistories[index].order = parseInt(e.target.value) || 0;
                                                        setHistories(newHistories);
                                                    }}
                                                    className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">설명</label>
                                            <textarea
                                                value={history.description}
                                                onChange={(e) => {
                                                    const newHistories = [...histories];
                                                    const index = newHistories.findIndex(h => h.id === history.id);
                                                    newHistories[index].description = e.target.value;
                                                    setHistories(newHistories);
                                                }}
                                                className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF] resize-none h-16 placeholder-gray-600"
                                                placeholder="주요 내용을 간단히 입력하세요"
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 border border-dashed border-neutral-800 rounded-xl bg-[#25252b]/50 text-gray-600 text-sm">
                                    등록된 {typeGroup.label.split('(')[0]} 항목이 없습니다.
                                </div>
                            )}
                         </div>
                    </div>
                );
            })}
        </div>
      </section>

      {/* 4. Awards & Certifications - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Awards Card */}
        <section className="bg-[#1c1c22] rounded-2xl border border-neutral-800 overflow-hidden shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white border-l-4 border-[#03C3FF] pl-4">수상이력 (Awards)</h3>
                <button
                    onClick={() => {
                        const newId = crypto.randomUUID();
                        setAwards([...awards, { id: newId, title: '', organization: '', date: '', description: '', order: awards.length + 1 }]);
                    }}
                    className="flex items-center gap-1.5 text-xs bg-[#25252b] hover:bg-[#03C3FF] hover:text-black border border-neutral-700 hover:border-[#03C3FF] text-gray-300 px-3 py-1.5 rounded-full transition-all"
                >
                    <FaPlus size={10} />
                    <span>추가</span>
                </button>
            </div>
            <div className="space-y-4">
                {awards.length > 0 ? (
                    awards.map((award, index) => (
                        <div key={award.id} className="bg-[#25252b] border border-neutral-800/50 rounded-xl p-5 relative group hover:border-[#03C3FF]/30 transition-colors">
                            <button
                                onClick={() => setAwards(awards.filter(a => a.id !== award.id))}
                                className="absolute top-3 right-3 text-neutral-600 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-1.5 bg-[#1c1c22] border border-neutral-800 rounded-lg hover:border-red-400/30"
                                title="삭제"
                            >
                                <FaTrash size={10} />
                            </button>
                            
                            <div className="grid grid-cols-1 gap-3 mb-3 pr-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">수상명</label>
                                    <input
                                        type="text"
                                        value={award.title}
                                        onChange={(e) => {
                                            const newAwards = [...awards];
                                            newAwards[index].title = e.target.value;
                                            setAwards(newAwards);
                                        }}
                                        className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: 금상"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">기관</label>
                                        <input
                                            type="text"
                                            value={award.organization}
                                            onChange={(e) => {
                                                const newAwards = [...awards];
                                                newAwards[index].organization = e.target.value;
                                                setAwards(newAwards);
                                            }}
                                            className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#03C3FF]"
                                            placeholder="기관명"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">날짜</label>
                                        <input
                                            type="text"
                                            value={award.date}
                                            onChange={(e) => {
                                                const newAwards = [...awards];
                                                newAwards[index].date = e.target.value;
                                                setAwards(newAwards);
                                            }}
                                            className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#03C3FF]"
                                            placeholder="YYYY.MM.DD"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase">설명</label>
                                <textarea
                                    value={award.description}
                                    onChange={(e) => {
                                        const newAwards = [...awards];
                                        newAwards[index].description = e.target.value;
                                        setAwards(newAwards);
                                    }}
                                    className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#03C3FF] resize-none h-14 text-xs"
                                    placeholder="설명"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 border border-dashed border-neutral-800 rounded-xl text-gray-600 text-xs">
                        등록된 수상이력이 없습니다.
                    </div>
                )}
            </div>
        </section>

        {/* Certifications Card */}
        <section className="bg-[#1c1c22] rounded-2xl border border-neutral-800 overflow-hidden shadow-xl p-6">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white border-l-4 border-[#03C3FF] pl-4">자격증 (Certifications)</h3>
                <button
                    onClick={() => {
                        const newId = crypto.randomUUID();
                        setCertifications([...certifications, { id: newId, title: '', organization: '', date: '', description: '', order: certifications.length + 1 }]);
                    }}
                    className="flex items-center gap-1.5 text-xs bg-[#25252b] hover:bg-[#03C3FF] hover:text-black border border-neutral-700 hover:border-[#03C3FF] text-gray-300 px-3 py-1.5 rounded-full transition-all"
                >
                    <FaPlus size={10} />
                    <span>추가</span>
                </button>
            </div>
            <div className="space-y-4">
                {certifications.length > 0 ? (
                    certifications.map((cert, index) => (
                        <div key={cert.id} className="bg-[#25252b] border border-neutral-800/50 rounded-xl p-5 relative group hover:border-[#03C3FF]/30 transition-colors">
                            <button
                                onClick={() => setCertifications(certifications.filter(c => c.id !== cert.id))}
                                className="absolute top-3 right-3 text-neutral-600 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-1.5 bg-[#1c1c22] border border-neutral-800 rounded-lg hover:border-red-400/30"
                                title="삭제"
                            >
                                <FaTrash size={10} />
                            </button>
                            
                            <div className="grid grid-cols-1 gap-3 mb-3 pr-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">자격증명</label>
                                    <input
                                        type="text"
                                        value={cert.title}
                                        onChange={(e) => {
                                            const newCerts = [...certifications];
                                            newCerts[index].title = e.target.value;
                                            setCertifications(newCerts);
                                        }}
                                        className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: 정보처리기사"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">발급기관</label>
                                        <input
                                            type="text"
                                            value={cert.organization}
                                            onChange={(e) => {
                                                const newCerts = [...certifications];
                                                newCerts[index].organization = e.target.value;
                                                setCertifications(newCerts);
                                            }}
                                            className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#03C3FF]"
                                            placeholder="기관명"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">취득일</label>
                                        <input
                                            type="text"
                                            value={cert.date}
                                            onChange={(e) => {
                                                const newCerts = [...certifications];
                                                newCerts[index].date = e.target.value;
                                                setCertifications(newCerts);
                                            }}
                                            className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#03C3FF]"
                                            placeholder="YYYY.MM.DD"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase">설명</label>
                                <textarea
                                    value={cert.description}
                                    onChange={(e) => {
                                        const newCerts = [...certifications];
                                        newCerts[index].description = e.target.value;
                                        setCertifications(newCerts);
                                    }}
                                    className="w-full bg-[#1c1c22] border border-neutral-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#03C3FF] resize-none h-14 text-xs"
                                    placeholder="설명"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 border border-dashed border-neutral-800 rounded-xl text-gray-600 text-xs">
                        등록된 자격증이 없습니다.
                    </div>
                )}
            </div>
        </section>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center gap-2 bg-[#03C3FF] hover:bg-[#03C3FF]/90 text-black font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(3,195,255,0.3)] border-2 border-white/10 backdrop-blur-sm">
          <FaSave size={18} />
          <span>변경사항 저장</span>
        </button>
      </div>
    </div>
  );
}
