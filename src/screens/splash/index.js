import React from 'react';
import {View, Text} from 'react-native';
import {RouterName} from '../../navigation/navigation.const';
import BaseScreen from '../base.screen';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {UserAction} from '../../actions';
import {connect} from 'react-redux';
import { CommonActions } from '@react-navigation/native';

class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.displayScreen = RouterName.SPLASH.name;
  }
  componentDidMount() {
    const {navigation, saveProfile} = this.props;
    auth().onAuthStateChanged(user => {
      if (user) {
        saveProfile({user: user._user});
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: RouterName.HOME.name }],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: RouterName.LOGIN.name }],
          }),
        );
      }
    });
  }
  renderContent() {
    return <View style={styles.container}></View>;
  }
}

const mapStateToProps = state => {
  return {
    profile: state.UserReducer,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    saveProfile: data => dispatch(UserAction.saveProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
