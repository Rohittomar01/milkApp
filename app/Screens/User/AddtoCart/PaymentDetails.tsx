import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Checkbox } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed

const PaymentDetails = () => {
    const price = 3300.00;
    const discount = 330.00;
    const deliveryCharges = 0.00;
    const totalPrice = price - discount + deliveryCharges;

    return (
        <Card className="p-6 mt-2 bg-white">
            <Text className="text-lg font-bold text-black">Payment Details</Text>
            <View className="mt-4">
                <View className="flex-row justify-between">
                    <Text className="text-base">Price (1 item)</Text>
                    <Text className="text-base">₹{price.toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between mt-2">
                    <Text className="text-base">Discount</Text>
                    <Text className="text-base text-green-700">- ₹{discount.toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between mt-2">
                    <Text className="text-base">Delivery Charges</Text>
                    <Text className="text-base">Free</Text>
                </View>
                <View className="border-t border-gray-200 my-2" />
                <View className="flex-row justify-between mt-2">
                    <Text className="text-lg font-bold">Total Amount</Text>
                    <Text className="text-lg font-bold">₹{totalPrice.toFixed(2)}</Text>
                </View>
            </View>
            <Text className="mt-4 text-center text-green-700">
                You will save on ₹{discount.toFixed(2)} on this order
            </Text>

        </Card>
    );
};

export default PaymentDetails;
