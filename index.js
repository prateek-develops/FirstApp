/**
 * @format
 */

import App from './src/App';
import {AppRegistry} from 'react-native';
import Demo from './src/screens/Demo';
import LoginScreen from './src/screens/Login/Login';
import {MainStackNavigator} from './src/navigation/StackNavigator';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => MainStackNavigator);
