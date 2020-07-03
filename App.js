import React, { useState, useRef, useEffect } from 'react';
import { 
  SafeAreaView, 
  StatusBar, 
  View, 
  FlatList, 
  Text,
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import useDeviceOrientation from '@rnhooks/device-orientation';
import DropdownAlert from 'react-native-dropdownalert';
import Clipboard from '@react-native-community/clipboard';

import Search from './src/search';

const token = "zCXHGpRehDU461S2pKnLMhYd";

const App = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [row, setRow] = useState(1);
  const [lines, setLines] = useState(1);
  
  const deviceOrientation = useDeviceOrientation();
  var ref = useRef();

  useEffect(() => {
    _getContacts();
  }, []);

  useEffect(() => {
    if (text == "") {
      setData(list);
      return;
    }
    _search(text);
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

  _search = text => {
    var array = [];
    list.map((item) => {
      const { name } = item;
      if (name.toLowerCase().includes(text.toLowerCase())) array.push(item);
    });
    setData(array);
  }

  onChangeText = text => {
    setText(text);
  }

  onItem = email => {
    ref.current.alertWithType("success", "Clipboard", "Copied");
    Clipboard.setString(email);
    
    if (lines == 1) {
      setLines(2);
    } else {
      setLines(1);
    }
  }

  renderItem = ({ item, index }) => {
    const { name, email } = item;

    return (
      <TouchableOpacity 
        key={index} 
        style={styles.item}
        onPress={() => onItem(email)}
      >
        <Text numberOfLines={lines}>{name}</Text>
        <View style={{ height: 10 }} />
        <Text numberOfLines={lines}>{email}</Text>
      </TouchableOpacity>
    );
  }

  renderBottom = () => {
    return (
      <View style={styles.bottom} />
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
        data={data}
        numColumns={row}
        keyboardShouldPersistTaps='always'
        renderItem={renderItem}
        ListFooterComponent={renderBottom}
      />
      <DropdownAlert ref={ref} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultTxt: {
    alignContent: 'center',
    margin: 25
  },
  item: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  bottom: {
    height: 150
  }
});

export default App;