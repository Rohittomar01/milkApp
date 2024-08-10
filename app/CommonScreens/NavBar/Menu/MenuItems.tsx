import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-ui-lib';

const data = [
    { id: '1', title: 'Profile' },
    { id: '2', title: 'Subscriptions' },
    { id: '3', title: 'Order' },
    { id: '4', title: 'Farm Visit', isNew: true },
    { id: '5', title: 'Vacations' },
    { id: '6', title: 'Calendar' },
    { id: '7', title: 'Wallet' },
    { id: '8', title: 'Monthly Bill' },
    { id: '9', title: 'Refer & Earn' },
    { id: '10', title: 'Help & Support' },
];

const MenuItem: React.FC<any> = ({ item }) => (
    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
        <View className="w-8 h-8 bg-gray-200 mr-4 rounded-full" />
        <Text className="flex-1 text-lg">{item.title}</Text>
        {item.isNew && <Badge label="New" backgroundColor="green" />}
    </TouchableOpacity>
);

const MenuList = () => {
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
                        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
                            <View className="w-8 h-8 bg-gray-200 mr-4 rounded-full" />
                            <Text className="flex-1 text-lg">Hello</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
                            <View className="w-8 h-8 bg-gray-200 mr-4 rounded-full" />
                            <Text className="flex-1 text-lg">Hello</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
                            <View className="w-8 h-8 bg-gray-200 mr-4 rounded-full" />
                            <Text className="flex-1 text-lg">Hello</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
                            <View className="w-8 h-8 bg-gray-200 mr-4 rounded-full" />
                            <Text className="flex-1 text-lg">Hello</Text>
                        </TouchableOpacity>
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
