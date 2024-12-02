import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { useRouter } from 'expo-router';

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  thumbnail: string;
}

export const ProductCard: React.FC<Product> = ({
  id,
  title,
  description,
  price,
  discountPercentage,
  thumbnail,
}) => {
  const router = useRouter();

  const oldPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  const handleNavigate = () => {
    router.push(`/product_detail/${id}`);
  };

  return (
    <Card className="border border-gray-300 rounded-md w-[48%] mb-4 flex flex-col p-2">
      <TouchableOpacity onPress={handleNavigate}>
        <Image
          source={{ uri: thumbnail }}
          className="w-24 h-24 self-center mb-2"
          resizeMode="contain"
        />
        <Divider className="my-2" />
        <View className="flex-1">
          <Text className="font-bold text-sm mb-2">{title}</Text>
          <Text className="text-gray-500 text-xs mb-2">
            {description.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </Text>
        </View>
        <View className="flex flex-row items-baseline gap-2 flex-wrap">
          <Text className="font-semibold text-sm">{formatCurrency(price)}</Text>
          {oldPrice && (
            <Text className="text-gray-400 line-through text-xs ">
              {formatCurrency(Number(oldPrice))}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Card>
  );
};
