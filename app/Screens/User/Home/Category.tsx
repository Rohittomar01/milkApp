import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Dimensions, useWindowDimensions, ListRenderItem, ImageBackground } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import { Link } from 'expo-router';
import { getData, ServerURL } from '../../../Services/ServerServices';
import useCategoryStore from '../../../store/useCategory';
import object from 'react-native-ui-lib/src/style/colorName';
import { ResizeMode } from 'expo-av';
import { scaleHeight, scaleWidth, scaleFont } from '../../../Global/Global';

interface CategoryItem {
  _id: string;
  image: string;
  name: string;
}

const Category: React.FC = () => {
  const { setCategory } = useCategoryStore();
  const [categoryData, setCategoryData] = useState<CategoryItem[]>([]);
  const windowWidth = useWindowDimensions().width;

  // Adjust item width based on screen size
  const itemWidth = windowWidth < 400 ? windowWidth / 3 - 28 : 80;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getData('category/allCategory_Fetch');
        if (response.status) {
          setCategoryData(response.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategory: ListRenderItem<CategoryItem> = useCallback(({ item }) => (
    <Link
      onPress={() => setCategory(item.name)}
      key={item._id}
      href={{ pathname: 'ShowCategory' }}
      style={{ width: itemWidth, margin: 8 }}
    >
      {/* <View style={{
        padding: scaleWidth(8),
        borderRadius: scaleWidth(10),
        alignItems: 'center',
        marginVertical: scaleHeight(5),
        width: scaleWidth(77),
        height: scaleHeight(93),
      }}> */}
      <ImageBackground
        source={require("../../../../assets/Background.png")}
        style={{
          width: itemWidth,
          height: itemWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        resizeMode="cover"
      >
        <Image
          source={{ uri: `${ServerURL}/images/${item.image}` }}
          resizeMode="cover"
          style={{ width: itemWidth, height: itemWidth }}
        />
      </ImageBackground>
      <Text
        style={{
          textAlign: 'center',
          fontSize: scaleFont(13),

        }}
      >
        {item.name
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </Text>
    </Link>
  ), [setCategory, itemWidth]);

  const getItemLayout = useCallback((_: any, index: any) => ({
    length: itemWidth + 40,
    offset: (itemWidth + 40) * index,
    index,
  }), [itemWidth]);

  return (
    <View className="bg-white flex justify-center items-center mt-2 pt-4 pb-6">
      <FlatList
        data={categoryData}
        renderItem={renderCategory}
        keyExtractor={(item) => item._id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        initialNumToRender={5}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default React.memo(Category);
