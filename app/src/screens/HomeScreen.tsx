import React from 'react';
import { SafeAreaView } from 'react-native';
import Header from '../components/Header';
import GamePicker from '../components/GamePicker';


class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <GamePicker />
      </SafeAreaView>
    );
  }
}


export default HomeScreen;
