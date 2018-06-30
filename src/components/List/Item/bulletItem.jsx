import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
  bulletIcon: {
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

const BulletItem = ({ text, onEdit, onDelete }) => (
  <View style={styles.item}>
    <Icon
      name="asterisk"
      style={styles.bulletIcon}
    />
    <TextInput
      style={styles.itemText}
      onChangeText={onEdit}
      value={text}
      multiline={false}
      underlineColorAndroid="#FFFFFF00"
    />
    <TouchableOpacity
      onPress={onDelete}
    >
      <Icon
        name="close-circle"
        style={styles.deleteIcon}
      />
    </TouchableOpacity>

  </View>
);

export default BulletItem;
