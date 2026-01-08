'use client';

import React, { useState } from 'react';
import { FaPlus, FaTrash, FaSave, FaChevronDown, FaCheck, FaBriefcase, FaGraduationCap, FaProjectDiagram, FaEllipsisH, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition, Switch } from '@headlessui/react';
import { Reorder } from 'framer-motion';
import AlertModal from '@/app/components/ui/AlertModal';

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

interface Career {
  id: string;
  company: string;
  department: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CareerProject {
  id: string;
  careerId: string;
  title: string;
  description: string;
  role: string;
  techStack: string[];
  startDate: string;
  endDate: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoLink: string;
  gitLink: string;
  startDate: string;
  endDate: string;
  displayOrder: number;
  hiddenAt: string | null;
  images: string[];
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
  const [careers, setCareers] = useState<Career[]>([]);
  const [careerProjects, setCareerProjects] = useState<CareerProject[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

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


    const [alertModal, setAlertModal] = useState<{
        isOpen: boolean;
        projectId: string | null;
        onConfirm: () => void;
    }>({
        isOpen: false,
        projectId: null,
        onConfirm: () => {},
    });

  const handleSave = async () => {
    try {
      const formattedCareers = careers.map(c => ({
        ...c,
        projects: careerProjects.filter(p => p.careerId === c.id)
      }));

      const payload = {
        user: { ...introData },
        about: { ...aboutData },
        careers: formattedCareers,
        histories: histories,
        projects: projects
      };

      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save');

      const result = await response.json();
      if(result.success) {
          alert("저장되었습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="space-y-8 pb-24">
      
      {/* 1. Intro Section Card */}
      <section className="bg-background rounded-2xl border border-neutral-800 overflow-hidden shadow-xl p-6 md:p-8">
        <h3 className="text-3xl font-semibold text-white mb-6 border-l-4 border-foreground pl-4">Intro</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="grid grid-cols-2 gap-6 md:col-span-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">한글 이름</label>
                    <input
                    type="text"
                    value={introData.nameKr}
                    onChange={(e) => setIntroData({ ...introData, nameKr: e.target.value })}
                    className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-foreground transition-all focus:ring-1 focus:ring-foreground/20"
                    placeholder="예: 홍길동"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">영문 이름</label>
                    <input
                    type="text"
                    value={introData.nameEn}
                    onChange={(e) => setIntroData({ ...introData, nameEn: e.target.value })}
                    className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-foreground transition-all focus:ring-1 focus:ring-foreground/20"
                    placeholder="예: Gildong Hong"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">서브 타이틀 (한국어)</label>
                <input
                type="text"
                value={introData.subtitleKr}
                onChange={(e) => setIntroData({ ...introData, subtitleKr: e.target.value })}
                className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-foreground transition-all focus:ring-1 focus:ring-foreground/20"
                placeholder="예: 풀스택 개발자"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">서브 타이틀 (영어)</label>
                <input
                type="text"
                value={introData.subtitleEn}
                onChange={(e) => setIntroData({ ...introData, subtitleEn: e.target.value })}
                className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-foreground transition-all focus:ring-1 focus:ring-foreground/20"
                placeholder="예: Full Stack Developer"
                />
            </div>
        </div>
      </section>

      {/* 2. About Section Card */}
      <section className="bg-background rounded-2xl border border-neutral-800 overflow-hidden shadow-xl p-6 md:p-8">
        <h3 className="text-3xl font-semibold text-white mb-6 border-l-4 border-foreground pl-4">About</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
            {/* Introduction - Left (2/3) */}
            <div className="md:col-span-2 space-y-4">
                <div className="space-y-2 h-full flex flex-col">
                    <label className="text-sm font-medium text-gray-400">소개글</label>
                    <textarea
                        value={aboutData.introduction}
                        onChange={(e) => setAboutData({ ...aboutData, introduction: e.target.value })}
                        className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-foreground transition-all focus:ring-1 focus:ring-foreground/20 resize-none flex-grow min-h-[220px]"
                        placeholder="자기소개를 입력하세요..."
                    />
                </div>
            </div>

            {/* Profile Image - Right (1/3) */}
            <div className="md:col-span-1 flex flex-col h-full space-y-2">
                <label className="text-sm font-medium text-gray-400">프로필 이미지</label>
                <div className="flex-grow flex flex-col items-center justify-center p-4 rounded-xl border border-neutral-800/50">
                    <div className="w-full max-w-[200px] aspect-square bg-background rounded-full border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center text-gray-500 overflow-hidden relative group hover:border-foreground/50 transition-colors">
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
                    <p className="text-[10px] text-center text-gray-500 mt-4">추천: 1:1 비율 (500x500px)</p>
                </div>
            </div>
        </div>

        {/* Awards & Certifications Sections (Moved Inside About) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 border-t border-neutral-800 pt-8">
             {/* Awards */}
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-white">수상이력 (Awards)</h4>
                    <button
                        onClick={() => {
                            const newId = crypto.randomUUID();
                            setAwards([...awards, { id: newId, title: '', organization: '', date: '', description: '', order: awards.length + 1 }]);
                        }}
                        className="flex items-center gap-1.5 text-xs bg-[#25252b] hover:bg-foreground hover:text-black border border-neutral-700 hover:border-foreground text-gray-300 px-3 py-1.5 rounded-full transition-all"
                    >
                        <FaPlus size={10} />
                        <span>추가</span>
                    </button>
                </div>
                <div className="space-y-3">
                    {awards.length > 0 ? (
                        awards.map((award, index) => (
                            <div key={award.id} className="bg-[#25252b] border border-neutral-800/50 rounded-xl p-4 relative group hover:border-foreground/30 transition-colors">
                                <button
                                    onClick={() => setAwards(awards.filter(a => a.id !== award.id))}
                                    className="absolute top-3 right-3 text-neutral-600 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-1.5 bg-background border border-neutral-800 rounded-lg hover:border-red-400/30"
                                    title="삭제"
                                >
                                    <FaTrash size={10} />
                                </button>
                                
                                <div className="grid grid-cols-1 gap-3 mb-3">
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
                                            className="w-full bg-background border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
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
                                                className="w-full bg-background border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
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
                                                className="w-full bg-background border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
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
                                        className="w-full bg-background border border-neutral-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-foreground resize-none h-14 text-xs"
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
             </div>

             {/* Certifications */}
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-white">자격증 (Certifications)</h4>
                    <button
                        onClick={() => {
                            const newId = crypto.randomUUID();
                            setCertifications([...certifications, { id: newId, title: '', organization: '', date: '', description: '', order: certifications.length + 1 }]);
                        }}
                        className="flex items-center gap-1.5 text-xs bg-[#25252b] hover:bg-foreground hover:text-black border border-neutral-700 hover:border-foreground text-gray-300 px-3 py-1.5 rounded-full transition-all"
                    >
                        <FaPlus size={10} />
                        <span>추가</span>
                    </button>
                </div>
                <div className="space-y-3">
                    {certifications.length > 0 ? (
                        certifications.map((cert, index) => (
                            <div key={cert.id} className="bg-[#25252b] border border-neutral-800/50 rounded-xl p-4 relative group hover:border-foreground/30 transition-colors">
                                <button
                                    onClick={() => setCertifications(certifications.filter(c => c.id !== cert.id))}
                                    className="absolute top-3 right-3 text-neutral-600 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-1.5 bg-background border border-neutral-800 rounded-lg hover:border-red-400/30"
                                    title="삭제"
                                >
                                    <FaTrash size={10} />
                                </button>
                                
                                <div className="grid grid-cols-1 gap-3 mb-3">
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
                                            className="w-full bg-background border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
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
                                                className="w-full bg-background border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
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
                                                className="w-full bg-background border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
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
                                        className="w-full bg-background border border-neutral-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-foreground resize-none h-14 text-xs"
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
             </div>
        </div>

        {/* GitHub Nickname - Full Width below */}
        <div className="space-y-2 mb-8 border-t border-neutral-800 pt-8">
            <label className="text-sm font-medium text-gray-400">깃허브 닉네임</label>
            <input
            type="text"
            value={aboutData.githubNickname}
            onChange={(e) => setAboutData({ ...aboutData, githubNickname: e.target.value })}
            className="w-full bg-[#25252b] border border-neutral-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-foreground transition-all focus:ring-1 focus:ring-foreground/20"
            placeholder="예: gildong"
            />
        </div>

        {/* Grouped Milestones Section (Moved Inside About) */}
        <div className="border-t border-neutral-800 pt-8">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-medium text-white">마일스톤 (Milestones)</h4>
                <button
                    onClick={() => addHistory('work')}
                    className="flex items-center gap-1.5 text-xs bg-[#25252b] hover:bg-foreground hover:text-black border border-neutral-700 hover:border-foreground text-gray-300 px-3 py-1.5 rounded-full transition-all"
                >
                    <FaPlus size={10} />
                    <span>추가</span>
                </button>
            </div>

            <div className="space-y-4">
                {histories.length > 0 ? (
                    histories.map((history) => (
                        <div key={history.id} className="bg-[#25252b] border border-neutral-800/50 rounded-xl p-6 relative group hover:border-foreground/30 transition-all hover:shadow-lg hover:shadow-black/50">
                            <button
                                onClick={() => setHistories(histories.filter(h => h.id !== history.id))}
                                className="absolute top-4 right-4 text-neutral-600 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-2 bg-background border border-neutral-800 rounded-lg hover:border-red-400/30"
                                title="삭제"
                            >
                                <FaTrash size={12} />
                            </button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {/* Type Selection */}
                                <div className="space-y-2 relative">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">구분</label>
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
                                            <ListboxButton className="relative w-full cursor-pointer bg-background border border-neutral-800 rounded px-3 py-2 text-left text-sm text-gray-300 focus:outline-none focus:border-foreground hover:bg-[#32323a] transition-colors">
                                                <div className="flex items-center gap-2">
                                                    {(() => {
                                                        const typeInfo = HISTORY_TYPES.find(t => t.value === history.type);
                                                        const Icon = typeInfo?.icon || FaEllipsisH;
                                                        return (
                                                            <>
                                                                <Icon className={`${typeInfo?.color || 'text-gray-400'}`} />
                                                                <span className="block truncate text-xs">
                                                                    {typeInfo?.label}
                                                                </span>
                                                            </>
                                                        );
                                                    })()}
                                                </div>
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
                                                                    active ? 'bg-foreground/10 text-foreground' : 'text-gray-300'
                                                                }`
                                                            }
                                                            value={option.value}
                                                        >
                                                            {({ selected }: { selected: boolean }) => (
                                                                <div className="flex items-center gap-2">
                                                                    <option.icon className={`${option.color}`} />
                                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                        {option.label}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground">
                                                                            <FaCheck className="h-2 w-2" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </div>
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
                                        className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
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
                                            className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
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
                                            className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
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
                                        className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground"
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
                                    className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground resize-none h-16 placeholder-gray-600"
                                    placeholder="주요 내용을 간단히 입력하세요"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 border border-dashed border-neutral-800 rounded-xl text-gray-600 text-sm">
                        등록된 마일스톤이 없습니다.
                    </div>
                )}
            </div>
        </div>

      </section>

      {/* 3. Career Section Card */}
      <section className="bg-background rounded-2xl border border-neutral-800 overflow-hidden shadow-xl p-6 md:p-8">
        <h3 className="text-3xl font-semibold text-white mb-6 border-l-4 border-foreground pl-4">Career</h3>
        
        {/* Companies List */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium text-white">회사 (Companies)</h4>
            <button
               onClick={() => {
                   const newId = crypto.randomUUID();
                   setCareers([...careers, { 
                       id: newId, 
                       company: '', 
                       department: '', 
                       jobTitle: '', 
                       startDate: '', 
                       endDate: '', 
                       description: '' 
                   }]);
               }}
               className="flex items-center gap-1.5 text-xs bg-[#25252b] hover:bg-foreground hover:text-black border border-neutral-700 hover:border-foreground text-gray-300 px-3 py-1.5 rounded-full transition-all"
            >
              <FaPlus size={10} />
              <span>추가</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {careers.length > 0 ? (
                careers.map((career) => (
                    <div key={career.id} className="bg-[#25252b] border border-neutral-800/50 rounded-xl p-6 relative group hover:border-foreground/30 transition-all hover:shadow-lg hover:shadow-black/50">
                        <button
                            onClick={() => {
                                // Remove visual element
                                setCareers(careers.filter(c => c.id !== career.id));
                                // Also remove associated projects or unset their careerId? 
                                // For now, let's keep projects but they will lose their company name in UI.
                                // Or better, filter projects too if strict integrity needed.
                                setCareerProjects(careerProjects.filter(p => p.careerId !== career.id));
                            }}
                            className="absolute top-4 right-4 text-neutral-600 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-2 bg-background border border-neutral-800 rounded-lg hover:border-red-400/30"
                            title="삭제"
                        >
                            <FaTrash size={12} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">회사명</label>
                                <input
                                    type="text"
                                    value={career.company}
                                    onChange={(e) => {
                                        const newCareers = careers.map(c => c.id === career.id ? { ...c, company: e.target.value } : c);
                                        setCareers(newCareers);
                                    }}
                                    className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                    placeholder="예: Google"
                                />
                            </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">직책</label>
                                <input
                                    type="text"
                                    value={career.jobTitle}
                                    onChange={(e) => {
                                        const newCareers = careers.map(c => c.id === career.id ? { ...c, jobTitle: e.target.value } : c);
                                        setCareers(newCareers);
                                    }}
                                    className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                    placeholder="예: Senior Software Engineer"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">부서</label>
                                <input
                                    type="text"
                                    value={career.department}
                                    onChange={(e) => {
                                        const newCareers = careers.map(c => c.id === career.id ? { ...c, department: e.target.value } : c);
                                        setCareers(newCareers);
                                    }}
                                    className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                    placeholder="예: Cloud Platform Team"
                                />
                            </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">근무 기간</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={career.startDate}
                                        onChange={(e) => {
                                            const newCareers = careers.map(c => c.id === career.id ? { ...c, startDate: e.target.value } : c);
                                            setCareers(newCareers);
                                        }}
                                        className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                        placeholder="시작일 (YYYY-MM-DD)"
                                    />
                                    <span className="text-gray-500">~</span>
                                    <input
                                        type="text"
                                        value={career.endDate}
                                        onChange={(e) => {
                                            const newCareers = careers.map(c => c.id === career.id ? { ...c, endDate: e.target.value } : c);
                                            setCareers(newCareers);
                                        }}
                                        className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                        placeholder="종료일 (선택)"
                                    />
                                </div>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">상세 설명</label>
                            <textarea
                                value={career.description}
                                onChange={(e) => {
                                    const newCareers = careers.map(c => c.id === career.id ? { ...c, description: e.target.value } : c);
                                    setCareers(newCareers);
                                }}
                                className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground resize-none h-20 placeholder-gray-600"
                                placeholder="주요 역할 및 성과를 입력하세요"
                            />
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 border border-dashed border-neutral-800 rounded-xl text-gray-600 text-sm">
                    등록된 회사가 없습니다.
                </div>
            )}
          </div>
        </div>

        {/* Projects List */}
        <div className="border-t border-neutral-800 pt-8">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-medium text-white">프로젝트 (Projects)</h4>
                <button
                    onClick={() => {
                        const newId = crypto.randomUUID();
                        setCareerProjects([...careerProjects, {
                            id: newId,
                            careerId: careers.length > 0 ? careers[0].id : '',
                            title: '',
                            description: '',
                            role: '',
                            techStack: [],
                            startDate: '',
                            endDate: ''
                        }]);
                    }}
                    className="flex items-center gap-1.5 text-xs bg-[#25252b] hover:bg-foreground hover:text-black border border-neutral-700 hover:border-foreground text-gray-300 px-3 py-1.5 rounded-full transition-all"
                >
                    <FaPlus size={10} />
                    <span>추가</span>
                </button>
            </div>

             <div className="space-y-4">
                {careerProjects.length > 0 ? (
                    careerProjects.map((project) => (
                        <div key={project.id} className="bg-[#25252b] border border-neutral-800/50 rounded-xl p-6 relative group hover:border-foreground/30 transition-all hover:shadow-lg hover:shadow-black/50">
                             <button
                                onClick={() => setCareerProjects(careerProjects.filter(p => p.id !== project.id))}
                                className="absolute top-4 right-4 text-neutral-600 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-2 bg-background border border-neutral-800 rounded-lg hover:border-red-400/30"
                                title="삭제"
                            >
                                <FaTrash size={12} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2 relative">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">소속 회사</label>
                                    <Listbox
                                        value={project.careerId}
                                        onChange={(val: string) => {
                                            const newProjects = careerProjects.map(p => p.id === project.id ? { ...p, careerId: val } : p);
                                            setCareerProjects(newProjects);
                                        }}
                                    >
                                        <div className="relative">
                                            <ListboxButton className="relative w-full cursor-pointer bg-background border border-neutral-800 rounded px-3 py-2 text-left text-sm text-gray-300 focus:outline-none focus:border-foreground hover:bg-[#32323a] transition-colors">
                                                <span className="block truncate">
                                                    {careers.find(c => c.id === project.careerId)?.company || '회사 선택'}
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
                                                <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#25252b] py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs border border-neutral-700">
                                                    {careers.map((career) => (
                                                        <ListboxOption
                                                            key={career.id}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                                                    active ? 'bg-foreground/10 text-foreground' : 'text-gray-300'
                                                                }`
                                                            }
                                                            value={career.id}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                        {career.company}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground">
                                                                            <FaCheck className="h-2 w-2" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </ListboxOption>
                                                    ))}
                                                    {careers.length === 0 && (
                                                         <div className="py-2 px-3 text-gray-500 italic">등록된 회사가 없습니다</div>
                                                    )}
                                                </ListboxOptions>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">프로젝트명</label>
                                    <input
                                        type="text"
                                        value={project.title}
                                        onChange={(e) => {
                                            const newProjects = careerProjects.map(p => p.id === project.id ? { ...p, title: e.target.value } : p);
                                            setCareerProjects(newProjects);
                                        }}
                                         className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                        placeholder="예: 클라우드 마이그레이션"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">역할</label>
                                    <input
                                        type="text"
                                        value={project.role}
                                        onChange={(e) => {
                                            const newProjects = careerProjects.map(p => p.id === project.id ? { ...p, role: e.target.value } : p);
                                            setCareerProjects(newProjects);
                                        }}
                                         className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                        placeholder="예: Backend Lead"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">참여 기간</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={project.startDate}
                                            onChange={(e) => {
                                                 const newProjects = careerProjects.map(p => p.id === project.id ? { ...p, startDate: e.target.value } : p);
                                                 setCareerProjects(newProjects);
                                            }}
                                            className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                            placeholder="시작일 (YYYY-MM-DD)"
                                        />
                                        <span className="text-gray-500">~</span>
                                        <input
                                            type="text"
                                            value={project.endDate}
                                            onChange={(e) => {
                                                 const newProjects = careerProjects.map(p => p.id === project.id ? { ...p, endDate: e.target.value } : p);
                                                 setCareerProjects(newProjects);
                                            }}
                                            className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                            placeholder="종료일 (선택)"
                                        />
                                    </div>
                                </div>
                            </div>

                             <div className="space-y-2 mb-4">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">기술 스택 (쉼표로 구분)</label>
                                <input
                                    type="text"
                                    value={project.techStack.join(', ')}
                                    onChange={(e) => {
                                        const newProjects = careerProjects.map(p => p.id === project.id ? { ...p, techStack: e.target.value.split(',').map(s => s.trim()) } : p);
                                        setCareerProjects(newProjects);
                                    }}
                                    className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                    placeholder="예: React, TypeScript, Node.js"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">프로젝트 설명</label>
                                <textarea
                                    value={project.description}
                                    onChange={(e) => {
                                         const newProjects = careerProjects.map(p => p.id === project.id ? { ...p, description: e.target.value } : p);
                                         setCareerProjects(newProjects);
                                    }}
                                    className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground resize-none h-20 placeholder-gray-600"
                                    placeholder="프로젝트 상세 내용"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 border border-dashed border-neutral-800 rounded-xl text-gray-600 text-sm">
                        등록된 프로젝트가 없습니다.
                    </div>
                )}
             </div>
        </div>

      </section>

      {/* 4. Personal Projects Section Card */}
      <section className="bg-background rounded-2xl border border-neutral-800 overflow-hidden shadow-xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-semibold text-white border-l-4 border-foreground pl-4">Personal Projects</h3>
            <button
                onClick={() => {
                    const newId = crypto.randomUUID();
                    setProjects([...projects, {
                        id: newId,
                        title: '',
                        description: '',
                        techStack: [],
                        demoLink: '',
                        gitLink: '',
                        startDate: '',
                        endDate: '',
                        displayOrder: projects.length + 1,
                        hiddenAt: null,
                        images: []
                    }]);
                }}
                className="flex items-center gap-1.5 text-xs bg-[#25252b] hover:bg-foreground hover:text-black border border-neutral-700 hover:border-foreground text-gray-300 px-3 py-1.5 rounded-full transition-all"
            >
                <FaPlus size={10} />
                <span>추가</span>
            </button>
        </div>

        <div className="space-y-4">
            {projects.length > 0 ? (
                projects.map((project) => (
                    <div key={project.id} className="bg-[#25252b] border border-neutral-800/50 rounded-xl p-6 relative group hover:border-foreground/30 transition-all hover:shadow-lg hover:shadow-black/50">
                        <div className="flex items-center justify-between mb-6 relative">
                            {/* Visibility Toggle (Top Left) */}
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold tracking-wide uppercase text-neutral-500`}>
                                    비공개 여부
                                </span>
                                <Switch
                                    checked={!!project.hiddenAt}
                                    onChange={(checked: boolean) => {
                                        // Checked = Hidden (hiddenAt: Date)
                                        // Unchecked = Visible (hiddenAt: null)

                                        // If turning ON (Hidden), show alert
                                        if (checked) {
                                            setAlertModal({
                                                isOpen: true,
                                                projectId: String(project.id),
                                                onConfirm: () => {
                                                    const newProjects = projects.map(p => p.id === project.id ? { ...p, hiddenAt: new Date().toISOString() } : p);
                                                    setProjects(newProjects);
                                                    setAlertModal(prev => ({ ...prev, isOpen: false }));
                                                }
                                            });
                                        } else {
                                            // Turning OFF (Visible)
                                            const newProjects = projects.map(p => p.id === project.id ? { ...p, hiddenAt: null } : p);
                                            setProjects(newProjects);
                                        }
                                    }}
                                    className={`${
                                        !!project.hiddenAt ? 'bg-foreground' : 'bg-neutral-700'
                                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-black border border-neutral-600`}
                                >
                                    <span className="sr-only">비공개 설정</span>
                                    <span
                                        className={`${
                                            !!project.hiddenAt ? 'translate-x-6' : 'translate-x-0.5'
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                    />
                                </Switch>
                            </div>

                            {/* Delete Button (Top Right) */}
                            <button
                                onClick={() => setProjects(projects.filter(p => p.id !== project.id))}
                                className="absolute -top-2 -right-2 md:top-0 md:right-0 text-neutral-600 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-2 bg-background border border-neutral-800 rounded-lg hover:border-red-400/30 shadow-sm"
                                title="삭제"
                            >
                                <FaTrash size={12} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                             {/* Title */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">프로젝트명</label>
                                <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) => {
                                        const newProjects = projects.map(p => p.id === project.id ? { ...p, title: e.target.value } : p);
                                        setProjects(newProjects);
                                    }}
                                    className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                    placeholder="예: 나만의 포트폴리오"
                                />
                            </div>

                             {/* Dates */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">개발 기간</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={project.startDate}
                                        onChange={(e) => {
                                            const newProjects = projects.map(p => p.id === project.id ? { ...p, startDate: e.target.value } : p);
                                            setProjects(newProjects);
                                        }}
                                        className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                        placeholder="시작일 (YYYY-MM-DD)"
                                    />
                                    <span className="text-gray-500">~</span>
                                    <input
                                        type="text"
                                        value={project.endDate}
                                        onChange={(e) => {
                                            const newProjects = projects.map(p => p.id === project.id ? { ...p, endDate: e.target.value } : p);
                                            setProjects(newProjects);
                                        }}
                                        className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                        placeholder="종료일 (선택)"
                                    />
                                </div>
                            </div>
                            
                            {/* Links */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">링크</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                            <FaExternalLinkAlt size={10} />
                                        </div>
                                        <input
                                            type="text"
                                            value={project.demoLink}
                                            onChange={(e) => {
                                                const newProjects = projects.map(p => p.id === project.id ? { ...p, demoLink: e.target.value } : p);
                                                setProjects(newProjects);
                                            }}
                                            className="w-full bg-background border border-neutral-800 rounded pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                            placeholder="Demo URL"
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                            <FaGithub size={12} />
                                        </div>
                                        <input
                                            type="text"
                                            value={project.gitLink}
                                            onChange={(e) => {
                                                const newProjects = projects.map(p => p.id === project.id ? { ...p, gitLink: e.target.value } : p);
                                                setProjects(newProjects);
                                            }}
                                            className="w-full bg-background border border-neutral-800 rounded pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                            placeholder="GitHub URL"
                                        />
                                    </div>
                                </div>
                            </div>
                             
                             {/* Order Only */}
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">노출 순서</label>
                                <input
                                    type="number"
                                    value={project.displayOrder}
                                    onChange={(e) => {
                                        const newProjects = projects.map(p => p.id === project.id ? { ...p, displayOrder: parseInt(e.target.value) || 0 } : p);
                                        setProjects(newProjects);
                                    }}
                                    className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                />
                            </div>
                        </div>

                         <div className="space-y-2 mb-4">
                             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">기술 스택 (쉼표로 구분)</label>
                            <input
                                type="text"
                                value={project.techStack.join(', ')}
                                onChange={(e) => {
                                    const newProjects = projects.map(p => p.id === project.id ? { ...p, techStack: e.target.value.split(',').map(s => s.trim()) } : p);
                                    setProjects(newProjects);
                                }}
                                className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground placeholder-gray-600"
                                placeholder="예: Next.js, TypeORM, TailwindCSS"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">프로젝트 설명</label>
                            <textarea
                                value={project.description}
                                onChange={(e) => {
                                    const newProjects = projects.map(p => p.id === project.id ? { ...p, description: e.target.value } : p);
                                    setProjects(newProjects);
                                }}
                                className="w-full bg-background border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-foreground resize-none h-24 placeholder-gray-600"
                                placeholder="프로젝트에 대한 상세 설명을 입력하세요"
                            />
                        </div>



                         {/* Screenshot Manager */}
                         <div className="mt-4 border-t border-neutral-800 pt-4">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">프로젝트 스크린샷 (순서 변경 가능)</label>
                            
                            <div className="flex flex-wrap gap-4">
                                {/* Preview List (Reorder Group) */}
                                {project.images && project.images.length > 0 && (
                                    <Reorder.Group 
                                        axis="x" 
                                        values={project.images} 
                                        onReorder={(newOrder) => {
                                            const newProjects = projects.map(p => 
                                                p.id === project.id ? { ...p, images: newOrder } : p
                                            );
                                            setProjects(newProjects);
                                        }}
                                        className="flex gap-4 flex-wrap"
                                    >
                                        {project.images.map((imgUrl) => (
                                            <Reorder.Item key={imgUrl} value={imgUrl} className="relative group shrink-0 cursor-grab active:cursor-grabbing">
                                                <div className="w-[160px] aspect-video rounded-lg overflow-hidden border border-neutral-800 relative bg-black/50 hover:border-foreground/50 transition-colors">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={imgUrl} alt="Screenshot" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const newProjects = projects.map(p => {
                                                                if(p.id === project.id) {
                                                                    return {
                                                                        ...p,
                                                                        images: p.images.filter(img => img !== imgUrl)
                                                                    }
                                                                }
                                                                return p;
                                                            });
                                                            setProjects(newProjects);
                                                        }}
                                                        className="absolute top-1 right-1 bg-black/70 hover:bg-red-500 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <FaTrash size={10} />
                                                    </button>
                                                    <div className="absolute bottom-1 left-2 text-[10px] bg-black/50 px-1.5 py-0.5 rounded text-white/70 pointer-events-none">
                                                        {project.images.indexOf(imgUrl) + 1}
                                                    </div>
                                                </div>
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>
                                )}

                                {/* Add Button (Card Style) */}
                                <label className="w-[160px] aspect-video rounded-lg border border-dashed border-neutral-700 hover:border-foreground bg-[#25252b] hover:bg-neutral-800 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group/add shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center transition-colors">
                                        <FaPlus size={12} className="text-gray-400 group-hover/add:text-foreground" />
                                    </div>
                                    <span className="text-[10px] text-gray-500 group-hover/add:text-gray-300 font-medium tracking-wide">이미지 추가</span>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        multiple 
                                        accept="image/*"
                                        onChange={async (e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                const files = Array.from(e.target.files);
                                                // Optimistic UI or Loading state?
                                                // For now, standard upload
                                                const formData = new FormData();
                                                files.forEach(file => {
                                                    formData.append('file', file);
                                                });
                                                
                                                try {
                                                    const res = await fetch('/api/upload', {
                                                        method: 'POST',
                                                        body: formData
                                                    });
                                                    const data = await res.json();
                                                    if(data.success) {
                                                        const newProjects = projects.map(p => {
                                                            if (p.id === project.id) {
                                                                return { 
                                                                    ...p, 
                                                                    images: [...(p.images || []), ...data.urls] 
                                                                };
                                                            }
                                                            return p;
                                                        });
                                                        setProjects(newProjects);
                                                    }
                                                } catch (err) {
                                                    console.error("Upload failed", err);
                                                    alert("이미지 업로드 실패");
                                                }
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                         </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 border border-dashed border-neutral-800 rounded-xl text-gray-600 text-sm">
                    등록된 개인 프로젝트가 없습니다.
                </div>
            )}
        </div>
      </section>

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-black font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(3,195,255,0.3)] border-2 border-white/10 backdrop-blur-sm"
        >
          <FaSave size={18} />
          <span>변경사항 저장</span>
        </button>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
        title="프로젝트 숨김 확인"
        message="프로젝트 정보는 유지되지만 사용자들에게 노출되지 않습니다.\n프로젝트를 숨길까요?"
        type="confirm"
        onConfirm={alertModal.onConfirm}
      />
    </div>
  );
}
