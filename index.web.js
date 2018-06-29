import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('TodayInLife', () => App);
AppRegistry.runApplication('TodayInLife', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
