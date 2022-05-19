import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {RouterName} from '../../navigation/navigation.const';
import BaseScreen from '../base.screen';
import database from '@react-native-firebase/database';
// import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {SettingAction} from '../../actions';

class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.displayScreen = RouterName.HOME.name;
    this.state = {
      post: {},
      comments: [],
      input: '',
    };
  }
  componentDidMount() {
    // messaging().onMessage(remoteMessage => {
    //   myLog('Notification-onMessage', remoteMessage);
    //   setAppIconBadgeNumber();
    //   localPushNoti({
    //     message: remoteMessage,
    //     // date: new Date(Date.now() + 10 * 1000),
    //   });
    // });
    const {enableLoading} = this.props;
    enableLoading(true);
    database()
      .ref('/')
      .on('value', snapshot => {
        console.log(snapshot.val());
        enableLoading(false);
        this.setState({
          post: snapshot.val()[1],
          comments: snapshot.val()[1].comments,
        });
      });
  }

  onChangeText = input => {
    console.log(input);
    this.setState({input});
  };

  renderItem = ({item}) => {
    const {profile} = this.props;
    console.log('renderItem', profile);
    const myAccount = {
      userName: profile.profile.user.displayName,
      userId: profile.profile.user.uid,
    };
    return (
      <View
        style={{
          width: '100%',
          // height: 50,
          backgroundColor: item?.userId === myAccount.userId ? 'green' : 'gray',
          marginVertical: 5,
          borderRadius: 5,
          padding: 10
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
          }}>{`${item?.userName}:`}</Text>
        <Text style={{color: 'black'}}>{item?.comment}</Text>
      </View>
    );
  };
  sendData = () => {
    const {input} = this.state;
    const trimInput = input.trim();
    if (!trimInput) {
      return;
    }
    const {profile} = this.props;
    console.log(profile);
    const myAccount = {
      userName: profile.profile.user.displayName,
      userId: profile.profile.user.uid,
    };
    this.setState({input: ''});
    const newComment = {
      ...myAccount,
      comment: trimInput,
    };
    const ref = database().ref(`/1/comments`);
    ref.transaction(cmt => [...cmt, newComment]);
    setTimeout(() => {
      this.list?.current?.scrollToEnd();
    }, 200);
  };

  logout = async () => {
    try {
      await auth().signOut();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: RouterName.LOGIN.name}],
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  renderContent() {
    const {post, comments, input} = this.state;
    if (!post) return null;
    const data = comments.filter((item, index) => item !== null);
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 80,
            width: '100%',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24}}>{'Post Screen'}</Text>
          <Pressable
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#50505099',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.logout()}>
            <Text>Logout</Text>
          </Pressable>
        </View>
        <View style={{margin: 10, marginBottom: 20}}>
          <Text style={{fontSize: 20}}>{post?.title}</Text>
          <Text>{post?.description}</Text>
        </View>
        <View style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
          <View>
            <Text>Comment</Text>
          </View>
          <FlatList
            ref={ref => (this.list = ref)}
            style={{flex: 1}}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${item.userId}-${index}`}
            data={data || []}
            extraData={data}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 60,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            value={input}
            placeholder={'type comment...'}
            placeholderTextColor="gray"
            onChangeText={this.onChangeText}
          />
          <Pressable
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#50505099',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.sendData()}>
            <Text>Send</Text>
          </Pressable>
        </View>
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
    enableLoading: enable => dispatch(SettingAction.enableLoading(enable)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
