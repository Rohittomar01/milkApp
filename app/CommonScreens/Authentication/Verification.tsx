import React, { useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';

const Verification = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
    }
  });



  const onSubmit = (data: any) => {
    router.push("Screens/User/MapLocation/MapLocation")
    console.log(data);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6 mt-1">
      <Image source={{ uri: 'https://example.com/logo.png' }} className="w-24 h-24 mb-4" />
      <Text className="text-xl font-bold mb-4">Verification</Text>
      <Text className="text-center mb-8">We have sent the verification code on your mobile number</Text>
      <View className="flex-row justify-between mb-8">
        {['code1', 'code2', 'code3', 'code4'].map((field, index) => (
          <Controller
            key={index}
            control={control}
            rules={{ required: true, maxLength: 1, pattern: /^[0-9]$/ }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="w-12 h-12 bg-gray-200 text-center text-xl"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={1}
              />
            )}
            name={field}
          />
        ))}
      </View>
      {Object.keys(errors).length > 0 && (
        <Text className="text-red-600 mb-4">All fields are required and must be numbers.</Text>
      )}
      <View className=' flex flex-row gap-2'>
        <Text className="text-black">Didn't receive verification code?</Text>
        <TouchableOpacity ><Text className=' text-orange-400'>Resend Code</Text></TouchableOpacity>
      </View>
      <View className='mt-4 w-full mb-44'>
        <Button label="Submit" onPress={handleSubmit(onSubmit)} className="bg-black text-white py-2 px-4 rounded-full w-full" />
      </View>
    </View >
  );
};

export default Verification;
