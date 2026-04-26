import { create } from "zustand";

interface CourierState {
  // properties
  courierId: string | null;

  // actions
  setCourierId: (courierId: string | null) => void;
}

export const useCourierStore = create<CourierState>((set, get) => ({
  // properties
  courierId: null,

  // actions
  setCourierId: (courierId) => set({ courierId }),
}));
