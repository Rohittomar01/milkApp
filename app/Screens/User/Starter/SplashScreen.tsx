import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { Avatar, Image } from 'react-native-ui-lib';
import { color_gray, scaleHeight, scaleMargin, scaleWidth, theme_color } from '../../../Global/Global'; // Assuming these are your utility functions
import { useRouter } from 'expo-router'; // Import the useRouter hook for navigation

const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const router = useRouter(); // Initialize the router for navigation

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            router.push('Screens/User/Starter/StarterCarousel');
        }, 3000);
        return () => clearTimeout(timer);
    }, [fadeAnim, router]);

    return (
        <View>
            <Animated.View style={[styles.avatarContainer, { opacity: fadeAnim }]}>
                <Image
                    source={require("../../../../assets/splash.png")}
                    style={styles.avatar}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        height: scaleHeight(650),
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        // backgroundColor: theme_color
    },
    avatar: {
        height: scaleWidth(235),
        width: scaleHeight(210)
    },
});

export default SplashScreen;
