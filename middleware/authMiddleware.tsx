
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore'; // Ajuste o caminho conforme necessário

export const AuthMiddleware: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const auth = useAuthStore((state: any) => state);

    useEffect(() => {
        if (!auth?.user) {
            router.push('auth/login');
        } else {
            router.push('/home');
        }
    }, [auth.token]);

    return <>{children}</>;
};
