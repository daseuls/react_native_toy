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
import {updateTodoList, updateIsChecked} from '../../store/modules/todoList';
import DeviceInfo from 'react-native-device-info';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

type TodoList = {
  id: number;
  text: string;
  isToday: boolean;
};

const windowWidth = Dimensions.get('window').width;

const Main = () => {
  const dispatch = useDispatch();
  const uid = DeviceInfo.getUniqueId();

  const [isToday, setIsToday] = useState(true);

  const [currentTodo, setCurrentTodo] = useState('');

  // const isChecked = useSelector(state => state.todoListReducer.isChecked);

  const todoList = useSelector(state => state.todoListReducer.todoList);

  const postTodoListData = async () => {
    try {
      const response = await axios.post('https://test.planfit.ai/todos', {
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
      console.log('error', e);
    }
  };

  const deleteData = async id => {
    try {
      axios.delete(`https://test.planfit.ai/todos/${id}`);
      const response = await axios.get('https://test.planfit.ai/todos');
      dispatch(updateTodoList(response.data));
      console.log('todoList', todoList);
    } catch (e) {
      Alert.alert('네트워크를 확인해주세요!', '', [
        {
          text: '확인',
        },
      ]);
      console.log('error', e);
    }
  };

  const onSubmitInputValue = () => {
    if (currentTodo === '') {
      return;
    }
    postTodoListData();
    // post를 하고 받아온 respond를 가지고 리덕스에 저장

    // const newTodoList = [
    //   ...todoList,
    //   {
    //     id: Date.now(),
    //     text: currentTodo,
    //     isToday: isToday,
    //     // isChecked: isChecked,
    //   },
    // ];
    // dispatch(updateTodoList(newTodoList));
    // setCurrentTodo('');
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

  // useEffect(() => dispatch(updateTodoList([])), []);
  useEffect(() => console.log('todoList바깥', todoList), []);

  const handleDeleteTodolist = (id: number) => {
    Alert.alert('정말 삭제하시겠어요?', '', [
      {
        text: '네',
        onPress: () =>
          // getDelete를 실행해준뒤 getData로 받은 값을 리덕스에 저장해준다.
          // dispatch(
          //   updateTodoList(
          //     [...todoList].filter((toDo: TodoList) => toDo.id !== id),
          //   ),
          // ),
          deleteData(id),
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
          {/* <CheckBox
            value={todo.isChecked}
            boxType="square"
            // onFillColor="grey"
            onValueChange={todo => dispatch(updateIsChecked(!isChecked))}
          /> */}
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
