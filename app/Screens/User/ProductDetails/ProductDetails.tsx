import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Details_Section from './Details_Section';
import DeliveryForm from './DeliveryForm';
import ProductDetailsCarousel from './ProductDetailsCarousel';
import { getData } from '../../../Services/ServerServices';

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
    total_price: number;
}

export default function ProdductDetails() {
    const { productData, addtoCartData }: any = useLocalSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredCards, setFilteredCards] = useState<Product[]>([]);
    const [Data, setData] = useState<Product[]>([productData ? JSON.parse(productData) : []]);
    const [addtoCart_Data, setAddtoCart_Data] = useState<Product[]>([addtoCartData ? JSON.parse(addtoCartData) : []]);
    const [productQuantity, setProductQuantity] = useState<number>(Data[0].quantity)


    useEffect(() => {
        fetchProducts();
    }, [productQuantity]);

    const fetchProducts = async () => {
        try {
            const response = await getData("productDetails/allProductDetails_fetch");
            setProducts(response.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        if (Data && !addtoCartData) {
            if (Data[0]._id && products.length > 0) {
                const filtered = products.filter(data => {
                    return data._id == Data[0]._id || data.quantity == productQuantity;
                });
                setFilteredCards(filtered);
            }
        }

        else if (addtoCartData && products.length > 0 && productQuantity) {
            const filtered = products.filter(data => {
                return data._id == Data[0]._id || data.quantity == productQuantity;
            });
            setFilteredCards(filtered);
        }
        else if (addtoCartData && !productQuantity) {
            setFilteredCards(addtoCart_Data)
        }


    }, [Data, products, productQuantity]);

    return (
        <ScrollView className=' bg-blue-50'>
            <View>
                <ProductDetailsCarousel data={filteredCards} />
            </View>
            {filteredCards.length > 0 && (
                <>
                    <View>
                        <Details_Section setQuantity={setProductQuantity} data={filteredCards[0]} />
                    </View>
                    <View>
                        <DeliveryForm data={filteredCards[0]} />
                    </View>
                </>
            )}

        </ScrollView>
    );
}
