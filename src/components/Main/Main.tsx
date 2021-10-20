import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import colors from '../../styles/colors';

type TodoList = {
  id: number;
  text: string;
  isToday: boolean;
};

const windowWidth = Dimensions.get('window').width;

const Main = () => {
  const [isToday, setIsToday] = useState<boolean>(true);
  const [currentTodo, setCurrentTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<Array<TodoList>>([]);

  const onSubmitInputValue = () => {
    if (currentTodo === '') {
      return;
    }
    setTodoList([
      ...todoList,
      {id: Date.now(), text: currentTodo, isToday: isToday},
    ]);
    setCurrentTodo('');
  };

  const onChangeText = (text: string) => setCurrentTodo(text);

  const handleToday = () => setIsToday(true);

  const handleWeekly = () => setIsToday(false);

  const handleDeleteTodolist = (id: number) => {
    Alert.alert('정말 삭제하시겠어요?', '', [
      {
        text: '네',
        onPress: () =>
          setTodoList([...todoList].filter((toDo: TodoList) => toDo.id !== id)),
      },
      {
        text: '아니요',
      },
    ]);
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
            onSubmitEditing={onSubmitInputValue}></TextInput>
        </View>
        <ScrollView style={styles.todoListsContainer}>
          {todoList.map(todo =>
            todo.isToday === isToday ? (
              <View style={styles.todoListContainer} key={todo.id}>
                <Text style={styles.todoList}>📌 {todo.text}</Text>
                <Button
                  onPress={() => handleDeleteTodolist(todo.id)}
                  title="🗑"></Button>
              </View>
            ) : null,
          )}
        </ScrollView>
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
