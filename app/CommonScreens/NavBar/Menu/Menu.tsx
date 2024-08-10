import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Picker, Modal } from 'react-native-ui-lib';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MenuItems from './MenuItems';

const Menu = () => {
    const [isPickerOpen, setPickerOpen] = useState(false);

    const togglePicker = () => {
        setPickerOpen(!isPickerOpen);
    };

    return (
        <View className="mt-2">
            <TouchableOpacity onPress={togglePicker}>
                <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>
            <Modal visible={isPickerOpen}  >
                <View className=' p-6'>
                    <TouchableOpacity onPress={togglePicker}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View className='w-full bg-slate-500'>
                    <ScrollView className='w-full'>
                        <MenuItems />
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default Menu;
