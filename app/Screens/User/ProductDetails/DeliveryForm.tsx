import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

import { useForm, Controller } from 'react-hook-form';
import { Button, Text, TouchableOpacity, DateTimePicker, TextField } from 'react-native-ui-lib';

const DeliveryForm = () => {

    const currentDate = new Date();
    const monthsToAdd = 1;
    const endDate = new Date(currentDate);
    endDate.setMonth(currentDate.getMonth() + monthsToAdd);

    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            deliveryShift: 'Morning',
            quantity: 1,
            planType: 'Daily',
            days: [] as string[],
            startDate: new Date(),
            endDate: endDate,
        },
    });

    const planType = watch('planType');
    const days = watch('days');

    const updateDays = (planType: string) => {
        if (planType === 'Daily') {
            setValue('days', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        } else if (planType === 'Alternate Days') {
            setValue('days', ['Sun', 'Tue', 'Thu', 'Sat']);
        } else {
            // Custom selection remains unchanged
        }
    };

    useEffect(() => {
        updateDays(planType);
    }, [planType]);

    const handleDayPress = (day: string) => {
        if (planType === 'Custom') {
            const newDays = days.includes(day)
                ? days.filter((d: string) => d !== day)
                : [...days, day];
            setValue('days', newDays);
        }
    };

    const isDayDisabled = (day: string) => {
        if (planType === 'Daily') return true;
        if (planType === 'Alternate Days') return !days.includes(day);
        return false;
    };

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <View className="mt-2">
            <View className="flex justify-between items-center flex-row bg-white p-6">
                <Text className="text-lg font-bold mb-2">Total Price</Text>
                <Text className="text-right text-lg font-bold">₹99.00</Text>
            </View>

            <View className="p-6 bg-white mt-2">
                <Text className="text-lg font-bold mb-2">Select Delivery Shift</Text>
                <View className='flex justify-between w-full flex-row items-center'>
                    <View>
                        <Controller
                            name="deliveryShift"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TouchableOpacity
                                    onPress={() => onChange(value === 'Morning' ? 'Evening' : 'Morning')}
                                    className={`py-4 w-24 px-4 rounded-full ${value === 'Morning' ? 'bg-black' : 'bg-gray-800'}`}
                                >
                                    <Text className="text-white text-center">{value}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View>
                        <Controller
                            name="quantity"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <View className="flex-row items-center">
                                    <TouchableOpacity onPress={() => onChange(Math.max(1, value - 1))}>
                                        <Text className="text-lg font-bold text-green-600  ">-</Text>
                                    </TouchableOpacity>
                                    <Text className="mx-4">{value}</Text>
                                    <TouchableOpacity onPress={() => onChange(value + 1)}>
                                        <Text className="text-lg font-bold text-green-600">+</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>

            <View className="p-6 bg-white mt-2">
                <Text className="text-lg font-bold mb-2">Plan Type</Text>
                <Controller
                    name="planType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View className="flex-row mb-4">
                            {['Daily', 'Alternate Days', 'Custom'].map((type) => (
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
                    name="days"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View className="flex-row flex-wrap">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <TouchableOpacity
                                    key={day}
                                    onPress={() => handleDayPress(day)}
                                    disabled={isDayDisabled(day)}
                                    className={`py-2 px-4 m-1 rounded-full ${isDayDisabled(day) ? 'bg-green-800' : value.includes(day) ? 'bg-green-800' : 'bg-gray-500'}`}
                                >
                                    <Text className={`text-white ${isDayDisabled(day) ? 'text-white' : ''}`}>{day}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                />
            </View>
            <View className="p-6 mt-2 bg-white flex justify-between flex-row items-center">
                <View className='flex flex-col'>
                    <Text className="text-lg font-bold ">Start From</Text>
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DateTimePicker
                                value={value}
                                minimumDate={new Date()}
                                onChange={(date: Date) => onChange(date)}
                                placeholder={'Select Start date'}
                                mode={'date'}

                            />)}

                    />
                </View>

                <View>
                    <Text className="text-lg font-bold">End With</Text>
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DateTimePicker
                                value={value}
                                minimumDate={new Date()}
                                onChange={(date: Date) => onChange(date)}
                                placeholder={'Select End date'}
                                mode={'date'}

                            />
                        )}
                    />
                </View>
            </View>

            <View className="p-6 bg-white mt-2">
                <Text className="text-lg font-bold mb-2">Note:</Text>
                <Text className="text-sm text-gray-400">Pure A2 Buffalo Milk: Powerhouse of Nutrition</Text>
            </View>
            <View className="p-4 bg-white">
                <Button label="Submit" className="bg-black" onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    );
};

export default DeliveryForm;
