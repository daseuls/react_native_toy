import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import colors from '../../styles/colors';
import {
  updateTodoList,
  deleteTodoList,
  updateIsChecked,
  editTodoList,
} from '../../store/modules/todoList';
import DeviceInfo from 'react-native-device-info';
import CheckBox from '@react-native-community/checkbox';
import {rootReducer} from '../../store/modules';
import axios from 'axios';
import humps from 'humps';

const API_URL = 'https://test.planfit.ai/todos';

const windowWidth = Dimensions.get('window').width;

const Main = () => {
  const dispatch = useDispatch();
  const uid = DeviceInfo.getUniqueId();
  const [isToday, setIsToday] = useState(true);
  const [currentTodo, setCurrentTodo] = useState('');

  const [textInput, setTextInput] = useState('');
  const todoList = useSelector(state => state.todoListReducer.todoList);

  const decamelizedParams = params => {
    return humps.decamelizeKeys(params);
  };

  const postTodoListData = async () => {
    try {
      const response = await axios.post(
        API_URL,
        decamelizedParams({
          user_id: uid,
          text: currentTodo,
          is_today: isToday,
        }),
      );
      console.log(response.data);
      const camelData = humps.camelizeKeys(response.data);
      console.log(camelData);
      dispatch(updateTodoList(camelData));
      setCurrentTodo('');
    } catch (e) {
      Alert.alert('네트워크를 확인해주세요!', '', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const deleteTodoListData = async id => {
    try {
      axios.delete(`${API_URL}/${id}`);
      dispatch(deleteTodoList(todoList, id));
    } catch (e) {
      Alert.alert('네트워크를 확인해주세요!', '', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const updateIsCheckedData = async todo => {
    try {
      await axios.patch(
        `${API_URL}/${todo.id}`,
        decamelizedParams({is_checked: !todo.isChecked}),
      );
      dispatch(updateIsChecked(todo.id));
    } catch (e) {
      Alert.alert('네트워크를 확인해주세요!', '', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const onSubmitInputValue = () => {
    if (currentTodo === '') {
      return;
    }
    postTodoListData();
  };

  const editTodoListData = async id => {
    try {
      await axios.patch(`${API_URL}/${id}`, {
        text: textInput,
      });
      dispatch(editTodoList(id, textInput));
    } catch (e) {
      Alert.alert('네트워크를 확인해주세요!', '', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const handleDeleteTodolist = (id: number) => {
    Alert.alert('정말 삭제하시겠어요?', '', [
      {
        text: '네',
        onPress: () => deleteTodoListData(id),
      },
      {
        text: '아니요',
      },
    ]);
  };

  const renderItem = ({item: todo}) => {
    if (todo.isToday === isToday) {
      return (
        <View style={styles.todoListContainer} key={todo.id}>
          <CheckBox
            value={todo.isChecked}
            boxType="square"
            onValueChange={() => updateIsCheckedData(todo)}
          />
          <TextInput
            style={styles.todoList}
            onChangeText={text => setTextInput(text)}
            onEndEditing={() => editTodoListData(todo.id)}>
            {todo.text}
          </TextInput>
          <Button onPress={() => handleDeleteTodolist(todo.id)} title="🗑" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.main}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => setIsToday(true)}>
          <Text
            style={
              isToday
                ? {
                    ...styles.navMenu,
                    color: colors.black,
                  }
                : styles.navMenu
            }>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsToday(false)}>
          <Text
            style={{
              ...styles.navMenu,
              color: isToday ? colors.grey : colors.black,
            }}>
            Weekly
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todo}>
        <View style={styles.todoInputContainer}>
          <TextInput
            value={currentTodo}
            placeholder={
              isToday
                ? "Write your today's todolist"
                : 'Write your weekly todolist'
            }
            returnKeyType="done"
            style={styles.todoSubmitInput}
            onChangeText={text => setCurrentTodo(text)}
            onSubmitEditing={onSubmitInputValue}
          />
        </View>
        <FlatList
          style={styles.todoListsContainer}
          data={todoList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
  },
  todo: {
    flex: 1,
    alignItems: 'center',
  },
  todoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  todoSubmitInput: {
    width: '70%',
    padding: 7,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.darkGrey,
  },
  todoListsContainer: {
    marginTop: 20,
    width: '70%',
  },
  todoListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoList: {
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
  },
  nav: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  navMenu: {
    fontSize: windowWidth * 0.06,
    fontWeight: '600',
    color: colors.grey,
  },
});

export default Main;
