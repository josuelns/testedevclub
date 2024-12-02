import React from 'react';
import { FlatList } from 'react-native';
import { ProductCard } from '@/components/molecules/ProductCard';

interface ProductListProps {
  data: any[];
  width: number;
}

export const ProductList: React.FC<ProductListProps> = ({ data, width }) => (
  <FlatList
    data={data}
    numColumns={2}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <ProductCard {...item} />}
    columnWrapperStyle={{ justifyContent: 'space-between' }}
    style={{ width }}
    contentContainerStyle={{
      paddingBottom: 125, 
    }}
  />
);
