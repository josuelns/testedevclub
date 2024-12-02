import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { HalfBackground } from "@/components/ui/halfBackground";

type LoginFormValues = {
    username: string;
    password: string;
};

export default function SignIn() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const auth = useAuthStore((state) => state); // Use a tipagem correta do estado, se disponível.

    const onSubmit = async (data: LoginFormValues) => {
        console.log("Login Data:", data);
        await auth.login(data);
    };

    return (
        <HalfBackground>
            <Box className="flex-1 justify-center items-center p-6 bg-transparent">
                <VStack space="3xl" className="w-full">
                    {/* Cabeçalho */}
                    <Center>
                        <Heading size="3xl" className="text-3xl font-semibold text-white text-center">
                            Bem-vindo de volta!
                        </Heading>
                        <Text size="md" className="text-sm text-center text-white">
                            Insira seus dados para entrar na sua conta.
                        </Text>
                    </Center>

                    {/* Formulário */}
                    <Center>
                        <Box className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                            <VStack space="2xl" className="mb-4">
                                {/* Campo Username */}
                                <Box>
                                    <Text className="text-base text-muted-700 mb-2">Username</Text>
                                    <Controller
                                        name="username"
                                        control={control}
                                        rules={{ required: "O username é obrigatório" }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input size="lg" className={`h-[46px] ${errors.username ? "border-red-500" : ""}`}>
                                                <InputField
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                />
                                            </Input>
                                        )}
                                    />
                                    {errors.username && (
                                        <Text className="text-xs text-red-500 mt-1">
                                            {errors.username.message}
                                        </Text>
                                    )}
                                </Box>

                                {/* Campo Senha */}
                                <Box>
                                    <Text className="text-base text-muted-700 mb-2">Senha</Text>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{ required: "O password é obrigatório" }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input size="lg" className={`h-[46px] ${errors.password ? "border-red-500" : ""}`}>
                                                <InputField
                                                    type="password"
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                />
                                            </Input>
                                        )}
                                    />
                                    {errors.password && (
                                        <Text className="text-xs text-red-500 mt-1">
                                            {errors.password.message}
                                        </Text>
                                    )}
                                </Box>

                                {/* Botão de Login */}
                                <Button
                                    className="bg-[#2567E8] h-12"
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    <ButtonText className="text-base text-center text-white font-bold">
                                        Entrar
                                    </ButtonText>
                                </Button>
                            </VStack>
                        </Box>
                    </Center>
                </VStack>
            </Box>
        </HalfBackground>
    );
}
