import React from 'react'
import { View } from 'react-native-ui-lib'
import SlideBar from '../Screens/User/Category/SlideBar'
import ShowProducts from '../Screens/User/Category/ShowProducts'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function ShowCategory() {


    return (
        <SafeAreaView>
            <View className=" bg-white flex flex-row h-[86vh]">
                <View className='mt-[-22px] h-[86vh] rounded-full' >
                    <SlideBar />
                </View>
                <ScrollView className='mt-[-22px]'>
                    <View>
                        <ShowProducts />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
