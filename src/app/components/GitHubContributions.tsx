"use client";

import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

interface GitHubContributionsProps {
  username: string;
}

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function GitHubContributions({ username }: GitHubContributionsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 화면 크기에 따른 동적 설정
  const calendarConfig = isMobile
    ? { blockSize: 10, blockMargin: 5, blockRadius: 3, months: 3 }
    : { blockSize: 16, blockMargin: 10, blockRadius: 4, months: 6 };

  // Git 잔디밭 최근 N개월만 출력
  const selectRecentContributions = (contributions: Day[]) => {
    const today = new Date();
    // N개월 전 날짜 계산 (안전한 계산)
    const cutoffDate = new Date(today);
    cutoffDate.setMonth(cutoffDate.getMonth() - calendarConfig.months);

    return contributions.filter((day: Day) => {
      const contributionDate = new Date(day.date);
      return contributionDate >= cutoffDate && contributionDate <= today;
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto mt-20">
      <h3 className="text-2xl font-bold text-white mb-4">GitHub Contributions</h3>
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-background rounded-xl border border-foreground/30 w-[90%] flex justify-center hover:scale-[1.02] transition-transform cursor-pointer"
      >
        <GitHubCalendar
          username={username}
          blockSize={calendarConfig.blockSize}
          blockMargin={calendarConfig.blockMargin}
          blockRadius={calendarConfig.blockRadius}
          theme={{
            dark: [
              "#2d2d34",
              "#003a4d",
              "#006380",
              "#008cb3",
              "#03C3FF",
            ],
          }}
          labels={{
            totalCount: `{{count}} contributions in the last ${calendarConfig.months} months`,
          }}
          transformData={selectRecentContributions}
          showWeekdayLabels
        />
      </a>
    </div>
  );
}
