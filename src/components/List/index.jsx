import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Item from './Item';

const styles = StyleSheet.create({
  addNewButton: {
    flexGrow: 1,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  addNewButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  addIcon: {
    fontSize: 25,
    paddingRight: 5,
    paddingLeft: 12,
  },
  addText: {
    fontStyle: 'italic',

  },
});

const List = ({
  items,
  onChange,
  isChecked,
  addNewText = 'Add New',
  newEntryText = 'type something',
}) => (
  <View style={{ flex: 1, alignItems: 'stretch' }}>
    {items.map((item, index) => (
      <Item
        key={index}
        entry={item}
        onChange={newItem => onChange(
          items
            .map((itrItem, itrIndex) => (itrIndex === index ? newItem : itrItem)),
        )}
        onDelete={() => onChange(
          items
            .filter((itrItem, itrIndex) => itrIndex !== index),
        )}
      />
    ))}
    <TouchableOpacity
      onPress={() => onChange(
        isChecked
          ? [...items, { text: newEntryText, isChecked: false }]
          : [...items, { text: newEntryText }],
      )
      }
      style={styles.addNewButton}
    >
      <View style={styles.addNewButtonItem}>
        <Icon
          name="add"
          style={styles.addIcon}
        />
        <Text style={styles.addText}>
          {addNewText}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default List;
