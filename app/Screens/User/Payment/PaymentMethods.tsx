import React from 'react';
import { Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { View, Text, Button, Checkbox, Card } from 'react-native-ui-lib';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';

// for Responsive screen
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface FormValues {
  paymentMethods: {
    googlepay: boolean;
    phonepay: boolean;
    upi: boolean;
    paytm: boolean;
    mobikwik: boolean;
    amazonpay: boolean;
    netbanking: boolean;
    creditdebitcards: boolean;
    cashondelivery: boolean;
  };
}

export default function Payment_Details() {
  const router = useRouter()
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      paymentMethods: {
        googlepay: false,
        phonepay: false,
        upi: false,
        paytm: false,
        mobikwik: false,
        amazonpay: false,
        netbanking: false,
        creditdebitcards: false,
        cashondelivery: false,
      },
    },
  });

  const handleCheckboxChange = (name: keyof FormValues['paymentMethods']) => {
    Object.keys(control._defaultValues.paymentMethods).forEach(key => {
      setValue(`paymentMethods.${key}` as keyof FormValues['paymentMethods'], false);
    });
    setValue(`paymentMethods.${name}`, true);
  };

  const onSubmit = (data: FormValues) => {
    console.log('Selected payment method:', data.paymentMethods);
    router.push("Screens/User/Payment/PaymentSuccess")
  };

  return (
    <View className="flex bg-white">
      <ScrollView>
        <View className="p-4">
          {/* UPI Section */}
          <Card
            padding-16
            marginB-16
            elevation={6}
            backgroundColor="white"
            borderRadius={8}
          >
            <Text className="text-gray-500 text-base font-normal">UPI</Text>
            <View className="mt-2">
              <Controller
                control={control}
                name="paymentMethods.googlepay"
                render={({ field: { value } }) => (
                  <View className="flex-row items-center mb-2">
                    <Checkbox
                      value={value}
                      onValueChange={() => handleCheckboxChange('googlepay')}
                      color="black"
                      style={{ marginRight: windowWidth * 0.02, marginBottom: windowWidth * 0.02 }} // Gap between checkbox and icon, and between checkboxes
                    />
                    <FontAwesome5 name="google-pay" size={24} color="#34A853" style={{ marginRight: windowWidth * 0.02 }} />
                    <Text className="text-base font-bold">Google Pay</Text>
                  </View>
                )}
              />
              <Controller
                control={control}
                name="paymentMethods.phonepay"
                render={({ field: { value } }) => (
                  <View className="flex-row items-center mb-2">
                    <Checkbox
                      value={value}
                      onValueChange={() => handleCheckboxChange('phonepay')}
                      color="black"
                      style={{ marginRight: windowWidth * 0.02, marginBottom: windowWidth * 0.02 }} // Gap between checkbox and icon, and between checkboxes
                    />
                    <MaterialCommunityIcons name="cellphone" size={24} color="#1a73e8" style={{ marginRight: windowWidth * 0.02 }} />
                    <Text className="text-base font-bold">PhonePe UPI</Text>
                  </View>
                )}
              />
              <Controller
                control={control}
                name="paymentMethods.upi"
                render={({ field: { value } }) => (
                  <View className="flex-row items-center mb-2">
                    <Checkbox
                      value={value}
                      onValueChange={() => handleCheckboxChange('upi')}
                      color="black"
                      style={{ marginRight: windowWidth * 0.02, marginBottom: windowWidth * 0.02 }} // Gap between checkbox and icon, and between checkboxes
                    />
                    <MaterialCommunityIcons name="plus-circle" size={24} color="#ff5722" style={{ marginRight: windowWidth * 0.02 }} />
                    <Text className="text-base font-bold">Add new UPI ID</Text>

                  </View>
                )}
              />
            </View>
          </Card>

          {/* Wallets Section */}
          <Card
            padding-16
            marginB-16
            elevation={6}
            backgroundColor="white"
            borderRadius={8}
          >
            <Text className="text-gray-500 text-base font-normal">WALLETS</Text>
            <View className="mt-2">
              <Controller
                control={control}
                name="paymentMethods.paytm"
                render={({ field: { value } }) => (
                  <View className="flex-row items-center mb-2">
                    <Checkbox
                      value={value}
                      onValueChange={() => handleCheckboxChange('paytm')}
                      color="black"
                      style={{ marginRight: windowWidth * 0.02, marginBottom: windowWidth * 0.02 }} // Gap between checkbox and icon, and between checkboxes
                    />
                    <FontAwesome5 name="cc-paypal" size={24} color="#00457c" style={{ marginRight: windowWidth * 0.02 }} />
                    <Text className="text-base font-bold">Paytm Wallet</Text>
                  </View>
                )}
              />
              <Controller
                control={control}
                name="paymentMethods.mobikwik"
                render={({ field: { value } }) => (
                  <View className="flex-row items-center mb-2">
                    <Checkbox
                      value={value}
                      onValueChange={() => handleCheckboxChange('mobikwik')}
                      color="black"
                      style={{ marginRight: windowWidth * 0.02, marginBottom: windowWidth * 0.02 }} // Gap between checkbox and icon, and between checkboxes
                    />
                    <FontAwesome5 name="cc-visa" size={24} color="#1a1f71" style={{ marginRight: windowWidth * 0.02 }} />
                    <Text className="text-base font-bold">Mobikwik</Text>
                  </View>
                )}
              />
              <Controller
                control={control}
                name="paymentMethods.amazonpay"
                render={({ field: { value } }) => (
                  <View className="flex-row items-center mb-2">
                    <Checkbox
                      value={value}
                      onValueChange={() => handleCheckboxChange('amazonpay')}
                      color="black"
                      style={{ marginRight: windowWidth * 0.02, marginBottom: windowWidth * 0.02 }} // Gap between checkbox and icon, and between checkboxes
                    />
                    <FontAwesome5 name="amazon" size={24} color="#ff9900" style={{ marginRight: windowWidth * 0.02 }} />
                    <Text className="text-base font-bold">AmazonPay</Text>
                  </View>
                )}
              />
            </View>
          </Card>

          {/* Net Banking Section */}
          <Card
            padding-16
            marginB-16
            elevation={6}
            backgroundColor="white"
            borderRadius={8}
          >
            <Text className="text-gray-500 text-base font-normal">Net Banking</Text>
            <View className="mt-2">
              <Controller
                control={control}
                name="paymentMethods.netbanking"
                render={({ field: { value } }) => (
                  <View className="flex-row items-center mb-2">
                    <Checkbox
                      value={value}
                      onValueChange={() => handleCheckboxChange('netbanking')}
                      color="black"
                      style={{ marginRight: windowWidth * 0.02, marginBottom: windowWidth * 0.02 }} // Gap between checkbox and icon, and between checkboxes
                    />
                    <MaterialCommunityIcons name="bank" size={24} color="#007a7a" style={{ marginRight: windowWidth * 0.02 }} />
                    <Text className="text-base font-bold">NetBanking</Text>
                  </View>
                )}
              />
              <Controller
                control={control}
                name="paymentMethods.creditdebitcards"
                render={({ field: { value } }) => (
                  <View className="flex-row items-center mb-2">
                    <Checkbox
                      value={value}
                      onValueChange={() => handleCheckboxChange('creditdebitcards')}
                      color="black"
                      style={{ marginRight: windowWidth * 0.02, marginBottom: windowWidth * 0.02 }} // Gap between checkbox and icon, and between checkboxes
                    />
                    <MaterialCommunityIcons name="credit-card" size={24} color="#004d40" style={{ marginRight: windowWidth * 0.02 }} />
                    <Text className="text-base font-bold">Credit/Debit Card</Text>
                  </View>
                )}
              />
              <Controller
                control={control}
                name="paymentMethods.cashondelivery"
                render={({ field: { value } }) => (
                  <View className="flex-row items-center mb-2">
                    <Checkbox
                      value={value}
                      onValueChange={() => handleCheckboxChange('cashondelivery')}
                      color="black"
                      style={{ marginRight: windowWidth * 0.02, marginBottom: windowWidth * 0.02 }} // Gap between checkbox and icon, and between checkboxes
                    />
                    <MaterialCommunityIcons name="cash" size={24} color="#ff5722" style={{ marginRight: windowWidth * 0.02 }} />
                    <Text className="text-base font-bold">Cash on Delivery</Text>
                  </View>
                )}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
      <Card
        className='  pl-6 pr-6 flex flex-row justify-between h-32 items-center'
        elevation={4}
        backgroundColor="white"
        borderRadius={8}
      >
        <View>
          <Text className="text-lg font-semibold">Total Payable</Text>
          <Text className="text-2xl text-green-700 font-bold mb-7">₹599</Text>
        </View>
        <Button
          backgroundColor="#365E32"
          label="Make Payment"
          onPress={handleSubmit(onSubmit)}
          className="rounded-lg mb-5 h-16 w-44"
        />
      </Card>
    </View>
  );
}
