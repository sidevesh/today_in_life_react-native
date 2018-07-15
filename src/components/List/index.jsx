import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Item from './Item';

const styles = StyleSheet.create({
  addNewButton: {
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
  <ScrollView contentContainerStyle={{ alignItems: 'stretch' }}>
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
        <Icon
          name="add"
          style={styles.addIcon}
        />
        <Text style={styles.addText}>
          {addNewText}
        </Text>
      </TouchableOpacity>
    )}
  </ScrollView>
);

export default List;
