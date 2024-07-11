import React from 'react';
import {View, StyleSheet} from 'react-native';
import ReelsComponent from '../components/ReelsComponent';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ReelsComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
