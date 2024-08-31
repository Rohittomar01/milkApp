import React from 'react';
import { View, Text, Button, Image } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const EmptyCart = () => {

    return (
        <View className="flex-1 justify-center items-center bg-white ">
            <Image
                source={{ uri: 'https://cdn-icons-png.freepik.com/512/5586/5586545.png' }} // Replace with your image URL
                className="h-64 w-64"
            />
            <Text className="text-xl font-bold mt-4">Your cart is Empty :(</Text>
            <Text className="text-center text-gray-500 mt-2">
                Looks like you haven't made your choice yet.
                {'\n'}Please continue shopping.
            </Text>
            <TouchableOpacity onPress={() => router.push("ShowCategory")} className="bg-black px-6 py-3 mt-6 rounded-full">
                <Text className="text-white text-lg">Shop Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EmptyCart;
