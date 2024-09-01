import React, { useState, useEffect } from 'react';
import MapView, { Address, Callout, Marker } from 'react-native-maps';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'react-native-ui-lib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import AddressModal from './AddressModal';
import AddAddressModal from './AddAddressModal';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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


export default function MapLocation() {

    const { addressData } = useLocalSearchParams();

    console.log("addresssssss",addressData)
  
    const [address, setAddress] = useState<Address>(addressData ? JSON.parse(addressData as string) : []);
    const [permisionStatus, setPermissionStatus] = useState<string>("")
    const [getuserLocation, setGetUserLocation] = useState(null)
    const [AddressChangeModalVisible, setAddressChangeModalVisible] = useState(false);
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const userLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        } else {
            const location = await Location.getCurrentPositionAsync();
            if (location.coords.latitude) {
                setPermissionStatus(status)
                setMapRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        }
    };

    useEffect(() => {
        userLocation();
    }, [permisionStatus]);

    const handleAddManually = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleAddressSubmit = (data: any) => {
        console.log('Address data:', data);
        setIsModalVisible(false);
    };

    const handleAddressChangeModalOpen = () => {
        setAddressChangeModalVisible(true);
    };

    const handleAddressChangeModalClose = () => {
        setAddressChangeModalVisible(false);
    };

    return (
        <View className="flex-1 ">
            <MapView
                className="w-full h-full"
                region={mapRegion}
                provider="google"
            >
                <Marker coordinate={mapRegion} title="Marker">
                    <Callout>
                        <Text>I am here</Text>
                    </Callout>
                </Marker>
            </MapView>

            <View className="absolute bottom-0 h-72 bg-white w-full p-6 rounded-t-[25px]">
                <View>
                    <GooglePlacesAutocomplete
                        placeholder="Search"
                        onPress={(data, details = null) => {
                            console.log(data, details);

                        }}
                        query={{
                            key: 'YOUR API KEY',
                            language: 'en',
                        }}
                        styles={{
                            container: { position: "absolute", height: "10vh", width: '100%', borderWidth: 0.5 },
                            textInputContainer: { backgroundColor: 'white' },
                            listView: { backgroundColor: 'white' },
                            textInput: { fontSize: 18 },
                        }}
                    />
                </View>
                <View className="mt-16">
                    <View className="flex items-center flex-row space-x-2 w-full">
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
                </View>

                <View className="mt-3 flex justify-between items-center flex-grow">

                    <Button
                        onPress={permisionStatus === "granted" ? handleAddressChangeModalOpen : userLocation}
                        label={permisionStatus === "granted" ? "Add Flat/Home/Building : No." : "Get location"}
                        color="white"
                        className="bg-green-900  w-full h-14 mt-2"
                    />
                    <Button
                        onPress={handleAddManually}
                        label={addressData ? "Update Address" : "Add manually"}
                        color="white"
                        className="bg-green-900  w-full h-14 mt-2"
                    />
                </View>

            </View>

            <AddressModal
                visible={isModalVisible}
                onClose={handleModalClose}
                onSubmit={handleAddressSubmit}
                address={address}
            />
            <View>
                <AddAddressModal
                    visible={AddressChangeModalVisible}
                    onClose={handleAddressChangeModalClose}
                    address={address}
                />
            </View>
        </View>
    );
}
