import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
  },
  checkIcon: {
    fontSize: 20,
    paddingRight: 5,
    paddingLeft: 12,
  },
  deleteIcon: {
    fontSize: 20,
    paddingRight: 12,
    paddingLeft: 12,
  },
});

const CheckItem = ({
  text,
  onEdit,
  onDelete,
  isChecked,
  onCheck,
  onUncheck,
  isEditable,
}) => (
  <View style={styles.item}>
    {isEditable && (
      <TouchableOpacity
        onPress={() => (isChecked ? onUncheck() : onCheck())}
      >
        <Icon
          name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    )}
    <TextInput
      style={isChecked
        ? [
          styles.itemText,
          {
            textDecorationLine: 'line-through',
            textDecorationStyle: 'solid',
          },
        ]
        : styles.itemText
      }
      onChangeText={onEdit}
      value={text}
      multiline={false}
      underlineColorAndroid="#FFFFFF00"
      editable={isEditable}
    />
    {isEditable && (
      <TouchableOpacity
        onPress={onDelete}
      >
        <Icon
          name="close-circle"
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    )}
  </View>
);

export default CheckItem;
