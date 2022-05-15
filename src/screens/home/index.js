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
    database()
      .ref('/')
      .on('value', snapshot => {
        console.log(snapshot.val());
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
    const myAccount = {
      userName: profile.profile.user.displayName,
      userId: profile.profile.user.uid,
    };
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: item?.userId === myAccount.userId ? 'green' : 'gray',
          marginVertical: 5,
          borderRadius: 5,
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
  };

  renderContent() {
    const {post, comments, input} = this.state;
    if (!post) return null;
    return (
      <View style={styles.container}>
        <View style={{margin: 10, marginBottom: 20}}>
          <Text style={{fontSize: 20}}>{post?.title}</Text>
          <Text>{post?.description}</Text>
        </View>
        <View style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
          <View>
            <Text>Comment</Text>
          </View>
          <FlatList
            style={{flex: 1}}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.userId}`}
            data={comments || []}
            extraData={comments}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 60,
            paddingHorizontal: 10,
            flexDirection: 'row',
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
