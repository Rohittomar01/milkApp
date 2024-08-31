import React from 'react'
import { View } from 'react-native-ui-lib'
import SlideBar from '../Screens/User/Category/SlideBar'
import ShowProducts from '../Screens/User/Category/ShowProducts'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function ShowCategory() {


    return (
        <SafeAreaView>
            <View className=" bg-white flex flex-row h-[86vh] mt-[-22px]">
                <View className=' h-[86vh] rounded-full' >
                    <SlideBar />
                </View>
                <View>
                    <ShowProducts />
                </View>
            </View>
        </SafeAreaView>
    )
}
