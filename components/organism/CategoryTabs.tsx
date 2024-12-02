import React from 'react';
import { View } from 'react-native';
import { CategoryTab } from '../molecules/CategoryTab';

interface Category {
    label: string;
    key: string[];
}

interface CategoryTabsProps {
    categories: Category[];
    currentCategoryIndex: number;
    onCategoryChange: (index: number) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
    categories,
    currentCategoryIndex,
    onCategoryChange,
}) => {
    return (
        <View className="flex-row justify-around mb-3 border-b-2 border-[#ccc]">
            {categories.map((category, index) => (
                <CategoryTab
                    key={category.label}
                    onPress={() => onCategoryChange(index)}
                    isActive={currentCategoryIndex === index}
                    label={category.label}
                />
            ))}
        </View>
    );
};

