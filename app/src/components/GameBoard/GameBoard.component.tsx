import React from 'react';
import {Animated, StyleSheet, Text, View, Button, ScrollView, PanResponder} from 'react-native';
import {grid} from '../../style'
import DraggableCard from '../DraggableCard'
import firebase from 'firebase';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
        }
    }

    handleQuitGameroom = async () => {
        const currentUserId = firebase.auth().currentUser.uid;

        if (!!currentUserId) {
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
                <View style={styles.board}>
                    <View style={styles.slotsContainer}>
                        <View style={styles.slot}>
                            <DraggableCard/>
                        </View>
                        <View style={styles.slot}/>
                        <View style={styles.slot}/>
                        <View style={styles.slot}/>
                        <View style={styles.slot}/>
                        <View style={styles.slot}/>
                        <View style={styles.slot}/>
                        <View style={styles.slot}/>
                        <View style={styles.slot}/>
                    </View>
                    <View style={styles.ballContainer}>
                        <DraggableCard/>
                        <DraggableCard/>
                        <DraggableCard/>
                        <DraggableCard/>
                        <DraggableCard/>
                        <DraggableCard/>
                    </View>
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
    slotsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 200,
        borderWidth: 2,
        borderColor: "green",
        borderRadius: 3,
        width: '100%'
    },
    slot: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 3,
        height: '90%'
    },
    ballContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 200
    },
    board: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});


export default GameBoard;
