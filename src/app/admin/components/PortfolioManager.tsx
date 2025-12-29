'use client';

import React, { useState } from 'react';
import { FaPlus, FaTrash, FaSave, FaChevronDown, FaCheck } from 'react-icons/fa';
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

  return (
    <div className="bg-[#25252b] rounded-xl border border-neutral-800 p-6">
      
      {/* Content */}
      <div className="space-y-12">
        {/* Intro Section */}
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4 border-l-4 border-[#03C3FF] pl-4">Intro 섹션 설정</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid grid-cols-2 gap-6 md:col-span-2">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">한글 이름</label>
                    <input
                    type="text"
                    value={introData.nameKr}
                    onChange={(e) => setIntroData({ ...introData, nameKr: e.target.value })}
                    className="w-full bg-[#1c1c22] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-colors"
                    placeholder="예: 김현재"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">영문 이름</label>
                    <input
                    type="text"
                    value={introData.nameEn}
                    onChange={(e) => setIntroData({ ...introData, nameEn: e.target.value })}
                    className="w-full bg-[#1c1c22] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-colors"
                    placeholder="예: HyunZai Kim"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">서브 타이틀 (한국어)</label>
                <input
                  type="text"
                  value={introData.subtitleKr}
                  onChange={(e) => setIntroData({ ...introData, subtitleKr: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-colors"
                  placeholder="예: 풀스택 개발자"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">서브 타이틀 (영어)</label>
                <input
                  type="text"
                  value={introData.subtitleEn}
                  onChange={(e) => setIntroData({ ...introData, subtitleEn: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-colors"
                  placeholder="예: Full Stack Developer"
                />
              </div>
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800" />

        {/* About Section */}
        <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white mb-4 border-l-4 border-[#03C3FF] pl-4">About 섹션 설정</h3>

             {/* Basic Info */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Introduction - Left (2/3) */}
                <div className="md:col-span-2 space-y-4">
                    <div className="space-y-2 h-full flex flex-col">
                        <label className="text-sm text-gray-400">소개글</label>
                        <textarea
                            value={aboutData.introduction}
                            onChange={(e) => setAboutData({ ...aboutData, introduction: e.target.value })}
                            className="w-full bg-[#1c1c22] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-colors resize-none flex-grow min-h-[200px]"
                            placeholder="자기소개를 입력하세요..."
                        />
                    </div>
                </div>

                {/* Profile Image - Right (1/3) */}
                <div className="md:col-span-1 space-y-2 flex flex-col items-center">
                  <label className="text-sm text-gray-400 w-full text-left">프로필 이미지</label>
                  <div className="w-48 h-48 bg-[#1c1c22] rounded-full border border-neutral-800 flex flex-col items-center justify-center text-gray-500 overflow-hidden relative group">
                    {aboutData.profileImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={URL.createObjectURL(aboutData.profileImage)} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl opacity-20">📷</span>
                            <span className="text-xs opacity-50">No Image</span>
                        </div>
                    )}
                    
                    {/* Overlay Upload Button */}
                    <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                        <span className="text-white text-sm font-medium border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
                            이미지 변경
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
                  <p className="text-xs text-center text-gray-500 mt-2">추천: 1:1 비율 (500x500px)</p>
                </div>

                {/* GitHub Nickname - Full Width below */}
                <div className="md:col-span-3 space-y-2">
                  <label className="text-sm text-gray-400">깃허브 닉네임</label>
                  <input
                    type="text"
                    value={aboutData.githubNickname}
                    onChange={(e) => setAboutData({ ...aboutData, githubNickname: e.target.value })}
                    className="w-full bg-[#1c1c22] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#03C3FF] transition-colors"
                    placeholder="예: hyunzai"
                  />
                </div>
             </div>
             
             {/* Divider */}
             <div className="border-t border-neutral-800 my-8" />

             {/* Awards Section */}
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-200">수상이력 (Awards)</h4>
                  <button
                    onClick={() => {
                        const newId = Date.now().toString();
                        setAwards([...awards, { id: newId, title: '', organization: '', date: '', description: '', order: awards.length + 1 }]);
                    }}
                    className="flex items-center gap-2 text-sm text-[#03C3FF] hover:text-[#03C3FF]/80 transition-colors"
                  >
                    <FaPlus size={12} />
                    <span>추가하기</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                    {awards.map((award, index) => (
                        <div key={award.id} className="bg-[#1c1c22] border border-neutral-800 rounded-lg p-6 relative group hover:border-gray-700 transition-colors">
                            <button
                                onClick={() => setAwards(awards.filter(a => a.id !== award.id))}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2"
                                title="삭제"
                            >
                                <FaTrash size={14} />
                            </button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">수상명</label>
                                    <input
                                        type="text"
                                        value={award.title}
                                        onChange={(e) => {
                                            const newAwards = [...awards];
                                            newAwards[index].title = e.target.value;
                                            setAwards(newAwards);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: 금상"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">주관/기관</label>
                                    <input
                                        type="text"
                                        value={award.organization}
                                        onChange={(e) => {
                                            const newAwards = [...awards];
                                            newAwards[index].organization = e.target.value;
                                            setAwards(newAwards);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: K-Digital Training"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">날짜</label>
                                    <input
                                        type="text"
                                        value={award.date}
                                        onChange={(e) => {
                                            const newAwards = [...awards];
                                            newAwards[index].date = e.target.value;
                                            setAwards(newAwards);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: 2023.12.20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">정렬 순서</label>
                                    <input
                                        type="number"
                                        value={award.order}
                                        onChange={(e) => {
                                            const newAwards = [...awards];
                                            newAwards[index].order = parseInt(e.target.value) || 0;
                                            setAwards(newAwards);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500">설명</label>
                                <textarea
                                    value={award.description}
                                    onChange={(e) => {
                                        const newAwards = [...awards];
                                        newAwards[index].description = e.target.value;
                                        setAwards(newAwards);
                                    }}
                                    className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF] resize-none h-20"
                                    placeholder="간단한 설명을 입력하세요"
                                />
                            </div>
                        </div>
                    ))}
                    {awards.length === 0 && (
                        <div className="text-center py-8 border border-dashed border-neutral-800 rounded-lg text-gray-500 text-sm">
                            등록된 수상이력이 없습니다.
                        </div>
                    )}
                </div>
             </div>

             {/* Divider */}
             <div className="border-t border-neutral-800 my-8" />

             {/* Certifications Section */}
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-200">자격증 (Certifications)</h4>
                  <button
                    onClick={() => {
                        const newId = Date.now().toString();
                        setCertifications([...certifications, { id: newId, title: '', organization: '', date: '', description: '', order: certifications.length + 1 }]);
                    }}
                    className="flex items-center gap-2 text-sm text-[#03C3FF] hover:text-[#03C3FF]/80 transition-colors"
                  >
                    <FaPlus size={12} />
                    <span>추가하기</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                    {certifications.map((cert, index) => (
                        <div key={cert.id} className="bg-[#1c1c22] border border-neutral-800 rounded-lg p-6 relative group hover:border-gray-700 transition-colors">
                            <button
                                onClick={() => setCertifications(certifications.filter(c => c.id !== cert.id))}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2"
                                title="삭제"
                            >
                                <FaTrash size={14} />
                            </button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">자격증명</label>
                                    <input
                                        type="text"
                                        value={cert.title}
                                        onChange={(e) => {
                                            const newCerts = [...certifications];
                                            newCerts[index].title = e.target.value;
                                            setCertifications(newCerts);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: 정보처리기사"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">발급기관</label>
                                    <input
                                        type="text"
                                        value={cert.organization}
                                        onChange={(e) => {
                                            const newCerts = [...certifications];
                                            newCerts[index].organization = e.target.value;
                                            setCertifications(newCerts);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: 한국산업인력공단"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">취득일</label>
                                    <input
                                        type="text"
                                        value={cert.date}
                                        onChange={(e) => {
                                            const newCerts = [...certifications];
                                            newCerts[index].date = e.target.value;
                                            setCertifications(newCerts);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: 2023.06.01"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">정렬 순서</label>
                                    <input
                                        type="number"
                                        value={cert.order}
                                        onChange={(e) => {
                                            const newCerts = [...certifications];
                                            newCerts[index].order = parseInt(e.target.value) || 0;
                                            setCertifications(newCerts);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500">설명</label>
                                <textarea
                                    value={cert.description}
                                    onChange={(e) => {
                                        const newCerts = [...certifications];
                                        newCerts[index].description = e.target.value;
                                        setCertifications(newCerts);
                                    }}
                                    className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF] resize-none h-20"
                                    placeholder="간단한 설명을 입력하세요"
                                />
                            </div>
                        </div>
                    ))}
                    {certifications.length === 0 && (
                        <div className="text-center py-8 border border-dashed border-neutral-800 rounded-lg text-gray-500 text-sm">
                            등록된 자격증이 없습니다.
                        </div>
                    )}
                </div>
             </div>

             {/* Divider */}
             <div className="border-t border-neutral-800 my-8" />

             {/* History Section */}
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-200">연혁 (History)</h4>
                  <button
                    onClick={() => {
                        const newId = Date.now().toString();
                        setHistories([...histories, { id: newId, type: 'work', title: '', startDate: '', endDate: '', description: '', order: histories.length + 1 }]);
                    }}
                    className="flex items-center gap-2 text-sm text-[#03C3FF] hover:text-[#03C3FF]/80 transition-colors"
                  >
                    <FaPlus size={12} />
                    <span>추가하기</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                    {histories.map((history, index) => (
                        <div key={history.id} className="bg-[#1c1c22] border border-neutral-800 rounded-lg p-6 relative group hover:border-gray-700 transition-colors">
                            <button
                                onClick={() => setHistories(histories.filter(h => h.id !== history.id))}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2"
                                title="삭제"
                            >
                                <FaTrash size={14} />
                            </button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2 relative">
                                    <label className="text-xs text-gray-500">타입</label>
                                    <Listbox
                                        value={history.type}
                                        onChange={(val: string) => {
                                            const newHistories = [...histories];
                                            newHistories[index].type = val;
                                            setHistories(newHistories);
                                        }}
                                    >
                                        <div className="relative mt-1">
                                            <ListboxButton className="relative w-full cursor-pointer bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-left text-sm text-white focus:outline-none focus:border-[#03C3FF]">
                                                <span className="block truncate">
                                                    {history.type === 'work' && '경력 (Work)'}
                                                    {history.type === 'education' && '학력 (Education)'}
                                                    {history.type === 'project' && '프로젝트 (Project)'}
                                                    {history.type === 'other' && '기타 (Other)'}
                                                </span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <FaChevronDown className="h-3 w-3 text-gray-400" aria-hidden="true" />
                                                </span>
                                            </ListboxButton>
                                            <Transition
                                                as={React.Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#1c1c22] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-neutral-800">
                                                    {[
                                                        { value: 'work', label: '경력 (Work)' },
                                                        { value: 'education', label: '학력 (Education)' },
                                                        { value: 'project', label: '프로젝트 (Project)' },
                                                        { value: 'other', label: '기타 (Other)' },
                                                    ].map((option) => (
                                                        <ListboxOption
                                                            key={option.value}
                                                            className={({ active }: { active: boolean }) =>
                                                                `relative cursor-default select-none py-2 pl-4 pr-10 ${
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
                                                                            <FaCheck className="h-3 w-3" aria-hidden="true" />
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
                                    <label className="text-xs text-gray-500">제목 (회사/학교/프로젝트명)</label>
                                    <input
                                        type="text"
                                        value={history.title}
                                        onChange={(e) => {
                                            const newHistories = [...histories];
                                            newHistories[index].title = e.target.value;
                                            setHistories(newHistories);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: (주)현대IT"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">시작일</label>
                                    <input
                                        type="text"
                                        value={history.startDate}
                                        onChange={(e) => {
                                            const newHistories = [...histories];
                                            newHistories[index].startDate = e.target.value;
                                            setHistories(newHistories);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: 2023.01"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">종료일</label>
                                    <input
                                        type="text"
                                        value={history.endDate}
                                        onChange={(e) => {
                                            const newHistories = [...histories];
                                            newHistories[index].endDate = e.target.value;
                                            setHistories(newHistories);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                        placeholder="예: 2023.12 (재직중은 'Present')"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">정렬 순서</label>
                                    <input
                                        type="number"
                                        value={history.order}
                                        onChange={(e) => {
                                            const newHistories = [...histories];
                                            newHistories[index].order = parseInt(e.target.value) || 0;
                                            setHistories(newHistories);
                                        }}
                                        className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500">설명 (선택사항)</label>
                                <textarea
                                    value={history.description}
                                    onChange={(e) => {
                                        const newHistories = [...histories];
                                        newHistories[index].description = e.target.value;
                                        setHistories(newHistories);
                                    }}
                                    className="w-full bg-[#25252b] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#03C3FF] resize-none h-20"
                                    placeholder="주요 업무나 활동 내용을 입력하세요"
                                />
                            </div>
                        </div>
                    ))}
                    {histories.length === 0 && (
                        <div className="text-center py-8 border border-dashed border-neutral-800 rounded-lg text-gray-500 text-sm">
                            등록된 연혁이 없습니다.
                        </div>
                    )}
                </div>
             </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-end sticky bottom-0 bg-[#25252b] p-4 -mx-6 -mb-6 border-t rounded-b-xl z-10 shadow-lg">
        <button className="flex items-center gap-2 bg-[#03C3FF] hover:bg-[#03C3FF]/90 text-black font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-[#03C3FF]/20">
          <FaSave />
          <span>변경사항 저장</span>
        </button>
      </div>
    </div>
  );
}
