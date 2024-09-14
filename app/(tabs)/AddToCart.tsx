import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubscriptionCard from '../Screens/User/AddtoCart/SubcriptionCard';
import PaymentDetails from '../Screens/User/AddtoCart/PaymentDetails';
import PopularProducts from '../Screens/User/Home/Popular_Products';
import Couple from '../Screens/User/AddtoCart/Couple';
import { getData } from '../Services/ServerServices';
import EmptyCart from '../Screens/User/AddtoCart/emptyAddtocartScreen';
import Address from '../Screens/User/AddtoCart/Address';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface CardItem {
    id: number;
    title: string;
    description: string;
    price: number;
    oldPrice: number;
    imageUrl: string;
    discount: number
}

interface PopularProduct {
    _id: string;
    image: string;
    title: string;
    description: string;
    price: string;
    discount: string;
    category: string;
    quantity: number;
    submitted_by: string;
    createdAt: string;
    updatedAt: string;
}
interface CartItem {
    user_id: string;
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
    week_days: string[];
    auto_renewal: boolean;
    total_price: number;
    rating: number;
    deliveryShift: string;
    deliveryAddress: string;
    subscription_started_at?: string;
    subscription_ended_at?: string;
    plan_type: string;
    item_type: string;
    calculatedPrice: number;
    total_days: number;
    items: number;
    productDetails_id: string;
}

export default function AddToCart() {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [Products, setProducts] = useState<PopularProduct[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await getData("productDetails/allProductDetails_fetch");
            setProducts(response.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

   
    useEffect(() => {
        fetchCartItems();
        fetchProducts();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await getData("addtocart/fetch_addtocarts");
            setCartItems(response.addtocarts);

        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };
    console.log("add to cart data ",cartItems)

    return (
        <SafeAreaView className="flex-1">
            {cartItems.length > 0 ? (<ScrollView className="bg-slate-100 mt-[-25px]">
                <View>
                    <SubscriptionCard onAction={fetchCartItems} data={cartItems} />
                </View>
                <View>
                    <Couple />
                </View>
                <View>
                    <Address />
                </View>
                <View>
                    <PaymentDetails data={cartItems} />
                </View>
                <View>
                    <PopularProducts heading="Similar Product" data={Products} />
                </View>
            </ScrollView>
            ) : (
                <View className=' h-[90vh] mt-[-25px] '>
                    <EmptyCart />
                </View>)}

        </SafeAreaView>
    );
}
