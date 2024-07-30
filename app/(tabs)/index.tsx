import React from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import NavBar from '../CommonScreens/NavBar'
import Carousel from '../Screens/User/Home/Carousel'
import Popular_Products from '../Screens/User/Home/Popular_Products'
import Category from '../Screens/User/Home/Category'
import Video_Slider from '../Screens/User/Home/Video_Slider'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function Index() {
  return (
    <SafeAreaView>
      <ScrollView className=' bg-slate-100 '>
        <View >
          <NavBar />
        </View>
        <View>
          <Carousel />
        </View>
        <View>
          <Category />
        </View>
        <View>
          <Popular_Products />
        </View>
        <View>
          <Video_Slider />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
