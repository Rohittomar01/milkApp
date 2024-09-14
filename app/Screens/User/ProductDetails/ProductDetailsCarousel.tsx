import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ImageStyle, ViewStyle } from 'react-native';
import { Carousel } from 'react-native-ui-lib';
import _ from 'lodash';
import { ServerURL } from '../../../Services/ServerServices';
import { scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../../Global/Global';


interface Item {
    _id: string;
    productId: string;
    title: string;
    description: string;
    product: {
        category: {
            name: string;
        };
        description: string;
        title: string;
    }
    submitted_by: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
    discount: number;
    quantity: number;
    image: string;
    total_price?: string;
    items?: number;
    plan_type: string;
    week_days: string[];
    subscription_started_at?: Date;
    subscription_ended_at?: Date;
}

interface HomeCarouselProps {
    data: Item;
}

const ProductDetailsCarousel: React.FC<HomeCarouselProps> = ({ data }) => {

    const [productImageData, setProducImageData] = useState<Item[]>([data])


    useEffect(() => {
        setProducImageData([data])
    }, [data])
    const renderItem = (item: Item, index: number): JSX.Element => (
        <View key={index} style={styles.itemContainer}>
            <Image source={{ uri: `${ServerURL}/images/${item.image}` }} style={styles.image} />
        </View>
    );


    return (
        <View style={styles.container}>
            <Carousel
                pageWidth={scaleWidth(350)}
                onChangePage={() => console.log('page changed')}
                autoplay
                animated
                containerMarginHorizontal={scaleMargin(10)}
                containerPaddingVertical={scalePadding(10)}
            >
                {_.map(productImageData, (item: Item, index: number) => renderItem(item, index))}
            </Carousel>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: scaleMargin(10),
        flex: 1,
        justifyContent: 'center',
    } as ViewStyle,
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    image: {
        width: scaleWidth(200),
        height: scaleHeight(200),
        borderRadius: scaleWidth(20),
        resizeMode: 'contain',
    } as ImageStyle,
});

export default ProductDetailsCarousel;
