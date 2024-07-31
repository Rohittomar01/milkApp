import React, { useState } from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Carousel, Icon, Text } from 'react-native-ui-lib';
import Ionicons from '@expo/vector-icons/Ionicons';
import _ from 'lodash';

interface CarouselItem {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

const items: CarouselItem[] = [
    {
        id: 1,
        title: "Quick Delivery",
        subtitle: "On Time",
        description: "We ensure timely delivery of A2 milk-based products, organic honey and pickles from the comforts of your sofa.",
        image: 'https://static.vecteezy.com/system/resources/previews/023/743/925/non_2x/scooter-with-delivery-man-flat-cartoon-character-fast-courier-restaurant-food-service-mail-delivery-service-a-postal-employee-the-determination-of-geolocation-using-electronic-device-free-png.png'
    },
    {
        id: 2,
        title: "Quick Delivery",
        subtitle: "On Time",
        description: "We ensure timely delivery of A2 milk-based products, organic honey and pickles from the comforts of your sofa.",
        image: 'https://static.vecteezy.com/system/resources/previews/023/743/925/non_2x/scooter-with-delivery-man-flat-cartoon-character-fast-courier-restaurant-food-service-mail-delivery-service-a-postal-employee-the-determination-of-geolocation-using-electronic-device-free-png.png'
    },
    {
        id: 3,
        title: "Quick Delivery",
        subtitle: "On Time",
        description: "We ensure timely delivery of A2 milk-based products, organic honey and pickles from the comforts of your sofa.",
        image: 'https://static.vecteezy.com/system/resources/previews/023/743/925/non_2x/scooter-with-delivery-man-flat-cartoon-character-fast-courier-restaurant-food-service-mail-delivery-service-a-postal-employee-the-determination-of-geolocation-using-electronic-device-free-png.png'
    },
];

const renderItem = (item: CarouselItem): JSX.Element => (
    <View key={item.id} className=' flex-1  items-center p-5'>
        <Icon source={{ uri: item.image }} size={300} />
        <Text className='text-2xl font-bold my-2'>{item.title}</Text>
        <Text className='text-xl mb-2'>{item.subtitle}</Text>
        <Text className='text-base text-center'>{item.description}</Text>
    </View>
);

const StarterCarousel: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    const handleSkip = (event: GestureResponderEvent) => {
        console.log('Skip button pressed');
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % items.length);
    };

    const handlePrevious = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + items.length) % items.length);
    };

    return (
        <View className=' bg-white  p-1 h-full'>
            <View className=' flex justify-end w-full items-end'>
                <TouchableOpacity onPress={handlePrevious} className='p-2  rounded  w-24'>
                    <Text className='text-black text-lg'>Skip</Text>
                </TouchableOpacity>
            </View>
            <View className='bg-white flex-1 items-center  justify-center pt-6 mt-2'>
                <Carousel
                    pageWidth={340}
                    onChangePage={(page) => setCurrentPage(page)}
                    animated
                    pageControlPosition='under'
                    pagingEnabled
                    containerMarginHorizontal={10}
                >
                    {_.map(items, (item: CarouselItem) => renderItem(item))}
                </Carousel>
            </View>
                <View className='flex-row  px-1 justify-between items-center w-full '>
                    <TouchableOpacity onPress={handleSkip} className='p-2  rounded '>
                        <Text className='text-black text-lg'>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext} className='p-2 mx-2 rounded'>
                        <Ionicons name="chevron-forward-circle-outline" size={45} color="black" />
                    </TouchableOpacity>
                </View>
        </View>
    );
};

export default StarterCarousel;
