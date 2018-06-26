import React from 'react';
import { View, TextInput, Button } from 'react-native';

const CheckItem = ({
  text,
  onEdit,
  onDelete,
  isChecked,
  onCheck,
  onUncheck,
}) => (
  <View>
    <Button
      title={isChecked ? 'X' : 'O'}
      onPress={() => (isChecked ? onUncheck() : onCheck())}
    />
    <TextInput
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
