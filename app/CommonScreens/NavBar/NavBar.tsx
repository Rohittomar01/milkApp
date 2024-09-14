import React, { useState, useEffect } from 'react';
import { TextInput, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon, Assets, Image, Card, Picker, View, Avatar } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';
import _ from "lodash";
import Menu from './Menu/Menu';
import Notification from './Notification/Notification';
import { getData, ServerURL } from '../../Services/ServerServices';
import { capitalizeEachWord, scaleFont, scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../Global/Global';
import LogoSvg from "../../../assets/logoSvg.svg"

interface Product {
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
}

const { width, height } = Dimensions.get("window");


export default function NavBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredCards, setFilteredCards] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(card => {
      const title = card.title || '';
      const description = card.description || '';
      const Price = card.price ? card.price.toString() : '';

      return (
        title.toLowerCase().includes(searchValue.toLowerCase()) ||
        description.toLowerCase().includes(searchValue.toLowerCase()) ||
        Price.includes(searchValue.toLowerCase())
      );
    });
    setFilteredCards(filtered);
  }, [searchValue, products]);


  const fetchProducts = async () => {
    try {
      const response = await getData("productDetails/allProductDetails_fetch");
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
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.innerContainer}>
          <Menu />
          <Avatar
            source={require('../../../assets/splash.png')}
            imageStyle={{ height: scaleHeight(58), width: scaleWidth(68) }}
            containerStyle={{ marginRight: scaleMargin(20), marginBottom: scaleMargin(25), marginTop: scaleMargin(10) }}
          />
          <Notification />
        </View>
      </Card>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Picker
            placeholder='Search here'
            style={styles.picker}
            useSafeArea
          >
            <View style={styles.searchInputContainer}>
              <TouchableOpacity style={styles.searchButton}>
                <TextInput
                  value={searchValue}
                  onChangeText={handleSearch}
                  placeholder="Search Here"
                  style={styles.searchInput}
                />
                <Icon
                  source={Assets.icons.search}
                  size={20}
                  tintColor="grey"
                  style={styles.searchIconOverlay}
                />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewStyle} >
              {_.map(filteredCards, (item: Product) => (

                <Card
                  onPress={() => router.push({
                    pathname: "Screens/User/ProductDetails/ProductDetails",
                    params: { productData: JSON.stringify(item)}
                  })}
                  key={item._id}
                  elevation={6}
                  style={styles.productCard}
                >
                  <View style={styles.productCardContent}>
                    <View style={styles.productImageContainer}>
                      <Image source={{ uri: `${ServerURL}/images/${item.image}` }} style={styles.productImage} />
                    </View>
                    <View>
                      <Text style={styles.productTitle}>{capitalizeEachWord(item.product.title)}</Text>
                      <Text numberOfLines={2} ellipsizeMode='tail' style={styles.productDescription}>{item.product.description}</Text>
                      <Text style={{ fontSize: scaleFont(15), color: '#6B7280', marginTop: scaleMargin(4) }} numberOfLines={1} ellipsizeMode="tail">
                        {item.quantity} {item.product.category.name.toLowerCase().includes("ghee") ? 'lit' : 'kg'}
                      </Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.discountedPrice}>₹{(item.price) - (item.discount)}</Text>
                        <Text style={styles.originalPrice}>₹{item.price}</Text>
                        <Text style={styles.discount}>{item.discount}% off</Text>
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
            style={styles.searchIconOverlay}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 8,
    paddingHorizontal: width * 0.05,
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: width * 0.05,
  },
  scrollViewStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: width * 0.2,
    height: height * 0.1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  searchBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 50,
    backgroundColor: 'white',
    height: 48,
    paddingLeft: 48,
    paddingRight: 16,
    position: 'relative',
  },
  picker: {
    marginTop: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  searchButton: {
    flex: 1,
    borderColor: '#D1D1D1',
    borderRadius: 50,
    backgroundColor: 'white',
    height: 48,
    paddingLeft: 48,
    paddingRight: 16,
    position: 'relative',
    borderWidth: 1
  },
  searchInput: {
    width: '100%',
    height: '100%'
  },
  searchIconOverlay: {
    position: 'absolute',
    left: 16,
    top: 24,
    transform: [{ translateY: -12 }],
  },
  productCard: {
    display: "flex",
    justifyContent: "center",
    padding: scalePadding(7),
    borderRadius: 8,
    width: width * 0.9,
  },
  productCardContent: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    padding: 8,
  },
  productImageContainer: {
    height: scaleHeight(90),
    width: scaleWidth(90),
  },
  productImage: {
    height: scaleHeight(90),
    width: scaleWidth(90),
    borderRadius: 8,
  },
  productTitle: {
    fontSize: width * 0.047,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: width * 0.035,
    color: '#7E7E7E',
    width: scaleWidth(200)
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  discountedPrice: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#228B22',
  },
  originalPrice: {
    fontSize: width * 0.035,
    color: '#A9A9A9',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discount: {
    fontSize: width * 0.035,
    color: '#32CD32',
    marginLeft: 8,
  },
});
