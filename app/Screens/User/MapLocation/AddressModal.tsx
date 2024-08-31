import React from 'react';
import { View, Text, Modal } from 'react-native';
import { Button, TextField } from 'react-native-ui-lib';
import { useForm, Controller } from 'react-hook-form';
import { postData, updateData } from '../../../Services/ServerServices';
import { useRouter } from 'expo-router';

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

interface AddressModalProps {
    visible: boolean;
    address: Address;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ address, visible, onClose }: AddressModalProps) => {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            houseNumber: address ? address.houseNumber : "",
            apartmentName: address ? address.apartmentName : "",
            street: address ? address.street : "",
            area: address ? address.area : "",
            landmark: address ? address.landmark : "",
            city: address ? address.city : 'Gwalior',
            district: address ? address.district : 'Gwalior',
            state: address ? address.state : 'Madhya Pradesh',
            postalCode: address ? address.postalCode : '474001',
            country: address ? address.country : 'India'
        }
    });

    const onSubmit = async (data: any) => {
        const finalAddressData = { ...data, submitted_by: "user", user_id: "1", _id: address._id };

        try {
            if (address && address._id) {
                await updateData(`address/address/update`, finalAddressData)
                    .then(response => {
                        alert(response.message);
                        router.push("AddToCart");
                    });
            } else {
                await postData("address/add_address", finalAddressData)
                    .then(response => {
                        alert(response.message);
                        router.push("AddToCart");
                    });
            }
        } catch (error) {
            console.error("Error during submit address", error);
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View className="flex-1 justify-center items-center bg-white bg-opacity-50">
                <View className="bg-white p-6 rounded-lg w-[90%]">
                    <Text className="text-lg font-bold mb-4">Enter Full Address</Text>

                    {/* House Number */}
                    <View className="flex-row justify-between mb-3">
                        <View className="flex-1 pr-2">
                            <Text className="mb-1">House Number</Text>
                            <Controller
                                control={control}
                                name="houseNumber"
                                rules={{ required: 'House number is required.' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className="border border-gray-300 p-2 mb-1 rounded-lg"
                                        placeholder="123"
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.houseNumber && <Text className="text-red-500">{errors.houseNumber.message}</Text>}
                        </View>
                        <View className="flex-1 pl-2">
                            <Text className="mb-1  w-44">Apartment/Building Name</Text>
                            <Controller
                                control={control}
                                name="apartmentName"
                                rules={{ required: 'Apartment/Building name is required.' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className="border border-gray-300 p-2 rounded-lg"
                                        placeholder="Sunshine Apartments"
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.apartmentName && <Text className="text-red-500">{errors.apartmentName.message}</Text>}
                        </View>
                    </View>

                    {/* Street */}
                    <View className="w-full mb-3">
                        <Text className="mb-1">Street</Text>
                        <Controller
                            control={control}
                            name="street"
                            rules={{ required: 'Street is required.' }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    className="border border-gray-300 p-2 rounded-lg"
                                    placeholder="Maharaj Bada Road"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.street && <Text className="text-red-500">{errors.street.message}</Text>}
                    </View>

                    {/* Area/Locality and Landmark */}
                    <View className="flex-row justify-between mb-3">
                        <View className="flex-1 pr-2">
                            <Text className="mb-1">Area/Locality</Text>
                            <Controller
                                control={control}
                                name="area"
                                rules={{ required: 'Area/Locality is required.' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className="border border-gray-300 p-2 rounded-lg"
                                        placeholder="Lashkar"
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.area && <Text className="text-red-500">{errors.area.message}</Text>}
                        </View>
                        <View className="flex-1 pl-2">
                            <Text className="mb-1">Landmark</Text>
                            <Controller
                                control={control}
                                name="landmark"
                                rules={{ required: 'Lankmark is required.' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className="border border-gray-300 p-2 rounded-lg"
                                        placeholder="Near Gwalior Fort"
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.landmark && <Text className="text-red-500">{errors.landmark.message}</Text>}
                        </View>
                    </View>

                    {/* City and District */}
                    <View className="flex-row justify-between mb-3">
                        <View className="flex-1 pr-2">
                            <Text className="mb-1">City</Text>
                            <Controller
                                control={control}
                                rules={{ required: 'City is required.' }}
                                name="city"
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className="border border-gray-300 p-2 rounded-lg"
                                        placeholder="Gwalior"
                                        onChangeText={onChange}
                                        value={value}
                                        editable={true}
                                    />
                                )}
                            />
                            {errors.city && <Text className="text-red-500">{errors.city.message}</Text>}

                        </View>
                        <View className="flex-1 pl-2">
                            <Text className="mb-1">District</Text>
                            <Controller
                                control={control}
                                rules={{ required: 'District is required.' }}
                                name="district"
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className="border border-gray-300 p-2 rounded-lg"
                                        placeholder="Gwalior"
                                        onChangeText={onChange}
                                        value={value}
                                        editable={true}
                                    />
                                )}
                            />
                            {errors.district && <Text className="text-red-500">{errors.district.message}</Text>}
                        </View>
                    </View>

                    {/* State and Postal Code */}
                    <View className="flex-row justify-between mb-3">
                        <View className="flex-1 pr-2">
                            <Text className="mb-1">State</Text>
                            <Controller
                                control={control}
                                name="state"
                                rules={{ required: 'State is required.' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className="border border-gray-300 p-2 rounded-lg"
                                        placeholder="Madhya Pradesh"
                                        onChangeText={onChange}
                                        value={value}
                                        editable={true}
                                    />
                                )}
                            />
                            {errors.state && <Text className="text-red-500">{errors.state.message}</Text>}
                        </View>
                        <View className="flex-1 pl-2">
                            <Text className="mb-1">Postal Code</Text>
                            <Controller
                                control={control}
                                name="postalCode"
                                rules={{
                                    required: 'Postal code is required.',
                                    pattern: {
                                        value: /^[0-9]{6}$/,
                                        message: 'Postal code must be a 6-digit number.'
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className="border border-gray-300 p-2 rounded-lg"
                                        placeholder="474001"
                                        keyboardType="numeric"
                                        onChangeText={onChange}
                                        value={value}
                                        editable={true}
                                    />
                                )}
                            />
                            {errors.postalCode && <Text className="text-red-500">{errors.postalCode.message}</Text>}
                        </View>
                    </View>

                    {/* Country */}
                    <View className="w-full mb-3">
                        <Text className="mb-1">Country</Text>
                        <Controller
                            control={control}
                            name="country"
                            rules={{ required: 'Country is required.' }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    className="border border-gray-300 p-2 rounded-lg"
                                    placeholder="India"
                                    onChangeText={onChange}
                                    value={value}
                                    editable={false}
                                />
                            )}
                        />
                        {errors.country && <Text className="text-red-500">{errors.country.message}</Text>}
                    </View>

                    <View className="flex-row justify-end mt-4">
                        <Button label="Cancel" onPress={onClose} className="bg-gray-400 mr-2" />
                        <Button label={address ? "Update" : "Submit"} onPress={handleSubmit(onSubmit)} className="bg-green-900" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddressModal;
