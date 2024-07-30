import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import { ActionSheet ,Button} from 'react-native-ui-lib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
            <View className="absolute w-full z-10">
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'YOUR API KEY',
                        language: 'en',
                    }}
                    styles={{
                        container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1 },
                        listView: { backgroundColor: 'white' },
                    }}
                />
            </View>
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
            <View className="absolute z-10 bg-white  mb-11">
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
            </View>
        </View>
    );
}
