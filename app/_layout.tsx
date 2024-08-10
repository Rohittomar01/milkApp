import { Stack } from 'expo-router/stack';
import React from 'react';
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name='Screens/User/ProductDetails/ProductDetails' options={{ title: "Product" }} />
      <Stack.Screen name='CommonScreens/Authentication/Verification' options={{ title: "Verification" }} />
      <Stack.Screen name='CommonScreens/Authentication/LoginScreen' options={{ title: "Login", presentation: "modal" }} />
      <Stack.Screen name='Screens/User/MapLocation/MapLocation' options={{ title: "Location", presentation: "modal" }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
