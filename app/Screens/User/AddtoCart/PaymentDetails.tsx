import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, RadioButton, RadioGroup } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { calculateDiscountPercentage } from '../../../Global/Global';
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
    total_days: string[];
    auto_renewal: boolean;
    total_price: number;
    rating: number;
    deliveryShift: string;
    deliveryAddress: string;
    subscription_started_at?: string;
    subscription_ended_at?: string;
    plant_type: string;
}

interface PaymentCardProps {
    data: CartItem[];
}

const PaymentDetails = ({ data }: PaymentCardProps) => {

    const router = useRouter();

    const totalPrice = data.reduce((acc, item) => {
        const isMilkCategory = item.product.category.name.toLowerCase().includes("milk");
        return acc + (isMilkCategory ? item.total_price * 30 : item.total_price);
    }, 0);

    const totalDiscount = data.reduce((acc, item) => acc + item.discount, 0);
    const finalPrice = totalPrice - totalDiscount;

    const [paymentMethod, setPaymentMethod] = useState('max');
    const [paymentAmount, setPaymentAmount] = useState(finalPrice);

    useEffect(() => {
        if (paymentMethod === 'min') {
            setPaymentAmount(finalPrice * 0.5);
        } else {
            setPaymentAmount(finalPrice);
        }
    }, [paymentMethod, finalPrice]);

    return (
        <Card className="p-6 mt-2 bg-white">
            <Text className="text-lg font-bold text-black">Payment Details</Text>
            <View className="mt-4">
                <View className="flex-row justify-between">
                    <Text className="text-base">Price (item: {data.length})</Text>
                    <Text className="text-base">₹{totalPrice.toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between mt-2">
                    <Text className="text-base">Discount</Text>
                    <Text className="text-base text-green-700">{calculateDiscountPercentage(totalPrice, totalDiscount).toFixed(2)}%</Text>
                </View>
                <View className="flex-row justify-between mt-2">
                    <Text className="text-base">Delivery Charges</Text>
                    <Text className="text-base">Free</Text>
                </View>
                <View className="border-t border-gray-200 my-2" />
                <View className="flex-row justify-between mt-2">
                    <Text className="text-lg font-bold">Total Amount</Text>
                    <Text className="text-lg font-bold">₹{finalPrice.toFixed(2)}</Text>
                </View>
            </View>
            <Text className="mt-2 text-green-700">
                You will save ₹{totalDiscount.toFixed(2)} on this order
            </Text>
            <View className='mt-4'>
                {/* <Text className="font-extrabold">Payment Method</Text> */}

                <View className="mt-2">
                    <RadioGroup
                        onValueChange={setPaymentMethod}
                        value={paymentMethod}
                        defaultValue="max"
                        direction="row"
                        color="black"
                        labelStyle={{ color: 'black' }}
                        label="Payment Method"
                        labelColor="black"
                        size={20}
                        activeColor="black"
                        inactiveColor="black"
                        selectedColor="black"
                        selectedLabelColor="black"
                        className="flex flex-row space-x-3"
                    >
                        <RadioButton
                            value="min"
                            label="Minimum Amount"
                            color="black"
                            labelStyle={{ color: 'black' }}
                        />
                        <RadioButton
                            value="max"
                            label="Maximum Amount"
                            color="black"
                            labelStyle={{ color: 'black' }}
                        />
                    </RadioGroup>
                </View>

                <TouchableOpacity onPress={() => router.push("CommonScreens/Authentication/LoginScreen")} className="mt-4 flex-row items-center justify-center bg-black p-2 rounded-full h-14">
                    <Text className="text-white text-lg font-bold">Proceed to Payment: <Text className="text-white">₹{paymentAmount.toFixed(2)}</Text></Text>
                    <Ionicons name="arrow-forward" size={20} color="white" className="ml-2" />
                </TouchableOpacity>
            </View>
        </Card>
    );
};

export default PaymentDetails;
