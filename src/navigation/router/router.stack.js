import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouterDefine } from '../navigation.router';

const Stack = createStackNavigator();

const AppStack = () => {
  const stacks = [
    RouterDefine.LOGIN,
    RouterDefine.HOME,
    RouterDefine.SPLASH,
  ];
  return (
    <Stack.Navigator
      mode={'card'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        header: null,
        cardOverlayEnabled: true,
        cardShadowEnabled: false,
        animationEnabled: true,
        gestureDirection: 'horizontal',
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
      initialRouteName={RouterDefine.SPLASH.name}>
      {stacks.map((row, i) => {
        return <Stack.Screen key={i} {...row} />;
      })}
    </Stack.Navigator>
  );
};

export {AppStack};