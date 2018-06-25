import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import * as types from '../types';

const getExplaination = (type) => {
  switch(type) {
    case types.SCHEDULE:
      return 'What\'s the plan for today?';
    case types.GOALS:
      return 'What do you want\'t achieve today?';
    case types.MOTIVATION:
      return 'What drives you today ?';
    case types.HAPPINESS:
      return 'What makes you happy today?';
    case types.TODO:
      return 'Things to check off!';
    default:
      return 'type something, if you wish!';
  };
};

const Pane = ({
  type,
  value,
  onChange,
  onPress,
  style,
  isCurrent,
  BANDWIDTH,
}) => {
  const { width, height } = style;
  return (
    <View>
      {!isCurrent &&
        <TouchableOpacity
          onPress={onPress}
          style={[style, styles.pane, styles.band]}
        >
          {
            width < height
            &&
            (
              height !== width * 2
              ||
              width !== BANDWIDTH
            )
            &&
            type
              .split('')
              .map((char, index) =>
                <Text style={styles.heading} key={index}>{char}</Text>
              )
          }
          {
            width > height
            &&
            <Text style={styles.heading}>{type}</Text>
          }
          {
            (
              width === height
              ||
              (
                height === width * 2
                &&
                width === BANDWIDTH
              )
            )
            &&
            <Text style={styles.heading}>{type.split('')[0]}</Text>
          }
        </TouchableOpacity>
      }
      {isCurrent &&
        <View
          style={[styles.pane, styles.editorPane, style]}
        >
          <Text
            style={
              [types.SCHEDULE, types.GOALS].includes(type) ?
                [styles.heading, styles.editorHeading, { marginTop: 30 }]
                :
                [styles.heading, styles.editorHeading]
            }
          >{type}</Text>
          <TouchableOpacity
            style={styles.editorInput}
            onPress={() => this.inputBox.focus()}
          >
            <TextInput
              onChangeText={onChange}
              value={value}
              multiline={true}
              underlineColorAndroid={'#FFFFFF00'}
              placeholder={getExplaination(type)}
              ref={(inputBox) => {this.inputBox = inputBox;}}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  pane: {
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  band: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  editorHeading: {
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    fontSize: 30,
    marginLeft: 10,
    textAlign: 'left',
  },
  editorPane: {
    alignItems: 'stretch',
  },
  editorInput: {
    backgroundColor: '#eeeeee',
    flex: 1,
  }
});


export default Pane;
