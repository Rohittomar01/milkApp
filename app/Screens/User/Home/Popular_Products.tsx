import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-ui-lib';

interface CardItem {
  id: number;
  title: string;
  description: string;
  price: string;
  oldPrice: string;
  imageUrl: string;
}

export default function PopularProducts() {
  const cards: CardItem[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    description: '1 LTR 10.0 % off',
    price: `₹${(100 + index * 10).toFixed(2)}`,
    oldPrice: `₹${(110 + index * 10).toFixed(2)}`,
    imageUrl: 'https://static.wixstatic.com/media/1a2594_238ac51e79d143bb882f894011f5be29~mv2.jpg/v1/fill/w_560,h_554,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1a2594_238ac51e79d143bb882f894011f5be29~mv2.jpg',
  }));

  const renderCards = ({ item }: { item: CardItem }) => {
    return (
      <Card key={item.id} elevation={6} enableShadow className="m-2 p-2 rounded-lg w-40">
        <Image source={{ uri: item.imageUrl }} className="h-28 w-full rounded-lg" />
        <Text className="mt-2 text-lg font-bold">{item.title}</Text>
        <Text className="text-sm text-gray-500">{item.description}</Text>
        <View className="flex flex-row items-center mt-1">
          <Text className="text-lg font-bold text-green-600">{item.price}</Text>
          <Text className="text-sm text-gray-400 ml-2 line-through">{item.oldPrice}</Text>
        </View>
        <TouchableOpacity className="mt-2 bg-black py-2 rounded-lg">
          <Text className="text-white text-center">Add</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View className="  p-4 bg-white mt-2 ">
      <View className="flex justify-between flex-row">
        <Text className="text-xl font-bold mb-4">Popular Products</Text>
        <View>
          <Icon source={{ uri: "https://cdn1.iconfinder.com/data/icons/essential-29/24/arrow-ios-forward-512.png" }} size={35} />
        </View>
      </View>
      <View className="flex flex-wrap flex-row">
        <FlatList
          data={cards}
          renderItem={renderCards}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
        />
      </View>
    </View>
  );
}
