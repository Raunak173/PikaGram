/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import fetchImages from '../utils/fetchImages';

import Follow from '../assets/follow.svg';
import Message from '../assets/message.svg';
import Love from '../assets/love.svg';
import Share from '../assets/share.svg';
import Send from '../assets/send.svg';

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

const ReelsComponent = () => {
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<any>>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedImages = await fetchImages(page);
        setImages(prevImages => [...prevImages, ...fetchedImages]);
      } catch (error) {
        setError('Error fetching images');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderImageItem = useCallback(
    ({item}: any) => (
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.download_url}}
          style={styles.image}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        <Text style={styles.topText}>For you</Text>
        <View style={styles.caption}>
          <Text style={{color: 'white'}}>Caption</Text>
          <Text style={{color: 'white', marginTop: 4}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={styles.right}>
          <Follow />
          <Message />
          <Love />
          <Share />
          <Send />
        </View>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingIndicator}
          />
        )}
      </View>
    ),
    [loading],
  );

  const handleScrollEnd = () => {
    if (currentIndex.current >= images.length - 1) {
      loadMoreImages();
    }
  };

  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(contentOffsetY / screenHeight);
    if (index !== currentIndex.current) {
      currentIndex.current = index;
      flatListRef.current?.scrollToIndex({animated: true, index});
    }
  };

  const getItemLayout = (_: any, index: number) => ({
    length: screenHeight,
    offset: screenHeight * index,
    index,
  });

  const onScrollToIndexFailed = (info: any) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({index: info.index, animated: true});
    });
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImageItem}
        keyExtractor={item => item.id.toString()}
        onEndReachedThreshold={0.5}
        pagingEnabled
        horizontal={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScroll}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingIndicator: {
    position: 'absolute',
  },
  topText: {
    position: 'absolute',
    top: 20,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  caption: {
    position: 'absolute',
    bottom: 100,
    width: '70%',
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
  right: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 200,
    right: 12,
    rowGap: 16,
  },
});

export default ReelsComponent;
