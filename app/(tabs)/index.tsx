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
  description: string;
  started_date: Date;
  ended_date: Date;
  submitted_by: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PopularProduct {
  _id: string;
  productId: string;
  title: string;
  description: string;
  product: {
    category: {
      name: string;
    };
    description: string;
    title: string;
  }
  submitted_by: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  discount?: number;
}


export default function Index() {
  const [popularProducts, setPopularProducts] = useState<any>([]);
  const [carouselItems, setCarouselItems] = useState<carouselItems[]>([]);
  useEffect(() => {
    fetchProducts();
    fetchCarousel();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await getData("productDetails/allProductDetails_fetch");
      setPopularProducts(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCarousel = async () => {
    try {
      const response = await getData("carousel/fetchAllCarousels");
      setCarouselItems(response.carousels);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };



  return (
    <SafeAreaView>
      <ScrollView className=' bg-slate-100 '>
        <View>
          <NavBar />
        </View>
        <View>
          <HomeCarousel data={carouselItems} />
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
