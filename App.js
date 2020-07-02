import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, FlatList, Text, StyleSheet } from 'react-native';

import Search from './src/search';

const App = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {

  }, []);

  onChangeText = text => {
    setText(text);

  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text numberOfLines={2}>Name</Text>
        <View style={{ height: 10 }} />
        <Text numberOfLines={2}>Email Address</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <Search
        onChangeText={onChangeText}
      />
      <Text style={styles.resultTxt}>
        {`Displaying ${data.length} of ${list.length} Contacts`}
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  resultTxt: {
    width: '90%',
    alignContent: 'center',
    margin: 20
  },
  item: {
    width: '90%',
    marginBottom: 10,
    borderWidth: 1,
    padding: 10
  }
});

export default App;