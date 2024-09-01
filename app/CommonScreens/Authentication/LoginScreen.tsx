import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { postData } from '../../Services/ServerServices';

const LoginScreen = () => {
  const [message, setMessage] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      mobileNumber: ''
    }
  });

  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  };

  const onSubmit = async (data: any) => {
    const otp = generateOTP();
    if (data.mobileNumber) {
      try {
        const result = await postData("users/checkUserExistence", { mobileNumber: data.mobileNumber })
        // console.log(result)
        if (result.status === 1) {
          router.push({ pathname: "CommonScreens/Authentication/Verification", params: { signUpData: JSON.stringify(result), otp: JSON.stringify(otp) } });
          alert(otp);
        }
        else {
          alert(result.message)
        }

      } catch (error) {
        console.error("Error in  user loggin:", error);
      }
    }
    else {
      console.log("enter mobile number ")
    }
  };

  return (
    <View className="flex h-full justify-center items-center bg-white p-6">
      <Image source={require("../../../assets/splash.png")} className="w-36 h-36 mb-4 object-contain mt-[-12vh]" />
      <Text className="text-xl font-bold mb-4">Welcome to DUDHADI</Text>
      <Text className="mb-8">Login with Mobile Number</Text>
      <View >
        <View className='flex-row border-gray-300 mb-2 w-80 border p-3 rounded-lg'>
          <Text className="text-lg">+91</Text>
          <Controller
            control={control}
            rules={{ required: true, pattern: /^[0-9]{10}$/ }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="flex-1 ml-2 text-lg"
                placeholder="Mobile Number"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={10}
              />
            )}
            name="mobileNumber"
          />
        </View>
        {errors.mobileNumber && <Text className="text-red-600 mb-4">A valid 10-digit mobile number is required.</Text>}
      </View>

      <View className='w-full mt-6'>
        <Button label="Send Verification Code" onPress={handleSubmit(onSubmit)} className="bg-green-900 py-2 px-4 rounded-full w-full" />
      </View>
      <View className='mt-4 flex flex-row space-x-1'>
        <Text>If this is your first visit,</Text>
        <TouchableOpacity onPress={() => router.push("CommonScreens/Authentication/SignUp")}>
          <Text className="text-blue-500">Sign Up Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
