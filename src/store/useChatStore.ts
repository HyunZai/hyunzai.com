import { create } from "zustand";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

interface ChatState {
  isOpen: boolean;
  hasOpened: boolean;
  messages: Message[];
  inputValue: string;
  isTyping: boolean;

  openChat: () => void;
  closeChat: () => void;
  setInputValue: (value: string) => void;
  sendMessage: (text: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  hasOpened: false,
  messages: [],
  inputValue: "",
  isTyping: false,

  openChat: () => set({ isOpen: true, hasOpened: true }),
  closeChat: () => set({ isOpen: false }),

  setInputValue: (value: string) => set({ inputValue: value }),

  sendMessage: async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, newUserMessage],
      inputValue: "",
      isTyping: true,
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const aiResponse: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        createdAt: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, aiResponse],
        isTyping: false,
      }));
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요. 😥",
        createdAt: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, errorMessage],
        isTyping: false,
      }));
    }
  },
}));
