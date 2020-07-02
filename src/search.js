import React, {  } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Search = props => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={{ flex: 1 }}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 40,
    padding: 20
  },
  wrapper: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  }
});

export default Search;