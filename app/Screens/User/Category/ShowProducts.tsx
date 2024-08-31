import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Card, Badge } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';
import { getData, ServerURL } from '../../../Services/ServerServices';
import useCategoryStore from '../../../store/useCategory';
import { scaleWidth, scaleFont, scaleHeight, color_DarkGreen, color_white, color_green, color_gray, scaleMargin, scalePadding, capitalizeEachWord, calculateDiscountPercentage } from '../../../Global/Global';



interface Product {
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

const ShowProducts = () => {
    const { category, setCategory } = useCategoryStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredCards, setFilteredCards] = useState<Product[]>([]);
    const router = useRouter();

    const cardWidth = scaleWidth(136);
    const cardHeight = scaleHeight(210);
    const padding = scaleWidth(9);
    const margin = scaleWidth(2);
    const fontSizeTitle = scaleFont(14);
    const fontSizeDescription = scaleFont(12);
    const fontSizePrice = scaleFont(13);
    const fontSizeButton = scaleFont(11);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getData("productDetails/allProductDetails_fetch");
            setProducts(response.products);
            setFilteredCards(response.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        const filtered = products.filter(card =>
            card.product.category.name.toLowerCase().includes(category.toLowerCase())
        );
        setFilteredCards(filtered);
    }, [category, products]);

    const handleCardPress = useCallback((item: Product) => {
        router.push({
            pathname: "Screens/User/ProductDetails/ProductDetails",
            params: {productData: JSON.stringify(item)}
        });
        setCategory("");
    }, [router]);



    // Usage in render

    const renderCard = ({ item }: { item: Product }) => {
        const isOutOfStock = item.stock <= 0;

        return (
            <Card
                onPress={!isOutOfStock ? () => handleCardPress(item) : undefined}
                key={item._id}
                elevation={6}
                style={{
                    width: cardWidth,
                    height: cardHeight * 1.1,
                    margin: margin,
                    padding: padding,
                    borderRadius: scaleWidth(8),
                    overflow: 'hidden',
                    opacity: isOutOfStock ? 0.6 : 1, // Dim the card if out of stock
                }}
            >
                {/* Image section with Badge */}
                <View style={{ position: 'relative' }}>
                    <Image
                        source={{ uri: `${ServerURL}/images/${item.image}` }}
                        style={{
                            width: '100%',
                            height: '50%',
                            borderRadius: scaleWidth(8),
                        }}
                        resizeMode="cover"
                    />

                    {isOutOfStock && (
                        <Badge
                            label="Out of Stock"
                            backgroundColor="#FF6347"
                            labelStyle={{ color: color_white }}
                            size={25}
                            containerStyle={{
                                position: 'absolute',
                                top: scaleHeight(5),
                                right: scaleWidth(5),
                                zIndex: 1,
                            }}
                        />
                    )}

                    {/* Title */}
                    <Text
                        style={{
                            marginTop: scaleHeight(8),
                            fontSize: fontSizeTitle,
                            fontWeight: 'bold',
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {capitalizeEachWord(item.product.title)}
                    </Text>

                    <Text
                        style={{
                            fontSize: fontSizeDescription,
                            color: color_gray,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.product.description}
                    </Text>

                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text
                            style={{
                                fontSize: fontSizeDescription * 1.1,
                                color: color_gray,
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {item.quantity} {item.product.category.name.toLowerCase().includes("ghee") ? 'lit' : 'kg'}
                        </Text>
                        <Text
                            style={{
                                fontSize: fontSizeDescription * 1.1,
                                color: color_green,
                                marginLeft: scaleWidth(8),
                            }}
                        >
                            ({calculateDiscountPercentage(item.price, item.discount)}% off)
                        </Text>
                    </View>

                    {/* Price */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: scaleHeight(5),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: fontSizePrice * 1.1,
                                fontWeight: 'bold',
                                color: color_green,
                            }}
                        >
                            ₹{item.price - item.discount}
                        </Text>
                        <Text
                            style={{
                                fontSize: fontSizeDescription * 1.1,
                                color: '#9E9E9E',
                                marginLeft: scaleWidth(8),
                                textDecorationLine: 'line-through',
                            }}
                        >
                            ₹{item.price}
                        </Text>
                    </View>


                    <TouchableOpacity
                        onPress={() => handleCardPress(item)}
                        disabled={isOutOfStock ? true : false}
                        style={{
                            marginTop: scaleHeight(7),
                            backgroundColor: color_DarkGreen,
                            paddingVertical: scaleHeight(8),
                            borderRadius: scaleWidth(8),
                        }}
                    >
                        <Text
                            style={{
                                color: color_white,
                                textAlign: 'center',
                                fontSize: fontSizeButton,
                            }}
                        >
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>

            </Card>
        );
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                padding: padding,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <FlatList
                data={filteredCards}
                renderItem={renderCard}
                keyExtractor={item => item._id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default ShowProducts;
