import { ReactNode } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import "@/global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProviderComposer from "@/components/ui/providerComposer";
import { AuthMiddleware } from '@/middleware/authMiddleware';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <ProviderComposer
                providers={[
                    {
                        component: ({ children }: { children: ReactNode }) => (
                            <SafeAreaView className='flex-1'>
                                {children}
                            </SafeAreaView>
                        ),
                    },
                    {
                        component: ({ children }: { children: ReactNode }) => (
                            <GluestackUIProvider mode="light">
                                {children}
                            </GluestackUIProvider>
                        ),
                    },
                    {
                        component: ({ children }: { children: ReactNode }) => (
                            <QueryClientProvider client={queryClient}>
                                {children}
                            </QueryClientProvider>
                        ),
                    },
                    {
                        component: ({ children }: { children: ReactNode }) => (
                            <AuthMiddleware>
                                {children}
                            </AuthMiddleware>
                        )
                    },
                ]}
            >
                <Stack screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen name="auth/login" />
                    <Stack.Screen name="(tabs)" />
                    
                </Stack>
            </ProviderComposer>
            <Toast  />
        </>
    );
}
