import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './router/router.stack';

export class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'AppNavigator';
  }

  render() {
    return (
      <NavigationContainer ref={ref => (this.navigation = ref)} {...this.props}>
        <AppStack />
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
