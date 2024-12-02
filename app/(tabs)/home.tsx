import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { Plus } from 'lucide-react-native';

import { useFetchProducts } from '@/hooks/useFetchProducts';

import { Box } from '@/components/ui/box';
import { Fab, FabIcon } from '@/components/ui/fab';
import { LoadingBox } from '@/components/ui/loadingBox';
import { ErrorBox } from '@/components/ui/errorBox';
import { CategoryTabs } from '@/components/organism/CategoryTabs';
import { ProductList } from '@/components/organism/ProductList';
import { useRouter } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width - 25;

const maleCategories = ['mens-shirts', 'mens-shoes', 'mens-watches'];
const femaleCategories = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];

const allCategories = [
    { label: 'Produtos Masculinos', key: maleCategories },
    { label: 'Produtos Femininos', key: femaleCategories },
];

const ProductListing: React.FC = () => {
    const router = useRouter();
    
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
    const currentCategories = allCategories[currentCategoryIndex]?.key;

    const { data, isLoading, error } = useFetchProducts(currentCategories);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(-currentCategoryIndex * SCREEN_WIDTH, { duration: 300 }) }],
    }));


    return (
        <Box className="flex-1 bg-gray-100 p-4 mt-8">
            <CategoryTabs
                categories={allCategories}
                currentCategoryIndex={currentCategoryIndex}
                onCategoryChange={setCurrentCategoryIndex}
            />

            <Animated.View
                style={[{ flexDirection: 'row', width: SCREEN_WIDTH * allCategories.length }, animatedStyle]}
            >
                {error && (
                    <ErrorBox message="Erro ao carregar os produtos" />
                )}

                {isLoading && (
                    <LoadingBox />
                )}

                {allCategories.map((category, index) => (
                    <ProductList
                        key={category.key.join(',')}
                        data={index === currentCategoryIndex ? data || [] : []}
                        width={SCREEN_WIDTH}
                    />
                ))}
            </Animated.View>

            <Fab size="md" placement="bottom right" className='bg-[#2567E8]' onPress={() => {
                 router.push(`product_form`); 
            }}>
                <FabIcon as={Plus} />
            </Fab>

        </Box>
    );
};

export default ProductListing;
