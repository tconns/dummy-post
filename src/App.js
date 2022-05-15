
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppNavigator from './navigation/navigation.app';
import rootReducer from './reducers';
import Loading from './Loading';

GoogleSignin.configure({
  webClientId: '1070000554351-epr20qpdesl89ufuiui72a4825vl6tk4.apps.googleusercontent.com',
});

const store = createStore(rootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <AppNavigator />
        </SafeAreaView>
        <Loading />
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
