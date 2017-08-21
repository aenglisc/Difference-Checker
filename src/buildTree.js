import _ from 'lodash';

const getType = (key, oldObj, newObj) => {
  const bothExist = (key in oldObj) && (key in newObj);
  const bothHaveChildren = _.isObject(oldObj[key]) && _.isObject(newObj[key]);
  const notInOld = !(key in oldObj);
  const notInNew = !(key in newObj);
  const equalValues = oldObj[key] === newObj[key];

  if (notInOld) {
    return 'created';
  }
  if (notInNew) {
    return 'removed';
  }
  if (bothHaveChildren) {
    return 'nested';
  }
  return (bothExist && equalValues) ? 'unchanged' : 'changed';
};

const buildTree = (oldObj, newObj) => {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);
  const allKeys = _.union(oldKeys, newKeys);

  const buildNode = (key) => {
    const type = getType(key, oldObj, newObj);
    const oldValue = oldObj[key];
    const newValue = newObj[key];
    const children = type === 'nested' ? buildTree(oldValue, newValue) : [];

    const node = { key, type, oldValue, newValue, children };
    return node;
  };

  const tree = allKeys.map(buildNode);
  return tree;
};

export default configObjects => buildTree(configObjects.old, configObjects.new);
