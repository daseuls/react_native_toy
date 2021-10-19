import React from 'react';
import {View, Button, Text, StyleSheet, TextInput} from 'react-native';

const Todo = () => {
  return (
    <View style={styles.todo}>
      <View style={styles.todoInputContainer}>
        <TextInput
          placeholder="Write your todolist"
          style={styles.todoSubmitInput}></TextInput>
        <Button title="입력"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  todoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoSubmitInput: {
    width: '50%',
    marginTop: 20,
    padding: 7,
    borderRadius: 3,
    borderWidth: 1,
  },
});

export default Todo;
