import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Button, Checkbox, Dividers } from 'react-native-ui-lib';
import { Rating } from 'react-native-ratings';

export default function SubscriptionCard() {
    const [autoRenewal, setAutoRenewal] = React.useState(false);
    const [rating, setRating] = React.useState(5);

    const handleAutoRenewalChange = (checked: boolean) => {
        setAutoRenewal(checked);
        console.log(`Auto renewal: ${checked}`);
    };

    const handleRatingChange = (rating: number) => {
        setRating(rating);
        console.log(`Rating: ${rating}`);
    };

    const handleChange = () => {
        console.log('Change button pressed');
    };

    const handleRemove = () => {
        console.log('Remove button pressed');
    };

    return (
        <View>
            <Card className="p-6 ">
                <View className="flex-row mb-4">
                    <Image
                        source={{ uri: 'https://static.wixstatic.com/media/1a2594_238ac51e79d143bb882f894011f5be29~mv2.jpg/v1/fill/w_560,h_554,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1a2594_238ac51e79d143bb882f894011f5be29~mv2.jpg' }}
                        className="w-24 h-24 mr-6 rounded-lg "
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-bold">A2 Buffalo Milk - 1 LTR</Text>
                        <Text className="text-sm">Qt. 1</Text>
                        <View className="flex-row items-center mt-1">
                            <Rating
                                startingValue={rating}
                                imageSize={20}
                                onFinishRating={handleRatingChange}
                                style={{ marginRight: 8 }}
                            />
                            <Text>({rating.toFixed(1)})</Text>
                        </View>
                        <Text className="text-base font-bold text-green-700 mt-1">
                            ₹ 99.00 <Text className="text-gray-500 line-through">₹ 110.00</Text> <Text className="text-green-700">10.0 % off</Text>
                        </Text>
                    </View>
                </View>
                <View className="mb-4 flex flex-row justify-between items-center mt-2">
                    <Text className="text-base font-bold text-black">Delivery Details</Text>
                    <Checkbox
                        label="Auto renewal"
                        value={autoRenewal}
                        onValueChange={handleAutoRenewalChange}
                        color="black"
                        className="mt-2"
                    />
                </View>
                <View className="mb-4">
                    <View className="grid grid-cols-3 gap-4 w-56">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-sm font-bold">Total Price</Text>
                            <Text className="text-sm">:</Text>
                            <Text className="text-sm">₹ 2970.00</Text>
                        </View>
                        <View className="flex-row justify-between items-center ">
                            <Text className="text-sm font-bold">Total Delivery days</Text>
                            <Text className="text-sm">:</Text>
                            <Text className="text-sm">30 Days</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-sm font-bold">Delivery Shifts</Text>
                            <Text className="text-sm">:</Text>
                            <Text className="text-sm">Morning 05:30 to 09:30</Text>
                        </View>
                        <View className="flex-row justify-between items-center ">
                            <Text className="text-sm font-bold">Plan Type</Text>
                            <Text className="text-sm">:</Text>
                            <Text className="text-sm">Daily</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-sm font-bold">Subscription Date</Text>
                            <Text className="text-sm">:</Text>
                            <Text className="text-sm">Thu 01 Aug 2024 - Fri 30 Aug 2024</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-row justify-between space-x-4">
                    <Button

                        label="Change"
                        onPress={handleChange}
                        className="flex-1  "
                    />
                    <Button
                        label="Remove"
                        onPress={handleRemove}
                        className="flex-1 "
                    />
                </View>
            </Card>
        </View>
    );
}
