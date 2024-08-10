import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-ui-lib';



interface productData {
    _id: string;
    image: string;
    title: string;
    description: string;
    price: string;
    discount: string;
    category: string;
    quantity: number;
    submitted_by: string;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    data: productData
}

const Details_Section: React.FC<Props> = ({ data }) => {



    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedSize, setSelectedSize] = useState<number>(1);

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSizeSelection = (size: number) => {
        setSelectedSize(size);
    };

    return (
        <Card className="p-6 mt-2">
            <Text className="text-lg font-bold mb-2">
                {data.title}
            </Text>
            <Text
                className={`text-sm text-gray-600 transition-max-height duration-300 ease-in-out  ${isExpanded ? 'max-h-none' : 'max-h-10'
                    }`} >
                {data.description}
            </Text>
            <View className=' flex justify-end items-end w-full'>
                <TouchableOpacity onPress={handleToggleDescription}>
                    <Text className="text-blue-500 ">{isExpanded ? 'Show Less' : 'Show More'}</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row items-center mb-2">
                <Text className="text-sm font-bold text-green-600">₹{parseFloat(data.price) - parseFloat(data.discount)}</Text>
                <Text className="text-base text-gray-500 line-through ml-2">₹{data.price}</Text>
                <Text className="text-base text-green-600 ml-2">{data.discount}% off</Text>
            </View>
            <Text className="text-sm text-gray-500 mb-4">Inclusive of all taxes</Text>
            <Text className="text-blue-500 mb-4">Free Delivery</Text>
            <View className="flex-row gap-3">
                <TouchableOpacity
                    className={`flex-1 p-2 rounded-lg  ${selectedSize === 1 ? 'bg-black' : ' border  border-black '}`}
                    onPress={() => handleSizeSelection(1)}
                >
                    <Text className={`text-center ${selectedSize === 1 ? 'text-white' : 'text-black'}`}>1 LTR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 p-2 rounded-lg ${selectedSize === 1.5 ? 'bg-black' : 'border border-black'}`}
                    onPress={() => handleSizeSelection(1.5)}
                >
                    <Text className={`text-center ${selectedSize === 1.5 ? 'text-white' : 'text-black'}`}>1.5 LTR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 p-2 rounded-lg ${selectedSize === 2 ? 'bg-black' : 'border border-black'}`}
                    onPress={() => handleSizeSelection(2)}
                >
                    <Text className={`text-center ${selectedSize === 2 ? 'text-white' : 'text-black'}`}>2 LTR</Text>
                </TouchableOpacity>
            </View>
        </Card >
    );
};

export default Details_Section;
