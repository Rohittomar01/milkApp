import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox, Text, Icon } from 'react-native-ui-lib';
import Ionicons from '@expo/vector-icons/Ionicons';
import SubscriptionCard from '../Screens/User/AddtoCart/SubcriptionCard';
import PaymentDetails from '../Screens/User/AddtoCart/PaymentDetails';
import PopularProducts from '../Screens/User/Home/Popular_Products';
import Couple from '../Screens/User/AddtoCart/Couple';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { getData } from '../Services/ServerServices';


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
    _id: string;
    user_id: string;
    product_id: string;
    total_days: string[];
    total_price: number;
    deliveryShift: string;
    quantity: number;
    plant_type: string;
    subscription_started_at: string;
    subscription_ended_at: string;
    submitted_by: string;
    createdAt: string;
    updatedAt: string;
    product?: {
        _id: string;
        title: string;
        category: string;
        image: string;
    };
}

export default function AddToCart() {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [Products, setProducts] = useState<PopularProduct[]>([]);
    const price = 3300.00;
    const discount = 330.00;
    const deliveryCharges = 0.00;
    const totalPrice = price - discount + deliveryCharges;

    const [isMinPayment, setIsMinPayment] = useState(false);
    const [isMaxPayment, setIsMaxPayment] = useState(true);
    const [paymentAmount, setPaymentAmount] = useState(totalPrice);

    const handleMinPaymentChange = () => {
        setIsMinPayment(true);
        if (!isMinPayment) {
            setIsMaxPayment(false);
            setPaymentAmount(1000.00);
        } else {
            setPaymentAmount(totalPrice);
        }
    };

    const handleMaxPaymentChange = () => {
        setIsMaxPayment(true);
        if (!isMaxPayment) {
            setIsMinPayment(false);
            setPaymentAmount(totalPrice);
        } else {
            setPaymentAmount(totalPrice);
        }
    };



    const fetchProducts = async () => {
        try {
            const response = await getData("product/allProducts_Fetch");
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



    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="bg-slate-100 mt-[-25px]">
                <View>
                    <SubscriptionCard data={cartItems} />
                </View>
                <View>
                    <Couple />
                </View>
                <View>
                    <PaymentDetails />
                </View>
                <View className=' mb-36'>
                    <PopularProducts heading="Similar Product" data={Products} />
                </View>
            </ScrollView>
            {/* <View className="absolute bottom-0 left-0 right-0 shadow-lg rounded-t-[25px] bg-blue-100">
                <View className="flex justify-between items-center flex-row mb-0.5 space-x-4 p-6 bg-yellow-50">
                    <View className=' flex items-center flex-row space-x-2  w-60 '>
                        <Entypo name="location-pin" size={24} color="black" />
                        <Text className="text-sm font-semibold">
                            John Doe
                            123 Maple Street
                            Apt 4B
                            Springfield, IL 62704
                            United States
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push("/Screens/User/MapLocation/MapLocation")} className=" items-center justify-center">
                        <Text className="text-green-700 text-sm font-bold">Change</Text>
                    </TouchableOpacity>
                </View>
                <View className=' p-6 bg-yellow-50'>
                    <Text className=" font-extrabold">Payment Method</Text>

                    <View className="mt-2 flex justify-between items-center flex-row space-x-3">
                        <View>
                            <Checkbox
                                label="Minimum Amount"
                                value={isMinPayment}
                                onValueChange={handleMinPaymentChange}
                                color='black'
                            />
                        </View>
                        <View>
                            <Checkbox
                                label="Maximum Amount"
                                value={isMaxPayment}
                                onValueChange={handleMaxPaymentChange}
                                color='black'
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => router.push("CommonScreens/Authentication/LoginScreen")} className="mt-4 flex-row items-center justify-center bg-black p-2 rounded-full h-14">
                        <Text className="text-white text-lg font-bold">Proceed to Payment: <Text className="text-white">₹{paymentAmount.toFixed(2)}</Text></Text>
                        <Ionicons name="arrow-forward" size={20} color="white" className="ml-2" />
                    </TouchableOpacity>
                </View>
            </View> */}
        </SafeAreaView>
    );
}
