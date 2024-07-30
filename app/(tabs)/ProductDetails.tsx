import React from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from '../Screens/User/Home/Carousel'
import Details_Section from '../Screens/User/ProductDetails/Details_Section'
import DeliveryForm from '../Screens/User/ProductDetails/DeliveryForm'
export default function ProdductDetails() {
    return (
        <SafeAreaView>
            <ScrollView className=' bg-slate-100'>
                <View>
                    <Carousel />
                </View>
                <View>
                    <Details_Section />
                </View>
                <View>
                    <DeliveryForm />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
