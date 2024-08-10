import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import NavBar from '../CommonScreens/NavBar/NavBar'
import HomeCarousel from '../Screens/User/Home/HomeCarousel'
import PopularProducts from '../Screens/User/Home/Popular_Products'
import Category from '../Screens/User/Home/Category'
import Video_Slider from '../Screens/User/Home/Video_Slider'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getData } from '../Services/ServerServices'




interface carouselItems {
  _id: string;
  image: string;

}

interface PopularProduct {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  discount: string;
  category: string;
  quantity: number;
  submitted_by: string;
  createdAt: string;
  updatedAt: string;
}


const items: carouselItems[] = [
  { _id: "1", image: 'https://img.freepik.com/premium-photo/milk-minimal-poster-modern-background-with-organic-splash-dairy-banner-template-with-splashes_1206114-3158.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722297600&semt=ais_hybrid' },
  { _id: "2", image: 'https://img.freepik.com/premium-vector/3d-fresh-milk-ad-template_317442-1799.jpg' },
  { _id: "3", image: 'https://img.freepik.com/free-vector/farm-milk-poster_1284-74094.jpg' },
];
export default function Index() {
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await getData("product/allProducts_Fetch");
      setPopularProducts(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView className=' bg-slate-100 '>
        <View >
          <NavBar />
        </View>
        <View>
          <HomeCarousel data={items} />
        </View>
        <View>
          <Category />
        </View>
        <View>
          <PopularProducts heading="Popular Product" data={popularProducts} />
        </View>
        <View>
          <Video_Slider />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
