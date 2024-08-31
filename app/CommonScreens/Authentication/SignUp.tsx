import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Button, TextField, RadioButton, RadioGroup } from 'react-native-ui-lib';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { postData } from '../../Services/ServerServices';

const SignUpScreen = () => {

    const [message, setMessage] = useState(null)
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: 'dummy02@gmail.com',
            mobileNumber: '',
            gender: 'male',
        }
    });

    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    const onSubmit = async (data: any) => {
        const otp = generateOTP();
        console.log(data)

        console.log(data.mobileNumber);
        if (data.mobileNumber) {
            try {
                const result = await postData("users/checkUserExistence", { mobileNumber: data.mobileNumber })
                console.log(result.status)
                if (result.status === 1) {
                    setMessage(result.message);
                    alert(result.message)
                }
                else {
                    router.push({ pathname: "CommonScreens/Authentication/Verification", params: { signUpData: JSON.stringify(data), otp: JSON.stringify(otp) } });
                    Alert.alert("Your OTP", otp);
                }

            } catch (error) {
                console.error("Error in submitting user data:", error);
                Alert.alert("Error", "Failed to submit data. Please try again.");
            }
        } else {
            console.error("error occured during user signup", errors)
        }


    };

    return (
        <View className='bg-white h-[100vh]'>
            <View className="flex justify-center h-[75vh] bg-white p-6">
                <View className='flex-1 justify-center items-center'>
                    <Image source={require("../../../assets/splash.png")} className="w-36 h-36" />
                    <Text className="text-xl font-bold mb-4 text-center">Welcome to DUDHADI</Text>
                    <Text className="mb-8 text-center font-medium">SignUp</Text>
                </View>

                {/* Name Field */}
                <View className="mb-4">
                    <Controller
                        control={control}
                        rules={{ required: 'Name is required' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextField
                                    className="w-[85vw] border border-gray-300 p-3 mb-1 rounded-lg"
                                    placeholder="Name"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    showClearButton
                                    floatOnFocus
                                />
                                {errors.name && (
                                    <Text className="text-red-500 text-sm">
                                        {errors.name.message}
                                    </Text>
                                )}
                            </View>
                        )}
                        name="name"
                    />
                </View>

                {/* Email Field */}
                <View className="mb-4">
                    <Controller
                        control={control}
                        rules={{
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'A valid email is required.'
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextField
                                    className="w-[85vw] border border-gray-300 p-3 mb-1 rounded-lg"
                                    placeholder="Email (Optional)"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    showClearButton
                                    floatOnFocus
                                />
                                {errors.email && (
                                    <Text className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                    </Text>
                                )}
                            </View>
                        )}
                        name="email"
                    />
                </View>

                {/* Mobile Number Field */}
                <View className="flex-column w-full mb-4">
                    <View className='pl-2 h-[6.8vh] mb-3 border border-gray-300 rounded-lg w-[85vw]'>
                        <View className='flex flex-row'>
                            <Text className="text-lg mr-2 mt-2">+91</Text>
                            <Controller
                                control={control}
                                rules={{ required: 'Mobile number is required', pattern: /^[0-9]{10}$/ }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={{ flex: 1 }}>
                                        <TextField
                                            className="w-[70vw] h-12 rounded-lg"
                                            placeholder="Mobile Number"
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            keyboardType="numeric"
                                            showClearButton
                                            floatOnFocus
                                        />
                                    </View>
                                )}
                                name="mobileNumber"
                            />
                        </View>
                        {errors.mobileNumber && (
                            <Text className="text-red-500 text-sm mt-2 ml-[-10px]">
                                {errors.mobileNumber.message}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Gender Field with Black Radio Buttons */}
                <View className="mb-4">
                    <Text className="mb-2">Gender (Optional)</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <RadioGroup
                                onValueChange={onChange}
                                value={value}
                                className="flex-row flex-wrap space-x-5"
                            >
                                <RadioButton
                                    value="male"
                                    label="Male"
                                    color="black"
                                    labelStyle={{ color: 'black' }}
                                    className="mb-1"
                                />
                                <RadioButton
                                    value="female"
                                    label="Female"
                                    color="black"
                                    labelStyle={{ color: 'black' }}
                                    className="mb-1"
                                />
                                <RadioButton
                                    value="other"
                                    label="Other"
                                    color="black"
                                    labelStyle={{ color: 'black' }}
                                />
                            </RadioGroup>
                        )}
                        name="gender"
                    />
                </View>

                <View className='w-full'>
                    <Button label="Send Verification Code" onPress={handleSubmit(onSubmit)} className="bg-green-900 text-white py-3 px-4 rounded-full w-full" />
                </View>
            </View>
        </View>
    );
};

export default SignUpScreen;
