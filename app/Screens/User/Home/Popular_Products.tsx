import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-ui-lib';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { ServerURL } from '../../../Services/ServerServices';

interface CardItem {
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


interface PopularProductsProps {
  heading: string;
  data: CardItem[];
}

const PopularProducts: React.FC<PopularProductsProps> = ({ heading, data }) => {
  const renderCards = ({ item }: { item: CardItem }) => {
    return (
      <Card onPress={() => router.push({
        pathname: "Screens/User/ProductDetails/ProductDetails",
        params: { productData: JSON.stringify(item) }
      })} key={item._id} elevation={6} enableShadow className="m-2 p-2 rounded-lg w-40">
        <Image source={{ uri: `${ServerURL}/images/${item.image}` }} className="h-28 w-full rounded-lg" />
        <Text className="mt-2 text-lg font-bold" numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-500">{item.description}</Text>
        <View className="flex flex-row items-center mt-1">
          <Text className="text-lg font-bold text-green-600">₹{(parseFloat(item.price) - parseFloat(item.discount))}</Text>
          <Text className="text-sm text-gray-400 ml-2 line-through">₹{item.price}</Text>
          <Text className="text-sm text-green-400 ml-2">{item.discount}% off</Text>
        </View>
        <TouchableOpacity onPress={() => router.push({
          pathname: "Screens/User/ProductDetails/ProductDetails",
          params: { productData: JSON.stringify(item) }
        })} className="mt-2 bg-black py-2 rounded-lg">
          <Text className="text-white text-center">Add</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View className="  p-4 bg-white mt-2 ">
      <View className="flex justify-between flex-row">
        <Text className="text-xl font-bold mb-4">{heading}</Text>
        <TouchableOpacity>
          <Ionicons onPress={() => router.push("ShowCategory")} name="chevron-forward-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-wrap flex-row">
        <FlatList
          data={data}
          renderItem={renderCards}
          keyExtractor={item => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
        />
      </View>
    </View>
  );
}

export default PopularProducts;
