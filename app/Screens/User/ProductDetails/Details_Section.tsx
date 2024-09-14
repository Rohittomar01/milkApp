import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Card } from 'react-native-ui-lib';
import { scaleHeight, scaleMargin, scalePadding, scaleWidth, scaleFont, capitalizeEachWord, calculateDiscountPercentage, color_green, color_gray } from '../../../Global/Global';


interface productData {
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

interface Props {
    data: productData[]
    setProductDetailsData: (value: productData) => void;
}

const Details_Section: React.FC<Props> = ({ data, setProductDetailsData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedSize, setSelectedSize] = useState<number>(1);
    const [selectQuantity, setSelectQuantity] = useState<number>(1);
    const [filteredData, setFilteredData] = useState<productData>()

    const handleSizeSelection = (size: number) => {
        // setSelectedSize(size);
        setSelectQuantity(size)
    };

    useEffect(() => {
        if (!selectQuantity || !data) return;
        const filterData = data.filter(item => item.quantity === selectQuantity);
        setFilteredData(filterData[0]);
        setProductDetailsData(filterData[0])
    }, [selectQuantity, data]);




    return (
        <Card style={styles.card}>
            <Text style={styles.title}>
                {capitalizeEachWord(filteredData ? filteredData?.product.title as string : "")}
            </Text>
            <Text
                style={styles.description}
                numberOfLines={isExpanded ? 1 : 3}
                ellipsizeMode="tail"
            >
                {filteredData?.product.description}.
            </Text>
            <Text style={styles.quantity}>{filteredData?.quantity}</Text>


            <Text style={styles.taxesText}>Inclusive of all taxes</Text>
            <Text style={styles.deliveryText}>Free Delivery</Text>
            <View style={styles.sizeSelectionContainer}>
                {data.map((item,index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.sizeButton, selectQuantity === item.quantity ? styles.selectedSizeButton : styles.unselectedSizeButton]}
                            onPress={() => handleSizeSelection(item.quantity)}
                        >
                            <Text style={[styles.sizeButtonText, selectQuantity === item.quantity ? styles.selectedSizeText : styles.unselectedSizeText]}>
                                {item.quantity}
                            </Text>
                        </TouchableOpacity>
                    )
                })}

            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: scalePadding(20),
        marginTop: scaleMargin(10),
        borderRadius: 0
    } as ViewStyle,
    title: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        marginBottom: scaleMargin(8),
    } as TextStyle,
    description: {
        fontSize: scaleFont(14),
        color: '#6B7280',
        transition: 'max-height 0.3s ease-in-out',
    } as TextStyle,
    toggleButtonContainer: {
        alignItems: 'flex-end',
        marginTop: scaleMargin(8),
    } as ViewStyle,
    toggleButton: {
        color: '#3B82F6',
    } as TextStyle,
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleMargin(8),
    } as ViewStyle,
    discountedPrice: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: color_green,
    } as TextStyle,
    originalPrice: {
        fontSize: scaleFont(16),
        color: color_gray,
        textDecorationLine: 'line-through',
        marginLeft: scaleMargin(8),
    } as TextStyle,
    discount: {
        fontSize: scaleFont(16),
        color: color_green,
        marginLeft: scaleMargin(8),
    } as TextStyle,
    taxesText: {
        fontSize: scaleFont(12),
        color: '#6B7280',
        marginBottom: scaleMargin(8),
    } as TextStyle,
    deliveryText: {
        fontSize: scaleFont(12),
        color: '#3B82F6',
        marginBottom: scaleMargin(8),
    } as TextStyle,
    sizeSelectionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scaleMargin(8),
    } as ViewStyle,
    sizeButton: {
        // flex: 1,
        width: scaleWidth(90),
        padding: scalePadding(8),
        borderRadius: scaleWidth(5),
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    selectedSizeButton: {
        backgroundColor: '#000',
    } as ViewStyle,
    unselectedSizeButton: {
        borderWidth: 1,
        borderColor: '#000',
    } as ViewStyle,
    sizeButtonText: {
        fontSize: scaleFont(14),
        textAlign: 'center',
    } as TextStyle,
    selectedSizeText: {
        color: '#FFF',
    } as TextStyle,
    unselectedSizeText: {
        color: '#000',
    } as TextStyle,
    quantity: {
        marginTop: scaleMargin(5),
        fontWeight: "bold",
        color: '#000',
    } as TextStyle,
});

export default Details_Section;
