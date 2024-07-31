import React from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import SlideBar from '../Screens/User/Category/SlideBar'
import ShowProducts from '../Screens/User/Category/ShowProducts'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
export default function ShowCategory() {

    const { item } = useLocalSearchParams()

    console.log("category", item)
    return (
        <SafeAreaView>
            <View className='mt-[-22px]'>
                <SlideBar />
            </View>
            <ScrollView className=' bg-slate-100'>
                <View>
                    <ShowProducts />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
