import { useQuery } from '@tanstack/react-query';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    thumbnail: string;
}

interface CategoryResponse {
    products: Product[];
}

const fetchProductsByCategory = async (categories: string[]): Promise<Product[]> => {
    // Fazendo requisições paralelas para todas as subcategorias
    const requests = categories.map((category) =>
        fetch(`https://dummyjson.com/products/category/${category}`).then((response) => response.json())
    );

    // Aguarda todas as requisições e combina os resultados
    const responses = await Promise.all(requests);
    const allProducts = responses.flatMap((response: CategoryResponse) => response.products);
    return allProducts;
};

export const useFetchProducts = (categoryKeys: string[]) => {
    return useQuery<Product[], Error>({
        queryKey: ['products', ...categoryKeys],
        queryFn: () => fetchProductsByCategory(categoryKeys),
    });
};
