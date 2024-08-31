import React, { useState } from 'react';
import { View, Text, TextField, Button, Avatar, Colors, RadioButton, RadioGroup } from 'react-native-ui-lib';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { color_green, scaleFont, scaleHeight, scalePadding } from '../../../Global/Global';
import { postData } from '../../../Services/ServerServices';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [address, setAddress] = useState(null)
    const [profileData, setProfileData] = useState({
        name: 'Vikas Assudani',
        email: 'vikassassudani909@gmail.com',
        mobileNumber: '9876543210',
        gender: 'male',
    });


    const handleInputChange = (field: any, value: any) => {
        setProfileData({
            ...profileData,
            [field]: value,
        });
    };

    const updateProfile = async () => {

        console.log('Updated Profile Data:', profileData);
        setIsEditing(false);
        const id = "66d1bfb7d19459cf40813ad1"
        try {
            const result = await postData(`users/update/${id}`, profileData)
            console.log(result.status)
            if (result.status === 1) {
                setMessage(result.message);
                alert(result.message)
            }

        } catch (error) {
            console.error("Error in submitting user data:", error);
        }
    };

    return (
        <View className="bg-blue-100 h-full">
            <View className="h-full bg-white mt-1">
                <View center marginV-20>
                    <Avatar
                        source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                        size={100}
                        containerStyle={styles.avatar}
                    />
                    <Text text50BL>{profileData.name}</Text>
                </View>

                <View paddingH-20>
                    <TextField
                        label="Name"
                        labelStyle={{ fontSize: 17 }}
                        value={profileData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        editable={isEditing}
                        style={[styles.textFieldInput, { color: !isEditing ? "darkgrey" : "black" }]}
                    />
                    <TextField
                        label="Email"
                        labelStyle={{ fontSize: 17 }}
                        value={profileData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        editable={isEditing}
                        style={[styles.textFieldInput, { color: !isEditing ? "darkgrey" : "black" }]}
                    />
                    <TextField
                        labelStyle={{ fontSize: 17 }}
                        label="Phone Number"
                        value={profileData.mobileNumber}
                        onChangeText={(text) => handleInputChange('phoneNumber', text)}
                        editable={isEditing}
                        // keyboardType="phone-pad"
                        style={[styles.textFieldInput, { color: !isEditing ? "darkgrey" : "black" }]}
                    />
                    <TextField
                        label="Address"
                        labelStyle={{ fontSize: 17 }}

                        value={address ? address : ""}
                        onChangeText={(text) => handleInputChange('address', text)}
                        editable={isEditing}
                        style={[styles.textFieldInput, { color: !isEditing ? "darkgrey" : "black" }]}
                    />

                    <View marginV-10>
                        <Text style={{ fontSize: 17, marginBottom: 5 }} >Gender</Text>
                        <RadioGroup
                            backgroundColor='white'
                            initialValue={profileData.gender}
                            onValueChange={(value: string) => handleInputChange('gender', value)}
                        // disabled={!isEditing}
                        >
                            <RadioButton value="male" label="Male" marginB-10 color='black' />
                            <RadioButton value="female" label="Female" color='black' marginB-10 />
                            <RadioButton value="other" label="other" color='black' />
                        </RadioGroup>
                    </View>
                </View>

                <View style={{ padding: 15 }}>
                    <Button
                        label={isEditing ? "Save Changes" : "Edit Profile"}
                        onPress={() => {
                            if (isEditing) {
                                updateProfile();
                            } else {
                                setIsEditing(true);
                            }
                        }}
                        backgroundColor="#6200EE"
                        fullWidth
                        style={styles.button}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#6200EE',
        padding: 30,
        fontSize: scaleFont(17),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginBottom: 10,
    },
    settingsIcon: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    textFieldInput: {
        height: scaleHeight(40),
        fontSize: scaleFont(15),
        padding: scalePadding(20),
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "darkgrey",
        marginBottom: 10
    },
    button: {
        borderRadius: 30,
        backgroundColor: color_green
    },
});

export default Profile;
