import _ from 'lodash';

const createTree = (oldObj, newObj) => {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);
  const allKeys = _.union(oldKeys, newKeys);

  const getStatus = (key) => {
    const bothExist = (oldKeys.includes(key) && newKeys.includes(key));
    if (!oldKeys.includes(key)) { return 'created'; }
    if (!newKeys.includes(key)) { return 'removed'; }
    return bothExist && oldObj[key] === newObj[key] ? 'unchanged' : 'changed';
  };

  const createNode = (key) => {
    const oldValue = oldObj === undefined ? undefined : oldObj[key];
    const newValue = newObj === undefined ? undefined : newObj[key];

    const hasChildren = (oldValue instanceof Object) && (newValue instanceof Object);

    return hasChildren ?
           { key, hasChildren, values: createTree(oldValue, newValue) } :
           { key, hasChildren, oldValue, newValue, status: getStatus(key) };
  };

  const tree = allKeys.map(createNode);

  return tree;
};

export default (oldConfigObject, newConfigObject) => createTree(oldConfigObject, newConfigObject);
