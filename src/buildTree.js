import _ from 'lodash';

const buildTree = (oldObj, newObj) => {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);
  const allKeys = _.union(oldKeys, newKeys);

  const getType = (key) => {
    const bothExist = (oldKeys.includes(key) && newKeys.includes(key));
    if (_.isObject(oldObj[key]) && _.isObject(newObj[key])) { return 'nested'; }
    if (!oldKeys.includes(key)) { return 'created'; }
    if (!newKeys.includes(key)) { return 'removed'; }
    return bothExist && oldObj[key] === newObj[key] ? 'unchanged' : 'changed';
  };

  const buildNode = (key) => {
    const type = getType(key);
    const oldValue = oldObj === undefined ? undefined : oldObj[key];
    const newValue = newObj === undefined ? undefined : newObj[key];
    const children = type === 'nested' ? buildTree(oldValue, newValue) : [];

    return { key, type, oldValue, newValue, children };
  };

  const tree = allKeys.map(buildNode);

  return tree;
};

export default (oldConfigObject, newConfigObject) => buildTree(oldConfigObject, newConfigObject);
