import { create } from "zustand";

interface AuthState {
  clerkId: string | null;
  setClerkId: (id: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  clerkId: null,
  setClerkId: (id: string) => set({ clerkId: id }),
}));
