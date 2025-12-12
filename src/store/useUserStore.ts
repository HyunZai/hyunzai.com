import { create } from "zustand";
import { UserDto } from "@/dtos/UserDto";

interface UserState {
  user: UserDto | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data: UserDto = await response.json();
      set({ user: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
