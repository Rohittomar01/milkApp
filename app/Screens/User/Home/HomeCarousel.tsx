import React from 'react';
import { View, Text, Image, StyleSheet, ImageStyle, TextStyle, ViewStyle, Dimensions } from 'react-native';
import { Carousel } from 'react-native-ui-lib';
import _ from 'lodash';
import { ServerURL } from '../../../Services/ServerServices';

interface Item {
  _id: string;
  image: string;
  description: string;
  started_date: Date;
  ended_date: Date;
  submitted_by: string;
  createdAt: Date;
  updatedAt: Date;
}

interface HomeCarouselProps {
  data: Item[];
}

const { width } = Dimensions.get('window');

const HomeCarousel: React.FC<HomeCarouselProps> = ({ data }) => {
  const renderItem = (item: Item, index: number): JSX.Element => (
    <View key={index} style={styles.itemContainer}>
      <Image source={{ uri: `${ServerURL}/images/${item.image}` }} style={styles.image} />
    </View>
  );

  return (
    <View className='bg-white mt-2 flex justify-center'>
      <Carousel
        pageWidth={width * 0.9} // Dynamic page width based on screen width
        onChangePage={() => console.log('page changed')}
        autoplay
        animated
        pageControlPosition='under'
        containerMarginHorizontal={10}
        containerPaddingVertical={10}
      >
        {_.map(data, (item: Item, index: number) => renderItem(item, index))}
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  } as ViewStyle,
  image: {
    width: width * 0.85, 
    height: width * 0.5,  
    borderRadius: 10,
    objectFit: 'cover',
  } as ImageStyle,
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
});

export default HomeCarousel;
