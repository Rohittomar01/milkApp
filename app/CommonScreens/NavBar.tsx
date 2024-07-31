import React from 'react';
import { View } from 'react-native';
import { Picker, Icon, Assets, Image, Colors } from 'react-native-ui-lib';
import Feather from '@expo/vector-icons/Feather';

export default function NavBar() {

    return (
        <View className="p-4 bg-white  ">
            <View className=' w-full flex-1 flex-row justify-between  items-center'>
                <View>
                    <Feather name="menu" size={30} color="black" />
                </View>
                <View>
                    <Image
                        source={{ uri: 'https://png.pngtree.com/png-vector/20221207/ourmid/pngtree-dairy-food-logo-milk-yoghurt-and-lecho-farm-badges-design-with-png-image_6515855.png' }}
                        className="w-14 h-20"
                    />
                </View>
                <View>
                <Feather name="bell" size={24} color="black" />
                </View>
            </View>
            <View className="flex-row items-center justify-center space-x-2 ">
                <View className="flex-1 border border-gray-300 rounded-full w-auto bg-white relative">
                    <Picker
                        value={""}
                        placeholder="Search Here"
                        className="w-full h-12 pl-12 pr-4" // Tailwind width, height, padding-left, and padding-right classes
                    >
                        {/* Add Picker items here */}
                    </Picker>
                    <Icon
                        source={Assets.icons.search} // Ensure this is the correct path to your icon
                        size={20}
                        tintColor="grey"
                        className="absolute left-4 top-3.5 transform -translate-y-1/2" // Adjusted to use grey color
                    />
                </View>

            </View>
        </View>
    );
}
