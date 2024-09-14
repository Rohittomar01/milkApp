import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button, Image } from 'react-native-ui-lib';
import { ServerURL } from '../Services/ServerServices';
import {
    capitalizeEachWord,
    color_green,
    color_lightBlue,
    color_red,
    formatToIndianDate,
    scaleHeight,
    scalePadding,
    scaleWidth,
    theme_color,
} from '../Global/Global';
import { getData } from '../Services/ServerServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateData } from '../Services/ServerServices';

interface UserData {
    message: string;
    signIn: {
        __v: number;
        _id: string;
        createdAt: string;
        email: string;
        gender: string;
        mobileNumber: string;
        name: string;
        updatedAt: string;
    };
    success: boolean;
}

interface Product {
    _id: string;
    title: string;
    description: string;
}

interface ProductDetails {
    _id: string;
    productId: string;
    image: string;
}

interface SubscriptionData {
    _id: string;
    subscription_id: string;
    subscription_started_at: string;
    subscription_ended_at: string;
    status: string;
    product: Product;
    productDetails: ProductDetails;
}

const SubscriptionHistory: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData[]>([]);
    const newDate = formatToIndianDate(new Date());
    const fetchUserData = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('@auth');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            } else {
                console.log('No user data found');
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
        }
    };

    const fetchSubscriptions = async () => {
        if (userData?.signIn._id) {
            try {
                const user_id = userData.signIn._id;
                const response = await getData(
                    `subscription/fetch_UserSubscriptions?user_id=${user_id}`
                );
                if (response.success) {
                    setSubscriptionData(response.subscriptions);
                } else {
                    console.error('Failed to fetch subscriptions:', response.message);
                }
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            fetchSubscriptions();
        }
    }, [userData]);

    const confirmCancel = (subscription_id: string) => {
        Alert.alert(
            "Confirm Cancellation",
            `Are you sure you want to ${activeTab === "active" ? "cancel" : "active"} this subscription?`,
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => handleCancel(subscription_id),
                    style: "destructive",
                },
            ]
        );
    };

    const handleCancel = async (subscription_id: string) => {
        const status = activeTab === "active" ? "inactive" : "active";
        try {
            await updateData(`subscription/subscriptionsUpdateBy_User/${subscription_id}`, { status });
            fetchSubscriptions();
        } catch (error) {
            console.error(`Error updating subscription ${subscription_id}:`, error);
        }
    };

    const handleComplaint = (subscription_id: string) => {
        console.log(`Complaint for subscription with ID: ${subscription_id}`);
    };

    const filteredData = subscriptionData.filter(
        (subscription) => subscription.status === activeTab
    );

    return (
        <View style={{ flex: 1, backgroundColor: color_lightBlue }}>
            <View style={{ padding: 20, backgroundColor: 'white' }}>
                {/* Toggle buttons for Active and Inactive tabs */}
                <View style={styles.tabContainer}>
                    <Button
                        label="Active"
                        onPress={() => setActiveTab('active')}
                        backgroundColor={activeTab === 'active' ? theme_color : '#DDD'}
                        marginR-10
                        style={{ width: scaleWidth(150) }}
                    />
                    <Button
                        label="Inactive"
                        onPress={() => setActiveTab('inactive')}
                        backgroundColor={activeTab === 'inactive' ? theme_color : '#DDD'}
                        style={{ width: scaleWidth(150) }}
                    />
                </View>

                <View style={styles.dateContainer}>
                    <Text text70>Today's Date:</Text>
                    <Text text70>{newDate}</Text>
                </View>

                {filteredData.length > 0 ? (
                    <>
                        <View style={styles.dateContainer}>
                            <Text text70>Subscription Date:</Text>
                            <View style={styles.subscriptionDate}>
                                <Text text70>
                                    {formatToIndianDate(new Date(filteredData[0].subscription_started_at))}
                                </Text>
                                <Text style={styles.dash}> - </Text>
                                <Text text70>
                                    {formatToIndianDate(new Date(filteredData[0].subscription_ended_at))}
                                </Text>
                            </View>
                        </View>

                        {/* Scrollable list of cards */}
                        <ScrollView style={{ height: scaleHeight(450) }} showsVerticalScrollIndicator={false}>
                            {filteredData.map((item, index) => (
                                <Card
                                    key={index}
                                    marginB-15
                                    padding-15
                                    style={styles.cardContainer}
                                >
                                    <Image
                                        source={{ uri: `${ServerURL}/images/${item.productDetails.image}` }}
                                        style={styles.image}
                                        resizeMode="contain"
                                    />
                                    <View style={styles.cardContent}>
                                        <Text text60 style={styles.productTitle}>
                                            {capitalizeEachWord(item.product.title)}
                                        </Text>
                                        <Text text80>
                                            Subscription ID: {item.subscription_id}
                                        </Text>
                                        <Text text80>
                                            Start Date: {formatToIndianDate(new Date(item.subscription_started_at))}
                                        </Text>
                                        <Text text80>
                                            End Date: {formatToIndianDate(new Date(item.subscription_ended_at))}
                                        </Text>

                                        <View style={styles.buttonContainer}>
                                            <Button
                                                style={{ width: scaleWidth(activeTab === "inactive" ? 200 : 50) }}
                                                label={`${activeTab === "inactive" ? "Active" : "Cancel"}`}
                                                onPress={() => confirmCancel(item.subscription_id)}
                                                backgroundColor={`${activeTab === "inactive" ? theme_color : color_red}`}
                                                marginR-10
                                            />
                                            {activeTab === 'active' && (
                                                <Button
                                                    label="Complaint"
                                                    onPress={() => handleComplaint(item.subscription_id)}
                                                    backgroundColor={theme_color}
                                                />
                                            )}
                                        </View>
                                    </View>
                                </Card>
                            ))}
                        </ScrollView>
                    </>
                ) : (
                    <View style={{ height: scaleHeight(480), display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text text70 style={styles.noSubscriptionsText}>
                            {activeTab === 'active' ? 'No active subscriptions' : 'No inactive subscriptions'}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: scalePadding(10),
        gap: 20
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    subscriptionDate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dash: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: scaleWidth(90),
        height: scaleHeight(90),
    },
    cardContent: {
        marginLeft: 10,
        flex: 1,
        gap: 5,
    },
    productTitle: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-start',
    },
    noSubscriptionsText: {
        textAlign: 'center',
        marginTop: 20,
        color: color_red,
    },
});

export default SubscriptionHistory;
