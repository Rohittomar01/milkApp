import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Card } from 'react-native-ui-lib';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import useCategoryStore from '../../../store/useCategory';
import { ServerURL } from '../../../Services/ServerServices';
import { calculateDiscountPercentage, theme_color } from '../../../Global/Global';
import { capitalizeEachWord, color_gray, color_green, scaleFont, scaleMargin } from '../../../Global/Global';


interface CardItem {
  _id: string;
  productId: string;
  title: string;
  description: string;
  product: {
    category: {
      name: string;
    };
    description: string;
    title: string;
  }
  submitted_by: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  discount: number;
  quantity: number;
  image: string;
  item_type: string;
}

interface PopularProductsProps {
  heading: string;
  data: CardItem[];
}


const PopularProducts: React.FC<PopularProductsProps> = ({ heading, data }) => {
  const { setCategory } = useCategoryStore();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth < 400 ? screenWidth / 2 - 20 : 160;

  const handlePress = () => {
    router.push("ShowCategory")
    setCategory("")
  }

  const renderCards = useCallback(({ item }: { item: CardItem }) => {
    const unit = item.product.category.name.toLowerCase().includes("ghee") ? 'lit' : 'kg';
    const isOutOfStock = item.stock === 0;
    return (
      <Card
        disabled={isOutOfStock}
        onPress={() => {
          if (!isOutOfStock) {
            router.push({
              pathname: "Screens/User/ProductDetails/ProductDetails",
              params: { productId: JSON.stringify(item.productId) }
            });
          }
        }}
        key={item._id}
        elevation={6}
        enableShadow={!isOutOfStock}  // Disable shadow if out of stock
        style={{
          margin: 8,
          padding: 10,
          borderRadius: 10,
          width: cardWidth,
          backgroundColor: '#FFF'
        }}
      >
        <View style={{ position: 'relative' }}>
          {isOutOfStock && (
            <View style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: '#FF4D4D',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
              zIndex: 1
            }}>
              <Text style={{ color: '#FFF', fontSize: scaleFont(12) }}>Out of Stock</Text>
            </View>
          )}
          <Image
            source={{ uri: `${ServerURL}/images/${item.image}` }}
            style={{ height: cardWidth * 0.75, width: '100%', borderRadius: 8 }}
          />
        </View>
        <Text style={{ marginTop: scaleMargin(8), fontSize: scaleFont(16), fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">
          {capitalizeEachWord(item.product.title)}
        </Text>
        <Text style={{ fontSize: scaleFont(12), color: color_gray }} numberOfLines={1} ellipsizeMode="tail">
          {item.product.description}
        </Text>
        <Text style={{ fontSize: scaleFont(12), color: '#6B7280' }} numberOfLines={1} ellipsizeMode="tail">
          {item.quantity} {unit}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: color_green }}>
            ₹{(item.price - item.discount).toFixed(2)}
          </Text>
          <Text style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 8, textDecorationLine: 'line-through' }}>
            ₹{item.price}
          </Text>
          <Text style={{ fontSize: scaleFont(12), color: color_green, marginLeft: scaleMargin(8) }}>
            {calculateDiscountPercentage(item.price, item.discount)}% off
          </Text>
        </View>
        <TouchableOpacity
          disabled={isOutOfStock}
          onPress={() => {
            if (!isOutOfStock) {
              router.push({
                pathname: "Screens/User/ProductDetails/ProductDetails",
                params: { productId: JSON.stringify(item.productId) }
              });
            }
          }}
          style={{ marginTop: 8, backgroundColor: isOutOfStock ? '#D1D5DB' : theme_color, paddingVertical: 8, borderRadius: 6 }}
        >
          <Text style={{ color: '#FFF', textAlign: 'center' }}>Add</Text>
        </TouchableOpacity>
      </Card>
    );
  }, [cardWidth]);


  return (
    <View style={{ backgroundColor: '#FFF', marginTop: 10, paddingTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingLeft: cardWidth / 9, paddingRight: cardWidth / 9 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{heading}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="chevron-forward-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderCards}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        getItemLayout={(data, index) => (
          { length: cardWidth + 16, offset: (cardWidth + 16) * index, index }
        )}
      />
    </View>
  );
};

export default PopularProducts;
