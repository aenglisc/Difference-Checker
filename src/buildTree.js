import _ from 'lodash';

const buildTree = (oldObj, newObj) => {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);
  const allKeys = _.union(oldKeys, newKeys);

  const getType = (key) => {
    const bothExist = (oldKeys.includes(key) && newKeys.includes(key));
    const bothHaveChildren = _.isObject(oldObj[key]) && _.isObject(newObj[key]);
    const notInOld = !oldKeys.includes(key);
    const notInNew = !newKeys.includes(key);
    const equalValues = oldObj[key] === newObj[key];

    if (notInOld) { return 'created'; }
    if (notInNew) { return 'removed'; }
    if (bothHaveChildren) { return 'nested'; }
    return bothExist && equalValues ? 'unchanged' : 'changed';
  };

  const buildNode = (key) => {
    const type = getType(key);
    const oldValue = oldObj === undefined ? undefined : oldObj[key];
    const newValue = newObj === undefined ? undefined : newObj[key];
    const children = type === 'nested' ? buildTree(oldValue, newValue) : [];

    const node = { key, type, oldValue, newValue, children };
    return node;
  };

  const tree = allKeys.map(buildNode);
  return tree;
};

export default configObjects => buildTree(configObjects.old, configObjects.new);
