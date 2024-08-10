import React from 'react';
import { View, Text, Image, StyleSheet, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Carousel, } from 'react-native-ui-lib';
import _ from 'lodash';
import { ServerURL } from '../../../Services/ServerServices';
import index from '../../..';

// Define the type for your items
interface Item {
    _id: string;
    image: string;
}
interface HomeCarouselProps {
    data: Item[] | string | string[];

}




const ProductDetailsCarousel: React.FC<HomeCarouselProps> = ({ data }) => {
    const renderItem = (item: Item, index: any): JSX.Element => (
        <View key={index} style={styles.itemContainer}>
            <Image source={{ uri: `${ServerURL}/images/${item.image}` }} style={styles.image} />
        </View>
    );


    return (
        <View className=' bg-white mt-2 flex justify-center'>
            <Carousel
                pageWidth={350}
                onChangePage={() => console.log('page changed')}
                autoplay
                animated
                containerMarginHorizontal={10}
                containerPaddingVertical={10}

            >
                {_.map(data, (item: Item, index: any) => renderItem(item, index))}
            </Carousel>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    } as ViewStyle,
    image: {
        width: 340,
        height: 220,
        borderRadius: 10,
        objectFit: "contain"
    } as ImageStyle,
    title: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    } as TextStyle,
});

export default ProductDetailsCarousel;
