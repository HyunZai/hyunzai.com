import { create } from "zustand";
import { PortfolioData } from "@/dtos/PortfolioData";

interface PortfolioState {
  store: PortfolioData | null;
  fetchPortfolioData: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  store: null,
  isLoading: false,
  error: null,
  fetchPortfolioData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      set({ store: data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch portfolio data:", error);
      set({ error: "Failed to fetch portfolio data", isLoading: false });
    }
  },
}));
