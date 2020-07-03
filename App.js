import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, FlatList, Text, StyleSheet } from 'react-native';
import useDeviceOrientation from '@rnhooks/device-orientation';

import Search from './src/search';

const token = "zCXHGpRehDU461S2pKnLMhYd";

const App = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [row, setRow] = useState(1);

  const deviceOrientation = useDeviceOrientation();

  useEffect(() => {
    _getContacts();
  });

  useEffect(() => {
    if (text == "") {
      setData(list);
      return;
    }

  }, [text]);

  useEffect(() => {
    if (deviceOrientation == 'portrait') {
      setRow(1);
    } else if (deviceOrientation == 'landscape') {
      setRow(2);
    } else {
      setRow(1);
    }
  }, [deviceOrientation]);

  _getContacts = () => {
    fetch('https://k-messages-api.herokuapp.com/api/v1/contacts', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((json) => {
        setList(json.contacts);
        setData(json.contacts);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onChangeText = text => {
    setText(text);
  }

  renderItem = ({ item, index }) => {
    const { name, email } = item;
    return (
      <View style={styles.item}>
        <Text numberOfLines={2}>{name}</Text>
        <View style={{ height: 10 }} />
        <Text numberOfLines={2}>{email}</Text>
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
        key={row.toString()}
        style={styles.alignItems}
        data={data}
        numColumns={row}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultTxt: {
    width: '90%',
    alignContent: 'center',
    margin: 25
  },
  alignItems: {
  },
  item: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  }
});

export default App;