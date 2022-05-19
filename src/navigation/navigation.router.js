import {RouterName} from './navigation.const';
import {HomeScreen, LoginScreen, SplashScreen} from '../screens';

export const RouterDefine = {
  LOGIN: {
    ...RouterName.LOGIN,
    component: LoginScreen,
  },
  HOME: {
    ...RouterName.HOME,
    component: HomeScreen,
  },
  SPLASH: {
    ...RouterName.SPLASH,
    component: SplashScreen,
  },
};
