import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text>Past</Text>
        <Text>2021</Text>
        <Text>Life</Text>
        <Text style={styles.emoji}>📝</Text>
      </View>
      <View style={styles.content}></View>
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  nav: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'skyblue',
    marginTop: 50,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    flex: 0.3,
    backgroundColor: 'pink',
  },
  emoji: {
    fontSize: 30,
  },
});

export default Main;
