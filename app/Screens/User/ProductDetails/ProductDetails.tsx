import React from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from '../Home/HomeCarousel'
import Details_Section from './Details_Section'
import DeliveryForm from './DeliveryForm'
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
