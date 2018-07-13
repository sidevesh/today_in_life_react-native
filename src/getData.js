import Realm from 'realm';
import moment from 'moment';
import * as types from './types';

const itemProperties = {
  id: { type: 'int' },
  text: { type: 'string' },
  type: { type: 'string' },
  createdAt: { type: 'date' },
  updatedAt: { type: 'date' },
  isDeleted: { type: 'bool' },
};

const BulletItem = {
  name: 'BulletItem',
  primaryKey: 'id',
  properties: {
    ...itemProperties,
  },
};

const CheckItem = {
  name: 'CheckItem',
  primaryKey: 'id',
  properties: {
    ...itemProperties,
    isChecked: { type: 'bool' },
  },
};

export const realm = new Realm({ schema: [BulletItem, CheckItem] });

const getItemsByType = (type, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return [
    ...realm.objects('BulletItem')
      .filtered('createdAt > $0 AND createdAt <= $1 AND type == $2 AND isDeleted == false', startOfDay, endOfDay, type),
    ...realm.objects('CheckItem')
      .filtered('createdAt > $0 AND createdAt <= $1 AND type == $2 AND isDeleted == false', startOfDay, endOfDay, type),
  ]
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
};

export const getItems = (date = new Date()) => {
  const itemsByTypes = Object.values(types)
    .map(type => getItemsByType(type, date));
  const typesToItems = {};
  itemsByTypes.forEach((itemsByType, index) => {
    typesToItems[Object.values(types)[index]] = itemsByType;
  });
  return typesToItems;
};

export const getEntriedDatesForWeekStart = (aDateInWeek) => {
  const startOfWeek = moment(aDateInWeek).startOf('week').toDate();
  const endOfWeek = moment(aDateInWeek).endOf('week').toDate();
  return [
    ...realm.objects('BulletItem')
      .filtered('createdAt > $0 AND createdAt <= $1 AND isDeleted == false', startOfWeek, endOfWeek),
    ...realm.objects('CheckItem')
      .filtered('createdAt > $0 AND createdAt <= $1 AND isDeleted == false', startOfWeek, endOfWeek),
  ]
    .map(item => moment(item.createdAt).startOf('day').valueOf())
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(timestamp => moment(timestamp).toDate());
};

export const addBulletItem = (type, text = '') => {
  const now = new Date();
  realm.write(() => {
    realm.create('BulletItem', {
      id: realm.objects('BulletItem').length,
      text,
      type,
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
    });
  });
};

export const addCheckItem = (type, text = '') => {
  const now = new Date();
  realm.write(() => {
    realm.create('CheckItem', {
      id: realm.objects('CheckItem').length,
      text,
      type,
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
      isChecked: false,
    });
  });
};

export const editBulletItem = (id, text) => {
  realm.write(() => {
    const item = realm.objectForPrimaryKey('BulletItem', id);
    item.text = text;
    item.updatedAt = new Date();
  });
};

export const editCheckItem = (id, text) => {
  realm.write(() => {
    const item = realm.objectForPrimaryKey('CheckItem', id);
    item.text = text;
    item.updatedAt = new Date();
  });
};

export const toggleCheckItem = (id) => {
  realm.write(() => {
    const item = realm.objectForPrimaryKey('CheckItem', id);
    item.isChecked = !item.isChecked;
    item.updatedAt = new Date();
  });
};

export const deleteBulletItem = (id) => {
  realm.write(() => {
    const item = realm.objectForPrimaryKey('BulletItem', id);
    item.isDeleted = true;
  });
};


export const deleteCheckItem = (id) => {
  realm.write(() => {
    const item = realm.objectForPrimaryKey('CheckItem', id);
    item.isDeleted = true;
  });
};
