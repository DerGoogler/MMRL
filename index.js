/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Manifest} from './src/Manifest';

export default function Main() {
  return <Manifest />;
}

AppRegistry.registerComponent(appName, () => Main);
