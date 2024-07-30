import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-ui-lib';

const Details_Section = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedSize, setSelectedSize] = useState('1 LTR');

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSizeSelection = (size: string) => {
        setSelectedSize(size);
    };

    return (
        <Card className="p-6 mt-2">
            <Text className="text-lg font-bold mb-2">A2 Buffalo Milk</Text>
            <Text className={`text-sm text-gray-600 ${isExpanded ? 'mb-4' : 'mb-2'}`}>
                A2 Buffalo milk is naturally obtained from the Indian buffalo breeds. When buffaloes from the family of traditional buffalo...
                {isExpanded && ' These buffaloes are known for their high-quality milk production and are raised in a natural environment to ensure the best quality milk.'}
            </Text>
            <View className=' flex justify-end items-end w-full'>
                <TouchableOpacity onPress={handleToggleDescription}>
                    <Text className="text-blue-500 ">{isExpanded ? 'Show Less' : 'Show More'}</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row items-center mb-2">
                <Text className="text-xl font-bold text-black">₹99.0</Text>
                <Text className="text-base text-gray-500 line-through ml-2">₹110.0</Text>
                <Text className="text-base text-green-600 ml-2">10.0% off</Text>
            </View>
            <Text className="text-sm text-gray-500 mb-4">Inclusive of all taxes</Text>
            <Text className="text-blue-500 mb-4">Free Delivery</Text>
            <View className="flex-row">
                <TouchableOpacity
                    className={`flex-1 p-2 rounded-lg mr-2 ${selectedSize === '1 LTR' ? 'bg-black' : ' border  border-black '}`}
                    onPress={() => handleSizeSelection('1 LTR')}
                >
                    <Text className={`text-center ${selectedSize === '1 LTR' ? 'text-white' : 'text-black'}`}>1 LTR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 p-2 rounded-lg ${selectedSize === '1.5 LTR' ? 'bg-black' : 'border border-black'}`}
                    onPress={() => handleSizeSelection('1.5 LTR')}
                >
                    <Text className={`text-center ${selectedSize === '1.5 LTR' ? 'text-white' : 'text-black'}`}>1.5 LTR</Text>
                </TouchableOpacity>
            </View>
        </Card>
    );
};

export default Details_Section;
