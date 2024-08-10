import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Modal } from 'react-native-ui-lib';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import NotificationItems from './NotificationItems';

const Notification = () => {

    const [isPickerOpen, setPickerOpen] = useState(false);

    const togglePicker = () => {
        setPickerOpen(!isPickerOpen);
    };

    return (
        <View className="mt-2">
            <TouchableOpacity onPress={togglePicker}>
                <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
            <Modal visible={isPickerOpen}  >
                <View className=' p-6'>
                    <TouchableOpacity onPress={togglePicker}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <ScrollView                   >
                        <View>
                            <NotificationItems />
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default Notification;
