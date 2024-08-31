import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { View, FlatList, TouchableOpacity, ListRenderItem, ImageBackground } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import { getData, ServerURL } from '../../../Services/ServerServices';
import useCategoryStore from '../../../store/useCategory';
import { scaleWidth, scaleHeight, scaleFont, color_white, color_lightGreen, color_gray } from '../../../Global/Global';

interface CategoryItem {
    _id: string;
    image: string;
    name: string;
}

export default function SlideBar() {
    const { category, setCategory } = useCategoryStore();
    const [selectedId, setSelectedId] = useState<string>("");
    const [categoryData, setCategoryData] = useState<CategoryItem[]>([]);

    const fetchCategory = useCallback(async () => {
        try {
            const response = await getData("category/allCategory_Fetch");
            if (response.status) {
                setCategoryData(response.categories);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const handleSelect = useCallback((item: CategoryItem) => {
        setSelectedId(item._id);
        setCategory(item.name);
    }, [setCategory]);

    const renderCategory: ListRenderItem<CategoryItem> = useCallback(({ item }) => {
        const isSelected = item.name === category;

        return (
            <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={{
                    padding: scaleWidth(4),
                    borderRadius: scaleWidth(10),
                    alignItems: 'center',
                    backgroundColor: isSelected ? color_lightGreen : color_white,
                    marginVertical: scaleHeight(5),
                    width: scaleWidth(85),
                    height: scaleHeight(97),
                    justifyContent: "center"
                }}
            >
                <ImageBackground
                    source={require("../../../../assets/Background.png")}
                    style={{
                        width: scaleWidth(79),
                        height: scaleHeight(79),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    resizeMode="cover"
                >
                    <Image
                        resizeMode="contain"
                        source={{ uri: `${ServerURL}/images/${item.image}` }}
                        style={{
                            width: scaleWidth(80),
                            height: scaleWidth(53),
                            borderRadius: scaleWidth(10),
                        }}
                    />
                </ImageBackground>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: scaleFont(13),
                        color: isSelected ? color_white : color_gray,
                    }}
                >
                    {item.name
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                </Text>
            </TouchableOpacity>
        );
    }, [selectedId, category, handleSelect]);

    return (
        <View style={{ alignItems: 'center', width: scaleWidth(84) }}>
            <FlatList
                data={categoryData}
                renderItem={renderCategory}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id.toString()}
                contentContainerStyle={{ paddingHorizontal: 0 }}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={100}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => ({
                    length: scaleHeight(80),
                    offset: scaleHeight(80) * index,
                    index,
                })}
            />
        </View>
    );
}
