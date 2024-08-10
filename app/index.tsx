import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-ui-lib'
import StarterCarousel from './Screens/User/Starter/StarterCarousel'
import MapLocation from './Screens/User/MapLocation/MapLocation'

export default function index() {
    return (
        <SafeAreaView>
            <View>
                <StarterCarousel />
            </View>
        </SafeAreaView>
    )
}
