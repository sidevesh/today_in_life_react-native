import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  itemText: {
    flex: 1,
  },
});

const CheckItem = ({
  text,
  onEdit,
  onDelete,
  isChecked,
  onCheck,
  onUncheck,
}) => (
  <View style={styles.item}>
    <Button
      title={isChecked ? 'X' : 'O'}
      onPress={() => (isChecked ? onUncheck() : onCheck())}
    />
    <TextInput
      style={styles.itemText}
      onChangeText={onEdit}
      value={text}
      multiline={false}
      underlineColorAndroid="#FFFFFF00"
    />
    <Button
      title="X"
      onPress={onDelete}
    />
  </View>
);

export default CheckItem;
