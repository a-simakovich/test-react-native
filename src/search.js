import React, {  } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const Search = props => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.inputField}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  wrapper: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40
  },
  inputField: {
    width: '100%',
    height: '100%'
  }
});

export default Search;