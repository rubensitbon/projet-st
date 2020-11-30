import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../components/Header';
import GamePicker from '../components/GamePicker';
import firebase from "firebase";
import GameBoard from "../components/GameBoard";


class HomeScreen extends React.Component {
    state = {currentGameroom: null}

    componentDidMount(): void {
        const currentUserId = firebase.auth().currentUser.uid;

        firebase.database().ref('users/' + currentUserId + '/currentGameroom').on('value', (snapshot) => {
            console.log('snapshot.val()', snapshot.val());
            this.setState({currentGameroom: snapshot.val()});
        });
    }

    render() {
        const {currentGameroom} = this.state
        console.log('currentGameroom', currentGameroom)
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header/>
                {!!currentGameroom ? <GameBoard currentGameroom={currentGameroom}/> : <GamePicker/>}

            </SafeAreaView>
        );
    }
}


export default HomeScreen;
