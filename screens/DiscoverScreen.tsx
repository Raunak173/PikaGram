/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SearchBox from '../components/SearchBox';
import fetchImages from '../utils/fetchImages';

const level1 = [
  {
    title: '#travel',
    people: '3.1m',
  },
  {
    title: '#foodie',
    people: '4.2m',
  },
  {
    title: '#fitness',
    people: '2.8m',
  },
  {
    title: '#photography',
    people: '5.6m',
  },
  {
    title: '#fashion',
    people: '6.3m',
  },
  {
    title: '#music',
    people: '3.9m',
  },
  {
    title: '#art',
    people: '2.4m',
  },
  {
    title: '#nature',
    people: '4.8m',
  },
  {
    title: '#tech',
    people: '1.7m',
  },
  {
    title: '#wellness',
    people: '2.2m',
  },
];

const level2 = [
  {
    city: 'Places of Paris',
    posts: '125 posts/day',
  },
  {
    city: 'We live in Italy',
    posts: '75 posts/day',
  },
  {
    city: 'Discover New York',
    posts: '200 posts/day',
  },
  {
    city: 'Explore Tokyo',
    posts: '150 posts/day',
  },
  {
    city: 'Visit London',
    posts: '180 posts/day',
  },
  {
    city: 'Travel to Sydney',
    posts: '90 posts/day',
  },
  {
    city: 'Berlin Adventures',
    posts: '110 posts/day',
  },
  {
    city: 'Mumbai Diaries',
    posts: '130 posts/day',
  },
  {
    city: 'Dubai Delights',
    posts: '95 posts/day',
  },
  {
    city: 'Discover Toronto',
    posts: '85 posts/day',
  },
  {
    city: 'Cape Town Scenes',
    posts: '70 posts/day',
  },
];

const level3 = [
  {
    name: '@playparker',
    followers: '245k followers',
  },
  {
    name: '@mhogan',
    followers: '240k followers',
  },
  {
    name: '@rayjosh',
    followers: '234k followers',
  },
  {
    name: '@wanderlust',
    followers: '220k followers',
  },
  {
    name: '@foodfanatic',
    followers: '215k followers',
  },
  {
    name: '@fitlife',
    followers: '210k followers',
  },
  {
    name: '@artlover',
    followers: '205k followers',
  },
  {
    name: '@techguru',
    followers: '200k followers',
  },
  {
    name: '@musicmaniac',
    followers: '195k followers',
  },
  {
    name: '@nature_nut',
    followers: '190k followers',
  },
  {
    name: '@travelbug',
    followers: '185k followers',
  },
];

const DiscoverScreen = () => {
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderImageItemHT = useCallback(({item, index}: any) => {
    const level1Index = index % level1.length;
    const {title, people} = level1[level1Index];

    return (
      <View>
        <Image
          source={{uri: item.download_url}}
          style={styles.horizontalImage}
        />
        <View style={styles.tags}>
          <Text style={styles.white}>{title}</Text>
          <Text style={styles.white}>{people}</Text>
        </View>
      </View>
    );
  }, []);

  const renderImageItemTC = useCallback(({item, index}: any) => {
    const level2Index = index % level2.length;
    const {city, posts} = level2[level2Index];

    return (
      <View>
        <Image
          source={{uri: item.download_url}}
          style={styles.horizontalImage}
        />
        <Text style={[styles.white, styles.city]}>{city}</Text>
        <Text style={[styles.white, styles.posts]}>{posts}</Text>
      </View>
    );
  }, []);

  const renderImageItemCircle = useCallback(({item, index}: any) => {
    const level3Index = index % level3.length;
    const {name, followers} = level3[level3Index];
    return (
      <View>
        <Image
          source={{uri: item.download_url}}
          style={styles.horizontalCircleImage}
        />
        <View style={styles.middle}>
          <Text style={[styles.green, {fontWeight: '700'}]}>{name}</Text>
          <Text style={styles.green}>{followers}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.heading}>Discover the World</Text>
        <SearchBox />
      </View>
      <View>
        <Image
          source={{uri: 'https://picsum.photos/200'}}
          style={styles.topImage}
        />
        <Text style={styles.topImgText}>#Top search of the day</Text>
      </View>
      <View style={styles.levels}>
        <View style={styles.pane}>
          <Text style={styles.heading}>Trending hashtags</Text>
          <TouchableOpacity>
            <Text style={styles.btnText}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={images}
          renderItem={renderImageItemHT}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={loadMoreImages}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.levels}>
        <View style={styles.pane}>
          <Text style={styles.heading}>Top Community</Text>
          <TouchableOpacity>
            <Text style={styles.btnText}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={images}
          renderItem={renderImageItemTC}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={loadMoreImages}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.levels}>
        <View style={styles.pane}>
          <Text style={styles.heading}>Top nomads</Text>
          <TouchableOpacity>
            <Text style={styles.btnText}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={images}
          renderItem={renderImageItemCircle}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={loadMoreImages}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  head: {
    marginTop: 40,
  },
  heading: {
    fontSize: 22,
    color: '#0a9396',
    fontWeight: 'bold',
  },
  topImage: {
    height: 250,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  topImgText: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    color: 'white',
    fontSize: 20,
  },
  pane: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levels: {
    marginVertical: 20,
    rowGap: 12,
  },
  btnText: {
    fontSize: 16,
    color: '#0a9396',
    fontWeight: '400',
  },
  horizontalImage: {
    height: 200,
    width: 200,
    marginRight: 10,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  horizontalCircleImage: {
    height: 140,
    width: 140,
    marginRight: 10,
    borderRadius: 70,
  },
  middle: {
    alignItems: 'center',
    marginTop: 12,
  },
  tags: {
    position: 'absolute',
    bottom: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
  },
  white: {
    color: 'white',
  },
  posts: {
    position: 'absolute',
    right: 20,
    top: 12,
  },
  city: {
    position: 'absolute',
    fontSize: 28,
    bottom: 16,
    left: 20,
    width: '80%',
    fontWeight: '700',
  },
  green: {
    color: '#0a9396',
  },
});

export default DiscoverScreen;
