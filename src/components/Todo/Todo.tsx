import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Todo = () => {
  const [currentTodo, setCurrentTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const inputRef = React.createRef();

  const onSubmitInputValue = () => {
    setTodoList([...todoList, currentTodo]);
    inputRef.current.clear();
  };

  return (
    <>
      <View style={styles.nav}>
        <TouchableOpacity onPress={handleToday(true)}>
          <Text style={styles.navMenu}>Today 📝</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleWeekly(false)}>
          <Text style={styles.navMenu}>Weekly 📅</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todo}>
        <View style={styles.todoInputContainer}>
          <TextInput
            ref={inputRef}
            placeholder="Write your todolist"
            style={styles.todoSubmitInput}
            onChangeText={text => setCurrentTodo(text)}></TextInput>
          {/* <Button title="입력" onPress={onSubmitInputValue}></Button> */}
        </View>
        <View style={styles.todoListsContainer}>
          {todoList.map(todo => (
            <View style={styles.todoListContainer}>
              <Text style={styles.todoList}>{todo}</Text>
              <Button title="삭제"></Button>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  todo: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
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
    marginLeft: 50,
  },
  todoListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoList: {
    fontSize: 20,
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
  },
});

export default Todo;
