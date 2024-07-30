import React from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SubscriptionCard from '../Screens/User/AddtoCart/SubcriptionCard'
export default function AddToCart() {
    return (
        <SafeAreaView>
            <View className='mt-[-22px]'>
                <SubscriptionCard />
            </View>
            <ScrollView className=' bg-slate-100'>
                <View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
