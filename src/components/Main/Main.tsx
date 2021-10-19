import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Nav from '../Nav/Nav';
import Todo from '../Todo/Todo';

const Main = () => {
  return (
    <View style={styles.container}>
      <Nav />
      <Todo />
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },

  footer: {
    flex: 0.3,
    backgroundColor: 'pink',
  },
});

export default Main;
