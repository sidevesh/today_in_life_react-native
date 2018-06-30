import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as types from '../types';
import List from './List';

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
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

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
  const isChecked = type === types.TODO;
  const addNewText = 'Add New';
  const newEntryText = 'type something';
  return (
    <View>
      {!isCurrent
        && (
        <TouchableOpacity
          onPress={onPress}
          style={[style, styles.pane, styles.band]}
        >
          {
            width < height
            && (
              height !== width * 2
              || width !== BANDWIDTH
            )
            && type
              .split('')
              .map((char, index) => (
                <Text style={styles.heading} key={index}>
                  {char}
                </Text>
              ))
          }
          {
            width > height
            && (
            <Text style={styles.heading}>
              {type}
            </Text>
            )
          }
          {
            (
              width === height
              || (
                height === width * 2
                && width === BANDWIDTH
              )
            )
            && (
            <Text style={styles.heading}>
              {type.split('')[0]}
            </Text>
            )
          }
        </TouchableOpacity>
        )
      }
      {isCurrent
        && (
        <View
          style={[styles.pane, styles.editorPane, style]}
        >
          <Text
            style={
              [types.SCHEDULE, types.GOALS].includes(type)
                ? [styles.heading, styles.editorHeading, { marginTop: 30 }]
                : [styles.heading, styles.editorHeading]
            }
          >
            {type}
          </Text>
          <View style={styles.editorInput}>
            <List
              items={value}
              onChange={onChange}
              isChecked={isChecked}
              addNewText={addNewText}
              newEntryText={newEntryText}
            />
          </View>
        </View>
        )
      }
    </View>
  );
};

export default Pane;
