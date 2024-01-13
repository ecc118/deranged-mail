/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from '@';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async () => {
  return;
});

AppRegistry.registerComponent(appName, () => App);
