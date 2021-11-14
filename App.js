import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';

console.disableYellowBox = true;

import Icon from 'react-native-vector-icons/Feather';
import ItemList from './src/components/ItemList';
import firebase from './src/firebaseConnection';

function App() {
  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [_key, setKey] = useState('');

  useEffect(() => {
    const loadlist = async () => {
      await firebase
        .database()
        .ref('tasks')
        .on('value', snapshot => {
          setTaskList([]);

          snapshot.forEach(childItem => {
            let data = {
              key: childItem.key,
              name: childItem.val().name,
            };

            setTaskList(oldArray => [...oldArray, data]);
          });
        });
    };
    loadlist();
  }, []);

  const handleAdd = async () => {
    if (newTask.trim() !== '') {
      if (_key !== '') {
        await firebase.database().ref('tasks').child(_key).update({
          name: newTask,
        });
        setNewTask('');
        setKey('');
        Keyboard.dismiss();
        return;
      }

      let tasks = await firebase.database().ref('tasks');
      let key = tasks.push().key;

      tasks.child(key).set({
        name: newTask,
      });

      setNewTask('');
      Keyboard.dismiss();
    }
  };

  const handleDelete = async listItem => {
    await firebase.database().ref('tasks').child(listItem.key).remove();
  };

  const handleEdit = listItem => {
    inputRef.current.focus();
    setNewTask(listItem.name);
    setKey(listItem.key);
  };

  const cancelEdit = () => {
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {_key.length > 0 && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={cancelEdit}>
            <Icon name="x-circle" size={25} color="#f00" />
          </TouchableOpacity>

          <Text style={{color: '#f00', marginLeft: 5}}>
            Você está editando uma tarefa
          </Text>
        </View>
      )}

      <View style={styles.inputfieldArea}>
        <TextInput
          style={styles.input}
          placeholder="Deseja adicionar alguma tarefa?"
          onChangeText={task => setNewTask(task)}
          value={newTask}
          ref={inputRef}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={taskList}
        keyExtractor={item => String(item.key)}
        renderItem={({item}) => (
          <ItemList
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputfieldArea: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#121212',
  },
  addButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 5,
    marginLeft: 5,
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;
