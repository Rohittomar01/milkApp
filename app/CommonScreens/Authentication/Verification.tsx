import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { useForm, Controller } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import { postData } from '../../Services/ServerServices';

interface SignUpData {
  name?: string;
  email?: string;
  mobileNumber: string;
  gender?: string;
  otp?: string;
}

const Verification = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
    }
  });

  const { signUpData, otp }: any = useLocalSearchParams();

  const [signUp_Data, setSignUp_Data] = useState<SignUpData>(
    signUpData ? JSON.parse(signUpData) : { name: '', email: '', mobileNumber: '', gender: '' }
  );
  const [errorMessage, setErrorMessage] = useState('');


  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  const onSubmit = async (data: any) => {
    const enteredOTP = `${data.code1}${data.code2}${data.code3}${data.code4}`;

    if (signUp_Data.name) {
      if (enteredOTP === JSON.parse(otp)) {
        try {
          await postData("users/signUp", signUp_Data).then(() => {
            router.push("Screens/User/MapLocation/MapLocation");
          });
        } catch (error) {
          console.error("Error in submitting user data:", error);
          Alert.alert("Error", "Failed to submit data. Please try again.");
        }
      }
      else {
        setErrorMessage('OTP does not match. Please try again.');
      }
    }
    else {
      router.push("AddToCart")
    }
  };

  const handleInputChange = (value: string, index: number) => {
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6 mt-1">
      <Image source={{ uri: 'https://example.com/logo.png' }} className="w-24 h-24 mb-4" />
      <Text className="text-xl font-bold mb-4">Verification</Text>
      <Text className="text-center mb-8">We have sent the verification code to your mobile number</Text>
      <View className="flex-row justify-between mb-8">
        {['code1', 'code2', 'code3', 'code4'].map((field, index) => (
          <Controller
            key={index}
            control={control}
            rules={{ required: 'Required', maxLength: 1, pattern: /^[0-9]$/ }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={(ref) => inputRefs.current[index] = ref}
                className="w-12 h-12 border rounded-full mr-4 text-center text-xl"
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  handleInputChange(text, index);
                }}
                value={value}
                maxLength={1}
                keyboardType="numeric"
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' && value.length === 0 && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
              />
            )}
            name={field}
          />
        ))}
      </View>
      {Object.keys(errors).length > 0 && (
        <Text className="text-red-600 mb-4">All fields are required and must be numbers.</Text>
      )}
      {errorMessage && (
        <Text className="text-red-600 mb-4">{errorMessage}</Text>
      )}
      <View className='flex flex-row gap-2'>
        <Text className="text-black">Didn't receive verification code?</Text>
        <TouchableOpacity>
          <Text className='text-orange-400'>Resend Code</Text>
        </TouchableOpacity>
      </View>
      <View className='mt-4 w-full mb-44'>
        <Button label="Submit" onPress={handleSubmit(onSubmit)} className="bg-black text-white py-2 px-4 rounded-full w-full" />
      </View>
    </View>
  );
};

export default Verification;
