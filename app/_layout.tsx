import { Stack } from 'expo-router/stack';
import React from 'react';
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name='Screens/User/ProductDetails/ProductDetails' options={{ title: "Product" }} />
      <Stack.Screen name='CommonScreens/Authentication/Verification' options={{ title: "Verification" }} />
      <Stack.Screen name='CommonScreens/Authentication/LoginScreen' options={{ title: "Login", presentation: "modal" }} />
      <Stack.Screen name='CommonScreens/Authentication/SignUp' options={{ title: "SignUp", presentation: "modal" }} />
      <Stack.Screen name='Screens/User/MapLocation/MapLocation' options={{ title: "Location", presentation: "modal" }} />
      <Stack.Screen name='Screens/User/Payment/PaymentMethods' options={{ title: "Payment Method", presentation: "modal" }} />
      <Stack.Screen name='Screens/User/Payment/PaymentSuccess' options={{ headerShown: false }} />
      <Stack.Screen name='Screens/User/Profile/Profile' options={{ title: "Profile", presentation: "modal" }} />
      <Stack.Screen name='Screens/User/OrderHistory/OrderHistory' options={{ title: "Order", presentation: "modal" }} />
      <Stack.Screen name='CommonScreens/NavBar/Menu/MenuComponents/Vacation/Vacation' options={{ title: "Vacation", presentation: "modal" }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
