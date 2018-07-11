import React from 'react';
import CheckItem from './checkItem';
import BulletItem from './bulletItem';

const Item = ({
  entry,
  onEdit,
  onDelete,
  onCheckedToggle,
}) => (entry.isChecked !== undefined
  ? (
    <CheckItem
      isChecked={entry.isChecked}
      text={entry.text}
      onEdit={text => onEdit(text)}
      onCheck={onCheckedToggle}
      onUncheck={onCheckedToggle}
      onDelete={onDelete}
    />
  )
  : (
    <BulletItem
      text={entry.text}
      onEdit={text => onEdit(text)}
      onDelete={onDelete}
    />
  ));

export default Item;
