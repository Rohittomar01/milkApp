import React, { useState, useEffect } from 'react';
import { TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Icon, Assets, Image, Card, Picker, View } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';
import _ from "lodash";
import Menu from './Menu/Menu';
import Notification from './Notification/Notification';
import { getData, ServerURL } from '../../Services/ServerServices';

interface Product {
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

export default function NavBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredCards, setFilteredCards] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(card =>
      card.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      card.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      card.price.toString().includes(searchValue.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchValue, products]);

  const fetchProducts = async () => {
    try {
      const response = await getData("product/allProducts_Fetch");
      setProducts(response.products);
      setFilteredCards(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };

  return (
    <View className="bg-white mt-2">
      <Card className="flex justify-between items-center rounded-lg pl-5 pr-5">
        <View className='w-full flex-1 flex-row justify-between items-center'>
          <Menu />
          <Image
            source={{ uri: 'https://png.pngtree.com/png-vector/20221207/ourmid/pngtree-dairy-food-logo-milk-yoghurt-and-lecho-farm-badges-design-with-png-image_6515855.png' }}
            className="w-14 h-20"
          />
          <Notification />
        </View>
      </Card>
      <View className="flex-row items-center justify-center space-x-2 p-4">
        <View className="flex-1 border border-gray-300 rounded-full w-auto bg-white relative h-12 pl-12 pr-4">
          <Picker
            placeholder='Search here'
            className='mt-2'
            useSafeArea
          >
            <View className="flex-row items-center justify-center space-x-2 p-4">
              <TouchableOpacity className="flex-1 border border-gray-300 rounded-full w-auto bg-white relative h-12 pl-12 pr-4">
                <TextInput
                  value={searchValue}
                  onChangeText={handleSearch}
                  placeholder="Search Here"
                  className="w-full h-full pr-4"
                />
                <Icon
                  source={Assets.icons.search}
                  size={20}
                  tintColor="grey"
                  className="absolute left-4 top-3.5 transform -translate-y-1/2"
                />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {_.map(filteredCards, (item: Product) => (
                <Card onPress={() => router.push({
                  pathname: "Screens/User/ProductDetails/ProductDetails",
                  params: { productData: JSON.stringify(item) }
                })} key={item._id} elevation={6} className="m-2 p-2 rounded-lg ">
                  <View className='flex flex-row justify-between items-center w-64 p-2 pl-4 space-x-3'>
                    <View className=" h-20  w-20" >
                      <Image source={{ uri: `${ServerURL}/images/${item.image}` }} className="h-20 w-20 rounded-lg" />
                    </View>
                    <View>
                      <Text className="text-lg font-bold">{item.title}</Text>
                      <Text className="text-sm text-gray-500">{item.description}</Text>
                      <View className="flex flex-row items-center mt-1">
                        <Text className="text-lg font-bold text-green-600">₹{(parseFloat(item.price) - parseFloat(item.discount))}</Text>
                        <Text className="text-sm text-gray-400 ml-2 line-through">₹{item.price}</Text>
                        <Text className="text-sm text-green-400 ml-2">{item.discount}</Text>
                      </View>
                    </View>
                  </View>
                </Card>
              ))}
            </ScrollView>
          </Picker>
          <Icon
            source={Assets.icons.search}
            size={20}
            tintColor="grey"
            className="absolute left-4 top-3.5 transform -translate-y-1/2"
          />
        </View>
      </View>
    </View>
  );
}
