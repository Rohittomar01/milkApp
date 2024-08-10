import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { View, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { ActionSheet, Button } from 'react-native-ui-lib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';


export default function MapLocation() {
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [actionSheetVisible, setActionSheetVisible] = useState(true); // Open by default

    const userLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        const location = await Location.getCurrentPositionAsync();
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        console.log('location', location);
    };

    useEffect(() => {
        userLocation();
    }, []);

    const hideActionSheet = () => {
        setActionSheetVisible(false);
    };

    return (
        <View className="flex-1">
            <View>

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
                {/* <View className="absolute z-10 bg-white  mb-11">
                    <ActionSheet
                        visible={actionSheetVisible}
                        onDismiss={() => { }}
                        title="Address Options"
                        message="Select an option or add a new address manually"
                        cancelButtonIndex={4}
                        destructiveButtonIndex={0}
                        useNativeIOS
                        options={[
                            { label: 'Option 1', onPress: () => console.log('Option 1 pressed') },
                            { label: 'Option 2', onPress: () => console.log('Option 2 pressed') },
                            { label: 'Add Address Manually', onPress: () => console.log('Add Address Manually pressed') },
                            { label: 'Cancel', onPress: hideActionSheet },
                        ]}

                    />
                </View> */}
            </View>
            <View className="absolute bottom-0  h-52 bg-white p-6 rounded-t-[25px] ">
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
                <View className='mt-16'>
                    <View className=' flex items-center flex-row space-x-2  w-full'>
                        <Entypo name="location-pin" size={24} color="black" />
                        <Text className="text-sm font-semibold">
                            John Doe
                            123 Maple Street
                            Apt 4B
                            Springfield, IL 62704
                            United States
                        </Text>
                    </View>
                </View>
                <View className=' mt-3'>
                    <Button
                        onPress={() => router.back()}
                        label="Add address"
                        color="white"
                        className=" bg-black"
                    ></Button>
                </View>

            </View>
        </View>
    );
}
