import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    time: string;
}

const notifications: NotificationItem[] = [
    { id: '1', title: 'New Order', description: 'You have received a new order.', time: '2 min ago' },
    { id: '2', title: 'Subscription Renewed', description: 'Your subscription has been renewed.', time: '1 hour ago' },
    { id: '3', title: 'Profile Updated', description: 'Your profile information has been updated.', time: '1 day ago' },
    { id: '4', title: 'Promotion', description: 'Check out our new promotion.', time: '2 days ago' },
];

const NotificationItem: React.FC<{ item: NotificationItem }> = ({ item }) => (
    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
        <View className="w-8 h-8 bg-gray-200 mr-4 rounded-full" />
        <View className="flex-1">
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text className="text-sm text-gray-500">{item.description}</Text>
            <Text className="text-xs text-gray-400">{item.time}</Text>
        </View>
    </TouchableOpacity>
);

const NotificationList = () => {
    return (
        <FlatList
            data={notifications}
            renderItem={({ item }) => <NotificationItem item={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <Text className="text-lg font-bold my-4">Notifications</Text>
            )}
            className="bg-white w-full p-4"
        />
    );
};

const NotificationItems = () => (
    <View className="flex-1 justify-center items-center w-full">
        <NotificationList />
    </View>
);

export default NotificationItems;
