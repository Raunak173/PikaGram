import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const SearchBox = () => {
  return (
    <View>
      <TextInput style={styles.box} placeholder="Search" />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 16,
    borderColor: 'gray',
    borderRadius: 16,
    backgroundColor: 'white',
  },
});
