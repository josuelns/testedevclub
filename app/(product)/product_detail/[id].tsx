import React, { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from '@/components/ui/hstack';
import { ArrowLeft, SquarePen, Trash, X } from 'lucide-react-native';
import { Divider } from '@/components/ui/divider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Heading } from '@/components/ui/heading';
import Toast from 'react-native-toast-message'; // Importa a biblioteca de Toast
import axios from 'axios'; // Importa o Axios

// Função para formatar o preço
const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

// Definindo o tipo para a resposta do produto
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
const fetchProductDetails = async (productId: number): Promise<Product> => {
  const response = await axios.get(`https://dummyjson.com/products/${productId}`);
  return response.data; // Axios já retorna a resposta como um objeto, com a propriedade `data`
};

// Função para deletar o produto usando Axios
const deleteProduct = async (productId: number): Promise<{ isDeleted: boolean, deletedOn: string }> => {
  const response = await axios.delete(`https://dummyjson.com/products/${productId}`);
  return response.data; // Axios já retorna a resposta como um objeto, com a propriedade `data`
};

const ProductDetails: React.FC = () => {
  const { id } = useLocalSearchParams();
  const productId = parseInt(id as string, 10); // Pegando o ID do produto da rota

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBack = () => {
    router.back(); // Volta para a tela anterior
  };

  // Usando React Query para buscar os detalhes do produto
  const { data: product, isLoading, isError, error } = useQuery<Product, Error>({
    queryKey: ['productDetails', productId], // queryKey
    queryFn: () => fetchProductDetails(productId), // queryFn
    retry: 2, // Quantas vezes a query vai tentar novamente em caso de erro
  });

  // Usando React Query para a requisição DELETE (exclusão)
  const mutation = useMutation({
    mutationFn: () => deleteProduct(productId), // Faz a requisição DELETE com o ID do produto
    onSuccess: (data) => {
      console.log('data', data)
      if (data.isDeleted) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Produto excluído com sucesso!',
          visibilityTime: 3000,
        }); // Exibe o toast de sucesso

        setIsModalOpen(false); // Fecha o modal após exclusão
        handleBack(); // Volta para a página anterior
      }
    },
    onError: (error) => {
      alert('Erro ao excluir o produto');
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erro ao excluir o produto!',
        visibilityTime: 3000,
      }); // Exibe o toast de erro
      setIsModalOpen(false); // Fecha o modal em caso de erro
    },
  });

  const handleDelete = () => {
    mutation.mutate(); // Faz a requisição de exclusão
  };

  const handleClose = () => setIsModalOpen(false);

  const handleEdit = () => {
    router.push(`product_form/${productId}`); // Redireciona para a tela de edição do produto
  };

  if (isLoading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">{(error as Error).message}</Text>
        <Button className="mt-4" onPress={handleBack}>
          <Text>Voltar</Text>
        </Button>
      </Box>
    );
  }

  if (!product) {
    return null;
  }

  const { title, description, price, discountPercentage, thumbnail } = product;

  const oldPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <Box className="flex-1 justify-between bg-gray-50 px-4 py-6 mt-8">
      <Box>
        <HStack className="items-center mb-4">
          <TouchableOpacity className="p-0" onPress={handleBack}>
            <ArrowLeft color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-bold ml-2">Detalhes do produto</Text>
        </HStack>

        <VStack className="space-y-4 items-center">
          <Image
            source={{ uri: thumbnail }}
            height={300}
            width={300}
            resizeMode="contain"
          />

          <Divider className="my-4" />

          <Box>
            <Text className="text-lg font-bold mb-1">{title}</Text>
            <HStack className="items-center space-x-2 mb-2">
              <Text className="text-xl font-bold text-red-500">{formatCurrency(price)}</Text>
              {oldPrice && (
                <Text className="text-md text-gray-400 line-through">
                  {formatCurrency(Number(oldPrice))}
                </Text>
              )}
            </HStack>
            <Text className="text-sm text-gray-600">{description}</Text>
          </Box>
        </VStack>
      </Box>
      
      <VStack space="md">
        <Button className="bg-blue-500" onPress={handleEdit}>
          <Text className="text-white font-bold">Editar</Text>
          <SquarePen color={'#fff'} />
        </Button>
        <Button className="bg-red-500" onPress={() => setIsModalOpen(true)}>
          <Text className="text-white font-bold">Excluir</Text>
          <Trash color={'#fff'} />
        </Button>

        <AlertDialog isOpen={isModalOpen} onClose={handleClose} size="lg">
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <View className="flex-1 flex-row justify-between">
                <Heading className="text-typography-950 font-semibold" size="md">
                  Excluir produto
                </Heading>
                <TouchableOpacity onPress={handleClose}>
                  <X className="h-8 w-8" color={"#000"} />
                </TouchableOpacity>
              </View>
            </AlertDialogHeader>
            <AlertDialogBody className="mt-3 mb-4">
              <Text size="sm">
                Você tem certeza que deseja excluir esse produto? Essa ação não poderá ser desfeita.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button variant="outline" action="secondary" onPress={handleClose} size="sm">
                <ButtonText>Cancelar</ButtonText>
              </Button>
              <Button size="sm" onPress={handleDelete} className="bg-red-500">
                <ButtonText>Excluir</ButtonText>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </VStack>
    </Box>
  );
};

export default ProductDetails;
