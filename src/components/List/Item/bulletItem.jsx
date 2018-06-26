import React from 'react';
import { View, TextInput, Button } from 'react-native';

const BulletItem = ({ text, onEdit, onDelete }) => (
  <View>
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

export default BulletItem;
