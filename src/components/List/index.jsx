import React from 'react';
import { View, Button } from 'react-native';
import Item from './Item';

const List = ({
  items,
  onChange,
  isChecked,
  addNewText = 'Add New',
  newEntryText = 'type something',
}) => (
  <View>
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
    <Button
      title={addNewText}
      onPress={() => onChange(
        isChecked
          ? [...items, { text: newEntryText, isChecked: false }]
          : [...items, { text: newEntryText }],
      )
      }
    />
  </View>
);

export default List;
