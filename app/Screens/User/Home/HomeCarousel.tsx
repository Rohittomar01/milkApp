import React from 'react';
import { View, Text, Image, StyleSheet, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Carousel, } from 'react-native-ui-lib';
import _ from 'lodash';

// Define the type for your items
interface Item {
    id: number;
    imageUrl: string;
}

// Sample data
const items: Item[] = [
    { id: 1, imageUrl: 'https://img.freepik.com/premium-photo/milk-minimal-poster-modern-background-with-organic-splash-dairy-banner-template-with-splashes_1206114-3158.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722297600&semt=ais_hybrid' },
    { id: 2, imageUrl: 'https://img.freepik.com/premium-vector/3d-fresh-milk-ad-template_317442-1799.jpg' },
    { id: 3, imageUrl: 'https://img.freepik.com/free-vector/farm-milk-poster_1284-74094.jpg' },
];

// Function to render each item
const renderItem = (item: Item): JSX.Element => (
    <View key={item.id} style={styles.itemContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image as ImageStyle} />
    </View>
);

const HomeCarousel: React.FC = () => {
    return (
        <View className=' bg-white mt-2'>
            <Carousel
                pageWidth={340}
                onChangePage={() => console.log('page changed')}
                autoplay
                animated
                pageControlPosition='under'
                pagingEnabled
                showCounter
                containerMarginHorizontal={10}
                containerPaddingVertical={10}

            >
                {_.map(items, (item: Item) => renderItem(item))}
            </Carousel>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        display:"flex",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    } as ViewStyle,
    image: {
        width: 330,
        height: 200,
        borderRadius: 10,
        objectFit:"cover"
    } as ImageStyle,
    title: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    } as TextStyle,
});

export default HomeCarousel;
