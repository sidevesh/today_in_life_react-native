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
  addNewText = 'Add New',
  onAdd,
  onEdit,
  onDelete,
  onCheckedToggle,
  isEditable,
}) => (
  <View style={{ flex: 1, alignItems: 'stretch' }}>
    {items.map(item => (
      <Item
        key={item.id}
        entry={item}
        onEdit={text => onEdit(item.id, text)}
        onCheckedToggle={() => onCheckedToggle(item.id)}
        onDelete={() => onDelete(item.id)}
        isEditable={isEditable}
      />
    ))}
    {isEditable && (
      <TouchableOpacity
        onPress={() => onAdd()}
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
    )}
  </View>
);

export default List;
