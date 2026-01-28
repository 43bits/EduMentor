import { create } from "zustand";

interface PreferencesState {
  language: string;
  career: string;
  region: string;
  setPreferences: (prefs: Partial<PreferencesState>) => void;
}

export const usePreferences = create<PreferencesState>((set) => ({
  language: "en",
  career: "Engineering",
  region: "IN",
  setPreferences: (prefs) =>
    set((state) => ({ ...state, ...prefs })),
}));
