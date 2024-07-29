import React from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import NavBar from '../../CommonScreens/NavBar'
import CarouselComponent from './Carousel'
import Category from './Category'
import Popular_Products from './Popular_Products'
import Video_Slider from './Video_Slider'
import { ScrollView } from 'react-native'
export default function Index() {
  return (
    <ScrollView className=' bg-slate-100'>
      <View >
        <NavBar />
      </View>
      <View>
        <CarouselComponent />
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
  )
}
