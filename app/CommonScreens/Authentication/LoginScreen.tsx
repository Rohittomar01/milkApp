import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';

const LoginScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      mobileNumber: ''
    }
  });

  const onSubmit = (data: any) => {
    router.push("CommonScreens/Authentication/Verification")
    console.log(data);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Image source={{ uri: 'https://png.pngtree.com/png-vector/20221207/ourmid/pngtree-dairy-food-logo-milk-yoghurt-and-lecho-farm-badges-design-with-png-image_6515855.png' }} className="w-36 h-36 mb-4" />
      <Text className="text-xl font-bold mb-4">Welcome to Milk Veda</Text>
      <Text className="mb-8">Login with Mobile Number</Text>
      <View className="flex-row items-center border-b border-gray-300 mb-8">
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
            />
          )}
          name="mobileNumber"
        />
      </View>
      {errors.mobileNumber && <Text className="text-red-600 mb-4">A valid 10-digit mobile number is required.</Text>}
      <View className='w-full mb-40'>
        <Button label="Send Verification Code" onPress={handleSubmit(onSubmit)} className="bg-black text-white py-2 px-4 rounded-full w-full" />
      </View>
    </View>
  );
};

export default LoginScreen;
