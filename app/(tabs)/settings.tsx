// File: ConfiguracoesScreen.js
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, FileText, X } from 'lucide-react-native';

import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { useAuthStore } from '@/store/authStore';
import { TouchableOpacity, View } from 'react-native';
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button, ButtonText } from '@/components/ui/button';

const Settings = () => {
    const auth = useAuthStore((state: any) => state);
    const user = auth?.user;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleConfirmLogout = () => {
        setIsModalOpen(false);
        auth.logout();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 items-center bg-white">
                {/* Header */}
                <Box className="w-full py-28 bg-blue-600" />

                {/* Profile Section */}
                <VStack className="items-center space-y-3 -mt-12">
                    <Avatar size="2xl">
                        <AvatarImage
                            source={{
                                uri: user?.image,
                            }}
                        />
                    </Avatar>
                    <Text className="text-lg font-bold">{`${user?.firstName} ${user?.lastName}`}</Text>
                    <Text className="text-md text-gray-600">{user?.email}</Text>
                </VStack>

                {/* Options Section */}
                <View className="w-11/12 space-y-4 flex flex-1 gap-2 mt-6 mx-8">
                    <TouchableOpacity
                        className="flex flex-row border items-center border-gray-300 rounded-md h-12 px-4 gap-4 w-full"
                    >
                        <User size={24} color="#4B5563" />
                        <Text className=" text-gray-800">Meus Dados</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex flex-row border items-center border-gray-300 rounded-md h-12 px-4 gap-4 w-full"
                    >
                        <Bell size={24} color="#4B5563" />
                        <Text className=" text-gray-800">Notificações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex flex-row border items-center border-gray-300 rounded-md h-12 px-4 gap-4 w-full"
                    >
                        <FileText size={24} color="#4B5563" />
                        <Text className=" text-gray-800">Termos de Uso</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleLogout}
                        className="flex flex-row border items-center text-center justify-center bg-red-500 border-red-700 rounded-md h-12 px-4 gap-4 w-full mt-4"
                    >
                        <Text className=" text-white text-center">Sair da Conta</Text>
                    </TouchableOpacity>
                </View>

            </VStack>

            <AlertDialog isOpen={isModalOpen} onClose={handleClose} size="lg">
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-semibold text-gray-900">Sair da Conta</Text>
                            <TouchableOpacity onPress={handleClose}>
                                <X className="h-6 w-6" color="#000" />
                            </TouchableOpacity>
                        </View>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                        <Text className="text-sm text-gray-700">
                            Você tem certeza que deseja sair da sua conta? Essa ação encerrará sua sessão.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="flex-row justify-between space-x-3">
                        <Button variant="outline" action="secondary" onPress={handleClose} size="sm">
                            <ButtonText>Cancelar</ButtonText>
                        </Button>
                        <Button size="sm" onPress={handleConfirmLogout} className="bg-red-500">
                            <ButtonText>Confirmar</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SafeAreaView>
    );
};

export default Settings;
