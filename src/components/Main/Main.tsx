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
  updateIsTodayAction,
  updateCurrentTodo,
  updateTodoList,
} from '../../store/modules/todoList';

type TodoList = {
  id: number;
  text: string;
  isToday: boolean;
};

const windowWidth = Dimensions.get('window').width;

const Main = () => {
  const dispatch = useDispatch();

  const isToday = useSelector(state => state.todoListReducer.isToday);

  const currentTodo = useSelector(state => state.todoListReducer.currentTodo);

  const todoList = useSelector(state => state.todoListReducer.todoList);

  const onSubmitInputValue = async () => {
    if (currentTodo === '') {
      return;
    }
    const newTodoList = [
      ...todoList,
      {id: Date.now(), text: currentTodo, isToday: isToday},
    ];
    dispatch(updateTodoList(newTodoList));
    dispatch(updateCurrentTodo(''));
  };

  const onChangeText = (text: string) => dispatch(updateCurrentTodo(text));

  const handleToday = () => {
    dispatch(updateIsTodayAction(true));
  };

  const handleWeekly = () => {
    dispatch(updateIsTodayAction(false));
  };

  const handleDeleteTodolist = (id: number) => {
    Alert.alert('정말 삭제하시겠어요?', '', [
      {
        text: '네',
        onPress: () =>
          dispatch(
            updateTodoList(
              [...todoList].filter((toDo: TodoList) => toDo.id !== id),
            ),
          ),
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
          keyExtractor={item => item.id.toString()}
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
