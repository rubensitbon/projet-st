import React from 'react';
import { SafeAreaView } from 'react-native';
import Header from '../components/Header';


class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
      </SafeAreaView>
    );
  }
}


export default HomeScreen;