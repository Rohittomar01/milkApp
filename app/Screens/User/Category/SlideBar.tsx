import { useState, useEffect } from 'react';
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import { getData, ServerURL } from '../../../Services/ServerServices';
import useCategoryStore from '../../../store/useCategory';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CategoryItem {
    _id: string;
    image: string;
    name: string;
}


export default function SlideBar() {

    const { category, setCategory } = useCategoryStore()
    const [selectedId, setSelectedId] = useState<string>(""); // Default selection

    const [categoryData, setCategoryData] = useState<any>([])

    const fetchCategrory = async () => {
        try {
            const responce = await getData("category/allCategory_Fetch")
            if (responce.status) {
                setCategoryData(responce.categories)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchCategrory()

    }, [])

    const handleSelect = (item: CategoryItem) => {

        setSelectedId(item._id)
        setCategory(item.name)

    }
    const renderCategory = ({ item }: { item: CategoryItem }) => {
        let isSelected = false

        if (category) {
            isSelected = item.name == category;
        }
        else {
            isSelected = item._id === selectedId
        }

        return (
            <TouchableOpacity
                onPress={() => handleSelect(item)}
                className={`p-2   rounded-lg items-center  ${isSelected ? 'bg-blue-50 ' : 'bg-white'}`}
            >
                <Image
                    resizeMode="contain"
                    source={{ uri: `${ServerURL}/images/${item.image}` }}
                    className="w-16 h-16 rounded-lg"
                />
                <Text className="text-center mt-1">
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View className=" flex items-center w-20">
            <FlatList
                data={categoryData}
                renderItem={renderCategory}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id.toString()}
                contentContainerStyle={{ paddingHorizontal: 0 }}
            />
        </View>
    );
}
