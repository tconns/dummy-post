import React from 'react';
import {View, Text, Button} from 'react-native';
import {RouterName} from '../../navigation/navigation.const';
import BaseScreen from '../base.screen';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {UserAction, SettingAction} from '../../actions';
import firebase from "@react-native-firebase/app"

import styles from './styles';

class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.displayScreen = RouterName.LOGIN.name;
  }

  onFacebookButtonPress = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth().signInWithCredential(facebookCredential);
  };

  onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  onPressButton = async (type = 'facebook') => {
    const {enableLoading} = this.props;
    try {
      enableLoading(true);
      let data = null;
      switch (type) {
        case 'facebook':
          data = await this.onFacebookButtonPress();
          break;
        case 'google':
          data = await this.onGoogleButtonPress();
          break;
        default:
          break;
      }
      enableLoading(false);
      this.loginSuccess(data);
    } catch (error) {
      enableLoading(false);
      console.log(error)
    }
  };

  loginSuccess = data => {
    const {saveProfile, navigation} = this.props;
    if (data) {
      saveProfile(data);
      navigation.navigate(RouterName.HOME.name);
    }
  };

  renderContent() {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={()=>this.onPressButton("facebook")}
          style={styles.loginFB}>
          <Text
            style={styles.txtText}>
            Login with Facebook
          </Text>
        </Pressable>
        <Pressable
           onPress={()=>this.onPressButton("google")}
          style={styles.loginGoogle}>
          <Text
            style={styles.txtText}>
            Login with Google
          </Text>
        </Pressable>
      </View>
    );
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
    enableLoading: enable => dispatch(SettingAction.enableLoading(enable)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
