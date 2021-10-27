import React, {useState} from 'react';
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
import {updateTodoList} from '../../store/modules/todoList';
import DeviceInfo from 'react-native-device-info';
import CheckBox from '@react-native-community/checkbox';

import axios from 'axios';

type TodoList = {
  id: number;
  text: string;
  isToday: boolean;
};

const API_URL = 'https://test.planfit.ai/todos';

const windowWidth = Dimensions.get('window').width;

const Main = () => {
  const dispatch = useDispatch();

  const uid = DeviceInfo.getUniqueId();

  const [isToday, setIsToday] = useState(true);

  const [currentTodo, setCurrentTodo] = useState('');

  const todoList = useSelector(state => state.todoListReducer.todoList);

  const postTodoListData = async () => {
    try {
      const response = await axios.post(API_URL, {
        user_id: uid,
        text: currentTodo,
        is_today: isToday,
      });
      dispatch(updateTodoList(response.data));
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
      const response = await axios.get(API_URL);
      dispatch(updateTodoList(response.data));
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
      const todoData = await axios.get(`${API_URL}/${todo.id}`);
      await axios.patch(`${API_URL}/${todo.id}`, {
        is_checked: !todoData.data.is_checked,
      });
      const everyTodo = await axios.get(API_URL);
      dispatch(updateTodoList(everyTodo.data));
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

  const onChangeText = (text: string) => {
    setCurrentTodo(text);
  };

  const handleToday = () => {
    setIsToday(true);
  };

  const handleWeekly = () => {
    setIsToday(false);
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
    if (todo.is_today === isToday) {
      return (
        <View style={styles.todoListContainer} key={todo.id}>
          <CheckBox
            value={todo.is_checked}
            boxType="square"
            // onFillColor="grey"
            onValueChange={() => updateIsCheckedData(todo)}
          />
          <Text style={styles.todoList}>{todo.text}</Text>
          <Button onPress={() => handleDeleteTodolist(todo.id)} title="🗑" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.main}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={handleToday}>
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
        <TouchableOpacity onPress={handleWeekly}>
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
            onChangeText={onChangeText}
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
