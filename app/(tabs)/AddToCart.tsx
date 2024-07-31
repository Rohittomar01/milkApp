import React from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SubscriptionCard from '../Screens/User/AddtoCart/SubcriptionCard'
import PaymentDetails from '../Screens/User/AddtoCart/PaymentDetails'
import PopularProducts from '../Screens/User/Home/Popular_Products'
import Couple from '../Screens/User/AddtoCart/Couple'

interface CardItem {
    id: number;
    title: string;
    description: string;
    price: string;
    oldPrice: string;
    imageUrl: string;
}
export default function AddToCart() {
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
            <ScrollView className=' bg-slate-100 mt-[-25px]'>
                <View>
                    <SubscriptionCard />
                </View>
                <View>
                    <Couple />
                </View>
                <View>
                    <PaymentDetails />
                </View>
                <View>
                    <PopularProducts heading="Similar Product" data={cards} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
