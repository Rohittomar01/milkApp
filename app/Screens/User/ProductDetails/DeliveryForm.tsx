import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, Text, TouchableOpacity, DateTimePicker } from 'react-native-ui-lib';
import { router } from 'expo-router';
import { postData } from '../../../Services/ServerServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme_color } from '../../../Global/Global';

interface productData {
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
    total_price?: string;
    items?: number;
    plan_type: string;
    week_days: string[];
    subscription_started_at?: Date;
    subscription_ended_at?: Date;
}
interface userData {
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

interface Props {
    data: productData;
}




const DeliveryForm: React.FC<Props> = ({ data }) => {

    const [UserData, setUserData] = useState<userData | null>(null);
    const currentDate = new Date();
    const monthsToAdd = 1;
    const endDate = new Date(currentDate);
    endDate.setMonth(currentDate.getMonth() + monthsToAdd);



    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            deliveryShift: 'Morning',
            items: data.items ? data.items : 1,
            plan_type: data.items ? data?.plan_type : 'Daily',
            week_days: data.items ? data.week_days as string[] : [] as string[],
            subscription_started_at: data.subscription_started_at ? new Date(data.subscription_started_at) : new Date(),
            subscription_ended_at: data.subscription_ended_at ? new Date(data.subscription_ended_at) : endDate,
        },
    });


    const planType = watch('plan_type');
    const quantity = watch('items');
    const days = watch('week_days');
    const [alternateDaysToggle, setAlternateDaysToggle] = useState<boolean>(true);
    const [totalPrice, setTotalPrice] = useState<number>(data.price);
    const fetchUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem("@auth");
            if (userData) {
                setUserData(JSON.parse(userData));
            } else {
                console.log("No user data found");
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    };

    useEffect(() => {
        updateDays(planType);
    }, [planType]);

    useEffect(() => {
        const flexiblePrice = quantity * (data.price - data.discount);
        setTotalPrice(flexiblePrice);
        fetchUserData();
    }, [quantity, data.price]);

    const updateDays = (planType: string) => {
        if (planType === 'Daily') {
            setValue('week_days', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        } else if (planType === 'Alternate Days') {
            setValue('week_days', alternateDaysToggle ? ['Sun', 'Tue', 'Thu', 'Sat'] : ['Mon', 'Wed', 'Fri',]);
        } else {
            setValue('week_days', []);
        }
    };

    // const handleDayPress = (day: string) => {
    //     if (planType === 'Custom') {
    //         const newDays = days.includes(day)
    //             ? days.filter((d: string) => d !== day)
    //             : [...days, day];
    //         setValue('week_days', newDays);
    //     }
    // };

    const handleAlternateDaysPress = () => {
        if (planType === 'Alternate Days') {
            setAlternateDaysToggle(!alternateDaysToggle);
            setValue('week_days', !alternateDaysToggle ? ['Sun', 'Tue', 'Thu', 'Sat'] : ['Mon', 'Wed', 'Fri']);
        }
    };

    // const isDayDisabled = (day: string) => {
    //     if (planType === 'Daily') return true;
    //     if (planType === 'Alternate Days') return days.includes(day);
    //     return false;
    // };

    const onSubmit = async (formData: any) => {
        if (UserData && UserData.signIn._id) {
            const product_id: string = data._id
            const total_price = totalPrice
            const submitted_by = "user"
            const user_id = UserData && UserData.signIn._id;
            const total_days = formData.plant_type === "Daily" ? 30 : 15;
            const calculatedPrice = formData.plant_type === "Daily" ? totalPrice * 30 : total_price * 15;
            const submittedData = { ...formData, total_price, product_id, total_days, user_id, calculatedPrice, submitted_by };
            console.log(submittedData);
            try {
                const response = await postData("addtocart/addtocarts_add", submittedData);
                alert(response.message)
                router.push("AddToCart")
            } catch (error) {
                console.error(error)
            }
        }
        else {
            router.push("CommonScreens/Authentication/LoginScreen")
        }

    };

    return (
        <View className="mt-2">
            <View className="flex justify-between items-center flex-row bg-white p-6">
                <Text className="text-lg font-bold mb-2">Total Price</Text>
                <Text className="text-right text-lg font-bold">₹{totalPrice.toFixed(2)}</Text>
            </View>
            <View className="p-6 bg-white mt-2">
                <Text className="text-lg font-bold mb-2">Select Delivery Shift</Text>
                <View className='flex justify-between w-full flex-row items-center'>
                    {data.product.category.name.toLowerCase().includes("milk") ? (<View>
                        <Controller
                            name="deliveryShift"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TouchableOpacity
                                    onPress={() => onChange('Morning')}
                                    className={`py-4 w-24 px-4 rounded-full bg-black`}
                                >
                                    <Text className="text-white text-center">Morning</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    ) : (
                        <Text className="text-black text-center font-bold text-lg">Quantity</Text>
                    )}
                    <View>
                        <Controller
                            name="items"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <View className="flex-row items-center">
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newValue = Math.max(1, value - 1);
                                            onChange(newValue);
                                        }}
                                    >
                                        <FontAwesome6 name="minus" size={20} color="green" />
                                    </TouchableOpacity>
                                    <Text className="mx-4">{value}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newValue = value + 1;
                                            onChange(newValue);
                                        }}
                                    >
                                        <MaterialIcons name="add" size={24} color="green" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>
            {data.product.category.name.toLowerCase().includes("milk") ? (
                <View className="p-6 bg-white mt-2">
                    <Text className="text-lg font-bold mb-2">Plan Type</Text>
                    <Controller
                        name="plan_type"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View className="flex-row mb-4">
                                {['Daily', 'Alternate Days'].map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        onPress={() => {
                                            onChange(type);
                                            updateDays(type);
                                        }}
                                        className={`py-2 px-4 m-1 rounded-full ${value === type ? 'bg-black' : 'bg-gray-500'}`}
                                    >
                                        <Text className="text-white">{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                    <Controller
                        name="week_days"
                        control={control}
                        render={({ field: { value } }) => (
                            <View className="flex-row flex-wrap">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <TouchableOpacity
                                        key={day}
                                        onPress={() => {
                                            if (planType === 'Alternate Days') {
                                                handleAlternateDaysPress();
                                            }
                                            // else {
                                            //     handleDayPress(day);
                                            // }
                                        }}
                                        disabled={value.includes(day)}
                                        className={`py-2 px-4 m-1 rounded-full  ${value.includes(day) ? 'bg-green-800' : 'bg-gray-500'}`}
                                    >
                                        <Text className="text-white">{day}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                </View>
            ) : null}

            {data.product.category.name.toLowerCase().includes("milk") ? (<View className="p-6 mt-2 bg-white flex justify-between flex-row items-center">
                <View className="flex flex-col">
                    <Text className="text-lg font-bold mb-2">Start From</Text>
                    <View>
                        <Controller
                            name="subscription_started_at"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DateTimePicker
                                    value={value}
                                    minimumDate={new Date()}
                                    onChange={(date: Date) => onChange(date)}
                                    placeholder={'Select Start date'}
                                    mode={'date'}
                                    className=' border border-gray-300 rounded-lg p-2'

                                />
                            )}
                        />
                    </View>
                </View>

                <View className="flex flex-col">
                    <Text className="text-lg font-bold mb-2">End With</Text>
                    <View>
                        <Controller
                            name="subscription_ended_at"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DateTimePicker
                                    value={value}
                                    minimumDate={new Date()}
                                    maximumDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                                    onChange={(date: Date) => onChange(date)}
                                    placeholder={'Select End date'}
                                    mode={'date'}
                                    className=' border border-gray-300 rounded-lg p-2'
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
            ) : null}

            <View className="p-6 bg-white mt-2">
                <Text className="text-lg font-bold mb-2">Note:</Text>
                <Text className="text-sm text-gray-400">Pure A2 Buffalo Milk: Powerhouse of Nutrition</Text>
            </View>
            <View className="p-4 bg-white">
                <Button label="Add to cart" style={{ backgroundColor: theme_color }} onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    );
};

export default DeliveryForm;
