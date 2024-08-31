import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card, Checkbox, Icon } from 'react-native-ui-lib';
import { Rating } from 'react-native-ratings';
import Fontisto from '@expo/vector-icons/Fontisto';
import { deleteData, ServerURL } from '../../../Services/ServerServices';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { calculateDiscountPercentage } from '../../../Global/Global';
import { capitalizeEachWord } from '../../../Global/Global';

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
    }
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

interface SubscriptionCardProps {
    data: CartItem[];
    onAction: () => void | Promise<void>;
}

export default function SubscriptionCard({ data, onAction }: SubscriptionCardProps) {
    const router = useRouter();
    const [autoRenewal, setAutoRenewal] = React.useState(true);
    const [rating, setRating] = React.useState(5);

    const formatDateIndian = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleAutoRenewalChange = (checked: boolean) => {
        setAutoRenewal(checked);
    };

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };

    const handleRemove = async (item: CartItem) => {
        try {
            const response = await deleteData(`addtocart/addtocarts/delete/${item._id}/${item.user_id}`);
            if (response.message) {
                alert(response.message);
                await onAction();
            }
        } catch (error) {
            console.error("Error removing cart items:", error);
        }
    };

    const renderCard = (item: CartItem) => {

        const category = item.product.category.name.toLowerCase();
        const price = item.price;
        const discount = item.discount;
        const discountedPrice = price - discount;

        if (category && category.includes('milk')) {
            return (
                <Card className="p-6 mt-2" key={item._id}>
                    <View className="flex-row mb-4">
                        <Image
                            source={{ uri: `${ServerURL}/images/${item.image}` }}
                            className="w-28 h-28 mr-6 rounded-lg"
                        />
                        <View className="flex-1 ml-3">
                            <Text className="text-lg font-bold">{capitalizeEachWord(item.product.title)}</Text>
                            <Text className="text-sm">Qt. {item.quantity} kg</Text>
                            <View className="flex-row items-center mt-1">
                                <Rating
                                    startingValue={rating}
                                    imageSize={20}
                                    onFinishRating={handleRatingChange}
                                    style={{ marginRight: 8 }}
                                />
                                <Text>({rating.toFixed(1)})</Text>
                            </View>
                            <View className="flex-row space-x-2 mt-1">
                                <Text className="text-base font-bold text-green-700">
                                    ₹{discountedPrice.toFixed(2)}{' '}
                                </Text>
                                <Text className="text-gray-500 text-base line-through">₹{price.toFixed(2)}</Text>
                                <Text className="text-green-700 text-base">{calculateDiscountPercentage(price, discount)}% off</Text>
                            </View>
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
                        <View className="gap-1 w-60">
                            <View className="flex flex-row items-center mb-2 space-x-5">
                                <Text className="font-bold w-32">Total Price</Text>
                                <Text className="text-lg">:</Text>
                                <Text className="text-sm">₹{item.total_price * 30}</Text>
                            </View>
                            <View className="flex flex-row items-center mb-2 space-x-5">
                                <Text className="font-bold w-32">Total Delivery days</Text>
                                <Text className="text-lg">:</Text>
                                <Text className="text-sm">{item.total_days.length} Days</Text>
                            </View>
                            <View className="flex-row items-center space-x-5">
                                <Text className="text-sm font-bold w-32">Delivery</Text>
                                <Text className="text-lg">:</Text>
                                <Text className="text-sm">{item.deliveryShift}</Text>
                            </View>
                            <View className="flex-row items-center space-x-5">
                                <Text className="text-sm font-bold w-32">Plan Type</Text>
                                <Text className="text-lg">:</Text>
                                <Text className="text-sm">{item.plant_type}</Text>
                            </View>
                            <View className="flex-row justify-between items-center space-x-5">
                                <Text className="text-sm font-bold w-32">Subscription Date</Text>
                                <Text className="text-lg">:</Text>
                                <Text className="text-sm">
                                    {formatDateIndian(item.subscription_started_at as string)} <Text className='font-bold'> - </Text>{formatDateIndian(item.subscription_ended_at as string)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className="border-t border-gray-200 mt-5" />
                    <View className="flex justify-between items-center mt-2">
                        <View className="flex-row justify-between items-center w-[80vw]">
                            <TouchableOpacity
                                onPress={() => router.push({
                                    pathname: "Screens/User/ProductDetails/ProductDetails",
                                    params: { addtoCartData: JSON.stringify(item) }
                                })}
                                className='flex-row space-x-2 items-center p-2'
                            >
                                <Icon
                                    source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/linear-icon-23/another-change-3.png" }}
                                    size={20}
                                />
                                <Text className='text-gray-600'>Change</Text>
                            </TouchableOpacity>
                            <Text className='text-gray-400 text-[22px]'>|</Text>
                            <TouchableOpacity onPress={() => handleRemove(item)} className="flex-row items-center space-x-2">
                                <Fontisto name="shopping-basket-remove" size={20} color="gray" />
                                <Text className="text-gray-600">Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            );
        } else {
            return (
                <View key={item._id}>
                    <Card className="p-4 mt-2">
                        <View className="flex-row mb-4 items-center justify-center space-x-4">
                            <Image
                                source={{ uri: `${ServerURL}/images/${item.image}` }}
                                className="w-28 h-28 rounded-lg"
                            />
                            <View className="flex-1 ml-4">
                                <Text className="text-lg font-bold">{item.product.title}</Text>
                                <Text className="text-sm">Qt. {item.quantity}</Text>
                                <View className="flex-row items-center mt-1">
                                    <Rating
                                        startingValue={rating}
                                        imageSize={20}
                                        onFinishRating={handleRatingChange}
                                        style={{ marginRight: 8 }}
                                    />
                                    <Text>({rating.toFixed(1)})</Text>
                                </View>
                                <View className="flex-row space-x-2 mt-1">
                                    <Text className="text-base font-bold text-green-700">
                                        ₹{discountedPrice.toFixed(2)}{' '}
                                    </Text>
                                    <Text className="text-gray-500 text-base line-through">₹{price.toFixed(2)}</Text>
                                    <Text className="text-green-700 text-base">{discount}% off</Text>
                                </View>
                            </View>
                        </View>
                        <View className='flex justify-end items-end'>
                            <View className="flex-row items-end justify-start space-x-4 w-60">
                                <TouchableOpacity className="flex justify-center items-center bg-black p-2 w-10 rounded-lg">
                                    <FontAwesome6 name="minus" size={16} color="white" />
                                </TouchableOpacity>
                                <Text className='text-center h-6 font-semibold'>{item.quantity}</Text>
                                <TouchableOpacity className="bg-black justify-center items-center p-2 w-10 rounded-lg">
                                    <MaterialIcons name="add" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="border-t border-gray-200 mt-5" />
                        <View className="flex justify-between items-center mt-2">
                            <View className="flex-row justify-between items-center w-[80vw]">
                                <TouchableOpacity
                                    onPress={() => router.push({
                                        pathname: "Screens/User/ProductDetails/ProductDetails",
                                        params: { addtoCartData: JSON.stringify(item) }
                                    })}
                                    className='flex-row space-x-2 items-center p-2'
                                >
                                    <Icon
                                        source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/linear-icon-23/another-change-3.png" }}
                                        size={20}
                                    />
                                    <Text className='text-gray-600'>View</Text>
                                </TouchableOpacity>
                                <Text className='text-gray-400 text-[22px]'>|</Text>
                                <TouchableOpacity onPress={() => handleRemove(item)} className="flex-row items-center space-x-2">
                                    <Fontisto name="shopping-basket-remove" size={20} color="gray" />
                                    <Text className="text-gray-600">Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </View>
            );
        }
    };

    return (
        <View className="space-y-4">
            {data.map((item) => renderCard(item))}
        </View>
    );
}
