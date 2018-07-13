import React from 'react';
import CheckItem from './checkItem';
import BulletItem from './bulletItem';

const Item = ({
  entry,
  onEdit,
  onDelete,
  onCheckedToggle,
  isEditable,
}) => (entry.isChecked !== undefined
  ? (
    <CheckItem
      isChecked={entry.isChecked}
      text={entry.text}
      onEdit={text => onEdit(text)}
      onCheck={onCheckedToggle}
      onUncheck={onCheckedToggle}
      onDelete={onDelete}
      isEditable={isEditable}
    />
  )
  : (
    <BulletItem
      text={entry.text}
      onEdit={text => onEdit(text)}
      onDelete={onDelete}
      isEditable={isEditable}
    />
  ));

export default Item;
