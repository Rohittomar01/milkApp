import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Modal, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Video, ResizeMode as VideoResizeMode } from 'expo-av';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text } from 'react-native-ui-lib';
import { getData, ServerURL } from '../../../Services/ServerServices';
import 'nativewind';

interface VideoData {
    _id: string;
    video: string;
    video_type: string;
    description: string;
    submitted_by: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const VideoSlider = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [videos, setVideos] = useState<VideoData[]>([]);
    const { width: screenWidth } = Dimensions.get('window');
    const thumbnailWidth = screenWidth < 600 ? screenWidth / 2 - 16 : 180;
    const thumbnailHeight = thumbnailWidth * 0.6;

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await getData('video/fetchAllVideos');
            setVideos(response.videos);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleVideoPress = (uri: string) => {
        setSelectedVideo(uri);
        setModalVisible(true);
    };

    const renderVideoThumbnail = useCallback(({ item }: { item: VideoData }) => (
        <TouchableOpacity onPress={() => handleVideoPress(item.video)}>
            <View style={[styles.videoContainer, { width: thumbnailWidth * 2, height: thumbnailHeight * 2 }]}>
                <Video
                    source={{ uri: `${ServerURL}/videos/${item.video}` }}
                    useNativeControls={false}
                    resizeMode={VideoResizeMode.COVER}
                    style={styles.thumbnail}
                />
                <View style={styles.playIconContainer}>
                    <MaterialIcons name="play-circle-outline" size={60} color="white" />
                </View>
            </View>
        </TouchableOpacity>
    ), [thumbnailWidth, thumbnailHeight]);

    const renderModalContent = () => (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-80">
                <Video
                    source={{ uri: `${ServerURL}/videos/${selectedVideo}` }}
                    useNativeControls
                    resizeMode={VideoResizeMode.CONTAIN}
                    shouldPlay
                    className="w-full h-96"
                />
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Videos</Text>
                <View>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </View>
            </View>
            <FlatList
                data={videos}
                renderItem={renderVideoThumbnail}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            {modalVisible && renderModalContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    videoContainer: {
        marginHorizontal: 8,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    playIconContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -30 }, { translateY: -30 }],
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    videoWrapper: {
        width: '90%',
        height: '60%',
    },
    modalVideo: {
        width: '100%',
        height: '100%',
    },
});

export default VideoSlider;
