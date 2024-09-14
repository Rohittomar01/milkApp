import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SplashScreen from './Screens/User/Starter/SplashScreen'
export default function index() {
    return (
        <SafeAreaView>
            <View>
                <SplashScreen />
            </View>
        </SafeAreaView>
    )
}
