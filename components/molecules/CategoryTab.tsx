import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CategoryTabProps {
    label: string;
    isActive: boolean;
    onPress: () => void;
}

export const CategoryTab: React.FC<CategoryTabProps> = ({ label, isActive, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.tabButton, isActive && styles.activeTab]}
        >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tabButton: {
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#2567E8',
    },
    tabText: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#aaa',
    },
    activeTabText: {
        fontWeight: 'bold',
        color: '#2567E8 ',
    },
});

