import React from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import NavBar from '../CommonScreens/NavBar'
import HomeCarousel from '../Screens/User/Home/HomeCarousel'
import PopularProducts from '../Screens/User/Home/Popular_Products'
import Category from '../Screens/User/Home/Category'
import Video_Slider from '../Screens/User/Home/Video_Slider'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


interface CardItem {
  id: number;
  title: string;
  description: string;
  price: string;
  oldPrice: string;
  imageUrl: string;
}
export default function Index() {

  const cards: CardItem[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    description: '1 LTR 10.0 % off',
    price: `₹${(100 + index * 10).toFixed(2)}`,
    oldPrice: `₹${(110 + index * 10).toFixed(2)}`,
    imageUrl: 'https://static.wixstatic.com/media/1a2594_238ac51e79d143bb882f894011f5be29~mv2.jpg/v1/fill/w_560,h_554,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1a2594_238ac51e79d143bb882f894011f5be29~mv2.jpg',
  }));

  return (
    <SafeAreaView>
      <ScrollView className=' bg-slate-100 '>
        <View >
          <NavBar />
        </View>
        <View>
          <HomeCarousel />
        </View>
        <View>
          <Category />
        </View>
        <View>
          <PopularProducts heading="Popular Product" data={cards} />
        </View>
        <View>
          <Video_Slider />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
