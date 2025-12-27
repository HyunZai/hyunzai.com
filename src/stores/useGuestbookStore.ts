import { create } from "zustand";

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface LogMessage {
  id: number | string;
  nickname: string;
  content: string;
  createdAt: string;
  type?: "user" | "system" | "info";
  os?: string;
  command?: string;
}

interface GuestbookState {
  // State
  visibleCount: number;
  inputMessage: string;
  nickname: string;
  sessionLogs: LogMessage[];
  isLoading: boolean;

  // Actions
  setVisibleCount: (count: number | ((prev: number) => number)) => void;
  setInputMessage: (message: string) => void;
  setNickname: (nickname: string) => void;
  submitMessage: () => Promise<void>;
  resetSession: () => void;
  fetchMessages: () => Promise<void>;
}

// OS 감지 함수
const getOS = () => {
  if (typeof window === "undefined") return "other";
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes("mac")) return "mac";
  if (userAgent.includes("win")) return "win";
  if (userAgent.includes("android")) return "android";
  if (
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod")
  )
    return "ios";
  if (userAgent.includes("linux")) return "linux";
  return "other";
};

// 날짜 포맷팅 함수 (YYYY-MM-DD HH:MM)
const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const useGuestbookStore = create<GuestbookState>((set, get) => ({
  visibleCount: 15,
  inputMessage: "",
  nickname: "",
  sessionLogs: [],
  isLoading: false,

  setVisibleCount: (count) =>
    set((state) => ({
      visibleCount:
        typeof count === "function" ? count(state.visibleCount) : count,
    })),
  setInputMessage: (message) => set({ inputMessage: message }),
  setNickname: (nickname) => set({ nickname }),

  fetchMessages: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/guestbook?limit=100");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      const logs: LogMessage[] = data.map(
        (item: {
          id: number | string;
          nickname: string;
          content: string;
          createdAt: string;
          osName: string;
        }) => ({
          id: item.id,
          nickname: item.nickname,
          content: item.content,
          createdAt: formatDate(item.createdAt),
          os: item.osName,
          type: "user",
        })
      );

      // Reverse order to show latest at bottom (terminal style) if needed,
      // or keep as is depending on UI preference.
      // Terminal usually shows latest at bottom.
      // API returns desc (latest first). So we might want to reverse it for terminal?
      // Let's check previous implementation.
      // Previous implementation: generated latest first but rendered?
      // Actually terminal usually appends to bottom.
      // Let's reverse data so oldest is at top (if API returns DESC).
      set({ sessionLogs: logs.reverse() });
    } catch (error) {
      console.error(error);
      set({ sessionLogs: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  submitMessage: async () => {
    const { inputMessage, nickname } = get();
    if (!inputMessage.trim()) return;

    const currentOS = getOS();

    // 1. Help Command (Client-side only)
    if (inputMessage.trim().toLowerCase() === "help") {
      const helpLog: LogMessage = {
        id: Date.now(),
        nickname: nickname.trim() || "anonymous",
        content:
          "=============== [ HELP ] ===============\n" +
          "1. Nickname 입력창에 원하는 이름을 입력하세요.\n" +
          "2. Message 입력창에 내용을 작성하세요.\n" +
          "3. Enter 키를 눌러 방명록을 등록하세요.\n" +
          "=====================================",
        createdAt: formatDate(new Date()),
        type: "info",
        os: currentOS,
        command: "help",
      };
      set((state) => ({
        sessionLogs: [...state.sessionLogs, helpLog],
        inputMessage: "",
      }));
      return;
    }

    const finalNickname = nickname.trim() || "Anonymous";

    // 2. API Call
    try {
      const payload = {
        nickname: finalNickname,
        content: inputMessage,
        osName: currentOS,
      };

      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const newLogData = await res.json();

      const newLog: LogMessage = {
        id: newLogData.id,
        nickname: newLogData.nickname,
        content: newLogData.content,
        createdAt: formatDate(newLogData.createdAt),
        os: newLogData.osName,
        type: "user",
        command: inputMessage, // Trace original command if needed
      };

      set((state) => ({
        sessionLogs: [...state.sessionLogs, newLog],
        inputMessage: "",
      }));
    } catch (error) {
      console.error(error);
      const errorLog: LogMessage = {
        id: Date.now(),
        nickname: "system",
        content: "메시지 전송에 실패했습니다. 다시 시도해주세요.",
        createdAt: formatDate(new Date()),
        type: "system",
        os: "linux",
      };
      set((state) => ({
        sessionLogs: [...state.sessionLogs, errorLog],
        inputMessage: "",
      }));
    }
  },

  resetSession: () => {
    // Optional: Refresh logs on reset? or just clear?
    // User might validly want to clear terminal.
    set({ sessionLogs: [] });
    // Or maybe re-fetch? Let's leave it as clear for now,
    // but maybe we should fetch initial data when modal opens.
  },
}));
