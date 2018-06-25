import CheckItem from './checkItem';
import BulletItem from './bulletItem';

const Item = ({ entry, onChange, onDelete }) =>
  entry.isChecked !== undefined ?
    <CheckItem
      isChecked={entry.isChecked}
      text={entry.text}
      onEdit={text => onChange({ ...entry, text })}
      onCheck={() => onChange({ ...entry, isChecked: true })}
      onCheck={() => onChange({ ...entry, isChecked: false })}
      onDelete={onDelete}
    />
    :
    <BulletItem
      text={entry.text}
      onEdit={text => onChange({ ...entry, text })}
      onDelete={onDelete}
    />;

export default Item;
