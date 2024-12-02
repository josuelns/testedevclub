import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { HStack } from '@/components/ui/hstack';
import { ArrowLeft } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    thumbnail: string;
    isDeleted?: boolean;
    deletedOn?: string;
}

// Função para buscar os detalhes do produto usando Axios
const fetchProductDetails = async (productId: number | null): Promise<Product> => {
    if (!productId) {
        throw new Error("Product ID is required.");
    }
    const response = await axios.get(`https://dummyjson.com/products/${productId}`);

    if (!response.data) {
        throw new Error("Product not found.");
    }

    return response.data; // Sempre retorna um objeto do tipo Product
};

// Função para adicionar um produto
const addProduct = async (data: any): Promise<Product> => {
    const response = await axios.post('https://dummyjson.com/products/add', data);
    return response.data;
};

// Função para atualizar o produto
const updateProduct = async (productId: number, data: any): Promise<Product> => {
    const response = await axios.put(`https://dummyjson.com/products/${productId}`, data);
    return response.data;
};

const FormProductScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const productId = id ? parseInt(id as string, 10) : null; // Corrigido para garantir que o ID seja um número
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            description: '',
            price: '',
            discountPercentage: '',
            imageUrl: '',
        },
    });

    // Usando React Query para buscar os detalhes do produto
    const { data: product, isLoading, isError, error } = useQuery<Product, Error>({
        queryKey: ['productDetails', productId], // queryKey
        queryFn: () => fetchProductDetails(productId), // queryFn
        retry: 2, // Quantas vezes a query vai tentar novamente em caso de erro
        enabled: !!productId
    });

    useEffect(() => {
        if (productId && product) {
            // Carregar os dados do produto para edição (simulação)
            reset({
                title: product.title,
                description: product.description,
                price: product.price.toString(),
                discountPercentage: product.discountPercentage?.toString() || '',
                imageUrl: product.thumbnail,
            });
        }
    }, [productId, product, reset]);

    const onSubmit = async (data: {
        title: string;
        description: string;
        price: string;
        discountPercentage: string;
        imageUrl: string;
    }) => {
        try {
            if (productId) {
                // Atualizar o produto
                const updatedProduct = await updateProduct(productId, {
                    title: data.title,
                    description: data.description,
                    price: Number(data.price),
                    discountPercentage: Number(data.discountPercentage),
                    thumbnail: data.imageUrl,
                });

                if (updatedProduct.id) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Produto atualizado com sucesso!',
                        visibilityTime: 3000,
                    }); // Exibe o toast de sucesso

                    handleBack();
                }

            } else {
                // Adicionar o produto
                const newProduct = await addProduct({
                    title: data.title,
                    description: data.description,
                    price: Number(data.price),
                    discountPercentage: Number(data.discountPercentage),
                    thumbnail: data.imageUrl,
                });

                if (newProduct.id) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Produto criado com sucesso!',
                        visibilityTime: 3000,
                    }); // Exibe o toast de sucesso

                    handleBack();
                }
            }
            reset();
        } catch (error: any) {
            Alert.alert('Erro', `Não foi possível salvar o produto. Detalhes: ${error?.response?.data?.message || error.message}`);
            console.error(error);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <HStack className="items-center mb-4 mt-12">
                <TouchableOpacity className="p-0" onPress={handleBack}>
                    <ArrowLeft color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-bold ml-2">{productId ? 'Editar Produto' : 'Adicionar Produto'}</Text>
            </HStack>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* Título */}
                <Box className="mb-4">
                    <Text className="text-sm font-medium mb-2">Título</Text>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'O título é obrigatório.' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input size="lg" className={`h-[46px] ${errors.title ? "border-red-500" : ""}`}>
                                <InputField
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    placeholder="Título do produto"
                                />
                            </Input>
                        )}
                    />
                    {errors.title && <Text className="text-red-500 text-sm">{errors.title.message}</Text>}
                </Box>

                {/* Descrição */}
                <Box className="mb-4">
                    <Text className="text-sm font-medium mb-2">Descrição</Text>
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: 'A descrição é obrigatória.' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input size="lg" className={`h-[96px] ${errors.description ? "border-red-500" : ""}`}>
                                <InputField
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    placeholder="Descrição do produto"
                                    multiline
                                    textAlignVertical="top"
                                />
                            </Input>
                        )}
                    />
                    {errors.description && <Text className="text-red-500 text-sm">{errors.description.message}</Text>}
                </Box>

                {/* Preço */}
                <Box className="mb-4">
                    <Text className="text-sm font-medium mb-2">Preço (R$)</Text>
                    <Controller
                        name="price"
                        control={control}
                        rules={{
                            required: 'O preço é obrigatório.',
                            pattern: { value: /^[0-9]+(\.[0-9]{1,2})?$/, message: 'Preço inválido.' },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input size="lg" className={`h-[46px] ${errors.price ? "border-red-500" : ""}`}>
                                <InputField
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    placeholder="Digite o preço"
                                    keyboardType="numeric"
                                />
                            </Input>
                        )}
                    />
                    {errors.price && <Text className="text-red-500 text-sm">{errors.price.message}</Text>}
                </Box>

                {/* Desconto */}
                <Box className="mb-4">
                    <Text className="text-sm font-medium mb-2">Desconto (%)</Text>
                    <Controller
                        name="discountPercentage"
                        control={control}
                        rules={{
                            required: 'O desconto é obrigatório.',
                            
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input size="lg" className={`h-[46px] ${errors.discountPercentage ? "border-red-500" : ""}`}>
                                <InputField
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    placeholder="Digite o desconto"
                                    keyboardType="numeric"
                                />
                            </Input>
                        )}
                    />
                    {errors.discountPercentage && (
                        <Text className="text-red-500 text-sm">{errors.discountPercentage.message}</Text>
                    )}
                </Box>

                {/* URL da Imagem */}
                <Box className="mb-4">
                    <Text className="text-sm font-medium mb-2">URL da Imagem</Text>
                    <Controller
                        name="imageUrl"
                        control={control}
                        rules={{
                            required: 'A URL da imagem é obrigatória.',
                            pattern: { value: /^https?:\/\/.+/, message: 'Insira uma URL válida.' },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input size="lg" className={`h-[46px] ${errors.imageUrl ? "border-red-500" : ""}`}>
                                <InputField
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    placeholder="Digite a URL da imagem"
                                />
                            </Input>
                        )}
                    />
                    {errors.imageUrl && <Text className="text-red-500 text-sm">{errors.imageUrl.message}</Text>}
                </Box>

                {/* Botão Adicionar/Editar */}
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="bg-blue-500 rounded-lg px-4 py-2"
                >
                    <Text className="text-white text-center font-medium">{productId ? 'Salvar Alterações' : 'Adicionar Produto'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FormProductScreen;
