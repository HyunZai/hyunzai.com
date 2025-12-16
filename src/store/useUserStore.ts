import { create } from "zustand";
import { UserDto } from "@/dtos/UserDto";
import { Gender } from "@/entities/User";

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
    // set({ isLoading: true, error: null });
    // try {
    //   const response = await fetch("/api/users");
    //   if (!response.ok) {
    //     throw new Error("Failed to fetch user data");
    //   }
    //   const data: UserDto = await response.json();
    //   set({ user: data, isLoading: false });
    // } catch (error) {
    //   console.error("Error fetching user:", error);
    //   set({ error: (error as Error).message, isLoading: false });
    // }

    // 하드코딩 데이터 (임시 배포용)
    const user = {
      id: 1,
      nameKo: "김현재",
      nameEn: "Hyunjae Kim",
      subTitleKo: "저는 <span className='text-foreground'>효율을 추구하고 도전을 망설이지 않는 개발자</span>입니다.",
      subTitleEn: "I’m a <span className='text-foreground'>developer who values efficiency and embraces new challenges</span>.",
      email: "contact@hyunzai.com",
      gitUsername: "hyunzai",
      imageUrl: "/uploads/profile/profile.png",
      gender: Gender.M,
      birthDate: "1998-03-09",
      address: "Seoul, Republic of Korea",
    };

    set({ user: user, isLoading: false });
  },
}));
