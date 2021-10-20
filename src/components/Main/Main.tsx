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
} from 'react-native';

const Main = () => {
  const [today, setToday] = useState(true);
  const [currentTodo, setCurrentTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const inputRef = React.createRef();

  const onSubmitInputValue = () => {
    if (currentTodo === '') {
      return;
    }
    setCurrentTodo('');
    setTodoList([
      ...todoList,
      {id: Date.now(), text: currentTodo, isToday: today},
    ]);
    console.log(todoList);
  };

  const onChangeText = text => setCurrentTodo(text);

  const handleToday = () => {
    setToday(true);
  };

  const handleWeekly = () => {
    setToday(false);
  };

  const handleDeleteTodolist = id => {
    // alert(id);
    setTodoList([...todoList].filter(el => el.id !== id));
  };

  return (
    <View style={styles.main}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={handleToday}>
          <Text
            style={
              today ? {...styles.navMenu, color: 'black'} : styles.navMenu
            }>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleWeekly}>
          <Text
            style={
              today ? styles.navMenu : {...styles.navMenu, color: 'black'}
            }>
            Weekly
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todo}>
        <View style={styles.todoInputContainer}>
          <TextInput
            ref={inputRef}
            placeholder={
              today
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
            todo.isToday === today ? (
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
    backgroundColor: 'yellow',
  },
  todo: {
    flex: 1,
    backgroundColor: 'white',
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
    borderColor: 'grey',
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
    fontSize: 16,
    fontWeight: '600',
  },
  nav: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'skyblue',
    marginTop: 50,
    fontSize: 25,
  },
  navMenu: {
    fontSize: 20,
    fontWeight: '600',
    color: 'grey',
  },
});

export default Main;
