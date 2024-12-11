import { create } from 'zustand';

const authStore = (set) => ({
  user: {
    firstName: null,
    lastName: null,
    role: {
      name: null,
    },
  },
  setUser: (userParams) => set(() => ({ user: userParams })),
  resetData: () =>
    set(() => ({
      user: {
        firstName: null,
        lastName: null,
        role: {
          name: null,
        },
      },
    })),
  _hasHydrated: false,
  setHasHydrated: (state) => set(() => ({ _hasHydrated: state })),
});

export const useAuthStore = create(authStore);
