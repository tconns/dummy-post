import React from 'react';
import {View, Text} from 'react-native';
import {RouterName} from '../../navigation/navigation.const';
import BaseScreen from '../base.screen';
import styles from './styles';

class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.displayScreen = RouterName.DEFAULT.name;
  }
  renderContent() {
    return (
      <View style={styles.container}>
        <Text>{this.displayScreen}</Text>
      </View>
    );
  }
}

export default Screen;
