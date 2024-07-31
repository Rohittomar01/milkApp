import React from 'react';
import { View, FlatList } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import { Link } from 'expo-router';

interface CategoryItem {
    id: number;
    image: string;
    categoryname: string;
}

const items: CategoryItem[] = [
    {
        id: 1,
        image: 'https://static.vecteezy.com/system/resources/previews/024/549/128/non_2x/a-bottle-of-milk-and-glass-of-milk-on-a-basket-table-with-transparent-background-nutritious-and-healthy-dairy-products-png.png',
        categoryname: 'Milk'
    },
    {
        id: 2,
        image: 'https://m.media-amazon.com/images/I/51ap7l-rmYL.jpg',
        categoryname: 'Ghee'
    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3uYxy90DIT15rySOrDaYtr70Yag43WaGJDw&s',
        categoryname: 'Dahi'
    },
];

const renderCategory = ({ item }: { item: CategoryItem }) => {
    return (
        <Link
            key={item.id}
            href={{
                pathname: 'ShowCategory',
                params: { item: item.categoryname }
            }}
            style={{ backgroundColor: 'white', width: 80, margin: 16 }}
        >
            <View>
                <Image
                    source={{ uri: item.image }}
                    className="w-20 h-20 rounded-lg"
                />
                <Text className="text-center mt-1">
                    {item.categoryname}
                </Text>
            </View>
        </Link >
    );
};

export default function Category() {
    return (
        <View className='bg-white flex justify-center items-center mt-2'>
            <FlatList
                data={items}
                renderItem={renderCategory}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
}
