import React from 'react'
import { View, Icon, Text } from 'react-native-ui-lib'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Couple() {
    return (
        <View className=' bg-white p-6 '>
            <View className=' flex justify-between items-center flex-row'>
                <View className=' flex justify-between flex-row space-x-2 items-center'>
                    <MaterialIcons name="local-offer" size={24} color="black" />
                    <Text className=" text-lg font-bold ">Coupon Code </Text>
                </View>
                <View>
                    <AntDesign name="right" size={24} color="black" />
                </View>
            </View>
        </View>
    )
}
