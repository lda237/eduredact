import { ReactNode } from 'react';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: {
    name: ReactNode;
    email: ReactNode; id: number; role: string; user_metadata?: Record<string, unknown> 
} | null; // Add optional `user_metadata`
  login: (token: string, user: { name: ReactNode; email: ReactNode; id: number; role: string; user_metadata?: Record<string, unknown> }) => void; // Update `login` to accept `name` and `email`
  logout: () => void;
  signOut: () => void; // Add `signOut` as an alias for `logout`
  initialize: () => void; // Add `initialize` method
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (token, user) => set({ token, user: { ...user, name: user.name, email: user.email } }),
  logout: () => set({ token: null, user: null }),
  signOut: () => set({ token: null, user: null }), // Alias for `logout`
  initialize: () => {
    // Perform initialization logic here (e.g., check for persisted auth state)
    console.log('Initializing auth store...');
  },
}));