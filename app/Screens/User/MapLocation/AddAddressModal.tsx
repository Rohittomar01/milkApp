import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextField, Button, Dialog, PanningProvider } from 'react-native-ui-lib';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';


interface AddressModalProps {
    visible: boolean;
    onClose: () => void;
}

interface AddressFormData {
    flatNumber: string;
    street: string;
    city: string;
}

const AddAddressModal: React.FC<AddressModalProps> = ({ visible, onClose }) => {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm<AddressFormData>();

    const onSubmit = (data: AddressFormData) => {
        const address = `${data.flatNumber}, ${data.street}, ${data.city}`;
        console.log(address);
        onClose();
        router.push("AddToCart")

    };

    return (
        <View>
            <Dialog
                visible={visible}
                onDismiss={onClose}
                panDirection={PanningProvider.Directions.DOWN}
                bottom
                containerStyle={styles.dialogContainer}
            >
                <View style={styles.closeButton}>
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign style={styles.closeButtonText} name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Add Address Details</Text>

                    <Text style={styles.label}>Flat No / House No / Building</Text>
                    <Controller
                        control={control}
                        name="flatNumber"
                        rules={{ required: 'Flat No / House No / Building is required' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                placeholder="e.g., 123A"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                enableErrors
                                className="border p-4 w-80 rounded-lg border-gray-400"
                            />
                        )}
                    />
                    {errors.flatNumber && <Text style={styles.errorText}>{errors.flatNumber.message}</Text>}

                    <Text style={styles.label}>Street, Colony</Text>
                    <Controller
                        control={control}
                        name="street"
                        rules={{ required: 'Street, Colony is required' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                placeholder="e.g., Elm Street"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                enableErrors
                                className="border p-4 w-80 mt-2 rounded-lg border-gray-400"
                            />
                        )}
                    />
                    {errors.street && <Text style={styles.errorText}>{errors.street.message}</Text>}

                    <Text style={styles.label}>City, State, PIN Code</Text>
                    <Controller
                        control={control}
                        name="city"
                        rules={{ required: 'City, State, PIN Code is required' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                placeholder="e.g., Springfield, IL, 62704"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                enableErrors
                                className="border p-4 w-80 mt-2 rounded-lg border-gray-400"
                            />
                        )}
                    />
                    {errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}

                    <Button
                        label="Add Address"
                        backgroundColor="#1A5319"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.submitButton}
                    />
                </View>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
    dialogContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
        position: 'absolute',
        bottom: 0,
        width: '113%',
        marginLeft: -21,
        marginTop: 200
    },
    modalContent: {
        alignItems: 'center',
        marginTop: "10%"
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        padding: "5%",
        zIndex: 1,
        width: "100%",
    },
    closeButtonText: {
        fontSize: 24,
        color: '#000',
        textAlign: 'right',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 2,
        alignSelf: 'flex-start',
        paddingLeft: '5%',
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
        paddingLeft: '5%',
        marginBottom: 5,
        marginTop: -20
    },
    submitButton: {
        marginTop: 20,
        width: '92%',
    },
});

export default AddAddressModal;
