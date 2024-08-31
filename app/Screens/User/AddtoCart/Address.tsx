import React, { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';
import { getData } from '../../../Services/ServerServices';
import AddressSelectionModal from '../../../CommonScreens/Address/AddressSelectionModal';

// Define the Address interface
interface Address {
    _id: string;
    houseNumber: string;
    apartmentName: string;
    street: string;
    area: string;
    landmark: string;
    city: string;
    district: string;
    state: string;
    postalCode: string;
    country: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user_id: string;
    submitted_by: string;
}

export default function Address() {
    const router = useRouter();
    const [address, setAddress] = useState<Address | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [addressId, setAddressId] = useState<string>("")

    const handleOpenModal = (id: string) => {
        setModalVisible(true);
        setAddressId(id)

    };

    const fetchSelectedAddress = async () => {
        const user_id = "1"
        try {
            const response = await getData(`selectedAddress/fetchSelected_Address/${user_id}`);
            setAddress(response.addressDetails);

        } catch (error) {
            console.log("Error during fetch active address", error);
        }
    };

    useEffect(() => {
        fetchSelectedAddress();
    }, [isModalVisible]);

    return (
        <View className='mt-2 bg-white p-6'>
            {address ? (
                <View>
                    <View className="flex justify-between items-center flex-row mb-0.5 space-x-4">
                        <View className='flex items-center flex-row space-x-2 w-60'>
                            <Entypo name="location-pin" size={24} color="black" />
                            <Text className="text-sm font-semibold">
                                {address.apartmentName ? `${address.apartmentName}, ` : ''}
                                {address.houseNumber} {address.street}
                                {address.area ? `, ${address.area}` : ''}
                                {address.city ? `, ${address.city}` : ''}
                                {address.district ? `, ${address.district}` : ''}
                                {address.state ? `, ${address.state}` : ''}
                                {address.postalCode ? `, ${address.postalCode}` : ''}
                                {address.country ? `, ${address.country}` : ''}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => handleOpenModal(address._id)} className="items-center justify-center">
                            <Text className="text-green-700 text-sm font-bold">Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
            <View>
                <AddressSelectionModal
                    visible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    id={addressId}
                />
            </View>
        </View>
    );
}
