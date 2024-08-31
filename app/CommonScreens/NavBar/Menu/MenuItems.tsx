import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-ui-lib';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const data = [
    { id: '1', title: 'Profile', icon: <MaterialIcons name="account-circle" size={24} color="black" />, url: 'Screens/User/Profile/Profile' },
    // { id: '2', title: 'Subscriptions', icon: <MaterialIcons name="now-widgets" size={24} color="black" />, url: "" },
    { id: '3', title: 'Order', icon: <Ionicons name="checkmark-done-circle" size={24} color="black" />, url: 'Screens/User/OrderHistory/OrderHistory' },
    // { id: '4', title: 'Farm Visit', isNew: true },
    { id: '5', title: 'Vacations', icon: <Fontisto name="holiday-village" size={24} color="black" />, url: "CommonScreens/NavBar/Menu/MenuComponents/Vacation/Vacation" },
    { id: '6', title: 'Calendar', icon: <FontAwesome name="calendar" size={24} color="black" />, url: "" },
    // { id: '7', title: 'Wallet' },
    { id: '8', title: 'Monthly Bill', icon: <FontAwesome5 name="money-bill-alt" size={24} color="black" />, url: "" },

];

const items = [
    { id: '1', title: 'Refer & Earn', icon: <AntDesign name="sharealt" size={24} color="black" />, url: "" },
    { id: '2', title: 'Help & Support', icon: <FontAwesome5 name="hands-helping" size={24} color="black" />, url: "" },
];



const MenuList = () => {
    const router = useRouter();
    const MenuItem: React.FC<any> = ({ item }) => (
        <TouchableOpacity onPress={() => router.push(item.url)} className="flex-row space-x-4 items-center p-4 border-b border-gray-200">
            <View className='w-9'>{item.icon}</View>
            <Text className="flex-1 text-lg">{item.title}</Text>
            {item.isNew && <Badge label="New" backgroundColor="green" />}
        </TouchableOpacity>
    );
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <MenuItem item={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <>
                    <Text className="text-lg font-bold my-4">Personal info</Text>
                    <View className="border-b border-gray-300" />
                </>
            )}
            ListFooterComponent={() => (
                <>
                    <Text className="text-lg font-bold my-4">Other info</Text>
                    <View className="border-b border-gray-300 my-4" >
                        {items.map((item, index) => (
                            <TouchableOpacity onPress={() => router.push(item.url)} key={index} className="flex-row space-x-4 items-center p-4 border-b border-gray-200">
                                <View className='w-9'>{item.icon}</View>
                                <Text className="flex-1 text-lg">{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </>
            )}
            className="bg-white  w-full p-4"
        />
    );
};

const MenuItems = () => (
    <View className="flex-1 justify-center items-center w-full ">
        <MenuList />
    </View>
);

export default MenuItems;
