import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Nav = () => {
  return (
    <View style={styles.nav}>
      <Text style={styles.navMenu}>Past</Text>
      <Text style={styles.navMenu}>2021</Text>
      <Text style={styles.navMenu}>Life</Text>
      <Text style={styles.emoji}>📝</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'skyblue',
    marginTop: 50,
    fontSize: 25,
  },
  emoji: {
    fontSize: 30,
  },
  navMenu: {
    fontSize: 20,
  },
});

export default Nav;
