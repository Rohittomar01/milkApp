import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';

interface CategoryItem {
    id: number;
    image: string;
    description: string;
}

const items: CategoryItem[] = [
    {
        id: 1,
        image: 'https://milkpot.com/wp-content/uploads/2022/11/Banner-2.png',
        description: 'Milk'
    },
    {
        id: 2,
        image: 'https://greenandgreyagro.com/cdn/shop/products/istockphoto-1346355665-612x612__1_-removebg-preview_600x.png?v=1678794011',
        description: 'Clarified Butter'
    },
    {
        id: 3,
        image: 'https://i.pinimg.com/736x/84/22/70/8422703d976d4ec8e3e2e46f98c2ead1.jpg',
        description: 'Dahi'
    },
];

export default function SlideBar() {
    const [selectedId, setSelectedId] = useState<number>(1); // Default selection

    const renderCategory = ({ item }: { item: CategoryItem }) => {
        const isSelected = item.id === selectedId;

        return (
            <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                className={`m-4 p-2 items-center rounded-lg ${isSelected ? 'bg-blue-50 ' : 'bg-white'}`}
            >
                <Image
                    source={{ uri: item.image }}
                    className="w-20 h-20 rounded-lg"
                />
                <Text className="text-center mt-1">
                    {item.description}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View className="bg-white flex justify-center items-center">
            <FlatList
                data={items}
                renderItem={renderCategory}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 0 }}
            />
        </View>
    );
}
