import React, { useState } from 'react';
import { View, Text, Card, Button, Image } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';
import { ServerURL } from '../Services/ServerServices';
import { color_green, color_lightBlue, formatToIndianDate, scaleHeight, scaleWidth } from '../Global/Global';

const SubscriptionHistory = () => {
    const [activeTab, setActiveTab] = useState('active');
    const newDate = formatToIndianDate(new Date());

    const subscriptionData = [
        {
            id: 1,
            image: 'a2-gir-cow-milk-glass-bottle--500x500.webp',
            count: 30,
            label: 'Stock At Beginning',
        },
        {
            id: 2,
            image: 'a2-gir-cow-milk-glass-bottle--500x500.webp',
            count: 27,
            label: 'Stock Delivered',
        },
        {
            id: 3,
            image: 'a2-gir-cow-milk-glass-bottle--500x500.webp',
            count: 3,
            label: 'Stock In Hand',
        },
        {
            id: 4,
            image: 'a2-gir-cow-milk-glass-bottle--500x500.webp',
            count: 4,
            label: 'Empty Bottles',
        },
    ];

    const filteredData = activeTab === 'active' ? subscriptionData : subscriptionData.filter(item => item.label === 'Stock Delivered');

    return (
        <View style={{ height: 600, backgroundColor: color_lightBlue }}>
            <View style={{ display: "flex", padding: 20, backgroundColor: "white" }}>
                {/* Toggle buttons for Active and Inactive tabs */}
                <View style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", margin: 15 }}>
                    <Button
                        label="Active"
                        onPress={() => setActiveTab('active')}
                        backgroundColor={activeTab === 'active' ? color_green : '#DDD'}
                        marginR-10
                    />
                    <Button
                        label="Inactive"
                        onPress={() => setActiveTab('inactive')}
                        backgroundColor={activeTab === 'inactive' ? color_green : '#DDD'}
                    />
                </View>

                <View row spread marginB-10>
                    <Text text70>Today's Date:</Text>
                    <Text text70>{newDate}</Text>
                </View>
                <View row spread marginB-10>
                    <Text text70>Subscription Date:</Text>
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                        <Text text70>{newDate}</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>-</Text>
                        <Text text70>{newDate}</Text>
                    </View>
                </View>

                {/* Scrollable list of cards */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {filteredData.map((item) => (
                        <Card key={item.id} marginB-15 padding-15 style={{ display: 'flex', justifyContent: "space-between", flexDirection: 'row', alignItems: 'center' }} >
                            <Image
                                source={{ uri: `${ServerURL}/images/${item.image}` }}
                                style={styles.image}
                                resizeMode="contain"
                            />
                            <View style={{ width: 170 }}>
                                <Text text60 style={{ fontWeight: "bold", textAlign: "right" }}>{item.count}</Text>
                                <Text text80 style={{ fontWeight: "bold", textAlign: "right" }}>{item.label}</Text>
                            </View>
                        </Card>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: scaleWidth(90),
        height: scaleHeight(90),
    },
});

export default SubscriptionHistory;
