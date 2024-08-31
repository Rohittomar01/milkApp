import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import StarterCarousel from './Screens/User/Starter/StarterCarousel'
export default function index() {
    return (
        <SafeAreaView>
            <View>
                <StarterCarousel />
            </View>
        </SafeAreaView>
    )
}
