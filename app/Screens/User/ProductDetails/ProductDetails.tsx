import React from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Details_Section from './Details_Section';
import DeliveryForm from './DeliveryForm';
import ProductDetailsCarousel from './ProductDetailsCarousel';

// Define the type for your items
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

export default function ProdductDetails() {
    const { productData } = useLocalSearchParams();

    const parsedProductData: Product = JSON.parse(productData as string);

    const data: Product[] = [parsedProductData];

    console.log('product data', productData);

    return (
        <ScrollView className=' bg-blue-50'>
            <View>
                <ProductDetailsCarousel data={data}/>
            </View>
            <View>
                <Details_Section data={parsedProductData} />
            </View>
            <View>
                <DeliveryForm data={parsedProductData} />
            </View>
        </ScrollView>
    );
}
