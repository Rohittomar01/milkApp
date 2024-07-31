import { Stack } from 'expo-router/stack';
import React from 'react';
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name='Screens/User/ProductDetails/ProductDetails' options={{title:"Product" }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
