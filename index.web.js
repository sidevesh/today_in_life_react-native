import { AppRegistry } from 'react-native';
import iconFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import App from './src/App';

AppRegistry.registerComponent('TodayInLife', () => App);
AppRegistry.runApplication('TodayInLife', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

['MaterialCommunityIcons', 'MaterialIcons'].forEach((fontEntry) => {
  // Generate required css
  const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: ${fontEntry};
  }`;

  // Create stylesheet
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }

  // Inject stylesheet
  document.head.appendChild(style);
});
