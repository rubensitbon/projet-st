import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { grid } from '../../style'
import firebase from 'firebase';

class GamePicker extends React.Component {
  state = { gamerooms: [] };

  componentDidMount(): void {
      firebase.database().ref('gamerooms').on('value', (snapshot) => {
          console.log('snapshot.val()', snapshot.val())
          if (snapshot.val() != null) {
              this.setState({gamerooms: snapshot.val()});
          }
      });
  }

  handleCreateGameroom = () => {
      var gameroom = {
          name: "New Gameroom",
      };

      // Get a key for a new Post.
      var newGameroomKey = firebase.database().ref().child('Gameroom').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/gamerooms/' + newGameroomKey] = gameroom;

      return firebase.database().ref().update(updates);

  }

    render() {
        const {gamerooms} = this.state
    return (
        <View style={styles.container}>
          <Text>Welcome On Projet ST</Text>
          <Text>Pick Your Game Room or create a new one</Text>
            {Object.keys(gamerooms).map(gameroomId => (
                <View key={gameroomId} style={styles.buttonContainer}>
                    <Button title={gamerooms[gameroomId].name || "unnamed chatroom"} onPress={() => {}} />
                </View>
            ))}
            <View style={styles.buttonContainer}>
                <Button title={"Create a Gameroom"} onPress={this.handleCreateGameroom} />
            </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: grid(3),
  },
  buttonContainer: {
    margin: grid(3),
  },
});


export default GamePicker;
