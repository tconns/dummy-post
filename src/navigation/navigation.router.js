import {RouterName} from './navigation.const';
import {HomeScreen, LoginScreen, PostScreen} from '../screens';

export const RouterDefine = {
  LOGIN: {
    ...RouterName.LOGIN,
    component: LoginScreen,
  },
  HOME: {
    ...RouterName.HOME,
    component: HomeScreen,
  },
  POST: {
    ...RouterName.POST,
    component: PostScreen,
  },
};
