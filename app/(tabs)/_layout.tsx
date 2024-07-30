import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ShowCategory"
        options={{
          title: 'Category',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerLeft: () => (
            <TouchableOpacity>
              <FontAwesome
                name="arrow-left"
                size={20}
                color="black"
                onPress={() => router.back()} // Use router.back() for back navigation
                style={{ marginLeft: 17 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
        <Tabs.Screen
        name="AddToCart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerLeft: () => (
            <TouchableOpacity>
              <FontAwesome
                name="arrow-left"
                size={20}
                color="black"
                onPress={() => router.back()} // Use router.back() for back navigation
                style={{ marginLeft: 17 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
