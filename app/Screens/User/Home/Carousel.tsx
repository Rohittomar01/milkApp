import React from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import 'nativewind';

// Define the interface for the items
interface CarouselItem {
    id: number;
    image: string;
    description: string;
}

// Define the data items
const items: CarouselItem[] = [
    {
        id: 1,
        image: 'https://cdn.pixabay.com/photo/2017/02/13/22/27/milk-splash-2064088_1280.jpg',
        description: 'Milk'
    },
    {
        id: 2,
        image: 'https://cdn.pixabay.com/photo/2016/05/02/12/30/milk-1367171_1280.jpg',
        description: 'Clarified Butter'
    },
    {
        id: 3,
        image: 'https://cdn.pixabay.com/photo/2018/09/09/13/00/graffiti-3664519_1280.jpg',
        description: 'Dahi'
    },
];

// Define the render function for each item
const renderCategory: ListRenderItem<CarouselItem> = ({ item }) => {
    return (
        <View key={item.id} className='bg-white w-80 m-4'>
            <Image
                source={{ uri: item.image }}
                className="w-80 h-40 rounded-lg"
            />
        </View>
    );
};

// Define the main component
const Carousel: React.FC = () => {
    return (
        <View className='bg-white justify-center items-center p-4 pt-0 mt-2'>
            <FlatList
                data={items}
                renderItem={renderCategory}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                snapToAlignment="center"
                snapToInterval={170}
            />
        </View>
    );
};

export default Carousel;
