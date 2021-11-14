import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

function ItemList({data, deleteItem, editItem}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginRight: 5}}
        onPress={() => deleteItem(data)}>
        <Icon name="trash" color="#fff" size={20} />
      </TouchableOpacity>

      <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text style={{color: '#fff', fontSize: 17, width: '100%'}}>
            {data.name}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#121212',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
});

export default ItemList;
