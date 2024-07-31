import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Checkbox } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed

const PaymentDetails = () => {
    const price = 3300.00;
    const discount = 330.00;
    const deliveryCharges = 0.00;
    const totalPrice = price - discount + deliveryCharges;

    const [isMinPayment, setIsMinPayment] = useState(false);
    const [isMaxPayment, setIsMaxPayment] = useState(true);
    const [paymentAmount, setPaymentAmount] = useState(totalPrice);

    const handleMinPaymentChange = () => {
        setIsMinPayment(!isMinPayment);
        if (!isMinPayment) {
            setIsMaxPayment(false);
            setPaymentAmount(1000.00);
        } else {
            setPaymentAmount(totalPrice);
        }
    };

    const handleMaxPaymentChange = () => {
        setIsMaxPayment(!isMaxPayment);
        if (!isMaxPayment) {
            setIsMinPayment(false);
            setPaymentAmount(totalPrice);
        } else {
            setPaymentAmount(totalPrice);
        }
    };

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
            <View className="mt-2 flex justify-between items-center flex-row space-x-3">
                <View >
                    <Checkbox
                        label="Minimum Amount"
                        value={isMinPayment}
                        onValueChange={handleMinPaymentChange}
                        color='black'
                    />
                </View>
                <View >
                    <Checkbox
                        label="Maximum Amount"
                        value={isMaxPayment}
                        onValueChange={handleMaxPaymentChange}
                        color='black'
                    />
                </View>
            </View>
            <TouchableOpacity className="mt-4 flex-row items-center justify-center bg-black p-2 rounded-lg h-14">
                <Text className="text-white text-lg font-bold">Proceed to Payment: <Text>₹{paymentAmount.toFixed(2)}</Text></Text>
                <Ionicons name="arrow-forward" size={20} color="white" className="ml-2" />
            </TouchableOpacity>
        </Card>
    );
};

export default PaymentDetails;
