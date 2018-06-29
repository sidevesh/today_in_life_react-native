import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
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

const BulletItem = ({ text, onEdit, onDelete }) => (
  <View style={styles.item}>
    <Text>
      O
    </Text>
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

export default BulletItem;
