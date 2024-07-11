import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Me Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MeScreen;
