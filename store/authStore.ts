import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
   id: number
   nombre: string
   email: string
   telefono: string | null
   rol: 'Admin' | 'Cliente'
   fechaRegistro: string
}

interface AuthState {
   user: User | null
   token: string | null
   isAuthenticated: boolean
   isHydrated: boolean
   login: (user: User, token: string) => void
   logout: () => void
   updateUser: (user: Partial<User>) => void
   setHydrated: () => void
}

export const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         user: null,
         token: null,
         isAuthenticated: false,
         isHydrated: false,
         login: (user, token) => set({ user, token, isAuthenticated: true }),
         logout: () => set({ user: null, token: null, isAuthenticated: false }),
         updateUser: (userData) =>
            set((state) => ({
               user: state.user ? { ...state.user, ...userData } : null,
            })),
         setHydrated: () => set({ isHydrated: true }),
      }),
      {
         name: 'feller-auth-storage',
         onRehydrateStorage: () => (state) => {
            state?.setHydrated()
         },
      }
   )
)
