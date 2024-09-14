import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dialog, PanningProvider, RadioGroup, RadioButton } from 'react-native-ui-lib';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { postData, getData } from '../../Services/ServerServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AddressModalProps {
    id?: string;
    visible: boolean;
    onClose: () => void;
}

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

interface userData {
    message: string;
    signIn: {
        __v: number;
        _id: string;
        createdAt: string;
        email: string;
        gender: string;
        mobileNumber: string;
        name: string;
        updatedAt: string;
    };
    success: boolean;
}

const AddressSelectionModal: React.FC<AddressModalProps> = ({
    visible = false,
    onClose,
    id = "",
}: AddressModalProps) => {
    const [selected, setSelected] = useState<string>("");
    const [address, setAddress] = useState<Address[]>([]);
    const [UserData, setUserData] = useState<userData | null>(null);

    const router = useRouter();

    const fetchUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem("@auth");
            if (userData) {
                setUserData(JSON.parse(userData));
            } else {
                console.log("No user data found");
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    };

    const fetchAddress = async () => {
        const user_id = UserData?.signIn._id;
        if (user_id) {
            try {
                const response = await getData(`address/address_Fetch/${user_id}`);
                if (response && response.addresses && response.addresses.length > 0) {
                    setAddress(response.addresses);
                }
            } catch (error) {
                console.log("Error during fetch active address", error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        fetchAddress();
    }, [UserData]);

    const onSelectAddress = async (address: any) => {
        setSelected(address._id);
        const body = {
            address_id: address._id,
            user_id: UserData?.signIn._id,
            submitted_by: "user",
        };
        try {
            await postData("selectedAddress/add_selectedAddress", body).then((Response) => {
                onClose();
            });
        } catch (error) {
            console.log("Error during fetch active address", error);
        }
    };

    const handleNavigate = (item: Address) => {
        router.push({
            pathname: "Screens/User/MapLocation/MapLocation",
            params: { addressData: JSON.stringify(item) },
        });
        onClose();
    };

    const handleNewAddress_Click = () => {
        router.push("Screens/User/MapLocation/MapLocation");
        onClose();
    };

    return (
        <Dialog
            visible={visible}
            onDismiss={onClose}
            panDirection={PanningProvider.Directions.DOWN}
            bottom
            containerStyle={styles.dialogContainer}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Select Location</Text>
                <View style={styles.closeButton}>
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign style={styles.closeButtonText} name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={handleNewAddress_Click} style={styles.addAddressButton}>
                <Text style={styles.addAddressText}>+ Add New Address</Text>
            </TouchableOpacity>

            <View style={styles.addressList}>
                <RadioGroup initialValue={id} onValueChange={setSelected}>
                    {address.map((item) => (
                        <View key={item._id} style={styles.addressItem}>
                            <TouchableOpacity
                                style={styles.touchableOpacity}
                                onPress={() => onSelectAddress(item)}
                            >
                                <RadioButton
                                    value={item._id}
                                    selected={selected === item._id}
                                    label=""
                                    color="green"
                                    size={22}
                                />
                                <View style={styles.addressTextContainer}>
                                    <Text style={styles.labelText}>Home</Text>
                                    <View>
                                        <View className="flex justify-between items-center flex-row mb-0.5 space-x-4">
                                            <View className="flex items-center flex-row space-x-2 w-60">
                                                <Text className="text-sm font-semibold">
                                                    {item.apartmentName ? `${item.apartmentName}, ` : ""}
                                                    {item.houseNumber} {item.street}
                                                    {item.area ? `, ${item.area}` : ""}
                                                    {item.city ? `, ${item.city}` : ""}
                                                    {item.district ? `, ${item.district}` : ""}
                                                    {item.state ? `, ${item.state}` : ""}
                                                    {item.postalCode ? `, ${item.postalCode}` : ""}
                                                    {item.country ? `, ${item.country}` : ""}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleNavigate(item)}>
                                <AntDesign name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </RadioGroup>
            </View>
        </Dialog>
    );
};

const styles = StyleSheet.create({
    dialogContainer: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
        position: "absolute",
        bottom: 0,
        width: "113%",
        marginLeft: -21,
        marginTop: 200,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    closeButton: {
        position: "absolute",
        right: 10,
        padding: "5%",
        zIndex: 1,
        width: "100%",
    },
    closeButtonText: {
        fontSize: 24,
        color: "#000",
        textAlign: "right",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    addAddressButton: {
        justifyContent: "center",
    },
    addAddressText: {
        color: "green",
        fontSize: 16,
    },
    addressList: {
        width: "100%",
    },
    addressItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        marginTop: "5%",
        gap: 5,
    },
    touchableOpacity: {
        flexDirection: "row",
        width: 320,
    },
    addressTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    labelText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    addressText: {
        fontSize: 14,
        color: "#666",
    },
});

export default AddressSelectionModal;
