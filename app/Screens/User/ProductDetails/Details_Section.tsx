import React, { useState } from 'react';
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
}

interface Props {
    data: productData
    setQuantity: (value: number) => void;
}

const Details_Section: React.FC<Props> = ({ data, setQuantity }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedSize, setSelectedSize] = useState<number>(data.quantity);

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSizeSelection = (size: number) => {
        setSelectedSize(size);
        setQuantity(size)
    };


    return (
        <Card style={styles.card}>
            <Text style={styles.title}>
                {capitalizeEachWord(data.product.title)}
            </Text>
            <Text
                style={styles.description}
                numberOfLines={isExpanded ? 1 : 3}
                ellipsizeMode="tail"
            >
                {data.product.description}.
            </Text>
            <Text style={styles.quantity}>{data.quantity} {data.product.category.name.toLowerCase().includes("ghee") ? 'kg' : 'LTR'}</Text>

            <View style={styles.toggleButtonContainer}>
                <TouchableOpacity onPress={handleToggleDescription}>
                    <Text style={styles.toggleButton}>{isExpanded ? 'Show Less' : 'Show More'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.discountedPrice}>₹{data.price - data.discount}</Text>
                <Text style={styles.originalPrice}>₹{data.price}</Text>
                <Text style={styles.discount}>({calculateDiscountPercentage(data.price, data.discount)}% off)</Text>
            </View>
            <Text style={styles.taxesText}>Inclusive of all taxes</Text>
            <Text style={styles.deliveryText}>Free Delivery</Text>
            <View style={styles.sizeSelectionContainer}>
                {data.product.category.name.toLowerCase().includes("curd") && (
                    <TouchableOpacity
                        style={[styles.sizeButton, selectedSize === 500 ? styles.selectedSizeButton : styles.unselectedSizeButton]}
                        onPress={() => handleSizeSelection(1)}
                    >
                        <Text style={[styles.sizeButtonText, selectedSize === 500 ? styles.selectedSizeText : styles.unselectedSizeText]}>
                            500 gm
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.sizeButton, data.quantity === 1 ? styles.selectedSizeButton : styles.unselectedSizeButton]}
                    onPress={() => handleSizeSelection(1)}
                >
                    <Text style={[styles.sizeButtonText, data.quantity === 1 ? styles.selectedSizeText : styles.unselectedSizeText]}>
                        1 {data.product.category.name.toLowerCase().includes("ghee") ? 'kg' : 'LTR'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sizeButton, data.quantity === 2 ? styles.selectedSizeButton : styles.unselectedSizeButton]}
                    onPress={() => handleSizeSelection(2)}
                >
                    <Text style={[styles.sizeButtonText, data.quantity === 2 ? styles.selectedSizeText : styles.unselectedSizeText]}>
                        2 {data.product.category.name.toLowerCase().includes("ghee") ? 'kg' : 'LTR'}
                    </Text>
                </TouchableOpacity>
                {data.product.category.name.toLowerCase().includes("milk") ? (
                    <TouchableOpacity
                        style={[styles.sizeButton, data.quantity === 2.5 ? styles.selectedSizeButton : styles.unselectedSizeButton]}
                        onPress={() => handleSizeSelection(2.5)}
                    >
                        <Text style={[styles.sizeButtonText, data.quantity === 2.5 ? styles.selectedSizeText : styles.unselectedSizeText]}>
                            2.5 LTR
                        </Text>
                    </TouchableOpacity>
                ) : null}
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
        flex: 1,
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
