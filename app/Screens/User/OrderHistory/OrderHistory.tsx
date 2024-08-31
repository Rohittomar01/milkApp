import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Card, Colors, Button } from 'react-native-ui-lib';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { color_gray, color_green, color_lightBlue, formatToIndianDate, scaleHeight, scaleMargin, scaleWidth } from '../../../Global/Global';
import { ServerURL } from '../../../Services/ServerServices';
// Define the type for each cart item
interface CartItem {
    user_id: string;
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
    };
    submitted_by: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
    discount: number;
    quantity: number;
    image: string;
    total_days: string[];
    auto_renewal: boolean;
    total_price: number;
    rating: number;
    deliveryShift: string;
    deliveryAddress: string;
    subscription_started_at?: string;
    subscription_ended_at?: string;
    plant_type: string;
}

const ordersData: CartItem[] = [
    // Sample data
    {
        user_id: '1',
        _id: '1',
        productId: '101',
        title: 'Product A',
        description: 'Description of Product A',
        product: {
            category: { name: 'Category A' },
            description: 'Product A Description',
            title: 'Product A Title',
        },
        submitted_by: 'User A',
        price: 500,
        stock: 10,
        createdAt: '2024-08-01T00:00:00Z',
        updatedAt: '2024-08-01T00:00:00Z',
        discount: 50,
        quantity: 1,
        image: 'product_a.jpg',
        total_days: ['Monday', 'Wednesday', 'Friday'],
        auto_renewal: false,
        total_price: 450,
        rating: 4,
        deliveryShift: 'Morning',
        deliveryAddress: 'Address A',
        subscription_started_at: '2024-08-01T00:00:00Z',
        subscription_ended_at: '2024-08-31T00:00:00Z',
        plant_type: 'Type A',
    },
    {
        user_id: '2',
        _id: '2',
        productId: '102',
        title: 'Product B',
        description: 'Description of Product B',
        product: {
            category: { name: 'Category B' },
            description: 'Product B Description',
            title: 'Product B Title',
        },
        submitted_by: 'User B',
        price: 600,
        stock: 5,
        createdAt: '2024-08-02T00:00:00Z',
        updatedAt: '2024-08-02T00:00:00Z',
        discount: 60,
        quantity: 2,
        image: 'cashew-peanut-curd.png',
        total_days: ['Tuesday', 'Thursday', 'Saturday'],
        auto_renewal: true,
        total_price: 540,
        rating: 5,
        deliveryShift: 'Evening',
        deliveryAddress: 'Address B',
        subscription_started_at: '2024-08-02T00:00:00Z',
        subscription_ended_at: '2024-08-30T00:00:00Z',
        plant_type: 'Type B',
    },
    // Add more items as needed
];

const OrderHistory: React.FC = () => {
    const [filter, setFilter] = useState<'pending' | 'delivered'>('pending'); // Default filter is 'pending'
    const router = useRouter();
    const currentDate = formatToIndianDate(new Date());

    // Simulating status filtering
    const filteredOrders = ordersData.filter((order) => {
        // Assume orders with even index are 'delivered' and odd index are 'pending'
        return (filter === 'delivered' && ordersData.indexOf(order) % 2 === 0) ||
            (filter === 'pending' && ordersData.indexOf(order) % 2 !== 0);
    });

    const renderItem = ({ item }: { item: CartItem }) => (
        <Card elevation={4} key={item._id} style={styles.card}>
            <View style={styles.cardContent}>
                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                    <Image source={{ uri: `${ServerURL}/images/${item.image}` }} style={styles.image} />
                    <View style={styles.orderDetails}>
                        <Text style={styles.orderTitle}>{item.title}</Text>
                        <Text style={styles.orderDescription}>{item.description}</Text>
                        <Text style={styles.orderPrice}>Price: ₹{item.price}</Text>
                        <Text style={styles.orderQuantity}>Quantity: {item.quantity}</Text>
                    </View>
                    <View>
                        {filter === 'pending' ? (
                            <Ionicons name="time" size={24} color="orange" />
                        ) : (
                            <MaterialIcons name="check-circle" size={24} color="green" />
                        )}
                    </View>
                </View>
            </View>
            {/* <View style={styles.buttonContainer}>
                <Button
                    onPress={() => router.push({
                        pathname: "Screens/User/ProductDetails/ProductDetails",
                        params: { addtoCartData: JSON.stringify(item) }
                    })}
                    style={styles.viewButton}
                    label="View"
                    iconSource={() => <FontAwesome5 name="eye" size={20} color="black" />}
                />
                <Button
                    onPress={() => handleRemove(item)}
                    style={styles.removeButton}
                    label="Remove"
                    iconSource={() => <FontAwesome5 name="trash" size={20} color="black" />}
                />
            </View> */}
        </Card>
    );

    const handleRemove = (item: CartItem) => {
        // Handle item removal
    };

    return (
        <View style={{flex:1,backgroundColor:color_lightBlue}}>
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>Today's Date: {currentDate}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setFilter('pending')}
                        style={[styles.button, filter === 'pending' && styles.activeButton]}
                    >
                        <Text style={[filter === 'pending' && styles.activeButtonText]}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setFilter('delivered')}
                        style={[styles.button, filter === 'delivered' && styles.activeButton]}
                    >
                        <Text style={[filter === 'delivered' && styles.activeButtonText]}>Delivered</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredOrders}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    ListEmptyComponent={<Text style={styles.emptyText}>No orders found</Text>}
                />
            </View>
            </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color_lightBlue,
        marginTop:"1%"
    },
    innerContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    dateContainer: {
        alignItems: 'center',
        marginVertical: scaleHeight(2),
        marginTop: 20,
      
    },
    dateText: {
        fontSize: scaleWidth(15),
        color: 'black',
        marginBottom:scaleMargin(12)
    },

    button: {
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(25),
        borderRadius: scaleWidth(25),
        backgroundColor: '#DDD',
        margin: '4%',
    },
    activeButton: {
        backgroundColor: color_green,
    },
    activeButtonText: {
        color: 'white',
    },
    card: {
        width: "100%",
        height: scaleHeight(150),

    },
    cardContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: scaleHeight(10),

    },
    image: {
        width: scaleWidth(90),
        height: scaleHeight(80),
        borderRadius: 5,
        objectFit: "fill"
    },
    orderDetails: {
        flex: 1,
        paddingHorizontal: scaleWidth(10),
    },
    orderTitle: {
        fontSize: scaleWidth(16),
        fontWeight: 'bold',
        color: 'black',
    },
    orderDescription: {
        fontSize: scaleWidth(14),
        color: 'gray',
    },
    orderPrice: {
        fontSize: scaleWidth(14),
        fontWeight: 'bold',
        color: 'black',
    },
    orderQuantity: {
        fontSize: scaleWidth(14),
        color: 'black',
    },
    iconContainer: {
        // marginHorizontal: scaleWidth(1),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(10),
        paddingBottom: scaleHeight(10),
        marginVertical: scaleHeight(2),
    },
    viewButton: {
        backgroundColor: color_green,
        marginHorizontal: scaleWidth(5),
    },
    removeButton: {
        backgroundColor: 'red',
        marginHorizontal: scaleWidth(5),
    },
    emptyText: {
        textAlign: 'center',
        marginVertical: scaleHeight(10),
        fontSize: scaleWidth(16),
        color: 'gray',
    },


});


export default OrderHistory;
