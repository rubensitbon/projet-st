import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import {grid} from '../../style'
import firebase from 'firebase';

class GameBoard extends React.Component {
    handleQuitGameroom = async () => {
        const currentUserId = firebase.auth().currentUser.uid;

        if(!!currentUserId){
            console.log('currentUserId', currentUserId);

            const currentUser = await firebase.database().ref('/users/' + currentUserId).once('value')

            firebase.database().ref('users/' + currentUserId).set({
                ...currentUser.val(),
                currentGameroom: null,
            });
        }
    };

    render() {
        const {currentGameroom} = this.props;

        return (
            <View style={styles.container}>
                <Text>Welcome On Projet ST</Text>
                <Text>THIS IS THE GAME : {currentGameroom}</Text>
                <View style={styles.buttonContainer}>
                    <Button title={"Quit the game"} onPress={this.handleQuitGameroom}/>
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


export default GameBoard;
