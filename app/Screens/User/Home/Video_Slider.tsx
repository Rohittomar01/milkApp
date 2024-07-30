import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Video, ResizeMode as VideoResizeMode } from 'expo-av';
import { MaterialIcons } from 'react-native-vector-icons';
import { Text } from 'react-native-ui-lib';
import 'nativewind';

interface VideoData {
    id: string;
    uri: string;
}

const videoData: VideoData[] = [
    { id: '1', uri: 'https://cdn.pixabay.com/video/2021/09/18/88948-608446150_tiny.mp4' },
    { id: '2', uri: 'https://cdn.pixabay.com/video/2021/09/18/88948-608446150_tiny.mp4' },
    { id: '3', uri: 'https://cdn.pixabay.com/video/2021/09/18/88948-608446150_tiny.mp4' },
    { id: '4', uri: 'https://cdn.pixabay.com/video/2021/09/18/88948-608446150_tiny.mp4' },
    { id: '5', uri: 'https://cdn.pixabay.com/video/2021/09/18/88948-608446150_tiny.mp4' },
];

const VideoSlider = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string>('');

    const renderVideoThumbnail = ({ item }: { item: VideoData }) => (
        <TouchableOpacity onPress={() => handleVideoPress(item.uri)}>
            <Video
                source={{ uri: item.uri }}
                useNativeControls={false}
                resizeMode={VideoResizeMode.CONTAIN}
                shouldPlay={false}
                className="w-[350px] h-60 mx-2 rounded-lg"
            />
            <View className="absolute inset-0 justify-center items-center bg-opacity-40 mt-[98px] ml-[160px]">
                <MaterialIcons name="play-circle-outline" size={60} color="white" />
            </View>
        </TouchableOpacity>
    );

    const handleVideoPress = (uri: string) => {
        setSelectedVideo(uri);
        setModalVisible(true);
    };

    const renderModalContent = () => (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-80">
                <Video
                    source={{ uri: selectedVideo }}
                    useNativeControls
                    resizeMode={VideoResizeMode.CONTAIN}
                    shouldPlay
                    className="w-full h-96"
                />
            </View>
        </Modal>
    );

    return (
        <View className="flex-1 bg-white mt-2">
            <View className="flex justify-between flex-row p-4">
                <Text className="text-xl font-bold">Videos</Text>
                <View>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </View>
            </View>
            <FlatList
                data={videoData}
                renderItem={renderVideoThumbnail}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            {modalVisible && renderModalContent()}
        </View>
    );
};

export default VideoSlider;
