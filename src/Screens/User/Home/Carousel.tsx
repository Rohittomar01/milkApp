import React from 'react';
import { View } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import { FlatList } from 'react-native';

export default function Carousel() {

    const items = [
        {
            id: 1,
            image: 'https://cdn.pixabay.com/photo/2017/02/13/22/27/milk-splash-2064088_1280.jpg',
            description: 'Milk'
        },
        {
            id: 2,
            image: 'https://cdn.pixabay.com/photo/2016/05/02/12/30/milk-1367171_1280.jpg',
            description: 'clarified butter'
        },
        {
            id: 3,
            image: 'https://cdn.pixabay.com/photo/2018/09/09/13/00/graffiti-3664519_1280.jpg',
            description: 'Dahi'
        },


    ];

    const renderCategory = ({ item }) => {
        return (
            <View key={item.id} className=' bg-white w-80 m-4'>
                <Image
                    source={{ uri: item.image }}
                    className="w-80 h-40 rounded-lg"
                />

            </View>
        );
    };

    return (
        <View className=' bg-white flex justify-center items-center mt-2'>
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
}
