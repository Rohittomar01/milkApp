import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import { Link } from 'expo-router';
import { getData, ServerURL } from '../../../Services/ServerServices';
import useCategoryStore from '../../../store/useCategory';

interface CategoryItem {
    _id: string;
    image: string;
    name: string;
}



export default function Category() {
    const { setCategory } = useCategoryStore()
    const [categoryData, setCategoryData] = useState<any>([])

    
    const renderCategory = ({ item }: { item: CategoryItem }) => {
    
    
        return (
            <Link
                onPress={() => setCategory(item.name)}
                key={item._id}
                href={{
                    pathname: 'ShowCategory',
                }}
                style={{ backgroundColor: 'white', width: 80, margin: 16 }}
            >
                <View>
                    <Image
                        source={{ uri: `${ServerURL}/images/${item.image}` }}
                        className="w-20 h-20 rounded-lg"
                    />
                    <Text className="text-center mt-1 whitespace-nowrap overflow-ellipsis w-20 font-semibold text-gray-700">
                        {item.name}
                    </Text>
                </View>
            </Link >
        );
    };

    const fetchCategrory = async () => {
        try {
            const responce = await getData("category/allCategory_Fetch")
            if (responce.status) {
                setCategoryData(responce)
            }
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        fetchCategrory()
    }, [])


    return (
        <View className='bg-white flex justify-center items-center mt-2'>
            <FlatList
                data={categoryData.categories}
                renderItem={renderCategory}
                keyExtractor={item => item._id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
}
