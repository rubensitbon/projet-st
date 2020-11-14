import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import { grid } from '../../style'


class Header extends React.Component {
  state = { user: {} };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
      }
    })
  }
  render() {
    return (
        <View style={styles.container}>
          <Text>{this.state.user.email}</Text>
          <Button title="Log Off" onPress={() => {
            firebase.auth().signOut();
          }}/>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: grid(3),
  }
});


export default Header;
