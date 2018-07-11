import Realm from 'realm';
import * as types from './types';

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

const itemProperties = {
  id: { type: 'int' },
  text: { type: 'string' },
  type: { type: 'string' },
  createdAt: { type: 'date' },
  updatedAt: { type: 'date' },
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

const getItemsByType = (type, date) => new Promise((resolve, reject) => {
  Realm.open({ schema: [BulletItem, CheckItem] })
    .then((realm) => {
      resolve([
        realm.objects('BulletItem')
          .filtered('createdAt > $0 AND createdAt <= $1 AND type == $2', date, date, type),
        realm.objects('CheckItem')
          .filtered('createdAt > $0 AND createdAt <= $1 AND type == $2', date, date, type),
      ]
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
      realm.close();
    })
    .catch(err => reject(err));
});

export const getItems = (date = new Date()) => new Promise((resolve, reject) => {
  Promise.all(
    Object.values(types)
      .map(type => getItemsByType(type, date)),
  )
    .then((itemsByTypes) => {
      const typesToItems = {};
      itemsByTypes.forEach((itemsByType, index) => {
        typesToItems[Object.values(types)[index]] = itemsByType;
      });
      resolve(deepCopy(typesToItems));
    })
    .catch(err => reject(err));
});


export const addBulletItem = (type, text = '') => new Promise((resolve, reject) => {
  Realm.open({ schema: [BulletItem] })
    .then((realm) => {
      const now = new Date();
      realm.write(() => {
        resolve(realm.create('BulletItem', {
          id: realm.objects('BulletItem').length,
          text,
          type,
          createdAt: now,
          updatedAt: now,
        }));
        realm.close();
      });
    })
    .catch(err => reject(err));
});

export const addCheckItem = (type, text = '') => new Promise((resolve, reject) => {
  Realm.open({ schema: [CheckItem] })
    .then((realm) => {
      const now = new Date();
      realm.write(() => {
        resolve(realm.create('CheckItem', {
          id: realm.objects('CheckItem').length,
          text,
          type,
          createdAt: now,
          updatedAt: now,
          isChecked: false,
        }));
        realm.close();
      });
    })
    .catch(err => reject(err));
});

export const editBulletItem = (id, text) => new Promise((resolve, reject) => {
  Realm.open({ schema: [BulletItem] })
    .then((realm) => {
      const item = realm.objectForPrimaryKey('BulletItem', id);
      item.text = text;
      resolve(item);
      realm.close();
    })
    .catch(err => reject(err));
});

export const editCheckItem = (id, text) => new Promise((resolve, reject) => {
  Realm.open({ schema: [CheckItem] })
    .then((realm) => {
      const item = realm.objectForPrimaryKey('CheckItem', id);
      item.text = text;
      resolve(item);
      realm.close();
    })
    .catch(err => reject(err));
});

export const toggleCheckItem = id => new Promise((resolve, reject) => {
  Realm.open({ schema: [CheckItem] })
    .then((realm) => {
      const item = realm.objectForPrimaryKey('CheckItem', id);
      item.isChecked = !item.isChecked;
      resolve(item);
      realm.close();
    })
    .catch(err => reject(err));
});

export const deleteBulletItem = id => new Promise((resolve, reject) => {
  Realm.open({ schema: [BulletItem] })
    .then((realm) => {
      const item = realm.objectForPrimaryKey('BulletItem', id);
      resolve(realm.delete(item));
      realm.close();
    })
    .catch(err => reject(err));
});


export const deleteCheckItem = id => new Promise((resolve, reject) => {
  Realm.open({ schema: [CheckItem] })
    .then((realm) => {
      const item = realm.objectForPrimaryKey('CheckItem', id);
      resolve(realm.delete(item));
      realm.close();
    })
    .catch(err => reject(err));
});
