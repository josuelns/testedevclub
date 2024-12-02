import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: any;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
};

const zustandStorage = {
  getItem: async (key: string) => {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Função de login
      login: async ({ username, password }) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Erro de autenticação.');
          }

          // Atualiza o estado com o usuário e o token
          set({ user: data, token: data.token, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', 
      storage: zustandStorage, 
    }
  )
);
