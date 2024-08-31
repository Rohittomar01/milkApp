import React from 'react';
import { Image } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

const PaymentSuccess = () => {
    const router = useRouter()
    return (
        <View className="flex-1 justify-center items-center  bg-white">
            <View className="  rounded-full mb-2 bg-white">
                <Image
                    source={{ uri: 'https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif' }}

                    className="rounded-full  h-60 w-60"
                />
            </View>

            <Text className="text-xl font-semibold mb-2">Payment Successful</Text>
            <Text className="text-base text-gray-600 mb-8">Thank you for shopping with us!!</Text>

            <TouchableOpacity onPress={() => router.push("(tabs)")} className=" px-6 py-3 rounded-full flex flex-row">
                <Text className="text-green-900 text-lg font-semibold">Continue to shop</Text>
                <Feather name="arrow-right" size={32} color="#365E32" />
            </TouchableOpacity>
        </View>
    );
};

export default PaymentSuccess;
