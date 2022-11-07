/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import CreatePost from './components/Post/CreatePost';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => CreatePost);
