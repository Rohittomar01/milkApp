import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';

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
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />,
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign
                name="arrowleft"
                size={20}
                color="black"
                onPress={() => router.back()} 
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
          tabBarIcon: ({ color }) => <FontAwesome5 name="shopping-cart" size={24} color={color} />,
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign
                name="arrowleft"
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
        name="SubscriptionHistory"
        options={{
          title: 'Subscription',
          tabBarIcon: ({ color }) => <Octicons name="checklist" size={24} color={color} />,
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign
                name="arrowleft"
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
