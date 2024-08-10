import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';
import { getData, ServerURL } from '../../../Services/ServerServices';
import useCategoryStore from '../../../store/useCategory';
import { ScrollView } from 'react-native';


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

export default function ShowProducts() {

    const { category } = useCategoryStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredCards, setFilteredCards] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getData("product/allProducts_Fetch");
            setProducts(response.products);
            setFilteredCards(response.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        const filtered = products.filter(card =>
            card.category.toLowerCase().includes(category.toLowerCase())
        );
        setFilteredCards(filtered);
    }, [category, products]);



    const renderCards = () => {
        return filteredCards.map((item) => {
            return (
                <Card onPress={() => router.push({
                    pathname: "Screens/User/ProductDetails/ProductDetails",
                    params: { productData: JSON.stringify(item) }
                })}
                    key={item._id} elevation={6} className="m-1 p-2 rounded-lg w-36">
                    <Image source={{ uri: `${ServerURL}/images/${item.image}` }} className="h-28 w-full rounded-lg" />
                    <Text className="mt-2 text-lg font-bold" numberOfLines={1} ellipsizeMode="tail">
                        {item.title}
                    </Text>
                    <Text className="text-sm text-gray-500">{item.description}</Text>
                    <View className="flex flex-row items-center mt-1">
                        <Text className="text-sm font-bold text-green-600">₹{parseFloat(item.price) - parseFloat(item.discount)}</Text>
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
        })
    };

    return (
        <View className=" bg-white">
            <View className='flex flex-row flex-wrap justify-center mb-7'>
                {renderCards()}
            </View>
        </View>
    );
}
